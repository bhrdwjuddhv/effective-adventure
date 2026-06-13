import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';
import { roles } from '../data/landingData';
import { fadeLeft, fadeRight, fadeUp, staggerContainer } from '../constants';

const ICONS = { ShieldCheck, BookOpen, GraduationCap };

export default function RoleManagement() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="access-control" className="border-t-2 border-brand-dark bg-white overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-3">

          {/* Left panel */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="p-10 md:p-14 border-b-2 md:border-b-0 md:border-r-2 border-brand-dark bg-neutral-surface flex flex-col justify-between gap-10 min-h-[480px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-brand-primary" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-dark/50 font-display">Access Control</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-brand-dark leading-none mb-6">
                ROLE BASED<br />ACCESS<br />CONTROL
              </h2>
              <p className="text-sm text-brand-secondary/70 leading-relaxed">
                Three distinct roles with scoped permissions on every route. New accounts are inactive until an admin manually verifies them — no unauthorised access.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-brand-dark/10">
              <div>
                <p className="text-[10px] uppercase font-black text-brand-dark/50 mb-1 font-display">Implemented Roles</p>
                <div className="text-6xl font-display font-black text-brand-primary tracking-tighter">3</div>
              </div>
              <motion.a
                href="/register-school"
                whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 0 #ea681c' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center w-full py-4 bg-brand-dark text-white text-xs font-display font-bold uppercase tracking-widest hover:bg-brand-primary transition-all border-2 border-brand-dark"
              >
                Register Your School
              </motion.a>
            </div>
          </motion.div>

          {/* Right role cards */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="md:col-span-2"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-3 h-full"
            >
              {roles.map((role, i) => {
                const Icon = ICONS[role.icon];
                const isRightCol = i === roles.length - 1;

                return (
                  <motion.div
                    key={role.name}
                    variants={fadeUp}
                    whileHover={{ backgroundColor: '#ea681c' }}
                    transition={{ duration: 0.18 }}
                    className="group p-10 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-brand-dark bg-white cursor-pointer flex flex-col gap-6 min-h-[320px] justify-between"
                    style={{ borderRight: isRightCol ? 'none' : '' }}
                  >
                    <div className="w-14 h-14 border-2 border-brand-dark group-hover:border-white/50 bg-neutral-surface group-hover:bg-white/20 flex items-center justify-center transition-colors">
                      {Icon && (
                        <Icon
                          size={26}
                          className="text-brand-dark group-hover:text-white transition-colors"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-display font-black text-2xl uppercase text-brand-dark group-hover:text-white transition-colors mb-3">
                        {role.name}
                      </p>
                      <p className="text-sm text-brand-secondary/60 group-hover:text-white/80 transition-colors leading-relaxed">
                        {role.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
