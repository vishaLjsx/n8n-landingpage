import React from 'react';

/**
 * ResultsStats component - 3 case-style cards with industry label, big metric, and description.
 * Driven strictly by props.
 */
export function ResultsStats({ title, subtitle, cases }) {
  return (
    <section className="site-section" id="results">
      <div className="site-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="results-grid">
          {cases.map((item, index) => (
            <article key={index} className="result-card">
              <span className="result-industry-badge">// {item.industry}</span>
              <div className="result-metric">{item.metric}</div>
              <div className="result-metric-label">{item.metricLabel}</div>
              <p className="result-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
