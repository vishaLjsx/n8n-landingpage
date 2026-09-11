import React from 'react';

/**
 * ServicesGrid component - 6 cards with title, description, and tool tags.
 * Tool tags use monospace styling and subtle accent tint.
 * Driven strictly by props.
 */
export function ServicesGrid({ title, subtitle, servicesList }) {
  return (
    <section className="site-section" id="services">
      <div className="site-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-top">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>

              <div className="service-tool-tags" aria-label="Supported Integrations">
                {service.tools.map((tool, tIndex) => (
                  <span key={tIndex} className="tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
