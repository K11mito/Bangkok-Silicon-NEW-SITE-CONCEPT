export default function Footer() {
  const cols = [
    {
      title: 'Services',
      links: ['AI & Agentic AI', 'Data Engineering', 'Computer Vision', 'Cloud Computing', 'Cybersecurity', 'Blockchain & IoT'],
    },
    {
      title: 'Industries',
      links: ['Government', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Logistics', 'Agriculture'],
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Events', 'Insight', 'Press', 'Contact'],
    },
  ];

  return (
    <footer className="relative border-t border-white/[0.08] pt-16 md:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-14 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6aa7ff] to-[#a78bfa]" />
              <span className="text-[15px] font-semibold tracking-tight text-white">Bangkok Silicon</span>
            </div>
            <p className="text-[14px] leading-[1.55] text-white/55 max-w-[36ch] mb-6">
              Envisioning the future of ASEAN with digital transformation. Built with Vietnam Silicon.
            </p>
            <div className="flex gap-2">
              {['LI', 'X', 'FB', 'GH'].map(s => (
                <a key={s} href="#" className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-[11px] mono text-white/60 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div className="text-[11px] mono uppercase tracking-[0.22em] text-white/40 mb-5">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized wordmark */}
        <div className="border-t border-white/[0.06] pt-10 mb-10 overflow-hidden">
          <div className="serif italic text-[clamp(80px,16vw,220px)] leading-[0.9] tracking-[-0.04em] text-white/[0.06] whitespace-nowrap select-none -mx-4">
            Bangkok Silicon
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-white/40">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Bangkok Silicon Co., Ltd.</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:text-white/80 transition">Privacy</a>
            <a href="#" className="hover:text-white/80 transition">Terms</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
