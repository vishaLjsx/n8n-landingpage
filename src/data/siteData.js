/**
 * Antigravity Automation - Site Content Data
 * Single source of truth driving all presentational components.
 */

export const siteData = {
  brand: {
    name: "n8n Orchestrate",
    shortName: "n8n Orchestrate",
    tagline: "Self-Hosted n8n Workflow Systems",
    version: "v2.4.0",
    statusText: "Engine: All Systems Operational",
  },

  header: {
    navLinks: [
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Services", href: "#services" },
      { label: "Case Studies", href: "#results" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: {
      label: "Book Your Audit",
      href: "#contact",
    },
  },

  hero: {
    kicker: "SELF-HOSTED N8N WORKFLOW AUTOMATION FOR SMBs",
    headlineBefore: "Eliminate operational friction with custom n8n workflows that ",
    headlineHighlight: "live entirely inside your infrastructure",
    headlineAfter: ".",
    subhead:
      "We design, build, and deploy production-grade operational pipelines for scaling businesses. Zero per-task SaaS tax, total data sovereignty, and custom integrations tailored to your stack.",
    primaryCta: {
      label: "Book Your Audit",
      href: "#contact",
    },
    secondaryCta: {
      label: "Explore Live Services",
      href: "#services",
    },
    stats: [
      { number: "100%", label: "Data sovereignty with self-hosted instances" },
      { number: "$0", label: "Per-execution SaaS fees or task limits" },
      { number: "99.98%", label: "Production pipeline reliability rate" },
      { number: "350k+", label: "Workflows automated per month" },
    ],
    workflowChain: {
      title: "LIVE SCHEMATIC: INBOUND LEAD ENRICHMENT & ROUTING",
      nodes: [
        {
          type: "Trigger",
          title: "Webhook Inbound",
          meta: "POST /v1/lead-intake",
        },
        {
          type: "Step 01",
          title: "Verify & Enrich",
          meta: "Clearbit + LinkedIn API",
        },
        {
          type: "Step 02",
          title: "Routing Engine",
          meta: "HubSpot CRM + Slack Ping",
        },
        {
          type: "Outcome",
          title: "Rep Notification",
          meta: "Assigned in <450ms",
        },
      ],
    },
  },

  logoCloud: {
    title: "TEAMS RUNNING ON WORKFLOWS WE BUILT",
    logos: [
      { name: "Nexus Logistics", industry: "Freight Dispatch" },
      { name: "Strata SaaS", industry: "B2B Cloud Analytics" },
      { name: "Altus MedTech", industry: "HIPAA Telehealth" },
      { name: "Vantage Commerce", industry: "Omnichannel Retail" },
      { name: "Crestline Finance", industry: "Underwriting Ops" },
      { name: "Kova Manufacturing", industry: "ERP Supply Chain" },
    ],
  },

  problem: {
    title: "The compounding cost of manual operations",
    subtitle:
      "Manual copy-pasting between fragmented systems wastes team bandwidth and caps your operational throughput.",
    cards: [
      {
        index: "01 // CAPACITY",
        title: "Drained Staff Hours",
        description:
          "High-value operators spend 15–20 hours each week copying data between CRMs, order sheets, and invoicing portals.",
      },
      {
        index: "02 // INTEGRITY",
        title: "Cascading Data Errors",
        description:
          "Fat-fingered entries and dropped email handoffs result in missed client deadlines, duplicate billing, and lost revenue.",
      },
      {
        index: "03 // BOTTLENECK",
        title: "Scale Requires Headcount",
        description:
          "When manual data entry is the backbone of your business, processing 2x orders requires hiring 2x administrative staff.",
      },
      {
        index: "04 // VISIBILITY",
        title: "Zero Operational Audit Trail",
        description:
          "Disconnected tools offer no unified logging. When an order drops or a sync fails, discovering why takes hours of forensic digging.",
      },
    ],
  },

  process: {
    title: "How we engineer and deploy your workflows",
    subtitle:
      "A structured 4-phase engineering engagement that takes your automations from mapping to production-hardened execution.",
    steps: [
      {
        stepNumber: "01",
        title: "Audit & Architecture Map",
        description:
          "We analyze your existing software stack, interview team operators, and document exact data contracts, triggers, and edge cases.",
        deliverable: "Deliverable: Technical Workflow Blueprint & Data Schema",
      },
      {
        stepNumber: "02",
        title: "Sandboxed Development",
        description:
          "We build and stress-test your custom n8n workflows in an isolated staging environment with mock payloads and rigorous retry logic.",
        deliverable: "Deliverable: Validated Staging Pipeline & Test Matrix",
      },
      {
        stepNumber: "03",
        title: "Self-Hosted Deployment",
        description:
          "We provision and harden your private n8n instance on your chosen cloud (AWS, Hetzner, GCP, or DigitalOcean) with automated backups.",
        deliverable: "Deliverable: Production Container & SSL Configuration",
      },
      {
        stepNumber: "04",
        title: "Monitoring & Team Handoff",
        description:
          "We configure real-time error alerts to Slack or email, provide full operational documentation, and train your staff on management.",
        deliverable: "Deliverable: Operator Runbook & Dedicated Support Plan",
      },
    ],
  },

  pricing: {
    kicker: "INVESTMENT SPECIFICATION",
    title: "Predictable Infrastructure Costs",
    subtitle:
      "Transparent engineering packages for self-hosted n8n deployments. Zero per-execution penalties, fixed deliverables, and 100% data sovereignty.",
    tiers: [
      {
        id: "starter",
        name: "Starter Workflow Spec",
        glyph: "01",
        price: "$1,450",
        period: "flat engineering fee",
        description:
          "Targeted automation for small teams replacing costly Zapier or Make tasks with their own private cloud instance.",
        features: [
          "Private n8n cloud instance deployment (Hetzner / AWS / GCP)",
          "Up to 3 high-impact production workflows (Lead sync, CRM routing)",
          "Automated daily database snapshots & SSL certificates",
          "Slack & email incident notification channels",
          "Operator runbook & 14-day post-launch warranty",
        ],
        ctaLabel: "Deploy Starter Spec",
        isEnterprise: false,
      },
      {
        id: "standard",
        name: "Standard Operations Engine",
        glyph: "02",
        price: "$3,800",
        period: "flat engineering fee",
        description:
          "Comprehensive operational architecture synchronizing sales, billing, inventory, and internal ERP data without bottlenecks.",
        features: [
          "High-availability container deployment with automated healthchecks",
          "Up to 8 complex multi-stage workflows with error backoff retries",
          "Two-way database synchronization (PostgreSQL / MySQL / ERP)",
          "Custom webhook bridges for proprietary or legacy APIs",
          "Full dead-letter queue recovery mechanics",
          "Comprehensive staff handover & 30-day dedicated warranty",
        ],
        ctaLabel: "Deploy Standard Spec",
        isEnterprise: false,
      },
      {
        id: "enterprise",
        name: "Enterprise Sovereignty",
        glyph: "03",
        price: "Custom",
        period: "project or retainer spec",
        badge: "Recommended Schematic",
        description:
          "Dedicated automation infrastructure for high-throughput, regulated, or mission-critical enterprise environments.",
        features: [
          "Isolated VPC deployment with HIPAA / GDPR compliance hardening",
          "Unlimited custom workflow pipelines & microservice integrations",
          "Redis queue clustering & multi-worker distributed execution",
          "24/7 automated heartbeat monitoring & incident response SLA",
          "Assigned Senior Automation Architect & priority dispatch",
          "Quarterly node security patching & architecture optimization",
        ],
        ctaLabel: "Schedule Custom Spec",
        isEnterprise: true,
      },
    ],
  },

  services: {
    title: "Core automation services",
    subtitle:
      "Tailored workflow engines engineered on open-source n8n to connect every node in your business ecosystem.",
    servicesList: [
      {
        title: "Lead Routing & CRM Sync",
        description:
          "Instantly ingest incoming web inquiries, enrich company profiles via API, route to the right sales rep, and send instant Slack notifications.",
        tools: ["HubSpot", "Slack", "Clearbit"],
      },
      {
        title: "Automated Invoicing & Stripe Ops",
        description:
          "Generate itemized invoices on closed deals, reconcile transactions across accounting systems, and trigger automated dunning sequences.",
        tools: ["Stripe", "QuickBooks", "Xero"],
      },
      {
        title: "Customer & Employee Onboarding",
        description:
          "Auto-provision workspace accounts, assemble digital contract packets, create project templates, and send customized kickoff emails.",
        tools: ["Google Workspace", "Notion", "DocuSign"],
      },
      {
        title: "Two-Way Inventory & Database Sync",
        description:
          "Maintain unified real-time stock levels, catalog synchronization, and customer records across storefronts and central warehouses.",
        tools: ["PostgreSQL", "Shopify", "NetSuite"],
      },
      {
        title: "Executive Reporting & BI Dashboards",
        description:
          "Aggregate fragmented metrics across marketing, sales, and banking into consolidated morning digests and real-time alerting systems.",
        tools: ["PostgreSQL", "Slack", "Google Sheets"],
      },
      {
        title: "Custom API & Legacy Webhook Bridges",
        description:
          "Create reliable middleware adapters connecting proprietary in-house databases, legacy ERPs, and external partner APIs.",
        tools: ["REST API", "Docker", "Webhooks"],
      },
    ],
  },

  results: {
    title: "Proven operational impact",
    subtitle:
      "Measurable performance gains achieved by replacing manual processes with self-hosted workflow engines.",
    cases: [
      {
        industry: "B2B SaaS & Analytics",
        metric: "-82%",
        metricLabel: "Reduction in customer setup duration",
        description:
          "Automated the multi-step account provisioning, workspace generation, and CRM linkage that previously required 3 days of manual engineering time.",
      },
      {
        industry: "Logistics & Freight Brokerage",
        metric: "4,200",
        metricLabel: "Hours saved annually in dispatch operations",
        description:
          "Unified PDF rate confirmation parsing, driver SMS notifications, and load status updates across 14 freight carrier networks without human intervention.",
      },
      {
        industry: "Healthcare Technology",
        metric: "99.98%",
        metricLabel: "Sync precision with zero data leaks",
        description:
          "Deployed a HIPAA-compliant self-hosted n8n instance on private VPC infrastructure to synchronize sensitive patient records with complete audit trails.",
      },
    ],
  },

  testimonials: {
    title: "What operational leaders say",
    subtitle:
      "Feedback from founders and operations directors running their core infrastructure on our n8n workflows.",
    items: [
      {
        quote:
          "“n8n Orchestrate completely transformed how our operations function. We were burning $1,800/month on Zapier tier limits and constantly hitting execution ceilings. Our self-hosted n8n instance handles 4x the volume at a fraction of the cost with zero hiccups.”",
        author: "Marcus Vance",
        role: "VP of Operations, FreightFlow Systems",
      },
      {
        quote:
          "“The transparency of self-hosted workflows changed everything for our compliance team. Every transaction, webhook, and error log is hosted on our own cloud. Their engineering standards are exceptional.”",
        author: "Elena Rostova",
        role: "Chief Executive Officer, Strata Analytics",
      },
      {
        quote:
          "“Instead of hiring two additional administrative employees to manage order intake, n8n Orchestrate built a workflow that routes and reconciles thousands of monthly orders automatically. Flawless execution from day one.”",
        author: "David Lin",
        role: "Head of Infrastructure, Vantage Commerce",
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    subtitle:
      "Clear answers regarding self-hosting, architecture, security, and post-deployment workflow maintenance.",
    items: [
      {
        id: "faq-1",
        question: "Why should we choose self-hosted n8n over Zapier or Make?",
        answer:
          "Traditional automation SaaS platforms charge per task or execution, which penalizes your growth as volume expands. Self-hosted n8n runs on your own server (starting at ~$10/mo on Hetzner or AWS), meaning you can run millions of executions without price spikes. Crucially, your sensitive customer and financial data never passes through third-party servers.",
      },
      {
        id: "faq-2",
        question: "Where do the n8n workflows and servers physically live?",
        answer:
          "Your instance is deployed in your own private cloud infrastructure—AWS, GCP, Hetzner, DigitalOcean, or your on-premises servers. You retain 100% ownership, root credentials, database backups, and SSL certificates. We never host your instance on shared or opaque multi-tenant systems.",
      },
      {
        id: "faq-3",
        question: "How do your workflows handle downstream API errors or outages?",
        answer:
          "Every production workflow we design includes resilient error routing: exponential backoff retries, dead-letter queues, and automatic fallback actions. If an external service like HubSpot or Slack experiences downtime, the workflow holds the payload in queue and alerts your engineering channel without losing data.",
      },
      {
        id: "faq-4",
        question: "What does support and maintenance look like after the handoff?",
        answer:
          "Every project concludes with an operational runbook and recorded team walkthrough. We also offer monthly retainer packages covering version updates, database pruning, uptime monitoring, and ongoing workflow expansion as your business requirements evolve.",
      },
      {
        id: "faq-5",
        question: "Can you connect with internal databases or legacy proprietary systems?",
        answer:
          "Yes. Because n8n supports custom JavaScript nodes, Docker network access, direct PostgreSQL/MySQL drivers, and arbitrary REST/GraphQL webhooks, we can build bridges between modern cloud services and legacy on-premise ERPs or custom databases without limitations.",
      },
    ],
  },

  ctaSection: {
    title: "Ready to automate your operational bottlenecks?",
    description:
      "Book an architecture review with our lead automation engineer. We will dissect your current manual handoffs and present a clean technical blueprint for your self-hosted system.",
    primaryCta: {
      label: "Book Your Audit",
      href: "#contact",
    },
    secondaryCta: {
      label: "View Service Catalog",
      href: "#services",
    },
  },

  auditModal: {
    title: "Get started with a free audit",
    subtitle: "Fill in your details below and our lead engineer will prepare an automated architecture roadmap for your team.",
    fields: {
      name: {
        label: "Name",
        placeholder: "Enter your Name",
      },
      email: {
        label: "Email",
        placeholder: "Enter your @gmail.com address",
      },
      idNumber: {
        label: "Number",
        placeholder: "Enter number (max 10 digits)",
      },
      message: {
        label: "Message",
        placeholder: "Enter your message",
      },
      terms: "I accept the Terms of Service & Privacy Policy",
    },
    submitLabel: "Submit your request",
    cancelLabel: "Cancel",
    successTitle: "Request Submitted!",
    successMessage: "Thank you for reaching out. We have received your details and our workflow automation architect will review your stack and contact you within 24 hours.",
    closeLabel: "Done",
  },

  footer: {
    blurb:
      "n8n Orchestrate engineers robust, private n8n workflow systems for growing businesses. Self-hosted on your cloud. Zero per-execution tax. Complete data sovereignty.",
    columns: [
      {
        heading: "SYSTEMS & SERVICES",
        links: [
          { label: "CRM & Lead Pipelines", href: "#services" },
          { label: "Stripe & Invoicing", href: "#services" },
          { label: "Inventory & ERP Sync", href: "#services" },
          { label: "Executive Reporting", href: "#services" },
          { label: "Legacy API Bridges", href: "#services" },
        ],
      },
      {
        heading: "AGENCY & PROCESS",
        links: [
          { label: "Engineering Methodology", href: "#process" },
          { label: "Client Case Studies", href: "#results" },
          { label: "Technical FAQ", href: "#faq" },
          { label: "Security & Sovereignty", href: "#process" },
          { label: "Contact Engineering", href: "#contact" },
        ],
      },
    ],
    socialLinks: [
      { label: "GitHub", href: "https://github.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "n8n Community", href: "https://community.n8n.io" },
    ],
    legalLine: "© 2026 n8n Orchestrate Inc. All rights reserved. Engineering schematic layout.",
    statusText: "All Systems Operational // 99.98% uptime",
  },
};
