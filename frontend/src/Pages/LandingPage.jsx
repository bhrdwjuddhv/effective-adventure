import Marquee from '../components/Marquee';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BentoFeatures from '../components/BentoFeatures';
import WhyERP from '../components/WhyERP';
import InteractiveFeatures from '../components/InteractiveFeatures';
import Stats from '../components/Stats';
import ModulesGrid from '../components/ModulesGrid';
import Testimonials from '../components/Testimonials';
import RoleManagement from '../components/RoleManagement';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-white font-sans">
      <Marquee />
      <Header />
      <main>
        <Hero />
        <BentoFeatures />
        <WhyERP />
        <InteractiveFeatures />
        <Stats />
        <ModulesGrid />
        <Testimonials />
        <RoleManagement />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
