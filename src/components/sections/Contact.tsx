import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import StarBorder from '../reactbits/StarBorder';

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="contact" className="relative py-28 md:py-44 border-t border-white/[0.06] overflow-hidden">
      {/* ambient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hover ? 1 : 0.55 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#6aa7ff]/10 blur-[160px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="mono text-[11px] tracking-[0.22em] uppercase text-white/45 mb-7 contact-reveal">[ 04 — Contact ]</div>
          <h2 className="contact-reveal text-[clamp(44px,7vw,104px)] leading-[0.95] tracking-[-0.035em] font-light text-white max-w-[16ch] mx-auto text-balance">
            Let's build what <span className="serif italic text-white/85">comes next</span> in ASEAN.
          </h2>
          <p className="contact-reveal mt-8 text-[17px] leading-[1.55] text-white/55 max-w-[48ch] mx-auto text-balance">
            Tell us what you're trying to transform. A senior engineer will respond within one working day.
          </p>
        </div>

        {/* CTA + details */}
        <div className="contact-reveal flex flex-col items-center gap-10">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <StarBorder
              as="a"
              href="mailto:contact@bks.net"
              color="#6aa7ff"
              speed="5s"
              className="inline-block"
            >
              <span className="inline-flex items-center gap-3 px-4 py-1.5 text-[18px] font-medium">
                <span>contact@bks.net</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </StarBorder>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px w-full max-w-[900px] mt-6 bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            <a href="tel:+66611920971" className="group p-6 bg-[#08090e] hover:bg-[#0c0d12] transition-colors">
              <div className="mono text-[10px] tracking-[0.22em] uppercase text-white/40 mb-2">Phone</div>
              <div className="text-[15px] text-white/90 group-hover:text-white transition">+66 611 920 971</div>
            </a>
            <a href="mailto:contact@bks.net" className="group p-6 bg-[#08090e] hover:bg-[#0c0d12] transition-colors">
              <div className="mono text-[10px] tracking-[0.22em] uppercase text-white/40 mb-2">Email</div>
              <div className="text-[15px] text-white/90 group-hover:text-white transition">contact@bks.net</div>
            </a>
            <div className="p-6 bg-[#08090e]">
              <div className="mono text-[10px] tracking-[0.22em] uppercase text-white/40 mb-2">Office</div>
              <div className="text-[15px] text-white/90 leading-[1.45]">40th Fl, One City Centre<br/>548 Phloen Chit, Bangkok</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
