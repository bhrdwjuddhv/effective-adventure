import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Building2, Lock, BookOpen, GraduationCap,
  MessageSquare, Bell, ClipboardCheck, CalendarDays,
  IndianRupee, FileText, LayoutGrid, Heart,
} from 'lucide-react';
import { modules } from '../data/landingData';
import { fadeUp, staggerContainer } from '../constants';

const ICONS = {
  Building2, Lock, BookOpen, GraduationCap,
  MessageSquare, Bell, ClipboardCheck, CalendarDays,
  IndianRupee, FileText, LayoutGrid, Heart,
};

export default function ModulesGrid() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // 12 modules: 4 columns × 3 rows
  const totalCols = 4;
  const totalRows = Math.ceil(modules.length / totalCols);
  const lastRowStart = (totalRows - 1) * totalCols;

  return (
    <section id="modules" className="py-24 bg-white border-t-2 border-brand-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">
                ERP Modules
              </span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase leading-tight">
              What&apos;s Live<br />What&apos;s Coming
            </h2>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-brand-primary border-2 border-brand-dark inline-block" />
              <span className="text-xs font-display font-black uppercase text-brand-dark/60">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-brand-dark border-2 border-brand-dark inline-block" />
              <span className="text-xs font-display font-black uppercase text-brand-dark/60">Coming Soon</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 border-2 border-brand-dark"
        >
          {modules.map((mod, i) => {
            const Icon = ICONS[mod.icon];
            const isLastRow = i >= lastRowStart;
            const isRightCol = (i + 1) % totalCols === 0;

            return (
              <motion.div
                key={mod.name}
                variants={fadeUp}
                whileHover={!mod.comingSoon ? { backgroundColor: '#ea681c' } : {}}
                transition={{ duration: 0.18 }}
                className={`group p-7 border-b-2 border-r-2 border-brand-dark flex flex-col gap-4 ${
                  mod.comingSoon
                    ? 'bg-neutral-surface cursor-default'
                    : 'bg-white cursor-pointer'
                }`}
                style={{
                  borderBottom: isLastRow ? 'none' : '',
                  borderRight: isRightCol ? 'none' : '',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-12 h-12 border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      mod.comingSoon
                        ? 'border-brand-dark/20 bg-brand-dark/5'
                        : 'border-brand-dark group-hover:border-white bg-neutral-surface group-hover:bg-white/20'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        size={22}
                        strokeWidth={2}
                        className={`transition-colors ${
                          mod.comingSoon
                            ? 'text-brand-dark/30'
                            : 'text-brand-dark group-hover:text-white'
                        }`}
                      />
                    )}
                  </div>
                  {mod.comingSoon && (
                    <span className="text-[8px] font-display font-black uppercase tracking-widest bg-brand-dark text-white px-1.5 py-0.5 border border-brand-dark flex-shrink-0">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className={`font-display font-black text-base uppercase transition-colors ${
                      mod.comingSoon
                        ? 'text-brand-dark/40'
                        : 'text-brand-dark group-hover:text-white'
                    }`}
                  >
                    {mod.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 transition-colors ${
                      mod.comingSoon
                        ? 'text-brand-dark/30'
                        : 'text-brand-secondary/60 group-hover:text-white/80'
                    }`}
                  >
                    {mod.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
