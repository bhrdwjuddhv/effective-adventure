import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, Zap, Building2, ClipboardCheck } from 'lucide-react';
import { stats } from '../data/landingData';
import { fadeUp, staggerContainer } from '../constants';

const ICONS = { ShieldCheck, Zap, Building2, ClipboardCheck };

function FeatureCard({ stat }) {
  const Icon = ICONS[stat.icon];
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center text-center gap-4"
    >
      {Icon && (
        <div className="p-4 border-2 border-white/20 inline-flex">
          <Icon size={36} className="text-brand-primary" strokeWidth={1.5} />
        </div>
      )}
      <div>
        <p className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight">
          {stat.label}
        </p>
        <p className="text-white/60 font-display text-sm mt-1 uppercase tracking-wider">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden border-t-2 border-brand-dark"
      style={{ background: 'linear-gradient(135deg, #06163a 0%, #202b5d 100%)' }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 w-[600px] h-[1px] -translate-x-1/2 opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #ea681c, transparent)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-brand-primary" />
            <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">Platform Pillars</span>
            <div className="w-6 h-0.5 bg-brand-primary" />
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase">
            Built On Solid Foundations
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16"
        >
          {stats.map((stat) => (
            <FeatureCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
