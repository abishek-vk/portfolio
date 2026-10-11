import { useEffect, useRef, useState } from "react";
import {
  useGSAP, ScrollTrigger, REDUCED_MOTION,
  initSmoothScroll, destroySmoothScroll, lockScroll, scrollTo,
} from "./lib/motion";
import { initScrollAnimations } from "./utils/animations";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Cursor from "./components/ui/Cursor";

function App() {
  const root = useRef(null);
  // `ready` flips when the loader curtain starts lifting; the site renders
  // underneath the loader from the start so the hero is painted in time.
  const [ready, setReady] = useState(REDUCED_MOTION);
  const [loaderMounted, setLoaderMounted] = useState(!REDUCED_MOTION);

  /* Smooth scroll + always start at the top so the intro is seen */
  useEffect(() => {
    // React's loader (or the site, under reduced motion) is painted: drop the static one from index.html
    document.getElementById("boot")?.remove();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  /* Scroll is locked while the loader runs */
  useEffect(() => {
    lockScroll(!ready);
    if (!ready) return;
    document.documentElement.classList.remove("fonts-pending");
    // Fonts / layout may have shifted during loading: re-measure triggers
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [ready]);

  /* Same-page anchors go through Lenis so they glide instead of jump */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2) return;
      e.preventDefault();
      const href = a.getAttribute("href");
      scrollTo(href, { force: true });
      // Move keyboard focus along with the scroll (e.g. the skip link)
      document.querySelector(href)?.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* Declarative reveal / parallax animations for every section */
  useGSAP(() => initScrollAnimations(root.current), { scope: root });

  return (
    <div ref={root} className="relative">
      <a href="#main" className="skip-link">Skip to content</a>

      {loaderMounted && <LoadingScreen onReveal={() => setReady(true)} onDone={() => setLoaderMounted(false)} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <Navbar ready={ready} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
