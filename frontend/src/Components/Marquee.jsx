import { marqueeItems } from '../data/landingData';

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-brand-primary text-white overflow-hidden py-2.5 border-b-2 border-brand-dark relative z-[60]">
      <div className="inline-flex whitespace-nowrap animate-marquee-left">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-bold uppercase tracking-widest font-display"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
