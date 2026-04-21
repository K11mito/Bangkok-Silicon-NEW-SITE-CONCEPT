import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CardSwap, { Card, type CardSwapHandle } from '../reactbits/CardSwap';

type Industry = {
  tag: string;
  title: string;
  copy: string;
  kpi: { value: string; label: string };
  gradient: string;
  glyph: React.ReactNode;
};

const G = {
  Gov: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M8 52h48M12 52V28M20 52V28M28 52V28M36 52V28M44 52V28M52 52V28M6 28h52L32 10z" strokeLinejoin="round" />
    </svg>
  ),
  Ag: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M32 56V22M32 22c-6-6-18-6-20-2 0 8 10 14 20 12zM32 22c6-6 18-6 20-2 0 8-10 14-20 12z" />
      <path d="M12 56h40" />
    </svg>
  ),
  Fin: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M8 48l12-12 10 8 14-16 12 10" strokeLinejoin="round" />
      <path d="M8 56h48" />
      <circle cx="56" cy="38" r="3" fill="currentColor" />
    </svg>
  ),
  Retail: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M8 20h48l-4 32H12z" />
      <path d="M22 28c0-6 4-10 10-10s10 4 10 10" />
    </svg>
  ),
  Health: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M32 56s-20-12-20-28a10 10 0 0120-4 10 10 0 0120 4c0 16-20 28-20 28z" />
      <path d="M26 28h4v-4h4v4h4v4h-4v4h-4v-4h-4z" />
    </svg>
  ),
  Mfg: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M8 56V28l14 8V28l14 8V20l20 10v26z" />
      <path d="M18 48h4M30 48h4M44 48h4" />
    </svg>
  ),
  Log: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <path d="M4 40h30v12H4zM34 30h14l8 10v12H34z" />
      <circle cx="14" cy="54" r="4" />
      <circle cx="46" cy="54" r="4" />
    </svg>
  ),
  Trans: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
      <rect x="12" y="10" width="40" height="34" rx="5" />
      <path d="M12 28h40M22 18h6M36 18h6" />
      <circle cx="22" cy="50" r="4" />
      <circle cx="42" cy="50" r="4" />
      <path d="M16 44l-4 8M48 44l4 8" strokeLinecap="round" />
    </svg>
  ),
};

const industries: Industry[] = [
  {
    tag: 'Government',
    title: 'Public sector modernisation',
    copy: 'Digitised citizen services, secure data exchange, and AI-assisted policy analytics for ASEAN ministries.',
    kpi: { value: '12M+', label: 'citizens served' },
    gradient: 'linear-gradient(135deg, rgba(106,167,255,0.35), rgba(34,211,238,0.12) 40%, transparent 70%)',
    glyph: G.Gov,
  },
  {
    tag: 'Finance',
    title: 'Banking & capital markets',
    copy: 'Real-time fraud detection, risk engines, and agentic assistants that make regulated workflows quick.',
    kpi: { value: '<40ms', label: 'fraud inference' },
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(106,167,255,0.12) 40%, transparent 70%)',
    glyph: G.Fin,
  },
  {
    tag: 'Healthcare',
    title: 'Clinical & diagnostic AI',
    copy: 'Computer vision for medical imaging, HL7/FHIR interop, and secure data lakes built for patient trust.',
    kpi: { value: '98.2%', label: 'triage precision' },
    gradient: 'linear-gradient(135deg, rgba(244,114,182,0.30), rgba(167,139,250,0.12) 40%, transparent 70%)',
    glyph: G.Health,
  },
  {
    tag: 'Manufacturing',
    title: 'Industry 4.0 operations',
    copy: 'Vision-based QC, predictive maintenance, and digital twins connecting every line and machine.',
    kpi: { value: '37%', label: 'defect reduction' },
    gradient: 'linear-gradient(135deg, rgba(251,146,60,0.30), rgba(244,114,182,0.12) 40%, transparent 70%)',
    glyph: G.Mfg,
  },
  {
    tag: 'Retail & E-commerce',
    title: 'Commerce intelligence',
    copy: 'Recommenders, demand forecasts, and in-store vision — unified across warehouses and channels.',
    kpi: { value: '+18%', label: 'basket size' },
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.30), rgba(34,211,238,0.12) 40%, transparent 70%)',
    glyph: G.Retail,
  },
  {
    tag: 'Logistics',
    title: 'Supply chain orchestration',
    copy: 'Route optimisation, IoT fleet telemetry, and blockchain-tracked provenance across borders.',
    kpi: { value: '22%', label: 'fuel saved' },
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.35), rgba(52,211,153,0.12) 40%, transparent 70%)',
    glyph: G.Log,
  },
  {
    tag: 'Agriculture',
    title: 'AgriTech at scale',
    copy: 'Satellite + drone vision, yield forecasting, and farmer-first interfaces across rural networks.',
    kpi: { value: '3.1×', label: 'yield model accuracy' },
    gradient: 'linear-gradient(135deg, rgba(132,204,22,0.30), rgba(52,211,153,0.12) 40%, transparent 70%)',
    glyph: G.Ag,
  },
  {
    tag: 'Transportation',
    title: 'Mobility & transit systems',
    copy: 'Intelligent transit scheduling, fleet telematics, and passenger-experience platforms across ASEAN corridors.',
    kpi: { value: '15%', label: 'on-time improvement' },
    gradient: 'linear-gradient(135deg, rgba(96,165,250,0.32), rgba(132,204,22,0.12) 40%, transparent 70%)',
    glyph: G.Trans,
  },
];

