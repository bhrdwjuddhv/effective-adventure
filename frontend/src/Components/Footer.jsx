import { motion } from 'motion/react';
import { Zap, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { footerLinks } from '../data/landingData';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t-2 border-brand-dark">
      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-brand-primary border-2 border-brand-primary flex items-center justify-center">
                <Zap size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="text-xl font-display font-black tracking-tight uppercase text-white">
                EduFlow<span className="text-brand-primary"> ERP</span>
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Complete school management platform built for Indian educational institutions.
            </p>
            <div className="flex gap-3">
              {['T', 'L', 'I'].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ backgroundColor: '#ea681c' }}
                  className="w-9 h-9 border-2 border-white/20 flex items-center justify-center text-white/50 hover:text-white text-xs font-display font-black cursor-pointer transition-colors"
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-brand-primary text-sm font-display transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-brand-primary text-sm font-display transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:demo@eduflow.in"
                  className="flex items-center gap-3 text-white/60 hover:text-brand-primary text-sm font-display transition-colors group"
                >
                  <div className="w-8 h-8 border-2 border-white/20 group-hover:border-brand-primary flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={14} />
                  </div>
                  demo@eduflow.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center gap-3 text-white/60 hover:text-brand-primary text-sm font-display transition-colors group"
                >
                  <div className="w-8 h-8 border-2 border-white/20 group-hover:border-brand-primary flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={14} />
                  </div>
                  +91 XXXXX XXXXX
                </a>
              </li>
            </ul>

            <motion.a
              href="#demo"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 0 #ea681c' }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 bg-brand-primary text-white font-display font-black uppercase px-6 py-3 text-xs border-2 border-brand-primary transition-all w-full justify-center"
            >
              Book a Demo
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs font-display uppercase tracking-wider">
            © {new Date().getFullYear()} EduFlow ERP. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-display uppercase tracking-wider">
            Built for Indian Schools · Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
