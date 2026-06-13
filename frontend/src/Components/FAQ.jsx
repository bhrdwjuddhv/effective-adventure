import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/landingData';
import { fadeUp, staggerContainer } from '../constants';

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border-b-2 border-brand-dark last:border-b-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-[11px] font-display font-black text-brand-primary mt-0.5 flex-shrink-0 uppercase tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display font-black text-base md:text-lg text-brand-dark uppercase group-hover:text-brand-primary transition-colors">
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0, backgroundColor: open ? '#ea681c' : '#f6f6f6' }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 border-2 border-brand-dark flex items-center justify-center mt-0.5"
        >
          <Plus
            size={14}
            className={`transition-colors ${open ? 'text-white' : 'text-brand-dark'}`}
            strokeWidth={3}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pl-10 pb-6 text-sm text-brand-secondary/70 leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-24 bg-neutral-surface border-t-2 border-brand-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-14">

          {/* Left heading */}
          <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs uppercase tracking-[0.3em] font-display font-black text-brand-primary">FAQ</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase leading-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-brand-secondary/70 leading-relaxed mb-8">
              Everything you need to know about EduFlow ERP before getting started.
            </p>
            <motion.a
              href="#demo"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 0 #06163a' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-display font-black uppercase px-7 py-3.5 text-sm border-2 border-brand-dark shadow-brutal transition-all"
            >
              Still have questions? Contact us
            </motion.a>
          </motion.div>

          {/* Right accordion */}
          <motion.div
            className="md:col-span-2 border-t-2 border-brand-dark"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
