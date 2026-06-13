import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, MessageSquare, Building2, Lock, ClipboardCheck, Bell } from 'lucide-react';
import { whyErpBenefits } from '../data/landingData';
import { fadeUp, staggerContainer } from '../constants';

const ICONS = { ShieldCheck, MessageSquare, Building2, Lock, ClipboardCheck, Bell };

export default function WhyERP() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="benefits" className="py-24 bg-neutral-surface border-t-2 border-brand-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-primary" />
            <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">
              What&apos;s Built
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase leading-tight max-w-xl">
            Core Platform Capabilities
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-brand-dark"
        >
          {whyErpBenefits.map((benefit, i) => {
            const Icon = ICONS[benefit.icon];
            const isBottomRow = i >= 3;
            const isRightCol  = (i + 1) % 3 === 0;

            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ backgroundColor: '#06163a', color: '#ffffff' }}
                transition={{ duration: 0.2 }}
                className="group p-8 bg-white border-b-2 border-r-2 border-brand-dark cursor-pointer"
                style={{
                  borderBottom: isBottomRow ? 'none' : '',
                  borderRight: isRightCol ? 'none' : '',
                }}
              >
                <div className="mb-5 inline-flex p-3 border-2 border-brand-dark bg-neutral-surface group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors">
                  {Icon && <Icon size={24} className="text-brand-dark group-hover:text-white transition-colors" strokeWidth={2} />}
                </div>
                <h3 className="font-display font-black text-xl text-brand-dark group-hover:text-white uppercase mb-3 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-secondary/70 group-hover:text-white/80 transition-colors">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
