import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { interactiveFeatures } from '../data/landingData';
import { fadeUp } from '../constants';

export default function InteractiveFeatures() {
  const [activeId, setActiveId] = useState(1);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-24 border-t-2 border-brand-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-0.5 bg-brand-primary" />
            <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">
              Core Modules
            </span>
            <div className="w-6 h-0.5 bg-brand-primary" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase">
            Everything Your School Needs
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-3 min-h-[420px]">
          {interactiveFeatures.map((feature) => {
            const isActive = activeId === feature.id;
            return (
              <motion.div
                key={feature.id}
                layout
                onClick={() => setActiveId(feature.id)}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden cursor-pointer border-2 border-brand-dark"
                style={{
                  backgroundColor: feature.cardBg,
                  flex: isActive ? '3 1 0%' : '1 1 0%',
                  minWidth: isActive ? 0 : 0,
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute top-0 left-0 w-1 h-full bg-brand-primary"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <div className="p-7 h-full flex flex-col justify-between min-h-[380px]">
                  {/* Number */}
                  <span
                    className="text-4xl font-display font-black"
                    style={{ color: isActive ? feature.accentBg : `${feature.cardText}40` }}
                  >
                    {feature.number}
                  </span>

                  <div>
                    <motion.h3
                      layout="position"
                      className="font-display font-black text-xl md:text-2xl uppercase leading-tight mb-4"
                      style={{ color: feature.cardText }}
                    >
                      {feature.title}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key="desc"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <p
                            className="text-sm leading-relaxed mb-6 max-w-xs"
                            style={{ color: `${feature.cardText}cc` }}
                          >
                            {feature.description}
                          </p>
                          <a
                            href="#demo"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest hover:gap-3 transition-all"
                            style={{ color: feature.cardText }}
                          >
                            Learn More <ArrowRight size={14} />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expand hint on inactive */}
                  {!isActive && (
                    <div className="mt-auto">
                      <div
                        className="w-6 h-0.5 mt-4"
                        style={{ backgroundColor: `${feature.cardText}40` }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
