import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Car,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Database,
  FileCheck2,
  GitBranch,
  Globe2,
  Grip,
  HeartPulse,
  Link2,
  LockKeyhole,
  Mail,
  Map,
  Menu,
  MessageSquareText,
  MousePointer2,
  Phone,
  Settings,
  ShieldCheck,
  Star,
  Target,
  UserCheck,
  Users,
  Workflow,
  X as XIcon,
  Zap,
} from "lucide-react";
import heroSystemImage from "./assets/hero.png";
import xizoLogoSrc from "./assets/xizo-logo-white.png";
import { industries, storyChapters } from "./xizoData";

// ── Icon maps ────────────────────────────────────────────────────────────────

const industryIcons = {
  "real-estate": Building2,
  healthcare: HeartPulse,
  "professional-services": BriefcaseBusiness,
  "finance-insurance": ShieldCheck,
  automotive: Car,
};

const agentIcons = {
  "Lead Management": MessageSquareText,
  Sales: Target,
  "Property Intelligence": Database,
  Appointments: CalendarClock,
  Transactions: FileCheck2,
  "Transaction Management": ClipboardList,
  "Patient Access": HeartPulse,
  Registration: ClipboardList,
  "Clinical Support": UserCheck,
  Operations: CalendarClock,
  "Revenue Operations": CircleDollarSign,
  "Patient Engagement": MessageSquareText,
  Meetings: BrainCircuit,
  "Sales Automation": FileCheck2,
  Delivery: Workflow,
  Finance: CircleDollarSign,
  "Customer Service": MessageSquareText,
  Onboarding: UserCheck,
  "Document Intelligence": FileCheck2,
  Risk: ShieldCheck,
  Insurance: ShieldCheck,
  Governance: LockKeyhole,
  Inventory: Database,
  Service: ClipboardList,
};

// ── XIZO Logo ────────────────────────────────────────────────────────────
// White-on-transparent PNG — placed directly on dark nav/footer, no CSS tricks.

function XizoLogo({ className = "" }) {
  return (
    <img
      src={xizoLogoSrc}
      alt="Xizo"
      className={`xizo-logo ${className}`}
    />
  );
}

// ── Router ───────────────────────────────────────────────────────────────────

function getInitialRoute() {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("industry/")) {
    const industryId = hash.split("/")[1];
    if (industries.some((i) => i.id === industryId))
      return { page: "industry", industryId };
  }
  const knownPages = ["agents", "pricing", "about", "contact"];
  if (knownPages.includes(hash)) return { page: hash, industryId: industries[0].id };
  return { page: "home", industryId: industries[0].id };
}

// ── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const selectedIndustry = useMemo(
    () => industries.find((i) => i.id === route.industryId) ?? industries[0],
    [route.industryId]
  );

  const navigate = useCallback(
    (page, industryId = route.industryId) => {
      const nextHash =
        page === "home" ? "" : page === "industry" ? `industry/${industryId}` : page;
      window.history.pushState(null, "", nextHash ? `#${nextHash}` : window.location.pathname);
      setRoute({ page, industryId });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [route.industryId]
  );

  useEffect(() => {
    const onPopState = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <main className="app-shell" style={{ "--industry-accent": selectedIndustry.accent }}>
      <SiteNav route={route} navigate={navigate} />
      {route.page === "home" && <HomePage navigate={navigate} />}
      {route.page === "agents" && <AgentsPage navigate={navigate} />}
      {route.page === "industry" && (
        <IndustryPage industry={selectedIndustry} navigate={navigate} />
      )}
      {route.page === "pricing" && <PricingPage navigate={navigate} />}
      {route.page === "about" && <AboutPage navigate={navigate} />}
      {route.page === "contact" && <ContactPage />}
      <SiteFooter navigate={navigate} />
    </main>
  );
}

// ── SiteNav ──────────────────────────────────────────────────────────────────

const platformLinks = [
  { icon: BrainCircuit, label: "AI Orchestrator", desc: "Central intelligence layer" },
  { icon: Workflow, label: "Workflow Canvas", desc: "Visual drag-and-drop builder" },
  { icon: Settings, label: "Agent Builder", desc: "Configure and deploy agents" },
  { icon: Database, label: "Knowledge Base", desc: "Structured business context" },
  { icon: LockKeyhole, label: "Human Approval", desc: "Control high-impact actions" },
  { icon: BarChart3, label: "Analytics", desc: "Operational dashboards and KPIs" },
  { icon: ShieldCheck, label: "Security", desc: "Audit logs and role controls" },
  { icon: Globe2, label: "Integrations", desc: "CRM, email, calendar and more" },
];

function SiteNav({ route, navigate }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleDropdown = (name) => setOpenDropdown((p) => (p === name ? null : name));

  const navClick = (page, industryId) => {
    navigate(page, industryId);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className="site-nav" ref={navRef}>
      <button
        className="brand-button"
        type="button"
        onClick={() => navClick("home")}
        aria-label="Xizo home"
      >
        <XizoLogo className="nav-logo" />
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {/* Platform dropdown */}
        <div className="nav-dropdown-wrap">
          <button
            className={`nav-link ${openDropdown === "platform" ? "active" : ""}`}
            type="button"
            onClick={() => toggleDropdown("platform")}
          >
            Platform
            <ChevronDown size={14} className={openDropdown === "platform" ? "rotated" : ""} />
          </button>
          {openDropdown === "platform" && (
            <div className="nav-dropdown platform-dropdown">
              <div className="dropdown-header">
                <strong>Xizo Platform</strong>
                <span>The complete agentic OS for business</span>
              </div>
              <div className="dropdown-grid">
                {platformLinks.map(({ icon: Icon, label, desc }) => (
                  <button
                    key={label}
                    className="dropdown-item"
                    type="button"
                    onClick={() => navClick("agents")}
                  >
                    <span className="dropdown-icon">
                      <Icon size={16} />
                    </span>
                    <span>
                      <strong>{label}</strong>
                      <small>{desc}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Industries dropdown */}
        <div className="nav-dropdown-wrap">
          <button
            className={`nav-link ${route.page === "industry" || openDropdown === "industries" ? "active" : ""}`}
            type="button"
            onClick={() => toggleDropdown("industries")}
          >
            Industries
            <ChevronDown size={14} className={openDropdown === "industries" ? "rotated" : ""} />
          </button>
          {openDropdown === "industries" && (
            <div className="nav-dropdown industries-dropdown">
              {industries.map((ind) => {
                const Icon = industryIcons[ind.id] ?? Building2;
                return (
                  <button
                    key={ind.id}
                    className="dropdown-item industry-item"
                    type="button"
                    onClick={() => navClick("industry", ind.id)}
                    style={{ "--item-accent": ind.accent }}
                  >
                    <span className="dropdown-icon" style={{ background: ind.accent }}>
                      <Icon size={16} />
                    </span>
                    <span>
                      <strong>{ind.name}</strong>
                      <small>{ind.shortName}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          className={`nav-link ${route.page === "agents" ? "active" : ""}`}
          type="button"
          onClick={() => navClick("agents")}
        >
          AI Agents
        </button>
        <button
          className={`nav-link ${route.page === "pricing" ? "active" : ""}`}
          type="button"
          onClick={() => navClick("pricing")}
        >
          Pricing
        </button>
        <button
          className={`nav-link ${route.page === "about" ? "active" : ""}`}
          type="button"
          onClick={() => navClick("about")}
        >
          About
        </button>
      </nav>

      <div className="nav-right">
        <button
          className="nav-link nav-contact-link"
          type="button"
          onClick={() => navClick("contact")}
        >
          Contact
        </button>
        <button className="primary-btn" type="button" onClick={() => navClick("contact")}>
          Book a Demo <ArrowRight size={15} />
        </button>
        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          <button className="mobile-nav-link" type="button" onClick={() => navClick("home")}>Home</button>
          <button className="mobile-nav-link" type="button" onClick={() => navClick("agents")}>AI Agents</button>
          <div className="mobile-nav-section">
            <span>Industries</span>
            {industries.map((ind) => (
              <button
                key={ind.id}
                className="mobile-nav-link indent"
                type="button"
                onClick={() => navClick("industry", ind.id)}
              >
                {ind.name}
              </button>
            ))}
          </div>
          <button className="mobile-nav-link" type="button" onClick={() => navClick("pricing")}>Pricing</button>
          <button className="mobile-nav-link" type="button" onClick={() => navClick("about")}>About</button>
          <button className="mobile-nav-link" type="button" onClick={() => navClick("contact")}>Contact</button>
          <button
            className="primary-btn mobile-cta"
            type="button"
            onClick={() => navClick("contact")}
          >
            Book a Demo <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

// ── HomePage ─────────────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      <TrustStrip />
      <IndustrySelectorSection navigate={navigate} />
      <PlatformSection navigate={navigate} />
      <IntegrationsSection />
      <HumanApprovalSection />
      <MetricsSection />
      <StorySection />
      <CTABanner navigate={navigate} />
    </>
  );
}

// Hero
function HeroSection({ navigate }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Agentic OS for Business</p>
        <h1>
          Build your{" "}
          <span className="hero-accent">Agentic OS</span>{" "}
          for Business.
        </h1>
        <p>
          Xizo turns your business workflows into an AI operating system — agents that act,
          orchestrators that coordinate, humans that approve. All visible, all auditable.
        </p>
        <div className="button-row">
          <button className="primary-btn large" type="button" onClick={() => navigate("contact")}>
            Build Your OS <ArrowRight size={18} />
          </button>
          <button className="secondary-btn large" type="button" onClick={() => navigate("agents")}>
            Explore Industries <Map size={18} />
          </button>
        </div>
        <div className="hero-trust">
          <BadgeCheck size={14} />
          <span>Human approval at every critical step</span>
          <span className="trust-dot" />
          <LockKeyhole size={14} />
          <span>Full audit trail</span>
          <span className="trust-dot" />
          <ShieldCheck size={14} />
          <span>Enterprise security</span>
        </div>
      </div>
      <div className="hero-board" aria-label="Xizo command center preview">
        <div className="board-header">
          <div>
            <span>Live workflow</span>
            <strong>Lead to human-approved action</strong>
          </div>
          <span className="live-chip">● Operational</span>
        </div>
        <div className="board-stage">
          <img className="hero-system-asset" src={heroSystemImage} alt="Xizo operating system visual" />
          <div className="board-flow" aria-hidden="true">
            {["Request", "Agent", "Tools", "Approval", "Outcome"].map((item, index) => (
              <div className="flow-tile" key={item} style={{ "--i": index }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="approval-preview">
          <LockKeyhole size={18} aria-hidden="true" />
          <div>
            <strong>Human approval required</strong>
            <p>High-impact actions include context, rationale, and audit trail.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Static Capability Strip
const capabilityItems = [
  "CRM Integration", "WhatsApp AI", "Voice Agents", "EHR / EMR Sync",
  "Document AI", "Finance Systems", "Email Automation", "Calendar Intelligence",
  "Approval Workflows", "Real-Time Analytics", "Lead Management", "Agent Orchestration",
  "Human-in-the-Loop", "Audit Trail", "Workflow Canvas", "Knowledge Engine",
];

function TrustStrip() {
  const row1 = capabilityItems.slice(0, 8);
  const row2 = capabilityItems.slice(8);
  return (
    <div className="capability-strip">
      {[row1, row2].map((row, ri) => (
        <div key={ri} className="capability-row">
          {row.map((item, i) => (
            <span key={item} className="capability-item">
              {i > 0 && <span className="capability-sep" aria-hidden="true" />}
              <span className="capability-dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Industry Selector
function IndustrySelectorSection({ navigate }) {
  return (
    <section className="home-section industries-section">
      <div className="section-inner">
        <div className="section-heading centered">
          <p className="eyebrow">5 Industry Operating Systems</p>
          <h2>Choose your business. See your AI workforce.</h2>
          <p className="body-copy">
            Each industry OS comes pre-loaded with purpose-built agents, workflows, approval
            rules, and integrations specific to that vertical.
          </p>
        </div>
        <div className="industry-selector-grid">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.id] ?? Building2;
            return (
              <button
                key={industry.id}
                className="industry-selector-card"
                type="button"
                onClick={() => navigate("industry", industry.id)}
                style={{ "--card-accent": industry.accent }}
              >
                <div className="isc-top">
                  <span className="isc-icon">
                    <Icon size={22} />
                  </span>
                  <span className="isc-tag">{industry.agents.length} agents</span>
                </div>
                <strong>{industry.name}</strong>
                <small>{industry.headline}</small>
                <div className="isc-metrics">
                  {industry.metrics.slice(0, 2).map(([label, value]) => (
                    <div key={label} className="isc-metric">
                      <span>{value}</span>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>
                <div className="isc-footer">
                  Explore OS <ChevronRight size={15} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Platform Section
const platformFeatures = [
  {
    icon: BrainCircuit,
    title: "AI Orchestrator",
    desc: "Central intelligence that receives intent, assigns the right agent, coordinates handoffs, and keeps workflows moving without manual intervention.",
  },
  {
    icon: Workflow,
    title: "Workflow Canvas",
    desc: "A visual, drag-and-drop canvas where every agent, decision, and output is visible. Move nodes, inspect connections, see the OS in motion.",
  },
  {
    icon: LockKeyhole,
    title: "Human Approval Layer",
    desc: "Every high-impact action — contracts, financial decisions, patient routing — requires explicit human authorization with full context attached.",
  },
  {
    icon: Database,
    title: "Knowledge Engine",
    desc: "Structured business context — policies, playbooks, products, pricing, rules — that agents consult before acting on any request.",
  },
  {
    icon: Globe2,
    title: "Integration Hub",
    desc: "Connects to CRM, WhatsApp, email, calendar, EHR, finance systems, and document platforms. No custom engineering required.",
  },
  {
    icon: BarChart3,
    title: "Operational Analytics",
    desc: "Real-time dashboards showing agent activity, workflow stage, approval queue depth, and measurable business outcome metrics.",
  },
];

function PlatformSection({ navigate }) {
  return (
    <section className="home-section platform-section">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Product Architecture</p>
          <h2>Not a chatbot. An operating system.</h2>
          <p className="body-copy">
            Xizo sits above your existing tools. It watches requests, understands intent,
            assigns agents, moves data between systems, and asks humans for approval when
            judgment matters.
          </p>
        </div>
        <div className="platform-grid">
          {platformFeatures.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="platform-card">
              <span className="platform-icon">
                <Icon size={21} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div className="platform-cta">
          <button className="secondary-btn" type="button" onClick={() => navigate("agents")}>
            See the Platform in Action <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// Integrations Section
const integrationItems = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "WhatsApp", category: "Messaging" },
  { name: "Gmail", category: "Email" },
  { name: "Outlook", category: "Email" },
  { name: "Google Calendar", category: "Calendar" },
  { name: "Calendly", category: "Scheduling" },
  { name: "Twilio", category: "Voice & SMS" },
  { name: "DocuSign", category: "Documents" },
  { name: "QuickBooks", category: "Finance" },
  { name: "Xero", category: "Finance" },
  { name: "Epic EHR", category: "Healthcare" },
  { name: "Zoho CRM", category: "CRM" },
  { name: "Slack", category: "Comms" },
  { name: "Notion", category: "Knowledge" },
  { name: "Zapier", category: "Automation" },
];

function IntegrationsSection() {
  return (
    <section className="home-section integrations-section">
      <div className="section-inner">
        <div className="section-heading centered">
          <p className="eyebrow">Integration Hub</p>
          <h2>Connects to every system your business already uses.</h2>
          <p className="body-copy">
            Xizo plugs into your CRM, communication tools, calendar, EHR, finance systems,
            and document platforms — out of the box, no custom engineering required.
          </p>
        </div>
        <div className="integrations-grid">
          {integrationItems.map(({ name, category }) => (
            <div key={name} className="integration-chip">
              <span className="integration-dot" />
              <div>
                <strong>{name}</strong>
                <small>{category}</small>
              </div>
            </div>
          ))}
        </div>
        <p className="integrations-note">
          <Link2 size={14} />
          50+ integrations available. Custom connections via open API.
        </p>
      </div>
    </section>
  );
}

// Human Approval Section
const approvalItems = [
  {
    agent: "Lead Qualification Agent",
    action: "Send proposal to enterprise lead — Rs 28L deal value",
    risk: "High",
    status: "awaiting",
  },
  {
    agent: "Document Processor",
    action: "Flag missing KYC documents and pause onboarding",
    risk: "Medium",
    status: "approved",
  },
  {
    agent: "Finance Application Agent",
    action: "Route loan application to senior underwriter",
    risk: "High",
    status: "awaiting",
  },
];

function HumanApprovalSection() {
  return (
    <section className="home-section approval-section">
      <div className="section-inner split-section">
        <div className="split-copy">
          <p className="eyebrow">Human-in-the-Loop</p>
          <h2>Agents act. Humans approve. Everything is auditable.</h2>
          <p className="body-copy">
            Xizo never takes high-impact actions without authorization. Every approval request
            includes the full reasoning chain, inputs used, outputs proposed, and regulatory
            context — so your team can decide with confidence.
          </p>
          <ul className="approval-benefits">
            {[
              "Full context attached to every approval",
              "Complete audit trail for every decision",
              "Role-based approval authority",
              "Escalation rules for urgency levels",
              "One-click approve or reject with log",
            ].map((item) => (
              <li key={item}>
                <BadgeCheck size={15} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="approval-queue-preview">
          <div className="aq-header">
            <strong>Approval Queue</strong>
            <span className="live-chip">2 pending</span>
          </div>
          {approvalItems.map((item, i) => (
            <div key={i} className={`aq-item ${item.status}`}>
              <div className="aq-item-top">
                <span className="aq-agent">{item.agent}</span>
                <span className={`risk-badge risk-${item.risk.toLowerCase()}`}>{item.risk}</span>
              </div>
              <p className="aq-action">{item.action}</p>
              {item.status === "awaiting" ? (
                <div className="aq-actions">
                  <button className="aq-approve" type="button">Approve</button>
                  <button className="aq-reject" type="button">Reject</button>
                </div>
              ) : (
                <div className="aq-approved-badge">
                  <Check size={13} /> Approved
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Metrics Section
const metricsData = [
  { value: "5", label: "Industry Operating Systems" },
  { value: "30+", label: "Purpose-Built AI Agents" },
  { value: "100%", label: "Human-Approved Critical Actions" },
  { value: "∞", label: "Audit Trail Retention" },
];

function MetricsSection() {
  return (
    <section className="metrics-section">
      <div className="section-inner">
        <div className="metrics-grid">
          {metricsData.map(({ value, label }) => (
            <div key={label} className="metric-card">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Story Section
function StorySection() {
  return (
    <section className="home-section story-section">
      <div className="section-inner">
        <div className="section-heading centered">
          <p className="eyebrow">Brand Identity</p>
          <h2>The Xizo Story</h2>
        </div>
        <div className="story-grid">
          {storyChapters.map((chapter, index) => (
            <article className="story-card" key={chapter.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Banner
function CTABanner({ navigate }) {
  return (
    <section className="cta-banner">
      <div className="section-inner cta-inner">
        <div className="cta-copy">
          <p className="eyebrow">Ready to build?</p>
          <h2>Start building your Agentic OS today.</h2>
          <p>
            Join businesses across real estate, healthcare, finance, and professional services
            who are replacing disconnected tools with a unified AI workforce.
          </p>
        </div>
        <div className="cta-actions">
          <button className="primary-btn large" type="button" onClick={() => navigate("contact")}>
            Book a Demo <ArrowRight size={18} />
          </button>
          <button className="secondary-btn large" type="button" onClick={() => navigate("pricing")}>
            View Pricing <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── AgentsPage ───────────────────────────────────────────────────────────────

function AgentsPage({ navigate }) {
  return (
    <section className="page-section">
      <div className="section-heading wide">
        <p className="eyebrow">AI Agents</p>
        <h1>Choose an industry. Explore your AI operating system.</h1>
        <p className="body-copy">
          Every industry OS includes purpose-built agents, a movable workflow canvas, a mind
          map explaining each agent's logic, and human approval controls built in.
        </p>
      </div>
      <div className="industry-card-grid">
        {industries.map((industry) => {
          const Icon = industryIcons[industry.id] ?? Building2;
          return (
            <button
              className="industry-card"
              key={industry.id}
              type="button"
              onClick={() => navigate("industry", industry.id)}
              style={{ "--card-accent": industry.accent }}
            >
              <span className="industry-icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="industry-card-copy">
                <strong>{industry.shortName}</strong>
                <small>{industry.headline}</small>
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── IndustryPage ─────────────────────────────────────────────────────────────

function IndustryPage({ industry, navigate }) {
  const [selectedAgentId, setSelectedAgentId] = useState(industry.agents[0].id);
  const [positionsByIndustry, setPositionsByIndustry] = useState(() =>
    Object.fromEntries(
      industries.map((item) => [
        item.id,
        Object.fromEntries(item.agents.map((a) => [a.id, a.position])),
      ])
    )
  );

  const firstAgentId = industry.agents[0].id;
  useEffect(() => { setSelectedAgentId(firstAgentId); }, [industry.id, firstAgentId]);

  const positions = positionsByIndustry[industry.id];
  const selectedAgent = industry.agents.find((a) => a.id === selectedAgentId) ?? industry.agents[0];

  const updateNode = useCallback(
    (agentId, nextPosition) => {
      setPositionsByIndustry((c) => ({
        ...c,
        [industry.id]: { ...c[industry.id], [agentId]: nextPosition },
      }));
    },
    [industry.id]
  );

  const resetLayout = useCallback(() => {
    setPositionsByIndustry((c) => ({
      ...c,
      [industry.id]: Object.fromEntries(industry.agents.map((a) => [a.id, a.position])),
    }));
  }, [industry]);

  return (
    <section className="industry-page" style={{ "--industry-accent": industry.accent }}>
      <div className="industry-hero">
        <div>
          <button className="text-btn" type="button" onClick={() => navigate("agents")}>
            <ArrowRight className="rotate-180" size={16} aria-hidden="true" />
            Back to AI Agents
          </button>
          <p className="eyebrow">{industry.shortName}</p>
          <h1>{industry.headline}</h1>
          <p>{industry.story}</p>
          <button
            className="primary-btn"
            type="button"
            onClick={() => navigate("contact")}
            style={{ marginTop: 24 }}
          >
            Build this OS <ArrowRight size={16} />
          </button>
        </div>
        <div className="metric-stack" aria-label={`${industry.name} metrics`}>
          {industry.metrics.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="problem-solution">
        <article>
          <p className="eyebrow">Problem</p>
          <h2>What this OS solves</h2>
          <p>{industry.problem}</p>
        </article>
        <article>
          <p className="eyebrow">Principle</p>
          <h2>{industry.promise}</h2>
          <div className="workflow-strip">
            {industry.workflow.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </article>
      </div>

      <div className="os-workspace">
        <DraggableCanvas
          industry={industry}
          positions={positions}
          selectedAgentId={selectedAgent.id}
          onSelect={setSelectedAgentId}
          onMove={updateNode}
          onReset={resetLayout}
        />
        <AgentPanel agent={selectedAgent} />
      </div>

      <div className="bottom-grid">
        <MindMap agent={selectedAgent} />
        <AgentList industry={industry} selectedAgentId={selectedAgent.id} onSelect={setSelectedAgentId} />
      </div>

      <div className="industry-cta-band">
        <div>
          <h2>Build the {industry.name} OS for your business.</h2>
          <p>
            Get a customised demonstration of how Xizo deploys agents, workflows, and approval
            controls for {industry.name.toLowerCase()} operations.
          </p>
        </div>
        <button className="primary-btn large" type="button" onClick={() => navigate("contact")}>
          Book a Demo <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

// ── DraggableCanvas ──────────────────────────────────────────────────────────

function DraggableCanvas({ industry, positions, selectedAgentId, onSelect, onMove, onReset }) {
  const canvasRef = useRef(null);
  const dragRef = useRef(null);

  const startDrag = (event, agent) => {
    if (!canvasRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = canvasRef.current.getBoundingClientRect();
    const current = positions[agent.id];
    dragRef.current = {
      agentId: agent.id,
      offsetX: event.clientX - rect.left - current.x,
      offsetY: event.clientY - rect.top - current.y,
    };
    onSelect(agent.id);
  };

  const moveDrag = (event) => {
    if (!dragRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left - dragRef.current.offsetX, 74, rect.width - 74);
    const y = clamp(event.clientY - rect.top - dragRef.current.offsetY, 66, rect.height - 66);
    onMove(dragRef.current.agentId, { x, y });
  };

  const endDrag = () => { dragRef.current = null; };

  const agents = industry.agents;

  return (
    <section className="canvas-panel" aria-label={`${industry.name} movable workflow canvas`}>
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Miro-style canvas</p>
          <h2>Move nodes. Select an agent. Watch the mind map update.</h2>
        </div>
        <div className="canvas-actions">
          <span className="hint-chip">
            <MousePointer2 size={16} aria-hidden="true" /> Drag nodes
          </span>
          <button className="reset-btn" type="button" onClick={onReset}>Reset layout</button>
        </div>
      </div>
      <div className="canvas" ref={canvasRef} id="canvas">
        <svg className="canvas-links" aria-hidden="true">
          {agents.slice(0, -1).map((agent, index) => {
            const from = positions[agent.id];
            const to = positions[agents[index + 1].id];
            return (
              <path
                key={`${agent.id}-${agents[index + 1].id}`}
                d={`M ${from.x + 76} ${from.y + 31} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x + 76} ${to.y + 31}`}
              />
            );
          })}
        </svg>
        {agents.map((agent) => {
          const Icon = agentIcons[agent.category] ?? Bot;
          const active = agent.id === selectedAgentId;
          const position = positions[agent.id];
          return (
            <button
              className={`canvas-node ${active ? "active" : ""}`}
              key={agent.id}
              type="button"
              style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
              onPointerDown={(e) => startDrag(e, agent)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <span><Icon size={17} aria-hidden="true" /></span>
              <strong>{agent.name}</strong>
              <small>{agent.category}</small>
              <Grip className="node-grip" size={15} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── AgentPanel ───────────────────────────────────────────────────────────────

function AgentPanel({ agent }) {
  const Icon = agentIcons[agent.category] ?? Bot;
  return (
    <aside className="agent-panel-card" aria-label="Selected agent explanation">
      <div className="agent-title">
        <span><Icon size={21} aria-hidden="true" /></span>
        <div>
          <p>{agent.category}</p>
          <h2>{agent.name}</h2>
        </div>
      </div>
      <div className="explanation-block">
        <h3>Problem this agent solves</h3>
        <p>{agent.problem}</p>
      </div>
      <div className="explanation-block">
        <h3>Xizo solution</h3>
        <p>{agent.solution}</p>
      </div>
      <div className="io-grid">
        <MiniList title="Inputs" items={agent.inputs} icon={Database} />
        <MiniList title="Outputs" items={agent.outputs} icon={BadgeCheck} />
      </div>
      <MiniList title="Connected tools" items={agent.tools} icon={Link2} />
      <div className="approval-note">
        <LockKeyhole size={18} aria-hidden="true" />
        <span>Sensitive or high-impact actions require human approval before execution.</span>
      </div>
    </aside>
  );
}

// ── MiniList ─────────────────────────────────────────────────────────────────

function MiniList({ title, items, icon: Icon }) {
  return (
    <div className="mini-list">
      <h3><Icon size={16} aria-hidden="true" />{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

// ── MindMap ──────────────────────────────────────────────────────────────────

function MindMap({ agent }) {
  return (
    <section className="mindmap-panel" aria-label={`${agent.name} mind map`}>
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Mind map</p>
          <h2>{agent.name} operating logic</h2>
        </div>
        <span className="hint-chip">
          <GitBranch size={16} aria-hidden="true" /> Live from selected node
        </span>
      </div>
      <div className="mindmap">
        <svg className="mindmap-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 24 L50 41" />
          <path d="M28 50 L41 50" />
          <path d="M59 50 L72 50" />
          <path d="M50 59 L50 76" />
        </svg>
        <div className="mind-center">
          <Bot size={22} aria-hidden="true" />
          <strong>{agent.name}</strong>
        </div>
        <MindBranch className="branch-inputs" title="Inputs" items={agent.inputs.slice(0, 3)} />
        <MindBranch className="branch-tools" title="Tools" items={agent.tools.slice(0, 3)} />
        <MindBranch className="branch-solution" title="Thinking" items={["Understand", "Decide", "Route"]} />
        <MindBranch className="branch-outputs" title="Outputs" items={agent.outputs.slice(0, 3)} />
      </div>
    </section>
  );
}

function MindBranch({ className, title, items }) {
  return (
    <div className={`mind-branch ${className}`}>
      <strong>{title}</strong>
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

// ── AgentList ─────────────────────────────────────────────────────────────────

function AgentList({ industry, selectedAgentId, onSelect }) {
  return (
    <section className="agent-directory" aria-label={`${industry.name} agent directory`}>
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">AI workforce</p>
          <h2>Agents in this operating system</h2>
        </div>
      </div>
      <div className="agent-list">
        {industry.agents.map((agent) => {
          const Icon = agentIcons[agent.category] ?? Bot;
          return (
            <button
              key={agent.id}
              className={agent.id === selectedAgentId ? "selected" : ""}
              type="button"
              onClick={() => onSelect(agent.id)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>
                <strong>{agent.name}</strong>
                <small>{agent.problem}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── PricingPage ───────────────────────────────────────────────────────────────

const pricingPlans = [
  {
    name: "Starter",
    price: "₹9,999",
    period: "/month",
    desc: "For small teams exploring AI automation in their first workflow.",
    features: [
      "Up to 3 AI agents",
      "1 industry OS",
      "Workflow canvas (view-only)",
      "Email & WhatsApp integration",
      "Human approval queue",
      "Audit trail (30 days)",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹29,999",
    period: "/month",
    desc: "For growing businesses running multiple workflows across one industry.",
    features: [
      "Up to 15 AI agents",
      "Up to 3 industry OS",
      "Full workflow canvas with drag & drop",
      "All 50+ integrations included",
      "Human approval + escalation rules",
      "Mind map and agent explorer",
      "Real-time analytics dashboard",
      "Audit trail (1 year)",
      "Priority support",
    ],
    cta: "Book a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations deploying Xizo across departments, teams, and industries.",
    features: [
      "Unlimited AI agents",
      "All 5 industry OS",
      "Custom workflow builder",
      "Custom integrations via API",
      "Role-based approval authority",
      "Dedicated success manager",
      "SLA & compliance support",
      "Unlimited audit trail",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function PricingPage({ navigate }) {
  return (
    <section className="page-section pricing-page">
      <div className="section-heading wide centered">
        <p className="eyebrow">Pricing</p>
        <h1>Simple, transparent pricing.</h1>
        <p className="body-copy">
          Choose the plan that fits your team size and operational complexity. All plans
          include human approval workflows and complete audit trails.
        </p>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.highlighted ? "highlighted" : ""}`}>
            {plan.highlighted && (
              <div className="pricing-popular">
                <Star size={13} /> Most Popular
              </div>
            )}
            <div className="pricing-header">
              <strong>{plan.name}</strong>
              <div className="pricing-price">
                <span>{plan.price}</span>
                {plan.period && <small>{plan.period}</small>}
              </div>
              <p>{plan.desc}</p>
            </div>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check size={14} /> {f}
                </li>
              ))}
            </ul>
            <button
              className={plan.highlighted ? "primary-btn" : "secondary-btn"}
              type="button"
              onClick={() => navigate("contact")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {plan.cta} <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
      <div className="pricing-note">
        <ShieldCheck size={15} />
        All plans include a 14-day free trial. No credit card required. Cancel anytime.
      </div>
    </section>
  );
}

// ── AboutPage ─────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Users,
    title: "Humans remain in control",
    desc: "AI handles the workflow. Humans handle the judgment. Every high-impact action requires explicit authorization.",
  },
  {
    icon: BadgeCheck,
    title: "Visible, not black-box",
    desc: "Every agent has a clear responsibility, a visible workflow position, and a complete audit trail.",
  },
  {
    icon: Zap,
    title: "Speed without chaos",
    desc: "Businesses should not have to choose between fast and safe. Xizo delivers both at once.",
  },
  {
    icon: Globe2,
    title: "Built for every industry",
    desc: "Not generic AI. Purpose-built operating systems for real estate, healthcare, finance, services, and automotive.",
  },
];

function AboutPage({ navigate }) {
  return (
    <>
      {/* Intro — constrained width */}
      <div className="about-intro">
        <div className="section-inner">
          <p className="eyebrow">About Xizo</p>
          <h1>Building the operating system for the AI-native business.</h1>
          <p className="body-copy">
            Xizo was built on a simple observation: every business already has the tools. What
            they lack is the operating layer that connects them, coordinates the work between
            them, and keeps humans in control of every important decision.
          </p>
        </div>
      </div>

      {/* Mission — full-width dark band */}
      <section className="about-mission-band">
        <div className="section-inner about-mission">
          <div className="about-mission-copy">
            <p className="eyebrow">Our Mission</p>
            <h2>Make every business AI-capable without losing human judgment.</h2>
            <p>
              We believe AI should augment human teams, not replace them. The future of business
              is not autonomous AI — it is a well-orchestrated partnership between AI agents that
              handle volume and humans who handle value.
            </p>
            <p>
              Xizo is the infrastructure that makes that partnership possible — across any
              industry, any workflow, any team size.
            </p>
            <button className="primary-btn" type="button" onClick={() => navigate("contact")}>
              Get in Touch <ArrowRight size={16} />
            </button>
          </div>
          <div className="about-stats">
            {[
              ["5", "Industry OS built"],
              ["30+", "Purpose-built agents"],
              ["100%", "Human-controlled decisions"],
              ["∞", "Audit trail coverage"],
            ].map(([value, label]) => (
              <div key={label} className="about-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values + Story — constrained width */}
      <section className="page-section about-content">
        <div className="about-values">
          <div className="section-heading centered" style={{ marginBottom: 36 }}>
            <p className="eyebrow">Our Values</p>
            <h2>What Xizo stands for.</h2>
          </div>
          <div className="values-grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="value-card">
                <span className="value-icon"><Icon size={21} /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-story">
          <div className="section-heading centered" style={{ marginBottom: 36 }}>
            <p className="eyebrow">The Xizo Story</p>
            <h2>Why we built this.</h2>
          </div>
          <div className="story-grid">
            {storyChapters.map((chapter, index) => (
              <article className="story-card" key={chapter.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-width dark band */}
      <CTABanner navigate={navigate} />
    </>
  );
}

// ── ContactPage ───────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", industry: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="page-section contact-page">
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Book a Demo</p>
          <h1>Let's build your Agentic OS.</h1>
          <p>
            Tell us about your business and the workflows you want to automate. Our team
            will design a customized demonstration of Xizo for your industry.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <span><Mail size={17} /></span>
              <div>
                <strong>Email</strong>
                <p>hello@xizo.ai</p>
              </div>
            </div>
            <div className="contact-detail">
              <span><Phone size={17} /></span>
              <div>
                <strong>Phone</strong>
                <p>+91 98000 00000</p>
              </div>
            </div>
            <div className="contact-detail">
              <span><MessageSquareText size={17} /></span>
              <div>
                <strong>WhatsApp</strong>
                <p>Chat with us instantly</p>
              </div>
            </div>
          </div>
          <div className="contact-industries">
            <p className="eyebrow" style={{ marginBottom: 12 }}>We serve</p>
            {industries.map((ind) => {
              const Icon = industryIcons[ind.id] ?? Building2;
              return (
                <div key={ind.id} className="contact-industry-item">
                  <Icon size={15} style={{ color: ind.accent }} />
                  <span>{ind.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {submitted ? (
          <div className="contact-form-card success-state">
            <div className="success-icon">
              <BadgeCheck size={44} />
            </div>
            <h2>Request received.</h2>
            <p>
              Thank you for reaching out. Our team will contact you within one business day
              to schedule your customized demonstration.
            </p>
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
              }}
            >
              Send Another Request
            </button>
          </div>
        ) : (
          <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
            <h2>Request a Demo</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-name">Full Name *</label>
                <input id="cf-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Rahul Sharma" />
              </div>
              <div className="form-group">
                <label htmlFor="cf-company">Company *</label>
                <input id="cf-company" name="company" type="text" value={form.company} onChange={handleChange} required placeholder="Acme Realty" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-email">Email *</label>
                <input id="cf-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="rahul@company.com" />
              </div>
              <div className="form-group">
                <label htmlFor="cf-phone">Phone</label>
                <input id="cf-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98000 00000" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cf-industry">Industry *</label>
              <select id="cf-industry" name="industry" value={form.industry} onChange={handleChange} required>
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>{ind.name}</option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">What workflows do you want to automate? *</label>
              <textarea
                id="cf-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us about your business and what you'd like to automate..."
              />
            </div>
            <button className="primary-btn" type="submit" style={{ width: "100%", justifyContent: "center" }}>
              Send Request <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── SiteFooter ────────────────────────────────────────────────────────────────

function SiteFooter({ navigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <XizoLogo className="footer-logo" />
          <p>AI employees. One operating system. Human control.</p>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn" className="social-link">in</a>
            <a href="#" aria-label="Twitter / X" className="social-link">𝕏</a>
          </div>
        </div>

        <div className="footer-links-group">
          <strong>Platform</strong>
          <button type="button" onClick={() => navigate("agents")}>AI Agents</button>
          <button type="button" onClick={() => navigate("agents")}>Workflow Canvas</button>
          <button type="button" onClick={() => navigate("agents")}>Agent Builder</button>
          <button type="button" onClick={() => navigate("agents")}>Human Approval</button>
          <button type="button" onClick={() => navigate("agents")}>Integrations</button>
          <button type="button" onClick={() => navigate("agents")}>Analytics</button>
        </div>

        <div className="footer-links-group">
          <strong>Industries</strong>
          {industries.map((ind) => (
            <button key={ind.id} type="button" onClick={() => navigate("industry", ind.id)}>
              {ind.name}
            </button>
          ))}
        </div>

        <div className="footer-links-group">
          <strong>Company</strong>
          <button type="button" onClick={() => navigate("pricing")}>Pricing</button>
          <button type="button" onClick={() => navigate("about")}>About</button>
          <button type="button" onClick={() => navigate("contact")}>Contact</button>
          <button type="button" onClick={() => navigate("contact")}>Book a Demo</button>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Xizo. All rights reserved.</span>
        <span>Build your Agentic OS for Business.</span>
      </div>
    </footer>
  );
}

// ── Utility ───────────────────────────────────────────────────────────────────

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default App;
