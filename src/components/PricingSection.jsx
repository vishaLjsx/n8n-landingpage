import React, { useState } from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * PricingSection component - 3-Tier technical investment specifications.
 * Enforces interactive selection state:
 * - Each card is fully selectable with click & keyboard support
 * - Visual radio indicator: [ ● SELECTED SPEC ] vs [ ○ SELECT SPEC ]
 * - High-contrast selection outline & elevated hover effects
 * - Active tier configuration status bar beneath the grid
 * - Ambient Space Aurora 3D WebGL Shader Gradient background
 * Driven strictly by props.
 */
export function PricingSection({
  kicker,
  title,
  subtitle,
  tiers,
  onBookAudit,
  isDarkMode = false,
  isDark,
}) {
  // Default to the standard operations engine tier as active selection
  const [selectedTierId, setSelectedTierId] = useState('standard');
  const isDarkTheme = isDark !== undefined ? isDark : isDarkMode;

  const activeTier = tiers.find((t) => t.id === selectedTierId) || tiers[1] || tiers[0];

  const handleSelectTier = (tierId) => {
    setSelectedTierId(tierId);
  };

  const handleCardKeyDown = (e, tierId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectTier(tierId);
    }
  };

  const handleProceed = (e, tier) => {
    e.stopPropagation();
    setSelectedTierId(tier.id);
    onBookAudit?.(tier);
  };

  return (
    <section className="pricing-section" id="pricing" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Layer 0: Strictly scoped Space Aurora 3D WebGL Shader Canvas */}
      <SpaceAuroraShader isDark={isDarkTheme} fadeTop={true} fadeBottom={true} />

      {/* Layer 2: Interactive Content Container */}
      <div className="site-container pricing-content-layer">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }}>
          <div style={{ marginBottom: '12px' }}>
            <span className="badge-mono badge-accent">{kicker}</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '14px' }}>{title}</h2>
          <p style={{ margin: '0 auto', fontSize: '1.0625rem' }}>{subtitle}</p>
        </div>

        {/* 3-Tier Selectable Grid */}
        <div className="pricing-cards-grid" role="radiogroup" aria-label="Pricing Specifications">
          {tiers.map((tier) => {
            const isEnterprise = tier.isEnterprise;
            const isSelected = selectedTierId === tier.id;

            return (
              <div
                key={tier.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleSelectTier(tier.id)}
                onKeyDown={(e) => handleCardKeyDown(e, tier.id)}
                className={`pricing-card ${isEnterprise ? 'pricing-card-enterprise' : 'pricing-card-standard'} ${
                  isSelected ? 'is-tier-selected' : ''
                }`}
              >
                <div>
                  {/* Selectable Radio Indicator Pill & Recommended Badge */}
                  <div className="pricing-selector-row">
                    <div className={`schematic-radio-pill ${isSelected ? 'is-active' : ''}`}>
                      <span className="radio-indicator-disc" aria-hidden="true" />
                      <span className="radio-indicator-text">
                        {isSelected ? 'SELECTED SPEC' : 'CLICK TO SELECT'}
                      </span>
                    </div>

                    {tier.badge && (
                      <div className="pricing-recommended-badge">
                        <span>{tier.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Top Bar: Monospace circle glyph & Tier Name */}
                  <div className="pricing-card-topbar">
                    <div className="pricing-tier-header">
                      <span className="pricing-glyph-mono" aria-hidden="true">
                        ○ {tier.glyph}
                      </span>
                      <h3 className="pricing-tier-name">{tier.name}</h3>
                    </div>
                  </div>

                  {/* Pricing Display: Aligned to Right as per prompt */}
                  <div className="pricing-figure-block">
                    <div className={`pricing-amount ${isEnterprise ? 'pricing-amount-plasma' : ''}`}>
                      {tier.price}
                    </div>
                    <div className="pricing-period">{tier.period}</div>
                  </div>

                  <p className="pricing-description">{tier.description}</p>

                  <div className="pricing-divider" aria-hidden="true" />

                  {/* Features with Monospace Bullets */}
                  <div className="pricing-specs-label">SPECIFICATIONS:</div>
                  <ul className="pricing-features-list">
                    {tier.features.map((feat, fIndex) => (
                      <li key={fIndex} className="pricing-feature-item">
                        <span className="feature-bullet-mono" aria-hidden="true">
                          [✓]
                        </span>
                        <span className="feature-text">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button: Adapts state when tier is selected */}
                <div className="pricing-action-wrap">
                  <button
                    type="button"
                    className={`btn ${
                      isEnterprise
                        ? `btn-primary-dark ${isSelected ? 'is-selected' : ''}`
                        : `btn-nav-pill ${isSelected ? 'is-selected' : ''}`
                    }`}
                    onClick={(e) => handleProceed(e, tier)}
                  >
                    {isSelected ? `Selected — ${tier.ctaLabel}` : `Select — ${tier.ctaLabel}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Configuration Status Bar */}
        <div className="pricing-configured-status" aria-live="polite">
          <div className="configured-status-left">
            <span className="status-indicator-dot" aria-hidden="true" />
            <span className="configured-label">ACTIVE SELECTION:</span>
            <span className="configured-tier-name">{activeTier.name}</span>
            <span className="configured-price-tag">
              {activeTier.price} • {activeTier.period}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleProceed(e, activeTier)}
          >
            Proceed With {activeTier.name}
          </button>
        </div>
      </div>
    </section>
  );
}
