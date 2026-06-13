import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { navLinks } from '../data/landingData';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-brand-dark">
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center h-16 pl-6 pr-0">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 bg-brand-primary flex items-center justify-center text-white border-2 border-brand-dark">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-display font-black tracking-tight uppercase text-brand-dark">
            EduFlow<span className="text-brand-primary"> ERP</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center h-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="h-full flex items-center px-5 hover:bg-brand-primary hover:text-white border-l-2 border-brand-dark font-display font-bold text-sm uppercase transition-colors text-brand-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/register-school"
            className="h-full bg-brand-secondary text-white px-6 flex items-center font-display font-bold uppercase text-sm hover:bg-brand-primary transition-colors border-l-2 border-brand-dark whitespace-nowrap"
          >
            Register School
          </a>
          <a
            href="/register-user"
            className="h-full bg-brand-primary text-white px-6 flex items-center font-display font-bold uppercase text-sm hover:bg-brand-dark transition-colors border-l-2 border-brand-dark whitespace-nowrap"
          >
            Register User
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="xl:hidden h-full px-4 border-l-2 border-brand-dark text-brand-dark"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-white border-b-2 border-brand-dark absolute w-full left-0 top-16 shadow-brutal-lg z-40"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block p-4 border-t border-brand-dark font-display font-bold uppercase text-sm hover:bg-brand-primary hover:text-white text-brand-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/register-school"
              onClick={() => setMobileOpen(false)}
              className="block p-4 border-t-2 border-brand-dark font-display font-bold uppercase text-sm bg-brand-secondary text-white hover:bg-brand-primary transition-colors"
            >
              Register School
            </a>
            <a
              href="/register-user"
              onClick={() => setMobileOpen(false)}
              className="block p-4 border-t border-brand-dark font-display font-bold uppercase text-sm bg-brand-primary text-white hover:bg-brand-dark transition-colors"
            >
              Register User
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
