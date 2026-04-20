import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurText from '../reactbits/BlurText';
import ShinyText from '../reactbits/ShinyText';
import Magnet from '../reactbits/Magnet';
import Silk from '../reactbits/Silk';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shinyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(kickerRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from(subRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.6 });
      gsap.from(ctaRef.current?.children || [], { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 1.85 });
      gsap.from(shinyRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.3 });
      gsap.to(scrollRef.current, { y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-55">
        <Silk speed={2.5} scale={1.2} color="#17203d" noiseIntensity={1.3} rotation={0.25} />
      </div>

      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 hero-glow-2 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#060609] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pt-40 md:pt-48 pb-28">
        <div ref={kickerRef} className="flex items-center gap-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="mono text-[11px] tracking-[0.22em] uppercase text-white/55">
            Bangkok · Hanoi · Ho Chi Minh City
          </span>
        </div>

        <h1 className="text-balance text-[clamp(44px,8vw,108px)] leading-[0.96] tracking-[-0.035em] font-light text-white max-w-[14ch]">
          <span className="block">
            <BlurText text="Envisioning the" delay={60} animateBy="words" startDelay={0.1} />
          </span>
          <span className="block">
            <BlurText text="future of" delay={60} animateBy="words" startDelay={0.35} />
            <span className="serif italic text-white/90 ml-3 md:ml-5">
              <BlurText text="ASEAN" delay={80} animateBy="letters" startDelay={0.6} />
            </span>
          </span>
          <span className="block">
            <BlurText text="with digital" delay={60} animateBy="words" startDelay={0.85} />
          </span>
          <span className="block">
            <BlurText text="transformation." delay={60} animateBy="words" startDelay={1.15} />
          </span>
        </h1>

        {/* Separate shiny accent */}
        <div ref={shinyRef} className="mt-6 flex items-center gap-3">
          <span className="block w-10 h-px bg-white/30" />
          <span className="mono text-[11px] tracking-[0.22em] uppercase">
            <ShinyText text="300+ engineers · 7 industries · one region" color="#7b8191" shineColor="#ffffff" speed={3} spread={120} />
          </span>
        </div>

        <p ref={subRef} className="mt-10 max-w-[46ch] text-[17px] md:text-[18px] leading-[1.55] text-white/60 text-balance">
          Strategic IT consulting that turns business needs into advanced technology — AI, Data,
          Cloud, Cybersecurity, Blockchain and IoT, delivered by an integrated team across Thailand and Vietnam.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnet padding={40} magnetStrength={6}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 transition rounded-full px-6 py-3.5 text-[14px] font-medium shadow-[0_20px_50px_-12px_rgba(255,255,255,0.15)]"
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnet>
          <Magnet padding={40} magnetStrength={8}>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-[14px] text-white/75 hover:text-white transition px-5 py-3.5 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              See what we build
            </a>
          </Magnet>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="mono text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="text-white/40">
          <rect x="1" y="1" width="12" height="16" rx="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="7" cy="6" r="1.5" fill="currentColor">
            <animate attributeName="cy" values="5;10;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}
