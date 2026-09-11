import React from 'react';

/**
 * Hero component - Kicker, single gradient headline highlight, CTAs, stats, and workflow chain.
 * Driven strictly by props.
 */
export function Hero({
  kicker,
  headlineBefore,
  headlineHighlight,
  headlineAfter,
  subhead,
  primaryCta,
  secondaryCta,
  stats,
  workflowChain,
  onBookAudit,
}) {
  return (
    <section className="hero-section" id="overview">
      <div className="site-container">
        {/* Kicker badge */}
        <div className="hero-kicker-wrap">
          <span className="badge-mono badge-accent">{kicker}</span>
        </div>

        {/* Headline with single permitted gradient */}
        <h1 className="hero-headline">
          {headlineBefore}
          <span className="hero-highlight-gradient">{headlineHighlight}</span>
          {headlineAfter}
        </h1>

        {/* Subhead */}
        <p className="hero-subhead">{subhead}</p>

        {/* CTA Actions */}
        <div className="hero-cta-group">
          <button
            type="button"
            onClick={onBookAudit}
            className="btn btn-primary"
          >
            {primaryCta.label}
          </button>
          <a href={secondaryCta.href} className="btn btn-secondary">
            {secondaryCta.label}
          </a>
        </div>

        {/* 4-Column Stat Callouts */}
        <div className="hero-stats-row" role="region" aria-label="System Metrics">
          {stats.map((item, index) => (
            <div key={index} className="hero-stat-card">
              <div className="hero-stat-number">{item.number}</div>
              <div className="hero-stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Horizontal Workflow Chain Schematic */}
        <div className="workflow-chain-card" aria-label="Example Workflow Diagram">
          <div className="workflow-chain-header">
            <div className="workflow-chain-title">
              <span className="status-dot-active" aria-hidden="true" />
              <span>{workflowChain.title}</span>
            </div>
            <span className="badge-mono badge-dark">NODE STATUS: ACTIVE</span>
          </div>

          <div className="workflow-chain-flow">
            {workflowChain.nodes.map((node, index) => (
              <React.Fragment key={index}>
                <div className="workflow-node">
                  <div className="workflow-node-type">{node.type}</div>
                  <div className="workflow-node-title">{node.title}</div>
                  <div className="workflow-node-meta">{node.meta}</div>
                </div>

                {index < workflowChain.nodes.length - 1 && (
                  <div className="workflow-arrow-connector" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
