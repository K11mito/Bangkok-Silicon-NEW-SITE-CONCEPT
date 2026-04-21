import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Partner = { name: string; src: string; href?: string };

const partners: Partner[] = [
  { name: 'Burapha University', src: '/partners/buu.webp', href: 'https://www.buu.ac.th/' },
  { name: 'TMA Solutions', src: '/partners/tma.webp', href: 'https://www.tma.vn/' },
  { name: 'King Mongkut\u2019s University of Technology Thonburi', src: '/partners/kmutt.webp', href: 'https://www.kmutt.ac.th/' },
];

export default function Partners() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-logo', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      });
      gsap.from('.partner-label', {
        y: 12,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 90%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="partners"
      className="relative border-t border-b border-white/[0.06] bg-[#07080c]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="flex flex-col items-center gap-10">
          <div className="partner-label text-center">
            <h2 className="serif italic text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.025em] text-white mb-3">
              Our partners
            </h2>
            <div className="text-[14px] md:text-[15px] leading-[1.55] text-white/50 max-w-[44ch] mx-auto">
              Backed by the institutions shaping ASEAN tech.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-16 md:gap-x-24 gap-y-8 w-full">
            {partners.map((p) => {
              const Logo = (
                <img
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-14 md:max-h-16 w-auto object-contain"
                  draggable={false}
                />
              );
              return p.href ? (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="partner-logo group inline-flex items-center opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                >
                  {Logo}
                </a>
              ) : (
                <div
                  key={p.name}
                  className="partner-logo inline-flex items-center opacity-60 grayscale"
                  aria-label={p.name}
                >
                  {Logo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
