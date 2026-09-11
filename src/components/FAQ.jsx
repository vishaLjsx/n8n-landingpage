import React, { useState } from 'react';

/**
 * FAQ component - 5 questions with interactive accordion state.
 * Manages open/close state with aria-expanded and keyboard accessibility.
 * Driven strictly by props.
 */
export function FAQ({ title, subtitle, items }) {
  // Store ID of the currently expanded question; default to the first question
  const [openItemId, setOpenItemId] = useState(items[0]?.id || null);

  const toggleItem = (id) => {
    setOpenItemId((current) => (current === id ? null : id));
  };

  return (
    <section className="site-section" id="faq">
      <div className="site-container">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
          <h2>{title}</h2>
          <p style={{ margin: '0 auto' }}>{subtitle}</p>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions">
          {items.map((item) => {
            const isOpen = openItemId === item.id;
            const contentId = `faq-content-${item.id}`;
            const buttonId = `faq-btn-${item.id}`;

            return (
              <div key={item.id} className="faq-item">
                <button
                  type="button"
                  id={buttonId}
                  className="faq-trigger"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-content-panel"
                  >
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
