import React from 'react';

/**
 * LogoCloud component - Displays client marks/teams running on custom workflows.
 * Driven strictly by props.
 */
export function LogoCloud({ title, logos }) {
  return (
    <section className="logo-cloud-section" aria-label="Client Teams">
      <div className="site-container">
        <div className="logo-cloud-header">{title}</div>
        <div className="logo-cloud-grid">
          {logos.map((item, index) => (
            <div key={index} className="logo-cloud-item">
              <span className="logo-cloud-name">{item.name}</span>
              <span className="logo-cloud-industry">{item.industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
