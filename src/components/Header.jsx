import React, { useState } from 'react';

/**
 * Header component - Sticky navigation with schematic logo, nav links, and CTA.
 * Driven strictly by props.
 */
export function Header({
  brand,
  header,
  onBookAudit,
  isDarkMode = false,
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" id="top">
      <div className="site-container">
        <div className="header-inner">
          <a href="#top" className="brand-mark" aria-label={brand.name}>
            <div className="brand-mark-icon" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8h4m4 0h4M6 4l4 4-4 4"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="brand-mark-title">{brand.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            {header.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-item"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-cta-wrap">

            {/* Theme Toggle Button - Beside Book Your Audit */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="theme-toggle-btn"
              id="theme-toggle-button"
              aria-label={isDarkMode ? 'Switch to original light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to original light mode' : 'Switch to dark mode'}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {isDarkMode ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
              <span className="theme-toggle-label">{isDarkMode ? 'LIGHT' : 'DARK'}</span>
            </button>

            <button
              type="button"
              onClick={onBookAudit}
              className="btn btn-primary btn-sm header-cta-desktop"
            >
              {header.cta.label}
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <nav
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        {header.navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            {link.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            style={{ flex: '0 0 auto', height: '40px', padding: '0 14px' }}
            aria-label={isDarkMode ? 'Switch to original light mode' : 'Switch to dark mode'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDarkMode ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
            <span className="theme-toggle-label">{isDarkMode ? 'LIGHT' : 'DARK'}</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ flex: '1', height: '40px' }}
            onClick={() => {
              closeMobileMenu();
              onBookAudit?.();
            }}
          >
            {header.cta.label}
          </button>
        </div>
      </nav>
    </header>
  );
}
