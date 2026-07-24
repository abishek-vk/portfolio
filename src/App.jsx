import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import SectionDivider from "./components/SectionDivider/SectionDivider";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 2500); }, []);
  if (loading) return <LoadingScreen />;
  return (
    <div className="relative">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
export default App;