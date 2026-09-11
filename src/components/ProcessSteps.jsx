import React from 'react';

/**
 * ProcessSteps component - 4 numbered steps from audit to handoff.
 * Violet accent reserved strictly for step-number badges.
 * Driven strictly by props.
 */
export function ProcessSteps({ title, subtitle, steps }) {
  return (
    <section className="site-section" id="process">
      <div className="site-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-badge-step">{step.stepNumber}</div>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-desc">{step.description}</p>
              <div className="process-deliverable">{step.deliverable}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
