import { useEffect, useRef } from 'react';
import BorderGlow, { type BorderGlowHandle } from '../reactbits/BorderGlow';

const stats = [
  { value: '300+', label: 'Engineers & consultants' },
  { value: '2', label: 'Countries · Bangkok & Vietnam' },
  { value: '8', label: 'Industries served' },
  { value: '24×7', label: 'SOC & support' },
];

const capabilities = ['AI / ML', 'Generative AI', 'Agentic AI', 'Data Engineering', 'Computer Vision', 'Cloud Native', 'Cybersecurity', 'Blockchain & IoT'];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const glowHostRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<BorderGlowHandle>(null);

  // Replay the BorderGlow sweep whenever the About section scrolls into view,
  // and on a gentle 12s cadence while it remains visible (no remount, no React state churn).
  useEffect(() => {
    const el = glowHostRef.current;
    if (!el) return;
    let visible = false;
    let timer: number | undefined;
    const startLoop = () => {
      if (timer) return;
      glowRef.current?.sweep();
      timer = window.setInterval(() => {
        if (visible) glowRef.current?.sweep();
      }, 12000);
    };
    const stopLoop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) startLoop();
          else stopLoop();
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      stopLoop();
    };
  }, []);

  // Stat counters: pre-populated with target value, animate count-up on view.
  // Using IntersectionObserver + rAF directly (no GSAP) so the number is
  // always correct even when rAF is throttled in a headless preview.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.stat-number'));

    const animate = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.value || '0');
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0');
      const duration = 1800;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic ease-out
      const start = performance.now();
      let rafId = 0;
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const val = ease(t) * target;
        el.textContent = val.toFixed(decimals) + suffix;
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };
      rafId = requestAnimationFrame(step);
      // Safety net: if rAF is throttled, force final state after duration+500ms
      window.setTimeout(() => {
        if (el.textContent !== target.toFixed(decimals) + suffix) {
          cancelAnimationFrame(rafId);
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }, duration + 500);
    };

    const played = new WeakSet<HTMLElement>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && !played.has(el)) {
            played.add(el);
            animate(el);
          }
        });
      },
      { threshold: 0.35 },
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={rootRef} id="about" className="relative py-28 md:py-40 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section intro */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-16 md:mb-20">
          <div>
            <div className="mono text-[11px] tracking-[0.22em] uppercase text-white/45 mb-6">[ 03 — About ]</div>
            <h2 className="text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.035em] font-light text-white">
              A regional team, <br />
              <span className="serif italic text-white/80">built for scale.</span>
            </h2>
          </div>
          <div className="self-end">
            <p className="text-[17px] leading-[1.55] text-white/60 max-w-[52ch]">
              Bangkok Silicon operates alongside <span className="text-white">Vietnam Silicon</span> — an integrated team of engineers,
              consultants and designers working across Bangkok, Hanoi and Ho Chi Minh City.
              We foster digital revolution and empower businesses to execute on ambitious initiatives.
            </p>
          </div>
        </div>

        {/* BorderGlow feature panel */}
        <div ref={glowHostRef} className="mb-12 md:mb-14 relative">
          {/* Soft ambient blur backdrop so the panel is never visually flat */}
          <div className="absolute -inset-6 rounded-[48px] bg-[radial-gradient(circle_at_30%_20%,rgba(106,167,255,0.12),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.12),transparent_60%)] blur-2xl pointer-events-none" />
        <BorderGlow
          ref={glowRef}
          borderRadius={32}
          glowColor="220 95 62"
          colors={['#6aa7ff', '#a78bfa', '#22d3ee']}
          backgroundColor="#08090e"
          edgeSensitivity={20}
          coneSpread={30}
          glowRadius={60}
          animated
          glowIntensity={1.4}
          fillOpacity={0.8}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/10">
              <div className="mono text-[11px] tracking-[0.22em] uppercase text-white/45 mb-5">Mission</div>
              <h3 className="serif text-[34px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-white mb-5 italic">
                “Foster digital revolution and empower businesses across industries.”
              </h3>
              <p className="text-[15px] leading-[1.6] text-white/55">
                Strategic IT consulting that transforms business needs into advanced technology solutions —
                delivering end-to-end innovation with measurable value.
              </p>
            </div>
            <div className="p-10 md:p-14">
              <div className="mono text-[11px] tracking-[0.22em] uppercase text-white/45 mb-5">Capabilities</div>
              <div className="flex flex-wrap gap-2">
                {capabilities.map(c => (
                  <span key={c} className="text-[13px] px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:border-white/20 transition">
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[11px] mono uppercase tracking-[0.2em] text-white/40 mb-2">HQ</div>
                  <div className="text-[14px] text-white/80 leading-[1.5]">
                    40th Fl, One City Centre<br/>
                    548 Phloen Chit, Bangkok
                  </div>
                </div>
                <div>
                  <div className="text-[11px] mono uppercase tracking-[0.2em] text-white/40 mb-2">Partner</div>
                  <div className="text-[14px] text-white/80 leading-[1.5]">
                    Vietnam Silicon<br/>
                    Hanoi · HCMC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderGlow>
        </div>

        {/* Stats */}
        <div ref={numbersRef} className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/[0.08]">
          {stats.map((s, i) => {
            // Split "300+" / "2" / "7" / "24×7" into a leading number + remainder.
            // Values containing × are treated as non-animatable (rendered as-is).
            const m = /^([\d.]+)(.*)$/.exec(s.value);
            const canAnimate = !!m && !s.value.includes('×');
            const num = m ? m[1] : s.value;
            const suf = m ? m[2] : '';
            return (
              <div key={s.label} className={`p-7 md:p-10 ${i < 3 ? 'border-r border-white/[0.08]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/[0.08]' : ''}`}>
                {canAnimate ? (
                  <div
                    className="stat-number serif text-[clamp(44px,6vw,88px)] leading-none text-white mb-3"
                    data-value={num}
                    data-suffix={suf}
                  >
                    {s.value}
                  </div>
                ) : (
                  <div className="serif text-[clamp(44px,6vw,88px)] leading-none text-white mb-3">
                    {s.value}
                  </div>
                )}
                <div className="text-[12px] mono uppercase tracking-[0.15em] text-white/50">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
