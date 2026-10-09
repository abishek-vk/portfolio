/**
 * Hero WebGL scene (lazy-loaded so three.js stays out of the main bundle).
 *
 *  - A noise-displaced "liquid" icosphere with fresnel rim light
 *  - A slow wireframe shell + two orbit rings for depth
 *  - A soft particle field with additive blending
 *
 * Reacts to the pointer (rotation, parallax, distortion on fast moves) and to
 * `state.scroll` (0 → 1 as the hero leaves the viewport). Rendering pauses when
 * the hero is off-screen or the tab is hidden. Mobile gets fewer vertices,
 * fewer particles and a lower pixel ratio. Reduced motion renders one still frame.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { REDUCED_MOTION } from "../../lib/motion";

/* Ashima / Stefan Gustavson 3D simplex noise (MIT) */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const blobVertex = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform float uRadius;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
float displace(vec3 dir){
  float n = snoise(dir * 1.4 + vec3(uTime * 0.22));
  n += 0.35 * snoise(dir * 3.2 - vec3(uTime * 0.15));
  return n * uDistort;
}
vec3 orthogonal(vec3 v){
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}
void main(){
  vec3 dir = normalize(position);
  float d = displace(dir);
  vec3 p = dir * (uRadius + d);

  // Recompute the normal from two nearby displaced points so lighting follows the waves.
  vec3 t = orthogonal(dir);
  vec3 b = normalize(cross(dir, t));
  vec3 d1 = normalize(dir + t * 0.01);
  vec3 d2 = normalize(dir + b * 0.01);
  vec3 p1 = d1 * (uRadius + displace(d1));
  vec3 p2 = d2 * (uRadius + displace(d2));
  vNormal = normalize(normalMatrix * normalize(cross(p1 - p, p2 - p)));

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = -mv.xyz;
  vNoise = d;
  gl_Position = projectionMatrix * mv;
}`;

const blobFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uDeep;
uniform vec3 uViolet;
uniform vec3 uCyan;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 2.4);

  // Slow iridescent banding across the surface
  float band = 0.5 + 0.5 * sin(vNoise * 7.0 + n.y * 2.5 + uTime * 0.35);
  vec3 base = mix(uDeep, uViolet, band * 0.55);

  vec3 L = normalize(vec3(-0.5, 0.8, 0.6));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), v), 0.0), 40.0);

  vec3 col = base * (0.35 + diff * 0.65);
  col = mix(col, uCyan, fres * 0.85);
  col += spec * 0.55;
  gl_FragColor = vec4(col, 1.0);
}`;

const pointsVertex = /* glsl */ `
attribute float aScale;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uIntro;
varying float vAlpha;
varying float vMix;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.25 + position.x * 0.8) * 0.18;
  p.x += cos(uTime * 0.2 + position.z) * 0.12;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  vAlpha = (0.3 + 0.7 * abs(sin(uTime * 0.6 + aScale * 25.0))) * uIntro;
  vMix = fract(aScale * 7.0);
}`;

const pointsFragment = /* glsl */ `
uniform vec3 uCyan;
uniform vec3 uViolet;
varying float vAlpha;
varying float vMix;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(mix(uCyan, uViolet, vMix), a * vAlpha * 0.75);
}`;

function makeRing(radius, segments = 160) {
  const pts = new THREE.EllipseCurve(0, 0, radius, radius).getPoints(segments);
  const geo = new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p.x, p.y, 0)));
  return new THREE.LineLoop(geo, new THREE.LineBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.14 }));
}

