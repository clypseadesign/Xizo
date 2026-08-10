import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Bot, Brain, BrainCircuit,
  Building2, CheckCircle, ChevronDown, ChevronRight,
  ClipboardList, Clock, Cog, DollarSign, FileText,
  Globe2, HeartPulse, Home, LayoutGrid, Lightbulb,
  Mail, Map, MessageSquare, Phone, Play, RefreshCw,
  Search, Settings, Shield, ShieldCheck, Sparkles,
  Target, TrendingUp, Users, Wrench, X, Zap,
  Car, ShoppingBag, Factory, GraduationCap, Hotel,
  Truck, HardHat, Code2, ChevronLeft, Menu,
  AlertTriangle, Activity, Database, Link, Lock,
  RotateCcw, ArrowUpRight, Circle, Pause
} from "lucide-react";
import xizoLogo from "./assets/xizo-logo-white.png";
import "./index.css";

// ─────────────────────────────────────────────────────────────────────────────
// DATA (inline fallback — xizoData.js is the main source)
// ─────────────────────────────────────────────────────────────────────────────
let industries, businessProblems, useCases, agentTypes, resources,
    stagesPipeline, leakCategories, integrationsList;

try {
  const data = await import("./xizoData.js");
  industries       = data.industries;
  businessProblems = data.businessProblems;
  useCases         = data.useCases;
  agentTypes       = data.agentTypes;
  resources        = data.resources;
  stagesPipeline   = data.stagesPipeline;
  leakCategories   = data.leakCategories;
  integrationsList = data.integrations;
} catch {
  industries       = [];
  businessProblems = [];
  useCases         = [];
  agentTypes       = [];
  resources        = [];
  stagesPipeline   = [];
  leakCategories   = [];
  integrationsList = [];
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────────────────────────────────────
function parseHash() {
  const h = window.location.hash.replace("#", "") || "home";
  const [page, ...rest] = h.split("/");
  return { page, sub: rest.join("/") };
}

function useRouter() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = useCallback((page, sub) => {
    window.location.hash = sub ? `${page}/${sub}` : page;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return { route, navigate };
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERSECTION OBSERVER HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY ICON MAP
// ─────────────────────────────────────────────────────────────────────────────
const industryIcons = {
  "real-estate": Home,
  "healthcare": HeartPulse,
  "finance": DollarSign,
  "professional-services": Briefcase,
  "automotive": Car,
  "ecommerce": ShoppingBag,
  "manufacturing": Factory,
  "education": GraduationCap,
  "hospitality": Hotel,
  "logistics": Truck,
  "construction": HardHat,
  "saas": Code2,
};

function Briefcase(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width={props.size || 24} height={props.size || 24}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "AI Audit",          page: "audit" },
  { label: "AI OS",             page: "ai-os" },
  { label: "Agent Architecture",page: "agents" },
  { label: "Orchestration",     page: "orchestration" },
  { label: "Industries",        page: "industries" },
  { label: "Use Cases",         page: "use-cases" },
  { label: "Resources",         page: "resources" },
  { label: "About",             page: "about" },
];

function Nav({ route, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="site-nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <img src={xizoLogo} alt="Xizo" className="nav-logo"
              onClick={() => navigate("home")} style={{ cursor: "pointer" }} />
          </div>
          <nav className="nav-links">
            {NAV_LINKS.map(l => (
              <button key={l.page} className={`nav-link ${route.page === l.page ? "active" : ""}`}
                onClick={() => navigate(l.page)}>{l.label}</button>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="btn-primary nav-cta" onClick={() => navigate("contact")}>
              Request AI Audit
            </button>
            <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <button key={l.page} className="mobile-nav-link"
            onClick={() => { navigate(l.page); setMenuOpen(false); }}>{l.label}</button>
        ))}
        <button className="btn-primary" style={{ marginTop: 16 }}
          onClick={() => { navigate("contact"); setMenuOpen(false); }}>
          Request AI Audit <ArrowRight size={15} />
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={xizoLogo} alt="Xizo" className="footer-logo-img" />
            <p>We audit your business, identify where value is being lost, and build the AI Operating System to solve it.</p>
            <p className="footer-brand-line">The AI Operating System Company</p>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <div className="footer-links">
              {[["AI Audit","audit"],["AI Operating System","ai-os"],["Agent Architecture","agents"],
                ["Orchestration","orchestration"],["How Xizo Works","how-it-works"]].map(([l,p]) => (
                <span key={p} className="footer-link" onClick={() => navigate(p)}>{l}</span>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Industries</h5>
            <div className="footer-links">
              {["Real Estate","Healthcare","Finance","Professional Services","Automotive"].map(l => (
                <span key={l} className="footer-link" onClick={() => navigate("industries")}>{l}</span>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <div className="footer-links">
              {[["About","about"],["Resources","resources"],["Use Cases","use-cases"],
                ["Business Problems","problems"],["Contact","contact"]].map(([l,p]) => (
                <span key={p} className="footer-link" onClick={() => navigate(p)}>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Xizo. The AI Operating System Company.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OS VISUALIZATION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const OS_NODES = [
  { label: "Sales",            icon: TrendingUp,  angle: 0   },
  { label: "Marketing",        icon: Target,      angle: 51  },
  { label: "Customer\nSupport",icon: MessageSquare,angle:103 },
  { label: "Finance",          icon: DollarSign,  angle: 154 },
  { label: "Operations",       icon: Cog,         angle: 206 },
  { label: "HR",               icon: Users,       angle: 257 },
  { label: "Analytics",        icon: BarChart3,   angle: 309 },
];

function OSVisualization() {
  const r = 170;
  const cx = 240, cy = 240;
  const toRad = deg => (deg * Math.PI) / 180;
  return (
    <div className="os-viz" style={{ width: 480, height: 480 }}>
      <svg className="os-lines" viewBox="0 0 480 480" style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%" }}>
        {OS_NODES.map((n, i) => {
          const x = cx + r * Math.cos(toRad(n.angle));
          const y = cy + r * Math.sin(toRad(n.angle));
          return <line key={i} className="os-line" x1={cx} y1={cy} x2={x} y2={y} />;
        })}
      </svg>
      <div className="os-viz-center">
        <span>XIZO OS</span>
        <span>Orchestrator</span>
      </div>
      {OS_NODES.map((n, i) => {
        const x = cx + r * Math.cos(toRad(n.angle));
        const y = cy + r * Math.sin(toRad(n.angle));
        const Icon = n.icon;
        return (
          <div key={i} className="os-node"
            style={{ left: x, top: y, animationDelay: `${i * 0.1}s` }}>
            <div className="os-node-icon"><Icon size={20} /></div>
            <div className="os-node-label">{n.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORCHESTRATION CANVAS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ORCH_AGENTS = [
  { name: "Lead Intelligence Agent",  role: "Understands intent, property type, budget, urgency", status: "PARSING" },
  { name: "Qualification Agent",       role: "Scores lead based on intent signals and profile",   status: "SCORING" },
  { name: "Property Matching Agent",   role: "Identifies top-matching listings from inventory",   status: "MATCHING" },
  { name: "Sales Agent",               role: "Prepares personalized response and proposal",        status: "DRAFTING" },
  { name: "Scheduling Agent",          role: "Books viewing or call in salesperson calendar",     status: "BOOKING" },
  { name: "CRM Agent",                 role: "Creates contact record, tags lead, logs all context", status: "LOGGING" },
  { name: "Follow-up Agent",           role: "Schedules follow-up sequence based on response",    status: "QUEUING" },
  { name: "Analytics Agent",           role: "Updates pipeline metrics and conversion tracking",  status: "UPDATING" },
];

function OrchestrationCanvas() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const play = () => {
    setActiveIdx(-1);
    setPlaying(true);
    let i = 0;
    const step = () => {
      setActiveIdx(i);
      i++;
      if (i < ORCH_AGENTS.length) {
        timerRef.current = setTimeout(step, 900);
      } else {
        setPlaying(false);
      }
    };
    timerRef.current = setTimeout(step, 400);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setActiveIdx(-1);
    setPlaying(false);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="orch-canvas">
      <div className="orch-header">
        <div>
          <p className="eyebrow">Live Workflow Simulation</p>
          <h3 style={{ fontSize: 18 }}>Agent Orchestration in Action</h3>
        </div>
        {activeIdx === ORCH_AGENTS.length - 1 && (
          <div className="orch-status-pill"><CheckCircle size={12} /> All Agents Complete</div>
        )}
      </div>
      <div className="orch-input-card">
        <div className="orch-input-label">Customer Message Received</div>
        <div className="orch-input-text">
          "I'm looking for a 3-bedroom apartment near the city centre. Budget around £450,000. Can someone contact me?"
        </div>
      </div>
      <div className="orch-flow">
        {ORCH_AGENTS.map((agent, i) => {
          const isActive = i === activeIdx;
          const isDone   = i < activeIdx;
          return (
            <div key={i}
              className={`orch-agent-row visible ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="orch-agent-line">
                <div className="orch-agent-dot" />
                {i < ORCH_AGENTS.length - 1 && <div className="orch-agent-conn" />}
              </div>
              <div className="orch-agent-card">
                <div style={{ flex: 1 }}>
                  <div className="orch-agent-name">{agent.name}</div>
                  {(isActive || isDone) && (
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{agent.role}</div>
                  )}
                </div>
                <div className="orch-agent-status">
                  {isDone ? "✓ DONE" : isActive ? agent.status : "WAITING"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="orch-controls">
        <button className="orch-play-btn" onClick={playing ? undefined : play} disabled={playing}>
          {playing ? <><Pause size={14} /> Running…</> : <><Play size={14} /> Play Simulation</>}
        </button>
        <button className="orch-reset-btn" onClick={reset}><RotateCcw size={13} /> Reset</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VALUE LEAK SCANNER
// ─────────────────────────────────────────────────────────────────────────────
const LEAK_TABS = [
  {
    id: "revenue", label: "Revenue",
    items: [
      { title: "Missed Lead Response", metric: "62%", desc: "of leads that don't receive a response within 5 minutes are lost to competitors" },
      { title: "Lost Follow-ups",      metric: "23%", desc: "of qualified opportunities receive insufficient follow-up and fall out of pipeline" },
      { title: "Missed Renewals",      metric: "18%", desc: "of subscription renewals are missed due to lack of proactive outreach" },
      { title: "Slow Quotation",       metric: "3.2d", desc: "average time to deliver a quotation — competitors respond same-day" },
    ]
  },
  {
    id: "productivity", label: "Productivity",
    items: [
      { title: "Manual Data Entry",    metric: "14h", desc: "per employee per week spent on manual data entry and system updates" },
      { title: "Report Preparation",   metric: "8h",  desc: "per manager per week collecting and formatting reports from multiple systems" },
      { title: "Information Searching",metric: "4.5h",desc: "per employee per day searching for information across disconnected systems" },
      { title: "Repeated Admin Tasks", metric: "31%", desc: "of employee time is spent on repetitive tasks that could be automated" },
    ]
  },
  {
    id: "customer", label: "Customer",
    items: [
      { title: "Slow Support Response",metric: "6.2h",desc: "average customer support response time — customers expect under 2 hours" },
      { title: "Customer Churn",       metric: "15%", desc: "of customers leave annually due to poor communication and slow support" },
      { title: "Onboarding Drop-off",  metric: "28%", desc: "of new customers don't complete onboarding due to poor handoff and guidance" },
      { title: "Repeated Information", metric: "67%", desc: "of customers have to repeat themselves when transferred between departments" },
    ]
  },
  {
    id: "operations", label: "Operations",
    items: [
      { title: "Approval Delays",       metric: "4.7d",desc: "average time for approvals that could be resolved with clear authorization rules" },
      { title: "Handoff Failures",      metric: "22%", desc: "of work items lost or delayed during department-to-department handoffs" },
      { title: "Exception Backlog",     metric: "38%", desc: "of operational exceptions aren't resolved within expected SLA timeframes" },
      { title: "Duplicate Work",        metric: "11%", desc: "of work is duplicated due to lack of visibility between teams and systems" },
    ]
  },
  {
    id: "decision", label: "Decision",
    items: [
      { title: "Delayed Decisions",     metric: "2.8d",desc: "average time to make operational decisions due to missing or fragmented data" },
      { title: "Data Inconsistency",    metric: "41%", desc: "of managers report inconsistent data between their reporting systems" },
      { title: "Poor Anomaly Detection",metric: "72h", desc: "average time before operational exceptions are identified and escalated" },
      { title: "Visibility Gaps",       metric: "56%", desc: "of leaders say they lack real-time visibility into operational performance" },
    ]
  },
];

function LeakScanner() {
  const [active, setActive] = useState("revenue");
  const tab = LEAK_TABS.find(t => t.id === active);
  return (
    <div className="leak-scanner">
      <div className="leak-tabs">
        {LEAK_TABS.map(t => (
          <button key={t.id} className={`leak-tab ${active === t.id ? "active" : ""}`}
            onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="leak-content">
        <div className="leak-items">
          {tab.items.map((item, i) => (
            <div key={i} className="leak-item">
              <div className="leak-item-header">
                <AlertTriangle size={14} style={{ color: "var(--red)", flexShrink: 0 }} />
                <h4>{item.title}</h4>
              </div>
              <div className="leak-item-metric">{item.metric}</div>
              <div className="leak-item-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROI CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function ROICalculator() {
  const [form, setForm] = useState({
    leads: 200, avgValue: 5000, responseTime: 3, convRate: 12,
    hours: 40, hourlyCost: 35,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: Number(v) || 0 }));

  const potentialLeads   = Math.round(form.leads * 0.18);
  const recoveredRevenue = Math.round(potentialLeads * form.avgValue * (form.convRate / 100) * 12);
  const hoursSaved       = Math.round(form.hours * 0.35 * 52);
  const productivityValue= Math.round(hoursSaved * form.hourlyCost);

  const fmt = n => n >= 1000000 ? `£${(n/1000000).toFixed(1)}M` :
                   n >= 1000    ? `£${(n/1000).toFixed(0)}K`    : `£${n}`;

  return (
    <div className="roi-calc">
      <div className="roi-calc-grid">
        <div className="roi-inputs">
          <h3>Your Business Inputs</h3>
          {[
            ["Monthly Leads", "leads", ""],
            ["Average Customer Value (£)", "avgValue", ""],
            ["Current Lead Response Time (hours)", "responseTime", ""],
            ["Current Conversion Rate (%)", "convRate", ""],
            ["Weekly Team Hours on Manual Tasks", "hours", ""],
            ["Average Hourly Labour Cost (£)", "hourlyCost", ""],
          ].map(([label, key]) => (
            <div className="roi-field" key={key}>
              <label>{label}</label>
              <input type="number" value={form[key]}
                onChange={e => set(key, e.target.value)} min={0} />
            </div>
          ))}
        </div>
        <div className="roi-results">
          <h3>Potential Opportunity Estimate</h3>
          <div className="roi-metric">
            <div className="roi-metric-label">Estimated Recoverable Revenue / Year</div>
            <div className="roi-metric-value blue">{fmt(recoveredRevenue)}</div>
          </div>
          <div className="roi-metric">
            <div className="roi-metric-label">Productivity Value Recovered / Year</div>
            <div className="roi-metric-value green">{fmt(productivityValue)}</div>
          </div>
          <div className="roi-metric">
            <div className="roi-metric-label">Hours Returned to High-Value Work / Year</div>
            <div className="roi-metric-value violet">{hoursSaved.toLocaleString()}h</div>
          </div>
          <div className="roi-disclaimer">
            <ShieldCheck size={13} style={{ display:"inline", marginRight:5, verticalAlign:"middle" }} />
            These are indicative estimates based on industry benchmarks. Actual results depend on your specific business data, workflows, and implementation scope. Xizo's AI Audit provides a data-driven analysis tailored to your business.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function AuditDashboard() {
  const opps = [
    {
      num: "01", title: "Lead Response Gap", impact: "HIGH",
      desc: "Inbound enquiries are being assigned manually after an average 2h 47m delay. Intent signals deteriorate rapidly after 5 minutes.",
      metrics: [
        { label: "Current Response", value: "2h 47m", cls: "bad" },
        { label: "AI Target", value: "< 2 min", cls: "good" },
        { label: "Leads at Risk / Month", value: "73", cls: "bad" },
      ],
      agents: "Lead Intelligence + Qualification + Response Agents"
    },
    {
      num: "02", title: "Follow-up Leakage", impact: "HIGH",
      desc: "23% of qualified opportunities receive only one follow-up touchpoint before being abandoned. No structured re-engagement exists.",
      metrics: [
        { label: "Follow-up Gap", value: "23%", cls: "bad" },
        { label: "Touchpoints/Lead", value: "1.4", cls: "bad" },
        { label: "Industry Best", value: "7–12", cls: "good" },
      ],
      agents: "Follow-up + CRM + Sales Orchestration Agents"
    },
    {
      num: "03", title: "Manual Reporting Overhead", impact: "MEDIUM",
      desc: "14 hours per week spent by management and operations teams manually collecting, formatting, and distributing performance reports.",
      metrics: [
        { label: "Hours/Week", value: "14h", cls: "bad" },
        { label: "Reports Delayed", value: "62%", cls: "bad" },
        { label: "With AI", value: "Real-time", cls: "good" },
      ],
      agents: "Analytics + Reporting + Data Intelligence Agents"
    },
  ];

  const impactColor = { HIGH: "var(--red)", MEDIUM: "var(--amber)", LOW: "var(--green)" };

  return (
    <div className="audit-dashboard">
      <div className="audit-dash-header">
        <span className="audit-dash-title">Xizo Business AI Audit — Sample Output</span>
        <div className="audit-summary">
          <div className="audit-summary-item">
            <div className="audit-summary-value">17</div>
            <div className="audit-summary-label">Total Gaps</div>
          </div>
          <div className="audit-summary-item">
            <div className="audit-summary-value" style={{ color: "var(--red)" }}>5</div>
            <div className="audit-summary-label">High Impact</div>
          </div>
          <div className="audit-summary-item">
            <div className="audit-summary-value" style={{ color: "var(--amber)" }}>8</div>
            <div className="audit-summary-label">Medium Impact</div>
          </div>
          <div className="audit-summary-item">
            <div className="audit-summary-value" style={{ color: "var(--green)" }}>4</div>
            <div className="audit-summary-label">Low Impact</div>
          </div>
        </div>
      </div>
      <div className="audit-opportunities">
        {opps.map(opp => (
          <div key={opp.num} className="audit-opp">
            <div className="audit-opp-num">{opp.num}</div>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <h4 style={{ margin:0 }}>{opp.title}</h4>
                <span style={{ fontFamily:"var(--mono)", fontSize:10, fontWeight:700,
                  color: impactColor[opp.impact], letterSpacing:"0.06em" }}>{opp.impact}</span>
              </div>
              <p style={{ fontSize:13, color:"var(--muted)", margin:"0 0 12px" }}>{opp.desc}</p>
              <div className="audit-metric">
                {opp.metrics.map(m => (
                  <div key={m.label} className={`audit-metric-item ${m.cls}`}>
                    <label>{m.label}</label>
                    <span>{m.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:12, fontSize:12, color:"var(--muted)" }}>
                <span style={{ color:"var(--blue)", fontWeight:700 }}>AI Architecture: </span>{opp.agents}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────────────────────────────────────
function CTABanner({ navigate, title, sub }) {
  return (
    <div className="cta-banner">
      <p className="eyebrow">Get Started</p>
      <h2>{title || "Find Out What AI Could Actually Do for Your Business."}</h2>
      <p>{sub || "Don't guess where AI belongs in your business. Let Xizo analyze your operations and identify the highest-impact opportunities."}</p>
      <div className="button-row" style={{ justifyContent:"center" }}>
        <button className="btn-primary lg" onClick={() => navigate("contact")}>
          Request an AI Business Audit <ArrowRight size={16} />
        </button>
        <button className="btn-ghost lg" onClick={() => navigate("how-it-works")}>
          See How Xizo Works
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
const CAPABILITY_ITEMS = [
  "Business AI Audit","Revenue Leakage Detection","Agent Orchestration","Workflow Intelligence",
  "CRM Integration","WhatsApp AI","Voice Agents","EHR / EMR Sync",
  "Approval Workflows","Real-Time Analytics","Lead Management","Human-in-the-Loop",
  "Audit Trail","Document AI","Finance Automation","Knowledge Engine",
];

function HomePage({ navigate }) {
  const STAGES = [
    { num:"01", title:"Audit",       icon: Search,    desc: "Map every process, system, and workflow across your business to understand where value is created and where it is lost." },
    { num:"02", title:"Discover",    icon: Lightbulb, desc: "Identify the highest-impact AI opportunities — ranked by business value, not technical complexity." },
    { num:"03", title:"Architect",   icon: BrainCircuit, desc: "Design the specific combination of specialized AI agents your business actually needs." },
    { num:"04", title:"Orchestrate", icon: Cog,       desc: "Connect agents into coordinated workflows that integrate with your existing systems and give humans full control." },
    { num:"05", title:"Optimize",    icon: TrendingUp, desc: "Continuously measure agent performance and refine workflows based on real business outcomes." },
  ];

  const [stageRef, stageInView] = useInView();
  const [leakRef,  leakInView]  = useInView();

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>

      {/* HERO */}
      <section className="hero-section grid-bg">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">The AI Operating System Company</p>
            <h1 className="display-xl">
              Your Business Doesn't Need More AI Tools.<br />
              <span style={{ color:"var(--blue)" }}>It Needs an AI Operating System.</span>
            </h1>
            <p className="lead">
              Xizo audits how your business works, identifies where value is being lost,
              and builds a coordinated network of AI agents that operates around your real workflows.
            </p>
            <div className="button-row">
              <button className="btn-primary lg" onClick={() => navigate("contact")}>
                Start Your AI Audit <ArrowRight size={16} />
              </button>
              <button className="btn-ghost lg" onClick={() => navigate("how-it-works")}>
                See How Xizo Works
              </button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:24 }}>
              <ShieldCheck size={14} style={{ color:"var(--green)", flexShrink:0 }} />
              <span style={{ fontSize:13, color:"var(--muted)" }}>
                Business-first AI. Human-controlled. Measurable outcomes.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <OSVisualization />
          </div>
        </div>
      </section>

      {/* CAPABILITY STRIP */}
      <div className="capability-strip">
        {[CAPABILITY_ITEMS.slice(0,8), CAPABILITY_ITEMS.slice(8)].map((row, ri) => (
          <div key={ri} className="capability-row">
            {row.map((item, i) => (
              <span key={item} className="capability-item">
                {i > 0 && <span className="capability-sep" />}
                <span className="capability-dot" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* BUSINESS PROBLEM */}
      <section className="page-section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading" style={{ maxWidth: 640 }}>
            <p className="eyebrow">The Core Problem</p>
            <h2>Your Business Is Full of Software. But Work Still Depends on Humans Connecting Everything.</h2>
            <p>Companies already use CRM, ERP, email, WhatsApp, accounting, calendar, helpdesk, spreadsheets and dozens of AI tools. But employees still spend hours moving information between them, following up, searching, updating systems, and waiting for approvals.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>
            <div>
              <h3 style={{ fontSize:16, color:"var(--muted)", marginBottom:20, fontWeight:600 }}>
                Where your people are spending time:
              </h3>
              {["Moving information between systems","Manually following up with leads and customers",
                "Searching for data across disconnected tools","Updating CRM, ERP, and spreadsheets by hand",
                "Waiting for approvals that could be automated","Preparing reports from multiple sources",
                "Routing requests to the right department","Monitoring exceptions and catching errors"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <X size={13} style={{ color:"var(--red)", flexShrink:0 }} />
                  <span style={{ fontSize:14, color:"var(--white-2)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:28, marginBottom:16 }}>
                <p className="eyebrow eyebrow-violet">With Xizo</p>
                <h3 style={{ fontSize:20, marginBottom:16 }}>One AI Operating System. Coordinated by design.</h3>
                {["AI agents handle the high-volume, repetitive coordination",
                  "Humans focus on judgment, relationships, and decisions",
                  "Every system is connected through an intelligent orchestration layer",
                  "Workflows run automatically with full audit trails",
                  "Exceptions are caught, escalated, and resolved faster"].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <CheckCircle size={13} style={{ color:"var(--green)", flexShrink:0 }} />
                    <span style={{ fontSize:14, color:"var(--white-2)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => navigate("ai-os")}>
                Explore the AI OS <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE LEAK SCANNER */}
      <section className="page-section" ref={leakRef}>
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">The Value Leak Framework</p>
            <h2>Every Business Has Invisible Operational Leaks.</h2>
            <p>Before building any AI, Xizo audits where your business is losing revenue, time, customers, and operational capacity. These are the most common leakage patterns we find.</p>
          </div>
          {leakInView && <LeakScanner />}
        </div>
      </section>

      {/* WHAT XIZO DOES — 5 STAGES */}
      <section className="page-section" style={{ background:"var(--surface)" }} ref={stageRef}>
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div>
              <p className="eyebrow">The Xizo Method</p>
              <h2>We Don't Start With Agents. We Start With Your Business.</h2>
              <p style={{ marginBottom:36 }}>
                Most AI projects fail because they start with technology. We start with the business problem — then design the AI architecture required to solve it.
              </p>
              <button className="btn-primary" onClick={() => navigate("how-it-works")}>
                How Xizo Works <ArrowRight size={15} />
              </button>
            </div>
            <div className="flow-pipeline">
              {stageInView && STAGES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="flow-step" style={{ animationDelay:`${i*0.1}s` }}>
                    <div className="flow-step-line">
                      <div className="flow-step-dot" />
                      {i < STAGES.length - 1 && <div className="flow-connector" />}
                    </div>
                    <div className="flow-step-content">
                      <div className="flow-step-num">{s.num}</div>
                      <h4>{s.title}</h4>
                      <p style={{ fontSize:13, color:"var(--muted)", margin:0 }}>{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ORCHESTRATION PREVIEW */}
      <section className="page-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">Agent Orchestration</p>
            <h2>See How Agents Work Together as a System.</h2>
            <p>Watch a real customer enquiry flow through the Xizo agent network — from first contact to booked meeting, CRM update, and follow-up initiation.</p>
          </div>
          <OrchestrationCanvas />
          <div style={{ textAlign:"center", marginTop:32 }}>
            <button className="btn-text" onClick={() => navigate("orchestration")}>
              Explore Full Orchestration Canvas <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">12 Industry Operating Systems</p>
            <h2>Purpose-Built AI for the Way Your Industry Actually Works.</h2>
            <p>Xizo doesn't sell the same AI to every business. Each deployment is designed around the specific workflows, data sources, and decision points of your industry.</p>
          </div>
          <div className="industry-grid">
            {(industries || []).slice(0, 6).map(ind => {
              const Icon = industryIcons[ind.id] || Building2;
              return (
                <div key={ind.id} className="industry-card"
                  style={{ "--ind-accent": ind.accent }}
                  onClick={() => navigate("industries", ind.id)}>
                  <div className="ind-top">
                    <div className="ind-icon"><Icon size={20} /></div>
                    <span className="ind-count">{ind.agents?.length || 7} agents</span>
                  </div>
                  <h3>{ind.name}</h3>
                  <p>{ind.headline}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign:"center", marginTop:36 }}>
            <button className="btn-ghost" onClick={() => navigate("industries")}>
              View All 12 Industries <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate} />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI AUDIT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AuditPage({ navigate }) {
  const AUDIT_CATS = [
    { icon: TrendingUp, title:"Revenue", color:"var(--blue)",
      desc:"Where are leads, customers, and opportunities being lost?",
      items:["Lead capture and response speed","Follow-up and re-engagement processes","Renewal and upsell opportunity detection","Quotation and proposal turnaround","Lost opportunity analysis"] },
    { icon: Cog, title:"Operations", color:"var(--amber)",
      desc:"Where is work getting delayed, duplicated, or stuck?",
      items:["Approval and authorization workflows","Department handoff processes","Exception management and escalation","Duplicate work and redundant processes","Workflow bottleneck identification"] },
    { icon: Users, title:"Customer Experience", color:"var(--green)",
      desc:"Where are customers waiting, repeating themselves, or falling through gaps?",
      items:["Support response and resolution times","Onboarding process completion rates","Communication channel coverage","Proactive engagement touchpoints","Customer satisfaction signal monitoring"] },
    { icon: Activity, title:"Productivity", color:"var(--violet)",
      desc:"Where are employees spending time on low-value work?",
      items:["Manual data entry and system updates","Report preparation and distribution","Information retrieval and searching","Meeting scheduling and coordination","Repetitive administrative tasks"] },
    { icon: Database, title:"Data & Systems", color:"var(--blue-2)",
      desc:"Where is information fragmented, duplicated, or inconsistent?",
      items:["Data duplication across systems","Information fragmentation between departments","Data quality and consistency issues","System integration gaps","Knowledge management effectiveness"] },
    { icon: Brain, title:"Decision Making", color:"var(--red)",
      desc:"Where are approvals and decisions slowing the business?",
      items:["Approval chain mapping and bottlenecks","Decision support data availability","Anomaly detection and alerting","Management visibility and reporting lag","Strategic KPI monitoring"] },
    { icon: Shield, title:"Risk & Compliance", color:"var(--amber)",
      desc:"Where are exceptions and compliance issues being detected too late?",
      items:["Compliance monitoring coverage","Exception detection and response times","Audit trail completeness","Policy adherence monitoring","Risk signal identification"] },
  ];
  const [openCat, setOpenCat] = useState(null);

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="page-section grid-bg" style={{ minHeight:"60vh", display:"flex", alignItems:"center" }}>
        <div className="section-inner">
          <p className="eyebrow">AI Business Audit</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Find Where Your Business Is Losing Value.
          </h1>
          <p className="lead" style={{ maxWidth:560, marginBottom:36 }}>
            Xizo analyzes your business processes to identify the workflows where AI can create measurable business impact — before a single agent is built.
          </p>
          <button className="btn-primary lg" onClick={() => navigate("contact")}>
            Request an AI Business Audit <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Before We Build AI</p>
            <h2>We Understand Your Business First.</h2>
            <p>Xizo's AI Audit maps how your business actually operates — processes, people, systems, data, and decisions — to identify the highest-value automation opportunities.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:16 }}>
            {AUDIT_CATS.map((cat, i) => {
              const Icon = cat.icon;
              const isOpen = openCat === i;
              return (
                <div key={i} className="card" style={{ cursor:"pointer" }}
                  onClick={() => setOpenCat(isOpen ? null : i)}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom: isOpen ? 16 : 0 }}>
                    <div className="icon-box" style={{ background:`${cat.color}18`, color:cat.color }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex:1 }}>
                      <h3 style={{ fontSize:16, marginBottom:4 }}>{cat.title}</h3>
                      <p style={{ fontSize:13, color:"var(--muted)", margin:0 }}>{cat.desc}</p>
                    </div>
                    <ChevronDown size={16} style={{ color:"var(--muted)", transform: isOpen?"rotate(180deg)":"none", transition:"transform 0.2s" }} />
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:"1px solid var(--border)", paddingTop:16 }}>
                      {cat.items.map(item => (
                        <div key={item} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                          <ChevronRight size={13} style={{ color:"var(--blue)", flexShrink:0 }} />
                          <span style={{ fontSize:13, color:"var(--white-2)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">What You Receive</p>
            <h2>A Prioritized AI Opportunity Map for Your Business.</h2>
            <p>Not a generic AI recommendation. A business-specific analysis of where AI can create measurable impact, ranked by value.</p>
          </div>
          <AuditDashboard />
          <div style={{ textAlign:"center", marginTop:36 }}>
            <button className="btn-primary lg" onClick={() => navigate("contact")}>
              Request Your AI Audit <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI OPERATING SYSTEM PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AIOSPage({ navigate }) {
  const EXAMPLES = [
    {
      industry: "Real Estate Agency", accent:"var(--blue)",
      os: "Sales & Lettings AI OS",
      agents: ["Lead Intelligence","Qualification","Property Matching","Sales","Scheduling","CRM","Follow-up","Analytics"],
      outcome: "Every inbound enquiry is processed, qualified, matched to properties, and responded to within minutes — automatically."
    },
    {
      industry: "Financial Advisory", accent:"var(--amber)",
      os: "Client Relationship & Compliance AI OS",
      agents: ["Client Intelligence","Compliance","Reporting","Risk Monitoring","Document","Onboarding","Follow-up","Analytics"],
      outcome: "Client relationships are managed proactively, compliance is monitored continuously, and advisors focus on high-value guidance."
    },
    {
      industry: "Professional Services", accent:"var(--violet)",
      os: "Project & Client Intelligence AI OS",
      agents: ["Opportunity","Proposal","Project Monitor","Client Communication","Invoice","Knowledge","Scheduling","Analytics"],
      outcome: "Projects are tracked in real time, client communication is automated, and billing is managed without manual intervention."
    },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg" style={{ minHeight:"60vh", display:"flex", alignItems:"center" }}>
        <div className="section-inner">
          <p className="eyebrow">AI Operating System</p>
          <h1 className="display-lg" style={{ maxWidth:720, marginBottom:20 }}>
            One AI Operating System Built Around Your Business.
          </h1>
          <p className="lead" style={{ maxWidth:600, marginBottom:36 }}>
            Every Xizo deployment is different. We don't give every company the same collection of agents — we design a business-specific AI OS from the ground up.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">The Architecture</p>
            <h2>Business → Audit → Architecture → AI OS</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
            {["Understand the Business","AI Business Audit","Identify High-Value Opportunities",
              "Design Agent Architecture","Build & Orchestrate Agents","Deploy Business-Specific AI OS"].map((step, i, arr) => (
              <div key={step} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ background:"var(--surface-2)", border:`1px solid ${i===5?"var(--blue)":"var(--border-2)"}`,
                  borderRadius:"var(--radius)", padding:"14px 32px", fontWeight:700, fontSize:14,
                  color: i===5?"var(--blue)":"var(--white)", minWidth:280, textAlign:"center" }}>{step}</div>
                {i < arr.length-1 && <div style={{ width:1, height:32, background:"var(--border-2)" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">Example Deployments</p>
            <h2>Every AI OS Is Designed for the Business That Uses It.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {EXAMPLES.map(ex => (
              <div key={ex.industry} style={{ background:"var(--surface)", border:`1px solid var(--border)`,
                borderRadius:"var(--radius-xl)", overflow:"hidden" }}>
                <div style={{ background:"var(--surface-2)", borderBottom:"1px solid var(--border)", padding:"20px 24px" }}>
                  <div style={{ fontFamily:"var(--mono)", fontSize:10, color:ex.accent, fontWeight:700,
                    letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{ex.industry}</div>
                  <h3 style={{ fontSize:18 }}>{ex.os}</h3>
                </div>
                <div style={{ padding:"20px 24px" }}>
                  <div style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", fontWeight:700,
                    letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Agent Network</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
                    {ex.agents.map(a => (
                      <span key={a} style={{ background:"var(--surface-2)", border:"1px solid var(--border-2)",
                        borderRadius:4, padding:"3px 8px", fontSize:11, color:"var(--white-2)", fontWeight:600 }}>{a}</span>
                    ))}
                  </div>
                  <p style={{ fontSize:13, color:"var(--muted)", margin:0, lineHeight:1.65 }}>{ex.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Ready to Design Your AI Operating System?"
            sub="Start with an AI Business Audit. Understand where you're losing value before committing to any technology." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT ARCHITECTURE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AgentArchPage({ navigate }) {
  const [selected, setSelected] = useState(null);

  const agents = agentTypes?.length ? agentTypes : [
    { id:"lead", name:"Lead Intelligence Agent", role:"Lead Processing", purpose:"Captures, parses and enriches inbound lead data from all channels.",
      inputs:["Web forms","WhatsApp","Email","Phone enquiries"],
      actions:["Parse intent","Enrich profile","Score urgency","Tag channel"],
      connects:["CRM","WhatsApp API","Email","Lead database"],
      humanApproval:"None required — fully autonomous",
      kpi:"Lead response time, intent accuracy" },
    { id:"qual", name:"Qualification Agent", role:"Lead Scoring", purpose:"Scores leads against business criteria and routes to appropriate workflow.",
      inputs:["Lead Intelligence Agent output","CRM history","Scoring model"],
      actions:["Apply scoring model","Classify lead tier","Route to workflow","Notify sales"],
      connects:["Lead Intelligence Agent","Sales Agent","CRM Agent"],
      humanApproval:"High-value enterprise leads may require sales manager review",
      kpi:"Qualification accuracy, conversion rate by tier" },
    { id:"sales", name:"Sales Agent", role:"Sales Engagement", purpose:"Prepares and sends personalized responses and proposals based on lead context.",
      inputs:["Qualified lead data","Product/service catalogue","CRM history","Tone guidelines"],
      actions:["Draft response","Generate proposal","Send communication","Log interaction"],
      connects:["CRM","Email","WhatsApp","Scheduling Agent"],
      humanApproval:"High-value proposals require human approval before sending",
      kpi:"Response quality score, proposal acceptance rate" },
    { id:"sched", name:"Scheduling Agent", role:"Calendar Management", purpose:"Books meetings, viewings and calls directly in team calendars.",
      inputs:["Sales Agent request","Calendar availability","Customer preference"],
      actions:["Check availability","Propose slots","Confirm booking","Send reminders"],
      connects:["Google/Outlook Calendar","CRM","WhatsApp","Email"],
      humanApproval:"None required for standard bookings",
      kpi:"Meeting booking rate, no-show rate" },
    { id:"crm", name:"CRM Agent", role:"Data Management", purpose:"Maintains accurate, up-to-date records across all CRM fields and interactions.",
      inputs:["All agent outputs","Customer communications","Form submissions"],
      actions:["Create/update contacts","Log interactions","Maintain pipeline","Tag and segment"],
      connects:["Salesforce","HubSpot","Zoho","Custom CRM"],
      humanApproval:"None — automated data management",
      kpi:"CRM data accuracy, record completeness" },
    { id:"followup", name:"Follow-up Agent", role:"Relationship Management", purpose:"Manages structured follow-up sequences based on lead status and engagement.",
      inputs:["CRM status","Engagement signals","Sales Agent history","Time triggers"],
      actions:["Send follow-up","Adjust cadence","Re-engage cold leads","Escalate stale deals"],
      connects:["CRM","Email","WhatsApp","Sales Agent"],
      humanApproval:"None for standard sequences; escalation triggers human review",
      kpi:"Follow-up completion rate, re-engagement rate" },
    { id:"support", name:"Customer Support Agent", role:"Support Operations", purpose:"Handles customer enquiries, resolves issues, and escalates complex cases.",
      inputs:["Customer messages","Knowledge base","CRM history","Product documentation"],
      actions:["Understand request","Search knowledge","Respond to customer","Perform allowed actions","Escalate if needed"],
      connects:["Helpdesk","Knowledge base","CRM","Escalation system"],
      humanApproval:"Complex or sensitive issues require human agent escalation",
      kpi:"First-contact resolution rate, response time, CSAT" },
    { id:"analytics", name:"Analytics & Reporting Agent", role:"Business Intelligence", purpose:"Collects, processes and distributes operational metrics and performance reports.",
      inputs:["All agent data","CRM data","System logs","KPI targets"],
      actions:["Aggregate metrics","Detect anomalies","Generate reports","Alert on exceptions"],
      connects:["All agents","BI tools","Email","Dashboard"],
      humanApproval:"None — automated reporting with human review of reports",
      kpi:"Report accuracy, anomaly detection rate, decision support quality" },
  ];

  const sel = selected !== null ? agents[selected] : null;

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Agent Architecture</p>
          <h1 className="display-lg" style={{ maxWidth:680, marginBottom:20 }}>
            Specialized Agents. One Intelligent System.
          </h1>
          <p className="lead" style={{ maxWidth:580 }}>
            Xizo doesn't rely on one general-purpose AI. Each agent has a clearly defined responsibility, a specific set of inputs and actions, and a precise role in the workflow. Click any agent to explore it.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="agent-graph-container">
            <div className="agent-graph">
              <h3 style={{ fontSize:16, marginBottom:20, color:"var(--muted)" }}>
                Agent Network — Click to explore
              </h3>
              <div className="agent-nodes-grid">
                {agents.map((agent, i) => (
                  <button key={i} className={`agent-node-btn ${selected===i?"selected":""}`}
                    onClick={() => setSelected(selected===i ? null : i)}>
                    <div className="agent-node-icon"><Bot size={22} /></div>
                    <div className="agent-node-name">{agent.name}</div>
                    <div className="agent-node-role">{agent.role}</div>
                  </button>
                ))}
              </div>
            </div>
            {sel ? (
              <div className="agent-detail-panel">
                <span className="badge badge-blue" style={{ marginBottom:12 }}>{sel.role}</span>
                <h3>{sel.name}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", marginTop:8 }}>{sel.purpose}</p>
                {[
                  ["INPUTS",    sel.inputs],
                  ["ACTIONS",   sel.actions],
                  ["CONNECTS TO",sel.connects],
                ].map(([label, items]) => (
                  <div className="agent-detail-section" key={label}>
                    <div className="agent-detail-label">{label}</div>
                    <ul className="agent-detail-list">
                      {items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
                <div className="agent-detail-section">
                  <div className="agent-detail-label">HUMAN APPROVAL</div>
                  <div style={{ background:"var(--amber)12", border:"1px solid rgba(245,158,11,0.2)",
                    borderRadius:"var(--radius)", padding:"10px 12px", fontSize:13, color:"var(--white-2)" }}>
                    {sel.humanApproval}
                  </div>
                </div>
                <div className="agent-detail-section">
                  <div className="agent-detail-label">KEY PERFORMANCE INDICATOR</div>
                  <p style={{ fontSize:13, color:"var(--blue-2)", margin:0 }}>{sel.kpi}</p>
                </div>
              </div>
            ) : (
              <div className="agent-detail-panel" style={{ display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", textAlign:"center", minHeight:400 }}>
                <Bot size={40} style={{ color:"var(--border-2)", marginBottom:16 }} />
                <h3 style={{ fontSize:16, color:"var(--muted)", fontWeight:500 }}>Select an agent to explore its capabilities</h3>
                <p style={{ fontSize:13, color:"var(--muted-2)" }}>Click any agent node to see its purpose, inputs, actions, and human approval requirements.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Ready to Design Your Agent Architecture?"
            sub="The right combination of agents depends on your specific business workflows. Start with an AI Audit." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORCHESTRATION PAGE
// ─────────────────────────────────────────────────────────────────────────────
function OrchestrationPage({ navigate }) {
  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Agent Orchestration</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Agents Don't Work Alone. They Work as a System.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            The power of Xizo isn't individual agents — it's the orchestration layer that connects them, passes context between them, and ensures the right human is involved at the right moment.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">Live Simulation</p>
            <h2>A Customer Enquiry, Orchestrated by Xizo.</h2>
            <p>Press Play to watch a real-world enquiry move through the agent network — from first message to booked meeting, updated CRM, and initiated follow-up sequence.</p>
          </div>
          <OrchestrationCanvas />
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
            <div>
              <p className="eyebrow">How Orchestration Works</p>
              <h2>The Xizo Orchestration Layer</h2>
              <p>Every agent in the Xizo network operates within a defined responsibility boundary. The orchestration layer manages:</p>
              {["Context passing between agents","Trigger conditions for each agent",
                "Priority and sequencing of actions","Human approval gates",
                "Exception routing and escalation","Audit logging of every decision"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, marginTop:12 }}>
                  <CheckCircle size={14} style={{ color:"var(--green)", flexShrink:0 }} />
                  <span style={{ fontSize:14, color:"var(--white-2)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow eyebrow-violet">Why Orchestration Matters</p>
              <h2>Coordination Is the Hardest Part.</h2>
              <p style={{ marginBottom:20 }}>
                Individual AI agents are relatively easy to build. The hard part is making them work together reliably — without duplicating work, creating gaps, or losing context.
              </p>
              <p style={{ marginBottom:20 }}>
                Xizo's orchestration layer ensures that every agent knows what happened before it, acts within its authorized scope, and passes complete context to the next agent in the workflow.
              </p>
              <p>
                When a human needs to be involved, the system pauses, presents the relevant context, and waits for authorization before continuing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Design Your Orchestration Architecture."
            sub="Every business workflow requires a different orchestration approach. Start with an AI Audit to identify yours." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS PROBLEMS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_PROBLEMS = [
  { id:"p1", category:"Revenue", title:"Missed Lead Response", impact:"high",
    description:"Inbound leads are not being contacted quickly enough, causing them to convert with competitors.",
    aiOpportunity:"Lead Intelligence + Response Agent automates immediate, personalized responses to every enquiry within seconds.",
    agents:["Lead Intelligence Agent","Response Agent","CRM Agent"],
    outcome:"Response time reduced from hours to seconds. Lead conversion rate improves significantly." },
  { id:"p2", category:"Revenue", title:"Follow-up Leakage", impact:"high",
    description:"Qualified opportunities receive insufficient follow-up touchpoints and fall out of the pipeline.",
    aiOpportunity:"Follow-up Agent manages structured, personalized sequences automatically based on engagement signals.",
    agents:["Follow-up Agent","CRM Agent","Sales Agent"],
    outcome:"Every qualified lead receives consistent follow-up. Conversion rates increase as fewer opportunities are abandoned." },
  { id:"p3", category:"Customer", title:"Slow Support Response", impact:"high",
    description:"Customer queries take hours to receive an initial response, leading to frustration and churn.",
    aiOpportunity:"Customer Support Agent handles all incoming queries instantly, resolving common issues and escalating complex ones.",
    agents:["Customer Support Agent","Knowledge Agent","Escalation Agent"],
    outcome:"First-response time drops to seconds. Support team handles fewer repetitive queries." },
  { id:"p4", category:"Operations", title:"Manual Approval Delays", impact:"medium",
    description:"Approval workflows depend on manual routing and follow-up, creating significant delays.",
    aiOpportunity:"Approval Orchestration Agent routes requests, notifies approvers, chases responses, and records decisions automatically.",
    agents:["Approval Agent","Notification Agent","Audit Agent"],
    outcome:"Approval cycle times reduced. No more lost requests or manual chasing." },
  { id:"p5", category:"Finance", title:"Invoice Processing Delays", impact:"medium",
    description:"Invoices are processed manually, causing delays, errors, and late payment issues.",
    aiOpportunity:"Finance Agent automates invoice extraction, matching, approval routing, and payment scheduling.",
    agents:["Finance Agent","Document Agent","Approval Agent"],
    outcome:"Invoice processing time reduced. Payment accuracy improves. Cash flow visibility increases." },
  { id:"p6", category:"HR", title:"Slow Candidate Communication", impact:"medium",
    description:"Candidates receive slow, inconsistent communication during recruitment, damaging employer brand.",
    aiOpportunity:"HR Agent automates acknowledgements, status updates, interview scheduling, and follow-up throughout the recruitment process.",
    agents:["HR Agent","Scheduling Agent","Communication Agent"],
    outcome:"Candidate experience improves. Time-to-hire reduces. Recruiter admin drops significantly." },
  { id:"p7", category:"Knowledge", title:"Information Scattered Across Systems", impact:"medium",
    description:"Employees spend hours searching for information across email, documents, CRM, and databases.",
    aiOpportunity:"Knowledge Intelligence Agent provides instant, accurate answers from all connected information sources.",
    agents:["Knowledge Agent","Document Agent","Search Agent"],
    outcome:"Information retrieval time drops from hours to seconds. Decision quality improves." },
  { id:"p8", category:"Management", title:"Reporting Delays", impact:"medium",
    description:"Management receives reports hours or days after the period ends, limiting real-time visibility.",
    aiOpportunity:"Analytics Agent aggregates, processes, and distributes reports automatically on any schedule.",
    agents:["Analytics Agent","Reporting Agent","Anomaly Agent"],
    outcome:"Real-time visibility into operations. Anomalies detected immediately rather than retrospectively." },
];

function ProblemsPage({ navigate }) {
  const allProblems = businessProblems?.length ? businessProblems : FALLBACK_PROBLEMS;
  const categories = ["All", ...new Set(allProblems.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = allProblems.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const qMatch = !query || p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase());
    return catMatch && qMatch;
  });

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Business Problem Library</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            We Don't Ask Where AI Can Be Added.<br />
            We Ask Where Your Business Is Breaking.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Browse the most common operational problems we identify during AI Business Audits — and see how Xizo addresses each one.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <input className="problem-search" placeholder="Search problems, e.g. 'lead response', 'invoice', 'onboarding'…"
            value={query} onChange={e => setQuery(e.target.value)} />
          <div className="problem-filters">
            {categories.map(cat => (
              <button key={cat} className={`problem-filter-btn ${activeCategory===cat?"active":""}`}
                onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="problem-grid">
            {filtered.map(p => (
              <div key={p.id} className="problem-card"
                onClick={() => setExpandedId(expandedId===p.id ? null : p.id)}>
                <div className="problem-card-category">{p.category}</div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                {expandedId===p.id && (
                  <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginTop:8 }}>
                    <div style={{ fontFamily:"var(--mono)", fontSize:10, fontWeight:700,
                      letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--blue)", marginBottom:8 }}>
                      AI OPPORTUNITY
                    </div>
                    <p style={{ fontSize:13, marginBottom:14 }}>{p.aiOpportunity}</p>
                    {p.agents?.length > 0 && (
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                        {p.agents.map(a => (
                          <span key={a} style={{ background:"var(--blue-dim)", border:"1px solid rgba(79,110,255,0.25)",
                            borderRadius:4, padding:"2px 8px", fontSize:11, color:"var(--blue-2)", fontWeight:700 }}>{a}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ background:"var(--green-dim)", border:"1px solid rgba(34,197,94,0.2)",
                      borderRadius:"var(--radius)", padding:"10px 12px" }}>
                      <div style={{ fontFamily:"var(--mono)", fontSize:9, fontWeight:700,
                        letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--green)", marginBottom:4 }}>EXPECTED OUTCOME</div>
                      <p style={{ fontSize:12, color:"var(--white-2)", margin:0 }}>{p.outcome}</p>
                    </div>
                  </div>
                )}
                <div className="problem-card-footer">
                  <span className={`problem-impact ${p.impact}`}>{p.impact?.toUpperCase()} IMPACT</span>
                  <span style={{ fontSize:12, color:"var(--blue)", display:"flex", alignItems:"center", gap:4 }}>
                    {expandedId===p.id ? "Less" : "See AI Solution"} <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 0", color:"var(--muted)" }}>
              <Search size={32} style={{ marginBottom:12, opacity:0.4 }} />
              <p>No problems found matching your search. Try a different keyword or category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Don't See Your Specific Problem Listed?"
            sub="Every business has unique operational challenges. An AI Business Audit will identify the specific problems in your workflows." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIES PAGE + DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
function IndustriesPage({ navigate }) {
  const inds = industries?.length ? industries : [];
  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">12 Industry AI Operating Systems</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Purpose-Built AI for the Way Your Industry Actually Works.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Generic AI doesn't understand your industry. Xizo builds AI Operating Systems designed around the specific workflows, compliance requirements, and customer journeys of your sector.
          </p>
        </div>
      </section>
      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="industry-grid">
            {inds.map(ind => {
              const Icon = industryIcons[ind.id] || Building2;
              return (
                <div key={ind.id} className="industry-card"
                  style={{ "--ind-accent": ind.accent }}
                  onClick={() => navigate("industries", ind.id)}>
                  <div className="ind-top">
                    <div className="ind-icon"><Icon size={20} /></div>
                    <span className="ind-count">{ind.agents?.length || 7} agents</span>
                  </div>
                  <h3>{ind.name}</h3>
                  <p>{ind.headline}</p>
                  <div className="ind-tags">
                    {(ind.problems || []).slice(0,3).map(p => (
                      <span key={p} className="ind-tag">{p.split(" ").slice(0,2).join(" ")}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function IndustryDetailPage({ industryId, navigate }) {
  const ind = (industries || []).find(i => i.id === industryId);
  if (!ind) return (
    <main style={{ paddingTop:"var(--nav-h)", padding:"100px 24px", textAlign:"center" }}>
      <h2>Industry not found.</h2>
      <button className="btn-ghost" style={{ marginTop:24 }} onClick={() => navigate("industries")}>
        ← Back to Industries
      </button>
    </main>
  );
  const Icon = industryIcons[ind.id] || Building2;

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <button className="btn-text" style={{ marginBottom:24 }} onClick={() => navigate("industries")}>
            <ChevronLeft size={15} /> All Industries
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
            <div className="icon-box icon-box-lg" style={{ background:`${ind.accent}18`, color:ind.accent }}>
              <Icon size={28} />
            </div>
            <div>
              <p className="eyebrow" style={{ color:ind.accent, marginBottom:4 }}>Industry AI OS</p>
              <h1 className="display-md">{ind.name}</h1>
            </div>
          </div>
          <p className="lead" style={{ maxWidth:600 }}>{ind.description}</p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
            <div>
              <p className="eyebrow">Key Business Problems</p>
              <h2 style={{ fontSize:28, marginBottom:20 }}>Where Value Is Being Lost</h2>
              {(ind.problems || []).map((p, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
                  <AlertTriangle size={14} style={{ color:ind.accent, flexShrink:0, marginTop:3 }} />
                  <span style={{ fontSize:14, color:"var(--white-2)" }}>{p}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow">Agent Network</p>
              <h2 style={{ fontSize:28, marginBottom:20 }}>The AI Architecture</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {(ind.agents || []).map((agent, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
                    background:"var(--surface-2)", border:"1px solid var(--border)",
                    borderRadius:"var(--radius)", padding:"12px 16px" }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:ind.accent, flexShrink:0 }} />
                    <span style={{ fontSize:14, fontWeight:600, color:"var(--white)" }}>{agent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {ind.metrics?.length > 0 && (
        <section className="page-section">
          <div className="section-inner">
            <div className="section-heading centered">
              <p className="eyebrow">Expected Business Impact</p>
              <h2>Measurable Outcomes, Not Vanity Metrics.</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(ind.metrics.length,3)},1fr)`, gap:24 }}>
              {ind.metrics.map((m, i) => (
                <div key={i} style={{ background:"var(--surface)", border:"1px solid var(--border)",
                  borderRadius:"var(--radius-lg)", padding:28, textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--mono)", fontSize:10, fontWeight:700,
                    letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--muted)", marginBottom:12 }}>{m.label}</div>
                  <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:24 }}>
                    <div>
                      <div style={{ fontFamily:"var(--mono)", fontSize:28, fontWeight:700, color:"var(--red)" }}>{m.before}</div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>Before</div>
                    </div>
                    <ArrowRight size={20} style={{ color:"var(--blue)" }} />
                    <div>
                      <div style={{ fontFamily:"var(--mono)", fontSize:28, fontWeight:700, color:"var(--green)" }}>{m.after}</div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>With Xizo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title={`Build the AI OS for Your ${ind.name} Business.`}
            sub="Start with an AI Business Audit to identify your highest-value opportunities." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorksPage({ navigate }) {
  const stages = stagesPipeline?.length ? stagesPipeline : [
    { num:"01", title:"Audit",       description:"We map every process, department, and workflow across your business.", detail:"Using structured interviews, process observation, system analysis, and data review, we build a complete operational picture of your business — including where value is being created, transferred, and lost." },
    { num:"02", title:"Discover",    description:"We identify the specific AI opportunities with the highest business value.", detail:"Not every problem needs AI. We prioritize the opportunities where automation will have the greatest measurable impact on revenue, efficiency, customer experience, or operational performance — and rank them by expected return." },
    { num:"03", title:"Architect",   description:"We design the specific combination of AI agents your business needs.", detail:"We design a custom agent network tailored to your business — defining each agent's responsibility, inputs, actions, authorization boundaries, and connections to your existing technology stack." },
    { num:"04", title:"Orchestrate", description:"We build and connect agents into coordinated, intelligent workflows.", detail:"Agents are built, tested, and integrated with your existing systems. The orchestration layer ensures they work together reliably — passing context, triggering the right workflows, involving humans at the right moments, and maintaining complete audit trails." },
    { num:"05", title:"Optimize",    description:"We continuously measure performance and improve your AI OS over time.", detail:"After deployment, we monitor every agent's performance against business KPIs. We identify bottlenecks, improve workflows, add new capabilities, and ensure your AI Operating System continuously improves as your business evolves." },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">How Xizo Works</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Business First. AI Second. Outcomes Always.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Xizo's five-stage method ensures your AI Operating System is built around the way your business actually works — not around AI technology for its own sake.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          {stages.map((s, i) => (
            <div key={s.num} style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:32,
              paddingBottom:48, borderBottom: i<stages.length-1?"1px solid var(--border)":"none",
              marginBottom: i<stages.length-1?48:0 }}>
              <div>
                <div style={{ fontFamily:"var(--mono)", fontSize:40, fontWeight:700,
                  color:"var(--border-2)", lineHeight:1 }}>{s.num}</div>
                <div style={{ fontFamily:"var(--mono)", fontSize:11, fontWeight:700,
                  letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--blue)", marginTop:8 }}>{s.title}</div>
              </div>
              <div>
                <h3 style={{ fontSize:22, marginBottom:12 }}>{s.description}</h3>
                <p style={{ fontSize:15, color:"var(--white-2)", lineHeight:1.75 }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Start with Step One."
            sub="Request an AI Business Audit — the foundation of everything Xizo builds." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USE CASES PAGE
// ─────────────────────────────────────────────────────────────────────────────
function UseCasesPage({ navigate }) {
  const cases = useCases?.length ? useCases : [
    { id:"lead-response", title:"Lead Response Automation", problem:"A potential customer contacts the business. Nobody responds quickly. Customer chooses a competitor.",
      steps:["Lead Detection Agent captures enquiry from all channels","Intent Agent understands request, product interest, and urgency",
        "Qualification Agent scores and classifies the lead","Response Agent sends personalized reply within seconds",
        "Sales Agent prepares context and notifies the right salesperson","CRM Agent creates contact record and logs all interactions",
        "Follow-up Agent initiates structured follow-up sequence"],
      outcome:"Response time drops from hours to seconds. No lead goes unanswered. Conversion rates increase.",
      metrics:[{label:"Response Time",before:"2h 47m",after:"< 2 min"},{label:"Follow-up Rate",before:"34%",after:"100%"}] },
    { id:"customer-support", title:"24/7 Customer Support", problem:"Customers ask questions outside business hours. They wait hours. Some leave before a response arrives.",
      steps:["Customer Support Agent receives enquiry from any channel","Knowledge Agent searches company knowledge base and policies",
        "CRM Agent retrieves customer history and context","Response Agent crafts accurate, personalized reply",
        "Action Agent performs allowed actions (e.g., check order status, reset password)","Escalation Agent routes complex issues to human agents with full context"],
      outcome:"24/7 support coverage. First-contact resolution improves. Support team handles fewer repetitive queries.",
      metrics:[{label:"Response Time",before:"6.2h",after:"< 30 sec"},{label:"First Contact Resolution",before:"41%",after:"78%"}] },
    { id:"onboarding", title:"Customer Onboarding Orchestration", problem:"A customer signs a contract. Handoff to operations is manual. Onboarding is slow, inconsistent, and error-prone.",
      steps:["Contract signed — Onboarding Agent triggers immediately","Orchestrator coordinates Sales, Finance, Operations, and Customer Success",
        "Document Agent collects and processes required paperwork","Setup Agent provisions accounts, access, and systems",
        "Training Agent sends structured onboarding content","Customer Success Agent schedules check-ins and monitors completion",
        "Analytics Agent tracks onboarding progress and completion rates"],
      outcome:"Onboarding cycle reduced. Customer experience improves. Fewer manual handoff errors.",
      metrics:[{label:"Onboarding Time",before:"14 days",after:"3 days"},{label:"Completion Rate",before:"64%",after:"94%"}] },
    { id:"payment-collection", title:"Payment Collection Automation", problem:"Invoices become overdue. Finance team manually chases payments. Cash flow suffers.",
      steps:["Finance Agent detects invoice approaching due date","Intelligence Agent checks customer payment history and relationship value",
        "Communication Agent sends appropriate, personalized reminder","Response Agent records customer response and updated ETA",
        "Escalation Agent involves finance team if payment remains outstanding","Analytics Agent updates cash flow forecasting and aging reports"],
      outcome:"Cash collection improves. Finance team focuses on relationships, not chasing. Reporting is real-time.",
      metrics:[{label:"Days Sales Outstanding",before:"47 days",after:"28 days"},{label:"Manual Chase Time",before:"8h/week",after:"< 1h/week"}] },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Use Cases</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Real Business Problems. Real AI Solutions.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Every use case begins with a business problem — not an AI capability. Here's how Xizo identifies and solves common operational challenges.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="usecase-grid">
            {cases.map(uc => (
              <div key={uc.id} className="usecase-card">
                <div className="usecase-header">
                  <h3>{uc.title}</h3>
                  <p style={{ fontSize:13, color:"var(--muted)", margin:0 }}>{uc.problem}</p>
                </div>
                <div className="usecase-body">
                  <div style={{ fontFamily:"var(--mono)", fontSize:10, fontWeight:700,
                    letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--blue)", marginBottom:14 }}>
                    Agent Workflow
                  </div>
                  <div className="usecase-flow">
                    {uc.steps.map((step, i) => (
                      <div key={i}>
                        <div className="usecase-step">
                          <div className="usecase-step-dot" />
                          <div className="usecase-step-text">{step}</div>
                        </div>
                        {i < uc.steps.length - 1 && <div className="usecase-connector" style={{ marginLeft:"3.5px" }} />}
                      </div>
                    ))}
                  </div>
                  {uc.metrics?.length > 0 && (
                    <div style={{ display:"flex", gap:16, margin:"16px 0", flexWrap:"wrap" }}>
                      {uc.metrics.map(m => (
                        <div key={m.label} style={{ background:"var(--surface-2)", border:"1px solid var(--border)",
                          borderRadius:"var(--radius)", padding:"12px 16px", flex:1, minWidth:120 }}>
                          <div style={{ fontFamily:"var(--mono)", fontSize:9, color:"var(--muted)", letterSpacing:"0.06em",
                            textTransform:"uppercase", marginBottom:8 }}>{m.label}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontFamily:"var(--mono)", fontSize:14, color:"var(--red)", fontWeight:700 }}>{m.before}</span>
                            <ArrowRight size={12} style={{ color:"var(--blue)" }} />
                            <span style={{ fontFamily:"var(--mono)", fontSize:14, color:"var(--green)", fontWeight:700 }}>{m.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="usecase-outcome">
                    <div className="usecase-outcome-label">Business Outcome</div>
                    <p>{uc.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Identify Your Highest-Value Use Cases."
            sub="An AI Business Audit will map your specific workflows and identify where AI creates the most measurable impact." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROI PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ROIPage({ navigate }) {
  const METRICS = [
    { icon:TrendingUp, label:"Revenue Impact",    color:"var(--blue)",   items:["Lead conversion improvement","Recovered opportunity value","Renewal and upsell capture","Faster quotation to close"] },
    { icon:Activity,   label:"Productivity Gains", color:"var(--green)",  items:["Hours returned from manual work","Tasks automated at scale","Report preparation eliminated","Information retrieval time"] },
    { icon:Users,      label:"Customer Experience",color:"var(--violet)", items:["Support response time","First-contact resolution","Onboarding completion rate","Customer satisfaction score"] },
    { icon:Cog,        label:"Operations",         color:"var(--amber)",  items:["Process cycle time","Error and exception rate","Workflow completion rate","Approval turnaround"] },
    { icon:BarChart3,  label:"Management Insight",  color:"var(--blue-2)",items:["Decision-making speed","Anomaly detection time","KPI visibility","Real-time reporting"] },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Business Impact</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            AI Should Be Measured in Business Outcomes.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Xizo doesn't measure success by the number of agents deployed. It measures success by the business outcomes delivered. Revenue recovered. Hours saved. Customers retained. Decisions improved.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16, marginBottom:64 }}>
            {METRICS.map(m => {
              const Icon = m.icon;
              return (
                <div key={m.label} style={{ background:"var(--surface-2)", border:"1px solid var(--border)",
                  borderRadius:"var(--radius-lg)", padding:24 }}>
                  <div style={{ width:40, height:40, background:`${m.color}18`, borderRadius:"var(--radius)",
                    display:"flex", alignItems:"center", justifyContent:"center", color:m.color, marginBottom:14 }}>
                    <Icon size={18} />
                  </div>
                  <h4 style={{ fontSize:14, marginBottom:12 }}>{m.label}</h4>
                  {m.items.map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
                      <div style={{ width:3, height:3, borderRadius:"50%", background:m.color, flexShrink:0 }} />
                      <span style={{ fontSize:12, color:"var(--muted)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="section-heading centered">
            <p className="eyebrow">ROI Estimator</p>
            <h2>Estimate Your Potential Business Opportunity.</h2>
            <p>Enter your business parameters to see an indicative estimate of the value AI could unlock. Xizo's AI Audit provides a data-driven analysis specific to your business.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Get a Real ROI Analysis for Your Business."
            sub="The estimator above uses industry benchmarks. An AI Business Audit uses your actual operational data to identify specific opportunities." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTEGRATIONS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function IntegrationsPage({ navigate }) {
  const BIZ_SYSTEMS = [
    { name:"CRM Systems",     icon:Users,       examples:"Salesforce, HubSpot, Zoho" },
    { name:"ERP Platforms",   icon:Database,    examples:"SAP, Oracle, Microsoft Dynamics" },
    { name:"Email",           icon:Mail,        examples:"Gmail, Outlook, Microsoft 365" },
    { name:"WhatsApp / Messaging",icon:MessageSquare,examples:"WhatsApp Business API, Slack, Teams" },
    { name:"Calendar",        icon:Clock,       examples:"Google Calendar, Outlook Calendar" },
    { name:"Accounting",      icon:DollarSign,  examples:"Xero, QuickBooks, Sage" },
    { name:"Helpdesk",        icon:HeartPulse,  examples:"Zendesk, Freshdesk, Intercom" },
    { name:"Documents",       icon:FileText,    examples:"Google Drive, SharePoint, Notion" },
    { name:"Analytics / BI",  icon:BarChart3,   examples:"Tableau, Power BI, Looker" },
    { name:"Custom Systems",  icon:Code2,       examples:"Internal APIs, databases, legacy systems" },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Integrations</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Xizo Doesn't Replace Your Business Stack. It Makes It Intelligent.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Xizo sits above and across your existing technology, connecting your systems through an intelligent orchestration layer that gives AI agents access to the right data and the ability to perform authorized actions.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"var(--radius-xl)", padding:40, marginBottom:48 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr", gap:24, alignItems:"center" }}>
              <div>
                <h4 style={{ fontSize:13, color:"var(--muted)", marginBottom:16, fontFamily:"var(--mono)",
                  letterSpacing:"0.08em", textTransform:"uppercase" }}>Your Systems</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {BIZ_SYSTEMS.slice(0,5).map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.name} className="integration-item">
                        <Icon size={14} />{s.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                {Array(5).fill(0).map((_,i) => <ArrowRight key={i} size={16} style={{ color:"var(--border-2)" }} />)}
              </div>
              <div style={{ background:"var(--blue-dim)", border:"1px solid rgba(79,110,255,0.3)",
                borderRadius:"var(--radius-lg)", padding:28, textAlign:"center" }}>
                <p className="eyebrow" style={{ textAlign:"center", marginBottom:8 }}>Xizo AI OS</p>
                <h4 style={{ fontSize:16, marginBottom:8 }}>Orchestration Layer</h4>
                <p style={{ fontSize:12, color:"var(--muted)", margin:0 }}>Intelligent coordination across all connected systems</p>
                <div style={{ marginTop:16, display:"flex", flexWrap:"wrap", gap:4, justifyContent:"center" }}>
                  {["AI Agents","Workflows","Audit Trail","Human Gates"].map(tag => (
                    <span key={tag} className="badge badge-blue">{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                {Array(5).fill(0).map((_,i) => <ArrowRight key={i} size={16} style={{ color:"var(--border-2)" }} />)}
              </div>
              <div>
                <h4 style={{ fontSize:13, color:"var(--muted)", marginBottom:16, fontFamily:"var(--mono)",
                  letterSpacing:"0.08em", textTransform:"uppercase" }}>Business Outcomes</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {["Revenue recovered","Hours saved","Customers served","Decisions supported","Operations optimised"].map(o => (
                    <div key={o} style={{ display:"flex", alignItems:"center", gap:8, background:"var(--green-dim)",
                      border:"1px solid rgba(34,197,94,0.2)", borderRadius:6, padding:"10px 12px",
                      fontSize:12, color:"var(--green)", fontWeight:700 }}>
                      <CheckCircle size={13} />{o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
            {BIZ_SYSTEMS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.name} style={{ background:"var(--surface-2)", border:"1px solid var(--border)",
                  borderRadius:"var(--radius)", padding:"18px 20px", display:"flex", alignItems:"flex-start", gap:14 }}>
                  <div className="icon-box icon-box-sm"><Icon size={16} /></div>
                  <div>
                    <h4 style={{ fontSize:14, marginBottom:4 }}>{s.name}</h4>
                    <p style={{ fontSize:12, color:"var(--muted)", margin:0 }}>{s.examples}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Connect Your Existing Systems to an AI OS."
            sub="Xizo integrates with your current technology stack. An AI Audit identifies the right connection points." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HUMAN + AI PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HumanAIPage({ navigate }) {
  const [approvalStep, setApprovalStep] = useState(0);
  const steps = [
    { label:"AI generates quotation based on brief and pricing rules", auto:true },
    { label:"Approval Required — Manager reviews quotation details", auto:false },
    { label:"Manager approves quotation", auto:false },
    { label:"AI sends quotation to customer with CRM update", auto:true },
    { label:"Follow-up sequence initiated automatically", auto:true },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Human + AI</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Autonomous Where It Should Be. Human Where It Matters.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            Xizo doesn't build autonomous systems that operate without oversight. We design AI Operating Systems where automation handles volume and humans handle judgment.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="human-ai-levels">
            <div className="human-ai-level autonomous">
              <span className="badge badge-blue">Fully Automated</span>
              <h3>Autonomous</h3>
              <p>Low-risk, repetitive actions with clear rules and predictable outcomes. No human approval needed.</p>
              <div className="human-ai-actions">
                {["Lead data capture and enrichment","CRM record creation and updates","Standard communication sending",
                  "Appointment reminder dispatch","Report generation and distribution"].map(a=><div key={a} className="human-ai-action">{a}</div>)}
              </div>
            </div>
            <div className="human-ai-level approval">
              <span className="badge badge-amber">Human Approval</span>
              <h3>Approval Required</h3>
              <p>Consequential decisions where AI prepares the recommendation and a human authorizes the action.</p>
              <div className="human-ai-actions">
                {["High-value quotation or proposal sending","Contract terms modification","Credit or discount authorization",
                  "Sensitive customer communications","Budget or procurement approvals"].map(a=><div key={a} className="human-ai-action">{a}</div>)}
              </div>
            </div>
            <div className="human-ai-level escalation">
              <span className="badge badge-violet">Human Escalation</span>
              <h3>Human Escalation</h3>
              <p>Complex, sensitive, or exceptional situations requiring experienced human judgment.</p>
              <div className="human-ai-actions">
                {["Customer complaints and disputes","Legal or compliance exceptions","High-value relationship decisions",
                  "Novel situations outside defined rules","Ethical or policy edge cases"].map(a=><div key={a} className="human-ai-action">{a}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            <div>
              <p className="eyebrow">Approval Workflow</p>
              <h2>Watch a Human Approval Gate in Action.</h2>
              <p style={{ marginBottom:24 }}>
                When an AI agent reaches an action that requires human authorization, the system pauses, presents the relevant context, and waits for explicit approval before continuing.
              </p>
              <button className="btn-primary" onClick={() => setApprovalStep(s => Math.min(s+1, steps.length-1))}>
                Next Step <ArrowRight size={15} />
              </button>
              {approvalStep > 0 && (
                <button className="btn-ghost" style={{ marginLeft:12 }} onClick={() => setApprovalStep(0)}>
                  <RotateCcw size={14} /> Reset
                </button>
              )}
            </div>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--radius-xl)", padding:32 }}>
              <h4 style={{ fontSize:14, color:"var(--muted)", marginBottom:20, fontFamily:"var(--mono)",
                letterSpacing:"0.06em", textTransform:"uppercase" }}>Quotation Approval Workflow</h4>
              {steps.map((step, i) => (
                <div key={i} style={{ opacity: i<=approvalStep ? 1 : 0.3, transition:"opacity 0.3s" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, marginTop:2,
                      background: i<approvalStep?"var(--green)":i===approvalStep?step.auto?"var(--blue)":"var(--amber)":"var(--border-2)",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {i<approvalStep ? <CheckCircle size={14} /> : step.auto ? <Bot size={12} /> : <Users size={12} />}
                    </div>
                    <div style={{ flex:1, paddingBottom:16 }}>
                      <div style={{ fontSize:13, color:"var(--white-2)", fontWeight:500 }}>{step.label}</div>
                      {i===approvalStep && !step.auto && (
                        <div style={{ marginTop:8, background:"var(--amber)12", border:"1px solid rgba(245,158,11,0.25)",
                          borderRadius:6, padding:"8px 12px", fontSize:12, color:"var(--amber)", fontWeight:700 }}>
                          ⚑ Waiting for human authorization
                        </div>
                      )}
                    </div>
                  </div>
                  {i<steps.length-1 && (
                    <div style={{ width:1, height:16, background:"var(--border-2)", marginLeft:11.5, marginBottom:0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Build AI That Works With Your Team, Not Around It."
            sub="Human control isn't a limitation. It's a design principle. Start with an AI Audit." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  const VALUES = [
    { icon:Target,      title:"Business First",         desc:"We start every engagement by understanding the business — not by selling AI technology. The problem defines the solution, not the other way around." },
    { icon:Users,       title:"Humans Remain in Control",desc:"AI handles the volume. Humans handle the judgment. Every Xizo deployment is designed with clear human control points where it matters most." },
    { icon:ShieldCheck, title:"Visible, Not Black-Box",  desc:"Every agent has a defined responsibility, a transparent workflow position, and a complete audit trail. Nothing operates invisibly." },
    { icon:BarChart3,   title:"Outcomes Always",         desc:"We measure success in business outcomes — revenue recovered, hours saved, customers served — not in the number of agents deployed." },
  ];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner-sm">
          <p className="eyebrow">About Xizo</p>
          <h1 className="display-lg" style={{ marginBottom:24 }}>
            Building the Operating Layer for the AI-Native Business.
          </h1>
          <p className="lead">
            Businesses have tools. They have data. They have people. What they lack is the intelligent operating layer that connects them, coordinates the work, and keeps humans in control of every important decision.
          </p>
          <p className="lead" style={{ marginTop:16 }}>
            Xizo is that layer.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div>
              <p className="eyebrow">Mission</p>
              <h2 style={{ marginBottom:20 }}>Make Every Business Capable of Operating as an AI-Native Organization.</h2>
              <p>Most businesses are not AI-native — they're software-native businesses trying to bolt AI onto existing processes. That approach creates more complexity, not less.</p>
              <p style={{ marginTop:16 }}>Xizo's approach is different. We redesign the operating model first — then build the AI to execute it. The result is an organization where AI and humans work together as a coordinated system, not as separate tools.</p>
            </div>
            <div>
              <p className="eyebrow eyebrow-violet">Vision</p>
              <h2 style={{ marginBottom:20 }}>A Future Where Businesses Define Objectives and Intelligent Systems Coordinate the Execution.</h2>
              <p>The best businesses of the next decade won't be defined by the size of their teams or the number of tools they use. They'll be defined by the intelligence of their operating systems and the quality of the judgment their people apply to the decisions that matter.</p>
              <p style={{ marginTop:16 }}>Xizo is building the infrastructure for that future — one business-specific AI Operating System at a time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <p className="eyebrow">Our Values</p>
            <h2>What Xizo Stands For.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {VALUES.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card card-blue">
                  <div className="icon-box" style={{ marginBottom:16 }}><Icon size={20} /></div>
                  <h3 style={{ fontSize:16, marginBottom:10 }}>{v.title}</h3>
                  <p style={{ fontSize:13, margin:0, lineHeight:1.65 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <CTABanner navigate={navigate}
            title="Build the AI Operating System Your Business Actually Needs."
            sub="Audit the Business. Architect the AI. Orchestrate the Work." />
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESOURCES PAGE
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_RESOURCES = [
  { id:"r1", title:"How to Identify AI Opportunities in Your Business", category:"AI Audit", readTime:"7 min",
    excerpt:"Most businesses start with the wrong question: 'Where can we add AI?' The right question is: 'Where are we losing value?' This article explains a systematic approach to identifying genuine AI opportunities.",
    content:"The starting point for any AI initiative should be operational analysis, not technology selection. Before evaluating any AI tool or platform, a business needs to understand its own workflows in detail — where value is created, where it's transferred, and where it's lost.\n\nThe most productive AI opportunities are typically found in processes that are high-frequency, rule-based, time-sensitive, and currently dependent on human coordination. These include lead response, customer communication, data entry, report generation, approval routing, and exception handling.\n\nA structured AI audit maps these processes and quantifies the operational cost of the current approach — in time, revenue, and customer experience. This creates a ranked list of AI opportunities ordered by expected business impact, which becomes the foundation for any AI implementation plan.\n\nThe critical insight is that AI works best when it's solving a specific, well-understood problem — not when it's being introduced as a general capability. Define the problem first. The AI solution follows naturally." },
  { id:"r2", title:"AI Agents vs AI Operating Systems — What's the Difference?", category:"AI OS", readTime:"8 min",
    excerpt:"A single AI agent can automate a task. An AI Operating System coordinates an entire business workflow. Understanding the difference is critical to making the right investment in AI infrastructure.",
    content:"An AI agent is a specialized software system that performs a specific task autonomously — answering customer queries, extracting data from documents, or scheduling appointments. Individual agents can be valuable, but their value is limited to the specific task they handle.\n\nAn AI Operating System is a coordinated network of specialized agents connected through an orchestration layer. When a customer enquiry arrives, it doesn't go to one agent — it flows through a sequence of agents, each performing their specific function: understanding intent, qualifying the lead, matching products, preparing a response, booking a meeting, updating the CRM, and initiating follow-up.\n\nThe difference between an agent and an OS is coordination. A single agent is a tool. An OS is an intelligent operational infrastructure. The orchestration layer manages context passing, sequencing, priority, human approval gates, exception handling, and audit logging.\n\nMost businesses that deploy individual AI agents experience limited impact because the real operational complexity lies in the coordination between tasks — not in any individual task itself. That coordination problem is what an AI Operating System solves." },
  { id:"r3", title:"How Agent Orchestration Works", category:"Orchestration", readTime:"9 min",
    excerpt:"Agent orchestration is the discipline of connecting multiple AI agents into a coherent, reliable workflow. It's the hardest part of AI implementation — and the most important.",
    content:"When a customer sends an enquiry, a single AI agent cannot handle the full response cycle. The intent needs to be understood, the lead needs to be qualified, the right products or services need to be identified, a response needs to be drafted, a meeting needs to be booked, the CRM needs to be updated, and a follow-up sequence needs to be initiated. That's seven distinct responsibilities, each requiring different inputs, different actions, and different connections.\n\nAgent orchestration is the system that manages how these agents communicate with each other. It defines what triggers each agent, what context gets passed between agents, what actions each agent is authorized to take, when to involve a human, and how to handle exceptions.\n\nEffective orchestration requires several components: a reliable messaging layer for agent-to-agent communication, a context management system that preserves information across the workflow, a human approval gateway for consequential decisions, an exception routing system for unexpected situations, and a complete audit log of every action taken.\n\nWithout a proper orchestration layer, agents operate independently and the coordination gaps between them create exactly the kind of operational leakage that the AI was supposed to eliminate." },
  { id:"r4", title:"What Is a Business AI Audit?", category:"AI Audit", readTime:"6 min",
    excerpt:"An AI Business Audit is a structured analysis of how a business operates — where value is created, where it's lost, and where AI can create measurable impact. It's the foundation of every effective AI implementation.",
    content:"A Business AI Audit is not a technology assessment. It's an operational analysis. The audit maps how the business actually works — not how the org chart suggests it works — to identify the specific points where intelligent automation can create measurable business value.\n\nThe audit covers seven dimensions: revenue processes (where leads, customers, and opportunities are gained or lost), operational workflows (where work gets delayed, duplicated, or stuck), customer experience (where customers wait, repeat themselves, or fall through gaps), productivity patterns (where employees spend time on low-value work), data quality (where information is fragmented or inconsistent), decision-making (where approvals and judgments create delays), and risk and compliance (where exceptions are detected too late).\n\nThe output of an AI audit is a prioritized AI opportunity map — a ranked list of operational gaps where AI can create impact, ordered by expected business value. Each opportunity includes a description of the current process, a quantification of the cost of the current approach, a recommendation for the AI architecture that would address it, and an estimate of the expected business impact.\n\nThis audit output becomes the business case for AI investment and the blueprint for AI implementation." },
  { id:"r5", title:"The Value Leakage Framework", category:"Business Intelligence", readTime:"7 min",
    excerpt:"Every business has invisible operational leaks — places where revenue, productivity, customers, and opportunities are being lost without anyone systematically measuring or addressing them.",
    content:"Value leakage is a term for the operational losses that accumulate when business processes are inefficient, poorly connected, or dependent on manual coordination. Unlike a clear financial loss, value leakage is often invisible — it shows up in aggregate metrics like lower-than-expected conversion rates, higher-than-expected churn, or slower-than-expected growth, without a clear root cause being identified.\n\nThe five categories of value leakage that Xizo consistently identifies across businesses are: revenue leakage (missed leads, slow response, lost follow-ups, abandoned opportunities), productivity leakage (manual data entry, report preparation, information retrieval, repetitive coordination), customer leakage (slow support, poor onboarding, communication gaps, reactive rather than proactive engagement), operational leakage (approval delays, handoff failures, exception backlog, duplicate work), and decision leakage (delayed approvals, fragmented information, poor visibility, slow anomaly detection).\n\nQuantifying leakage is powerful because it converts an abstract operational problem into a business case. If 62 leads per month aren't responded to within the window where conversion probability is highest, and each lead has a potential value of £5,000, the monthly revenue leakage from lead response alone is £310,000. This creates a clear frame for any AI investment decision." },
  { id:"r6", title:"Building AI-Native Business Operations", category:"AI Transformation", readTime:"10 min",
    excerpt:"An AI-native business doesn't just use AI tools — it operates through AI infrastructure. Building AI-native operations requires redesigning business processes around AI capabilities, not just adding AI to existing ones.",
    content:"Most businesses approach AI by identifying their current processes and asking where AI could help. This approach produces incremental improvement but not transformation. AI-native operations require a different starting point: designing processes from scratch with AI capabilities as a core component.\n\nIn an AI-native business, high-frequency, rule-based tasks are not performed by humans — they're delegated to AI agents. Human roles evolve to focus on judgment, creativity, relationship management, and strategic decision-making. The organizational structure shifts from departments connected by manual handoffs to an integrated operating system where agents handle coordination and humans handle exceptions.\n\nBuilding AI-native operations is a staged process. The first stage is identifying the operational areas where AI will have the greatest impact (the AI Audit). The second stage is designing the agent architecture for those areas. The third stage is building the orchestration layer that connects agents into workflows. The fourth stage is redefining human roles around the new operating model. The fifth stage is continuous optimization based on operational data.\n\nThe businesses that move first and fastest toward AI-native operations will have structural cost and speed advantages that are difficult for competitors to replicate quickly." },
  { id:"r7", title:"Human + AI: Designing for the Right Balance", category:"Human + AI", readTime:"8 min",
    excerpt:"The most effective AI implementations are not the most autonomous ones. They're the ones where the division of responsibility between AI and humans is designed thoughtfully and matches the actual risk profile of each decision.",
    content:"There's a common misconception in AI implementation that more autonomy equals more value. In practice, the most effective AI deployments are designed around a careful division of responsibility — where AI handles what it does well (high-frequency, rule-based decisions at scale) and humans handle what they do well (judgment, relationships, ethics, and novel situations).\n\nDesigning this balance requires classifying every action in a workflow by two dimensions: frequency (how often does it occur?) and consequence (what happens if it goes wrong?). High-frequency, low-consequence actions should be fully automated. High-consequence actions — regardless of frequency — should involve human authorization. Novel or ambiguous situations should always escalate to human judgment.\n\nThe practical architecture for this is a three-tier model: fully autonomous (AI acts without approval for routine, low-risk actions), human approval (AI prepares the recommendation, human authorizes the action), and human escalation (AI identifies the situation and routes to the appropriate human with full context).\n\nThis model isn't just an ethical consideration — it's also a practical one. Autonomous systems without appropriate human control fail unpredictably in edge cases. Systems designed with thoughtful human oversight are more reliable, more trusted, and more effective." },
  { id:"r8", title:"Measuring AI ROI in Business Operations", category:"ROI", readTime:"7 min",
    excerpt:"AI ROI is not measured in number of agents deployed or tasks automated. It's measured in revenue recovered, hours saved, customers retained, and decisions improved. Here's how to build a credible ROI framework.",
    content:"The most common mistake in AI ROI measurement is focusing on input metrics (tasks automated, queries handled, documents processed) rather than output metrics (revenue impact, cost savings, customer outcomes). Input metrics measure activity. Output metrics measure value.\n\nA credible AI ROI framework measures five categories of business impact: revenue impact (leads converted, opportunities recovered, renewals captured, upsells completed), productivity impact (hours returned from manual work, tasks automated at scale, process cycle times reduced), customer impact (response times improved, resolution rates increased, satisfaction scores improved, churn reduced), operational impact (error rates reduced, approval times shortened, exception rates decreased), and management impact (decision-making speed improved, visibility increased, anomaly detection time reduced).\n\nFor each category, the measurement approach is: establish a baseline (current performance), estimate the AI-driven improvement (using benchmarks and business-specific modeling), and track actual results post-implementation against the baseline. The gap between baseline and actual performance, valued at the relevant business metric (revenue per lead, cost per hour, value per customer retained) provides the ROI figure.\n\nImportantly, AI ROI should be measured against the cost of the problem being solved — not against the cost of the AI solution. If lead response leakage is costing £2.4M per year in lost conversion value, and an AI solution costs £180K to deploy, the ROI calculation starts with a compelling business case before the implementation even begins." },
  { id:"r9", title:"The Future of AI-Native Companies", category:"AI Transformation", readTime:"9 min",
    excerpt:"The next decade will produce a clear divide between businesses that operate through AI infrastructure and those that continue to coordinate manually. The structural advantages of AI-native operations will compound over time.",
    content:"The competitive advantage of AI-native operations is not just efficiency — it's adaptability. A business that operates through an AI Operating System can respond to changes in demand, market conditions, or customer behavior faster than a business that depends on human coordination to implement changes across departments and systems.\n\nThe structural advantages compound over time because AI Operating Systems improve with data. Every interaction, every customer outcome, every workflow completion produces information that can be used to refine agent behavior, improve routing decisions, and optimize process sequences. A business that started its AI OS journey two years before a competitor has two years of operational data advantage that cannot be easily replicated.\n\nThe businesses that will lead their industries in 2030 are not necessarily the ones with the most resources today — they're the ones that start building their AI Operating System infrastructure now. The AI-native transition is not a one-time project; it's a continuous organizational capability that develops over years.\n\nThe analogy is the internet: in the early 2000s, building a web presence seemed optional. Within a decade, businesses without a digital infrastructure were structurally disadvantaged. AI infrastructure will follow the same pattern, on a faster timeline. The question for any business today is not whether to build AI-native operations, but when and how." },
  { id:"r10", title:"Business Process Intelligence — The Foundation of Effective AI", category:"Business Intelligence", readTime:"8 min",
    excerpt:"AI without business process intelligence is a solution looking for a problem. Process intelligence — understanding how your business actually operates — is the foundation of every effective AI implementation.",
    content:"Business process intelligence is the discipline of understanding, in detail, how work actually happens within an organization — as opposed to how it's supposed to happen according to policies and org charts. The gap between the two is almost always significant, and it's in that gap that the most valuable AI opportunities are found.\n\nProcess intelligence covers four dimensions: process mapping (what are the actual steps, sequences, and handoffs in each workflow?), resource analysis (who does what, and how much time does it take?), performance measurement (what are the current throughput, quality, and completion metrics?), and gap identification (where do bottlenecks, failures, delays, and errors occur?).\n\nFor AI implementation, process intelligence is invaluable because it prevents the most common AI implementation failure mode: automating a broken process. If a process is inefficient, inconsistent, or poorly designed, automating it doesn't fix it — it makes the broken process run faster. The AI Audit addresses this by mapping the process first, redesigning it where necessary, and only then defining the AI architecture that will execute it.\n\nProcess intelligence also provides the baseline metrics that make ROI measurement possible. Without understanding the current state of a process — how long it takes, how much it costs, how often it fails — it's impossible to measure the value created by AI intervention. The businesses that invest in process intelligence before AI implementation consistently achieve better outcomes, faster." },
];

function ResourcesPage({ navigate }) {
  const articles = resources?.length ? resources : FALLBACK_RESOURCES;
  const [selected, setSelected] = useState(null);
  const categories = ["All", ...new Set(articles.map(a => a.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = articles.filter(a =>
    activeCategory === "All" || a.category === activeCategory
  );

  if (selected) {
    const art = articles.find(a => a.id === selected);
    if (art) return (
      <main style={{ paddingTop:"var(--nav-h)" }}>
        <section className="page-section">
          <div className="section-inner-sm">
            <button className="btn-text" style={{ marginBottom:32 }} onClick={() => setSelected(null)}>
              <ChevronLeft size={15} /> Back to Resources
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <span className="badge badge-blue">{art.category}</span>
              <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--muted)" }}>{art.readTime} read</span>
            </div>
            <h1 style={{ fontSize:"clamp(28px,4vw,44px)", marginBottom:24, lineHeight:1.2 }}>{art.title}</h1>
            <p style={{ fontSize:18, color:"var(--white-2)", lineHeight:1.7, marginBottom:40, fontStyle:"italic" }}>{art.excerpt}</p>
            <hr className="divider" />
            {art.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize:16, lineHeight:1.8, marginBottom:24, color:"var(--white-2)" }}>{para}</p>
            ))}
            <hr className="divider" />
            <CTABanner navigate={navigate}
              title="Ready to Apply These Insights to Your Business?"
              sub="Request an AI Business Audit and identify your specific opportunities." />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Resources & Insights</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Practical Intelligence for AI-Native Business Leaders.
          </h1>
          <p className="lead" style={{ maxWidth:560 }}>
            In-depth analysis on AI Operating Systems, agent orchestration, business audits, and the future of AI-native operations.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:40 }}>
            {categories.map(cat => (
              <button key={cat} className={`problem-filter-btn ${activeCategory===cat?"active":""}`}
                onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="resources-grid">
            {filtered.map(art => (
              <div key={art.id} className="resource-card" onClick={() => setSelected(art.id)}>
                <div className="resource-card-header">
                  <span className="badge badge-blue">{art.category}</span>
                </div>
                <div className="resource-card-body">
                  <h3>{art.title}</h3>
                  <p>{art.excerpt}</p>
                </div>
                <div className="resource-card-footer">
                  <span className="resource-time">{art.readTime} read</span>
                  <span className="btn-text" style={{ fontSize:12 }}>Read Article <ArrowRight size={13} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({
    name:"", company:"", email:"", website:"", industry:"",
    size:"", challenge:"", stack:"", notes:""
  });
  const [submitted, setSubmitted] = useState(false);
  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <main style={{ paddingTop:"var(--nav-h)", minHeight:"80vh", display:"flex", alignItems:"center" }}>
      <div className="section-inner" style={{ textAlign:"center", maxWidth:560, margin:"0 auto" }}>
        <div className="icon-box icon-box-lg icon-box-green" style={{ margin:"0 auto 24px" }}>
          <CheckCircle size={28} />
        </div>
        <h2 style={{ marginBottom:16 }}>Your AI transformation journey starts here.</h2>
        <p>We've received your request and will review your information. Our team will be in touch within 24 hours to discuss your AI Business Audit.</p>
      </div>
    </main>
  );

  const INDUSTRIES = ["Real Estate","Healthcare","Finance & Insurance","Professional Services",
    "Automotive","E-commerce","Manufacturing","Education","Hospitality","Logistics","Construction","SaaS / Technology","Other"];
  const SIZES = ["1–10 employees","11–50 employees","51–200 employees","201–500 employees","500+ employees"];

  return (
    <main style={{ paddingTop:"var(--nav-h)" }}>
      <section className="page-section grid-bg">
        <div className="section-inner">
          <p className="eyebrow">Contact / AI Audit</p>
          <h1 className="display-lg" style={{ maxWidth:700, marginBottom:20 }}>
            Find Out What AI Could Actually Do for Your Business.
          </h1>
          <p className="lead" style={{ maxWidth:540 }}>
            Don't guess where AI belongs. Let Xizo analyze your business and identify the highest-impact opportunities.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background:"var(--surface)" }}>
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <h2 style={{ fontSize:28, marginBottom:16 }}>Let's Start with Your Business.</h2>
              <p style={{ fontSize:15, lineHeight:1.75, marginBottom:32 }}>
                Every AI Business Audit starts with a conversation about how your business works, where it's under-performing, and where you want to take it. Tell us about your business and we'll design the right approach.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Mail size={16} /></div>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:xizo.ai.group@gmail.com">xizo.ai.group@gmail.com</a></p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Phone size={16} /></div>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+916382347050">+91 638 234 7050</a></p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><MessageSquare size={16} /></div>
                  <div>
                    <strong>WhatsApp</strong>
                    <p><a href="https://wa.me/916382347050" target="_blank" rel="noopener noreferrer">+91 638 234 7050</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h3 style={{ fontSize:20, marginBottom:24 }}>Request an AI Business Audit</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={update("name")} placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Company *</label>
                    <input type="text" value={form.company} onChange={update("company")} placeholder="Your company" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Work Email *</label>
                    <input type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" required />
                  </div>
                  <div className="form-field">
                    <label>Company Website</label>
                    <input type="url" value={form.website} onChange={update("website")} placeholder="https://yourcompany.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Industry *</label>
                    <select value={form.industry} onChange={update("industry")} required>
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Company Size</label>
                    <select value={form.size} onChange={update("size")}>
                      <option value="">Select size</option>
                      {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label>Primary Business Challenge *</label>
                  <textarea value={form.challenge} onChange={update("challenge")} required
                    placeholder="What's the biggest operational challenge or growth bottleneck your business is facing?" />
                </div>
                <div className="form-field">
                  <label>Current Technology Stack</label>
                  <input type="text" value={form.stack} onChange={update("stack")}
                    placeholder="e.g. Salesforce, HubSpot, Google Workspace, Xero..." />
                </div>
                <div className="form-field">
                  <label>Additional Information</label>
                  <textarea value={form.notes} onChange={update("notes")} style={{ minHeight:80 }}
                    placeholder="Anything else that would help us understand your business and objectives." />
                </div>
                <button type="submit" className="btn-primary form-submit">
                  Submit Request <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const { route, navigate } = useRouter();

  const renderPage = () => {
    switch (route.page) {
      case "home":          return <HomePage          navigate={navigate} />;
      case "audit":         return <AuditPage         navigate={navigate} />;
      case "ai-os":         return <AIOSPage          navigate={navigate} />;
      case "agents":        return <AgentArchPage     navigate={navigate} />;
      case "orchestration": return <OrchestrationPage navigate={navigate} />;
      case "problems":      return <ProblemsPage      navigate={navigate} />;
      case "industries":    return route.sub
        ? <IndustryDetailPage industryId={route.sub} navigate={navigate} />
        : <IndustriesPage navigate={navigate} />;
      case "how-it-works":  return <HowItWorksPage    navigate={navigate} />;
      case "use-cases":     return <UseCasesPage      navigate={navigate} />;
      case "roi":           return <ROIPage           navigate={navigate} />;
      case "integrations":  return <IntegrationsPage  navigate={navigate} />;
      case "human-ai":      return <HumanAIPage       navigate={navigate} />;
      case "about":         return <AboutPage         navigate={navigate} />;
      case "resources":     return <ResourcesPage     navigate={navigate} />;
      case "contact":       return <ContactPage />;
      default:              return <HomePage          navigate={navigate} />;
    }
  };

  return (
    <>
      <Nav route={route} navigate={navigate} />
      {renderPage()}
      <Footer navigate={navigate} />
    </>
  );
}
