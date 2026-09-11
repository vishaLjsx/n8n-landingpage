import React from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * CTASection component - High-impact closing CTA band (pre-footer banner).
 * Driven strictly by props, with ambient Space Aurora 3D WebGL Shader Gradient background.
 */
export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  onBookAudit,
  isDarkMode = false,
  isDark,
}) {
  const isDarkTheme = isDark !== undefined ? isDark : isDarkMode;

  return (
    <section className="site-section" id="contact" style={{ borderBottom: 'none' }}>
      <div className="site-container">
        <div className="cta-band pre-footer-banner" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Ambient Space Aurora 3D WebGL Shader Gradient */}
          <SpaceAuroraShader isDark={isDarkTheme} />

          <div className="cta-band-inner">
            <h2 className="cta-band-title">{title}</h2>
            <p className="cta-band-desc">{description}</p>
            <div className="cta-band-actions">
              <button
                type="button"
                onClick={onBookAudit}
                className="btn btn-primary"
              >
                {primaryCta.label}
              </button>
              <a href={secondaryCta.href} className="btn btn-secondary">
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
