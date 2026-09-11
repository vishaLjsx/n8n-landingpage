import React, { useState, useEffect } from 'react';
import { siteData } from './data/siteData';

import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpaceAuroraShader } from './components/CosmicGradients';
import { LogoCloud } from './components/LogoCloud';
import { ProblemSection } from './components/ProblemSection';
import { ProcessSteps } from './components/ProcessSteps';
import { PricingSection } from './components/PricingSection';
import { ServicesGrid } from './components/ServicesGrid';
import { ResultsStats } from './components/ResultsStats';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';

// Export unified shader component for reusability
export { SpaceAuroraShader };

/**
 * App - Root application component.
 * Houses the ambient Space Aurora 3D WebGL Shader Gradient strictly behind Navbar + Hero,
 * spreads slices from siteData into section components, controls
 * the Book Your Audit modal state, and manages Dark/Light theme switching.
 */
export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('n8n_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'light';
  });

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('n8n_theme', theme);
    } catch {
      // Storage unavailable or disabled
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Strictly scoped container encompassing only Navbar + Hero */}
      <div className="hero-viewport-scope" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Layer 0: Ambient Space Aurora 3D WebGL Shader Gradient Canvas */}
        <SpaceAuroraShader isDark={isDarkMode} fadeBottom={true} />

        {/* Layer 2: Sticky Header */}
        <Header
          brand={siteData.brand}
          header={siteData.header}
          onBookAudit={handleOpenAuditModal}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />

        {/* Layer 2: Hero Section */}
        <Hero
          {...siteData.hero}
          onBookAudit={handleOpenAuditModal}
        />
      </div>

      <main>
        {/* 3. Logo Cloud */}
        <LogoCloud {...siteData.logoCloud} />

        {/* 4. Problem Section */}
        <ProblemSection {...siteData.problem} />

        {/* 5. Process Section (4-Week Blueprint) */}
        <ProcessSteps {...siteData.process} />

        {/* 6. Pricing Section (Space Aurora Shader + 3-Tier Schematic) */}
        <PricingSection
          {...siteData.pricing}
          onBookAudit={handleOpenAuditModal}
          isDarkMode={isDarkMode}
        />

        {/* 7. Services Grid (Common Workflows Matrix) */}
        <ServicesGrid {...siteData.services} />

        {/* 7. Results Stats */}
        <ResultsStats {...siteData.results} />

        {/* 8. Testimonials */}
        <Testimonials {...siteData.testimonials} />

        {/* 9. FAQ Accordion */}
        <FAQ {...siteData.faq} />

        {/* 10. Closing CTA Band (Space Aurora Shader) */}
        <CTASection
          {...siteData.ctaSection}
          onBookAudit={handleOpenAuditModal}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* 11. Footer */}
      <Footer brand={siteData.brand} {...siteData.footer} />

      {/* Modal Dialog: Book Your Audit */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        modalData={siteData.auditModal}
      />
    </div>
  );
}
