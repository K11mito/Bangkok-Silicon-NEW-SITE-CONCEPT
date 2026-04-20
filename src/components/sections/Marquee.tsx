const words = [
  'AI & Agentic AI',
  'Data Engineering',
  'Computer Vision',
  'Cloud Computing',
  'Cybersecurity',
  'Blockchain & IoT',
  'Digital Transformation',
  'Machine Learning',
];

const Item = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-8 whitespace-nowrap px-8 py-6">
    <span className="serif italic text-[clamp(28px,4vw,52px)] leading-none text-white/80">{text}</span>
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#6aa7ff]/70">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  </span>
);

export default function Marquee() {
  const seq = [...words, ...words];
  return (
    <div className="relative border-y border-white/[0.06] overflow-hidden bg-[#07080c]">
      <div className="marquee">
        {seq.map((w, i) => <Item key={i} text={w} />)}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#07080c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#07080c] to-transparent" />
    </div>
  );
}
