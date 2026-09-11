import React from 'react';

/**
 * ProblemSection component - 4 cards detailing the operational friction of manual tasks.
 * Driven strictly by props.
 */
export function ProblemSection({ title, subtitle, cards }) {
  return (
    <section className="site-section" id="problem">
      <div className="site-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="problem-grid">
          {cards.map((card, index) => (
            <article key={index} className="problem-card">
              <div className="problem-card-index">{card.index}</div>
              <h3 className="problem-card-title">{card.title}</h3>
              <p className="problem-card-desc">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
