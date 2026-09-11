import React from 'react';

/**
 * Footer component - Brand blurb, two link columns, social links, legal line, and operational status.
 * Driven strictly by props.
 */
export function Footer({ brand, blurb, columns, socialLinks, legalLine, statusText }) {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
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
            <p className="footer-brand-blurb">{blurb}</p>
          </div>

          {/* Two Link Columns */}
          {columns.map((col, index) => (
            <div key={index} className="footer-links-col">
              <div className="footer-col-heading">{col.heading}</div>
              <ul className="footer-links-list">
                {col.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a href={link.href} className="footer-link-item">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Legal, Socials, Status */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-line">{legalLine}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="footer-social-links" style={{ display: 'flex', gap: '16px' }}>
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="footer-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="footer-status-pill">
              <span className="status-dot-active" aria-hidden="true" />
              <span>{statusText}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