export default function Industries() {
  const rootRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(copyRef.current?.children || [], {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: copyRef.current, start: 'top 90%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="industries" className="relative py-28 md:py-40 overflow-hidden border-t border-white/[0.06]">
      {/* ambient color wash */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#6aa7ff]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#a78bfa]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center lg:min-h-[720px]">
          {/* Left copy */}
          <div ref={copyRef}>
            <div className="flex items-center gap-2 mb-6">
              <span className="mono text-[11px] tracking-[0.22em] uppercase text-white/45">[ 02 — Industries ]</span>
            </div>
            <h2 className="text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.035em] font-light text-white mb-7">
              Built for the <span className="serif italic text-white/80">sectors</span><br/>
              that move ASEAN.
            </h2>
            <p className="text-[17px] leading-[1.55] text-white/55 max-w-[50ch] mb-10">
              From ministries to manufacturing floors, we deliver production-grade systems where regulation,
              scale and real-world constraints meet. Eight industries. One team.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-[420px]">
              {industries.map((i, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={i.tag}
                    type="button"
                    onClick={() => {
                      setActiveIdx(idx);
                      cardSwapRef.current?.goTo(idx);
                    }}
                    aria-pressed={active}
                    className={[
                      'flex items-center gap-2 text-[13px] px-3 py-2 rounded-full border transition text-left cursor-pointer',
                      active
                        ? 'text-white border-[#6aa7ff]/60 bg-[#6aa7ff]/[0.08] shadow-[0_0_0_1px_rgba(106,167,255,0.25)]'
                        : 'text-white/60 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 hover:text-white/85',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'w-1.5 h-1.5 rounded-full transition',
                        active ? 'bg-[#6aa7ff] shadow-[0_0_8px_rgba(106,167,255,0.8)]' : 'bg-[#6aa7ff]/60',
                      ].join(' ')}
                    />
                    <span>{i.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CardSwap — hidden on the narrowest screens to avoid horizontal overflow; the tag grid conveys industries on mobile */}
          <div className="relative hidden sm:block h-[560px] lg:h-[600px] overflow-hidden">
            <CardSwap
              ref={cardSwapRef}
              width={420}
              height={520}
              cardDistance={55}
              verticalDistance={62}
              delay={3800}
              pauseOnHover
              skewAmount={5}
              onFrontChange={setActiveIdx}
            >
              {industries.map(i => (
                <Card key={i.tag} customClass="overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: i.gradient }}
                  />
                  <div className="absolute inset-0 bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJz48ZmlsdGVyIGlkPSdhJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC45Jy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI2EpJyBvcGFjaXR5PScwLjA1Jy8+PC9zdmc+)] mix-blend-overlay" />
                  <div className="relative h-full p-7 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="mono text-[10px] tracking-[0.22em] uppercase text-white/50 px-2.5 py-1 rounded-full border border-white/15 bg-black/30">
                        {i.tag}
                      </div>
                      <div className="w-9 h-9 text-white/45">{i.glyph}</div>
                    </div>
                    <div className="w-24 h-24 text-white/20 self-end -mb-4 -mr-4">{i.glyph}</div>
                    <div>
                      <h3 className="text-[28px] leading-[1.05] tracking-[-0.02em] font-light text-white mb-3">{i.title}</h3>
                      <p className="text-[13.5px] leading-[1.55] text-white/65 mb-6 max-w-[36ch]">{i.copy}</p>
                      <div className="flex items-baseline gap-3 pt-4 border-t border-white/10">
                        <span className="serif text-[44px] leading-none text-white">{i.kpi.value}</span>
                        <span className="text-[12px] text-white/55">{i.kpi.label}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
