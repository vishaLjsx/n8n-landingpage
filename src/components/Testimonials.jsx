import React from 'react';

/**
 * Testimonials component - 3 quotes with author name and role.
 * Driven strictly by props.
 */
export function Testimonials({ title, subtitle, items }) {
  return (
    <section className="site-section" id="testimonials">
      <div className="site-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="testimonials-grid">
          {items.map((item, index) => (
            <figure key={index} className="testimonial-card">
              <blockquote className="testimonial-quote">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="testimonial-author-wrap">
                <div className="testimonial-author-name">{item.author}</div>
                <div className="testimonial-author-role">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
