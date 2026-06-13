import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star } from 'lucide-react';
import { testimonialsRow1, testimonialsRow2 } from '../data/landingData';
import { fadeUp } from '../constants';

const VARIANT_STYLES = {
  orange: { bg: 'bg-brand-primary', text: 'text-brand-dark',  sub: 'text-brand-dark/70',  border: 'border-brand-dark', star: 'text-brand-dark'  },
  navy:   { bg: 'bg-brand-secondary', text: 'text-white',     sub: 'text-white/70',        border: 'border-brand-dark', star: 'text-brand-primary' },
  white:  { bg: 'bg-white',          text: 'text-brand-dark', sub: 'text-brand-dark/60',   border: 'border-brand-dark', star: 'text-brand-primary' },
};

function TestimonialCard({ t }) {
  const s = VARIANT_STYLES[t.variant] || VARIANT_STYLES.white;
  return (
    <div
      className={`inline-flex flex-col justify-between w-[300px] md:w-[360px] min-h-[220px] shrink-0 overflow-hidden ${s.bg} border-2 ${s.border} shadow-brutal p-6 gap-4`}
    >
      <div className="flex gap-1 flex-shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className={s.star} fill="currentColor" />
        ))}
      </div>
      <p className={`font-display font-bold text-sm leading-relaxed break-words whitespace-normal flex-1 ${s.text}`}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 border-2 border-current flex items-center justify-center font-display font-black text-xs uppercase flex-shrink-0"
          style={{ color: t.variant === 'navy' ? '#ffffff' : '#06163a', borderColor: t.variant === 'navy' ? 'rgba(255,255,255,0.3)' : '#06163a' }}
        >
          {t.initials}
        </div>
        <div>
          <p className={`font-display font-black text-xs uppercase ${s.text}`}>{t.name}</p>
          <p className={`text-[10px] ${s.sub}`}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialRow({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div className={`flex gap-4 md:gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-24 bg-neutral-surface border-t-2 border-brand-dark overflow-hidden">
      {/* Heading */}
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-[1280px] mx-auto px-6 text-center mb-14"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-6 h-0.5 bg-brand-primary" />
          <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">Testimonials</span>
          <div className="w-6 h-0.5 bg-brand-primary" />
        </div>
        <h2 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase mb-3">
          Trusted by Schools Across India
        </h2>
        <p className="text-brand-secondary/60 font-display text-sm uppercase tracking-widest font-bold">
          Principals · Administrators · Teachers · Parents
        </p>
      </motion.div>

      {/* Scrolling rows */}
      <div className="testimonial-track flex flex-col gap-6">
        <TestimonialRow items={testimonialsRow1} direction="left" />
        <TestimonialRow items={testimonialsRow2} direction="right" />
      </div>
    </section>
  );
}
