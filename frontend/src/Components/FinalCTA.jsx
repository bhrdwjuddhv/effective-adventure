import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../constants';

export default function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="demo"
      className="py-28 relative overflow-hidden border-t-2 border-brand-dark"
      style={{ background: 'linear-gradient(135deg, #06163a 0%, #202b5d 100%)' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative floaters */}
      <motion.div
        className="absolute top-8 left-[5%] w-20 h-20 border-2 border-brand-primary opacity-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-8 right-[8%] w-14 h-14 border-2 border-white opacity-10"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 right-[15%] w-4 h-4 bg-brand-primary opacity-40"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-brand-primary" />
            <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">
              Get Started Today
            </span>
            <div className="w-2 h-2 bg-brand-primary" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-[1.05] mb-6"
          >
            Ready To Transform<br />
            <span className="text-brand-primary">Your School Operations?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Join 500+ schools already running on EduFlow ERP. Get a personalized demo tailored to your school's needs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="/register-school"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px #ea681c' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-brand-primary text-white font-display font-black uppercase px-10 py-4 text-sm border-2 border-brand-primary shadow-brutal-orange transition-all w-full sm:w-auto justify-center"
            >
              Register School <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/register"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-transparent text-white font-display font-black uppercase px-10 py-4 text-sm border-2 border-white/40 hover:border-white transition-all w-full sm:w-auto justify-center"
            >
              Register User
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 mt-14 border-t border-white/10 pt-10"
          >
            {[
              'No credit card required',
              'Free 14-day trial',
              'Dedicated onboarding support',
              'Data migration included',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-white/50 text-xs font-display uppercase tracking-wider">
                <span className="w-1 h-1 bg-brand-primary rounded-full" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