export default function HeroScene({ state }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS glow behind the canvas remains as a fallback
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 9;

    const colors = {
      uDeep: { value: new THREE.Color("#0b1033") },
      uViolet: { value: new THREE.Color("#8b5cf6") },
      uCyan: { value: new THREE.Color("#00d9ff") },
    };

    /* ---- Liquid core ---- */
    const group = new THREE.Group();
    scene.add(group);

    const blobUniforms = { uTime: { value: 0 }, uDistort: { value: 0.28 }, uRadius: { value: 1.55 }, ...colors };
    const blobGeo = new THREE.IcosahedronGeometry(1, isMobile ? 24 : 48);
    const blobMat = new THREE.ShaderMaterial({ vertexShader: blobVertex, fragmentShader: blobFragment, uniforms: blobUniforms });
    const blob = new THREE.Mesh(blobGeo, blobMat);
    group.add(blob);

    /* ---- Wireframe shell + orbit rings ---- */
    const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.55, 1));
    const shellMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.18 });
    const shell = new THREE.LineSegments(shellGeo, shellMat);
    group.add(shell);

    const ringA = makeRing(3.2);
    ringA.rotation.set(1.2, 0.3, 0);
    const ringB = makeRing(3.7);
    ringB.rotation.set(-0.9, -0.6, 0.4);
    ringB.material.opacity = 0.08;
    group.add(ringA, ringB);

    /* ---- Particle field ---- */
    const count = isMobile ? 650 : 2200;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spherical shell distribution, flattened slightly on Z
      const r = 3.6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
      scales[i] = Math.random();
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    const pointsUniforms = {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 70 : 90 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uIntro: { value: 0 },
      ...colors,
    };
    const pointsMat = new THREE.ShaderMaterial({
      vertexShader: pointsVertex,
      fragmentShader: pointsFragment,
      uniforms: pointsUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    /* ---- Layout: object sits right of the headline on wide screens, above it on narrow ones ---- */
    const anchor = new THREE.Vector2();
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = camera.aspect > 1.1;
      anchor.set(wide ? 2.1 : 0, wide ? 0.1 : 1.3);
      group.scale.setScalar(wide ? 1 : 0.68);
      if (REDUCED_MOTION) render(2);
    };

    /* ---- Pointer input (smoothed) ---- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, energy: 0 };
    const onPointer = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      // Fast pointer movement "excites" the surface; decays in the loop
      pointer.energy = Math.min(pointer.energy + Math.hypot(nx - pointer.tx, ny - pointer.ty) * 0.6, 0.5);
      pointer.tx = nx;
      pointer.ty = ny;
    };

    const clock = new THREE.Clock();
    function render(t) {
      const scroll = state.current.scroll;
      const intro = state.current.intro;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      pointer.energy *= 0.94;

      blobUniforms.uTime.value = t;
      blobUniforms.uDistort.value = 0.26 + pointer.energy * 0.5 + scroll * 0.35;
      pointsUniforms.uTime.value = t;
      pointsUniforms.uIntro.value = intro;

      // Intro scales the core up from nothing; scroll lifts and shrinks it away
      const s = (0.15 + 0.85 * intro) * (1 - scroll * 0.35);
      blob.scale.setScalar(s);
      shell.scale.setScalar(0.6 + 0.4 * intro);

      group.position.x = anchor.x + pointer.x * 0.25;
      group.position.y = anchor.y + pointer.y * 0.2 + scroll * 2.2;
      group.rotation.y = t * 0.08 + pointer.x * 0.5;
      group.rotation.x = -pointer.y * 0.35 + scroll * 0.8;
      shell.rotation.y = -t * 0.12;
      shell.rotation.z = t * 0.05;
      ringA.rotation.z = t * 0.1;
      ringB.rotation.z = -t * 0.07;

      points.rotation.y = t * 0.02 - pointer.x * 0.12 + scroll * 0.6;
      points.rotation.x = pointer.y * 0.08;

      camera.position.z = 9 + scroll * 2.5;
      renderer.render(scene, camera);
    }

    /* ---- Loop, paused when off-screen or tab hidden ---- */
    let raf = 0;
    let visible = true;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible && !document.hidden) render(clock.getElapsedTime());
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    if (REDUCED_MOTION) {
      render(2);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      [blobGeo, shellGeo, pointsGeo, ringA.geometry, ringB.geometry].forEach((g) => g.dispose());
      [blobMat, shellMat, pointsMat, ringA.material, ringB.material].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [state]);

  return <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" aria-hidden="true" />;
}
