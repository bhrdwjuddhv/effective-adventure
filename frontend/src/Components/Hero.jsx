import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { fadeUp, staggerContainer } from '../constants';

export default function Hero() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #06163a 0%, #202b5d 60%, #0e1f4d 100%)' }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orange accent blob */}
      <motion.div
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #ea681c 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ea681c 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-32 right-[10%] w-16 h-16 border-2 border-brand-primary opacity-30"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 left-[8%] w-8 h-8 border-2 border-white opacity-20"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center mb-8">
            <span className="bg-brand-primary text-white font-display font-black px-5 py-2 text-xs uppercase tracking-[0.25em] border-2 border-white/20 shadow-brutal-orange">
              Trusted School ERP Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white uppercase mb-6"
          >
            Modern ERP For{' '}
            <span className="text-brand-primary">Schools,</span>{' '}
            <br className="hidden md:block" />
            Teachers &{' '}
            <span className="text-brand-primary">Administrators</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Manage attendance, fees, exams, communication, transport,
            hostel operations and reports from a single platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#demo"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px #ea681c' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-brand-primary text-white font-display font-black uppercase px-10 py-4 text-base border-2 border-white/20 shadow-brutal-orange transition-all w-full sm:w-auto justify-center"
            >
              Book Demo <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-transparent text-white font-display font-black uppercase px-10 py-4 text-base border-2 border-white/40 hover:border-white transition-all w-full sm:w-auto justify-center"
            >
              <PlayCircle size={18} /> Explore Features
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 mt-14"
          >
            {['500+ Schools', '50K+ Students', '99.9% Uptime'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/60 text-sm font-display">
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
