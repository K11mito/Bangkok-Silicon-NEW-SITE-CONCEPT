import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#careers' },
  { label: 'Insight', href: '#insight' },
];

const Logo = () => (
  <a href="#top" className="flex items-center gap-2.5 group">
    <span className="relative grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#6aa7ff] to-[#a78bfa] overflow-hidden">
      <span className="absolute inset-0 bg-black/30 mix-blend-overlay" />
      <svg viewBox="0 0 24 24" className="w-4 h-4 relative z-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h8a4 4 0 0 1 0 8H4zM4 12h10a4 4 0 0 1 0 8H4z" />
      </svg>
    </span>
    <span className="flex items-baseline gap-1.5">
      <span className="text-[15px] font-semibold tracking-tight text-white">Bangkok Silicon</span>
      <span className="hidden sm:inline text-[11px] text-white/40 mono tracking-[0.1em] uppercase">ASEAN</span>
    </span>
  </a>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ top: scrolled ? '14px' : '0px' }}
    >
      <div
        className={[
          'nav-shell pointer-events-auto flex items-center justify-between gap-6',
          scrolled
            ? 'max-w-[920px] w-[94%] px-4 py-2.5 rounded-full glass border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]'
            : 'max-w-[1400px] w-full px-8 py-5 border-b border-white/[0.06] bg-[rgba(6,6,9,0.5)] backdrop-blur-md',
        ].join(' ')}
      >
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-3.5 py-1.5 text-[13px] text-white/65 hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors px-3 py-1.5"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 text-[13px] font-medium text-black bg-white hover:bg-white/90 transition-colors rounded-full px-4 py-2 group"
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
