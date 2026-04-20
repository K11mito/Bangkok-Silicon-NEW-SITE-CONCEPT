import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SpotlightCard from '../reactbits/SpotlightCard';

type Service = {
  n: string;
  title: string;
  desc: string;
  bullets: string[];
  tint: string;
  icon: React.ReactNode;
};

const Icon = {
  AI: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <path d="M12 2l2.4 4.8L20 8l-4 3.8.9 5.5L12 14.8 7.1 17.3 8 11.8 4 8l5.6-1.2z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" opacity="0.4" />
    </svg>
  ),
  Data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </svg>
  ),
  Vision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <path d="M7 18a5 5 0 1 1 .8-9.93A6 6 0 0 1 19 10.5c2 .3 3.5 2 3.5 4S21 18 19 18H7z" />
    </svg>
  ),
  Security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Chain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-full h-full">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 17.5h7M17.5 14v7" />
    </svg>
  ),
};

const services: Service[] = [
  {
    n: '01',
    title: 'AI & Agentic AI',
    desc: 'Autonomous agents, content generation, and decision-making systems that operate at enterprise scale.',
    bullets: ['LLM integration', 'Workflow agents', 'RAG pipelines'],
    tint: 'rgba(106, 167, 255, 0.22)',
    icon: Icon.AI,
  },
  {
    n: '02',
    title: 'Data Engineering',
    desc: 'Pipelines, data lakes, lakehouses, and analytics platforms built for volume, velocity, and trust.',
    bullets: ['Streaming ETL', 'Warehouses', 'Governance'],
    tint: 'rgba(34, 211, 238, 0.22)',
    icon: Icon.Data,
  },
  {
    n: '03',
    title: 'Computer Vision',
    desc: 'Quality control, defect detection, retail analytics, and intelligent surveillance at the edge.',
    bullets: ['Edge inference', 'QC automation', 'Video analytics'],
    tint: 'rgba(167, 139, 250, 0.22)',
    icon: Icon.Vision,
  },
  {
    n: '04',
    title: 'Cloud Computing',
    desc: 'Public, private, and hybrid architectures — migrated, modernised, and operated for resilience.',
    bullets: ['Multi-cloud', 'Kubernetes', 'FinOps'],
    tint: 'rgba(52, 211, 153, 0.22)',
    icon: Icon.Cloud,
  },
  {
    n: '05',
    title: 'Cybersecurity',
    desc: 'Defence strategy, red/blue team testing, vulnerability assessment, and 24×7 incident response.',
    bullets: ['SOC as-a-service', 'Pen-testing', 'Zero-trust'],
    tint: 'rgba(251, 146, 60, 0.20)',
    icon: Icon.Security,
  },
  {
    n: '06',
    title: 'Blockchain & IoT',
    desc: 'Distributed ledgers, smart contracts and connected-device fleets for verifiable, real-time ops.',
    bullets: ['Smart contracts', 'Edge fleets', 'Digital twins'],
    tint: 'rgba(244, 114, 182, 0.22)',
    icon: Icon.Chain,
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 3) * 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="services" className="relative py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="mono text-[11px] tracking-[0.22em] uppercase text-white/45">[ 01 — Services ]</span>
            </div>
            <h2 className="text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.035em] font-light text-white">
              Six capabilities. <br/>
              <span className="serif italic text-white/80">One operating picture.</span>
            </h2>
          </div>
          <div className="self-end">
            <p className="text-[17px] leading-[1.55] text-white/55 max-w-[52ch]">
              We integrate cutting-edge technologies end-to-end — addressing business challenges with
              measurable value, not novelty. Every engagement ships to production.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map(s => (
            <SpotlightCard
              key={s.n}
              className="service-card p-7 md:p-8 h-[340px] flex flex-col justify-between group cursor-pointer hover:border-white/20 transition-colors"
              spotlightColor={s.tint as `rgba(${number}, ${number}, ${number}, ${number})`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 text-white/80 group-hover:text-white transition-colors">{s.icon}</div>
                <span className="mono text-[10px] tracking-[0.2em] text-white/30 mt-1">{s.n}</span>
              </div>
              <div>
                <h3 className="text-[22px] md:text-[24px] font-medium tracking-tight text-white mb-3">{s.title}</h3>
                <p className="text-[14px] leading-[1.55] text-white/55 mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.bullets.map(b => (
                    <span key={b} className="text-[11px] mono tracking-wide px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
