import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { bentoTiles } from '../data/landingData';
import { fadeLeft, fadeRight, fadeUp } from '../constants';

export default function BentoFeatures() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="max-w-[1280px] mx-auto px-4 py-12">
      <div ref={ref} className="flex flex-col md:flex-row border-2 border-brand-dark bg-white shadow-brutal-lg">

        {/* LEFT — platform summary */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-brand-dark p-8 flex flex-col justify-between min-h-[260px] md:min-h-[420px] bg-neutral-surface"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-brand-primary" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-dark/50 font-display">Implemented Today</p>
            </div>
            <h2 className="text-3xl font-display font-black text-brand-dark uppercase leading-none mb-2">
              ALL SCHOOL<br />OPERATIONS
            </h2>
            <h3 className="text-lg font-display font-black text-brand-primary uppercase">ONE PLATFORM</h3>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-brand-dark/50 mb-1 font-display">Modules Live</p>
            <div className="text-6xl font-display font-black text-brand-primary tracking-tighter">8</div>
          </div>
        </motion.div>

        {/* RIGHT — main content + tile grid */}
        <div className="w-full md:w-3/4 flex flex-col bg-white">
          {/* Status bar */}
          <div className="border-b-2 border-brand-dark flex bg-neutral-surface">
            <div className="bg-brand-primary text-white px-4 py-2 text-[10px] uppercase font-black tracking-widest font-display">
              Live Platform
            </div>
            <div className="bg-white border-r-2 border-brand-dark px-4 py-2 text-[10px] uppercase font-black tracking-widest text-brand-dark/40 font-display">
              Multi-School · Multi-Role · Real-Time
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row">
            {/* Description block */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="w-full md:w-2/3 p-8 lg:p-12 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-brand-dark relative overflow-hidden group cursor-pointer bg-white hover:bg-neutral-surface/50 transition-colors"
            >
              <p className="text-[10px] uppercase font-black text-brand-dark/40 tracking-[0.2em] mb-4 font-display">
                Built &amp; Shipped
              </p>
              <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight text-brand-dark uppercase mb-4">
                Manage schools, users, attendance, and communication from one centralised platform.
              </h3>
              <p className="text-sm text-brand-secondary/70 max-w-sm leading-relaxed">
                Multi-school, multi-role, production-ready. Every feature listed on this page is a live API endpoint backed by MongoDB and Socket.IO.
              </p>
            </motion.div>

            {/* Tile grid */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="w-full md:w-1/3 flex flex-col bg-neutral-surface"
            >
              <div className="grid grid-cols-2 flex-1">
                {bentoTiles.map((tile, i) => (
                  <motion.div
                    key={tile}
                    whileHover={{ backgroundColor: '#ea681c', color: '#ffffff' }}
                    transition={{ duration: 0.15 }}
                    className="p-5 flex flex-col justify-center border-r-2 border-b-2 border-brand-dark bg-white cursor-pointer"
                    style={{
                      borderRight: i % 2 === 0 ? '' : 'none',
                      borderBottom: i >= 6 ? 'none' : '',
                    }}
                  >
                    <span className="text-sm font-display font-black text-brand-dark">{tile}</span>
                    <span className="text-[9px] uppercase font-black text-brand-dark/40 tracking-wider mt-0.5">Live</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="#modules"
                className="h-14 border-t-2 border-brand-dark flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all group bg-white"
              >
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1.5 transition-transform text-brand-dark group-hover:text-white"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
