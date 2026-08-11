import { Suspense, lazy } from 'react';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import TerminalMode from './components/TerminalMode';

// Lazy load components that are below the fold
const NeuralInterfaceSection = lazy(() => import('./components/NeuralInterfaceSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const EducationSection = lazy(() => import('./components/EducationSection'));
const CertificationsSection = lazy(() => import('./components/CertificationsSection'));
const EventsSection = lazy(() => import('./components/EventsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

const LoadingFallback = () => (
  <div className="flex h-40 w-full items-center justify-center bg-[#0C0C0C]">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
  </div>
);

const App = () => {
  return (
    <main
      className="relative w-full"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      <CustomCursor />
      <TerminalMode />
      <HeroSection />
      
      <Suspense fallback={<LoadingFallback />}>
        <NeuralInterfaceSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <EventsSection />
        <ContactSection />
      </Suspense>
    </main>
  );
};

export default App;





