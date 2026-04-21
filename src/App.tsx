import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Services from './components/sections/Services';
import Industries from './components/sections/Industries';
import About from './components/sections/About';
import Partners from './components/sections/Partners';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import { installGsapSafety } from './lib/gsap-safety';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    installGsapSafety();
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative bg-[#060609] text-white">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Industries />
        <About />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
