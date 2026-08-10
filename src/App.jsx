import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Bot, Brain, BrainCircuit,
  Building2, CheckCircle, ChevronDown, ChevronLeft,
  ChevronRight, Clock, Cog, DollarSign, FileText,
  HeartPulse, Lightbulb, Mail, MessageSquare, Pause,
  Phone, Play, RotateCcw, Search, Settings, Shield,
  ShieldCheck, Sparkles, Target, TrendingUp, Users,
  Zap, Car, ShoppingBag, Factory, GraduationCap,
  Hotel, Truck, HardHat, Code2, AlertTriangle,
  Activity, Database, Link, X, Menu, Home,
  ArrowUpRight, CheckCheck, Briefcase
} from "lucide-react";
import { animate, spring } from "motion";
import xizoLogo from "./assets/xizo-logo-white.png";
import "./index.css";

// ── Apple spring presets ──────────────────────────────────────────────────────
// Damping ratio 1.0 = critically damped (no overshoot) — default for UI
// Damping ratio 0.8 = slight bounce — only for momentum-driven interactions
const SPR_DEFAULT  = { type: "spring", bounce: 0,   duration: 0.38 };
const SPR_SNAPPY   = { type: "spring", bounce: 0,   duration: 0.28 };
const SPR_BOUNCE   = { type: "spring", bounce: 0.22, duration: 0.4  }; // flick/momentum only
const SPR_SLOW     = { type: "spring", bounce: 0,   duration: 0.55 };

// ── Reduced motion detection ──────────────────────────────────────────────────
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Spring entrance hook — page-level ────────────────────────────────────────
// Apple: pages enter from the same axis they exit; no overshoot on page enter
function useSpringEntrance(ref) {
  useEffect(() => {
    if (!ref.current || reducedMotion()) return;
    animate(
      ref.current,
      { opacity: [0, 1], y: [14, 0] },
      SPR_DEFAULT
    );
  }, [ref]);
}

// ── Spring card hover — wire to JS for interruptibility ───────────────────────
function useSpringCard(ref) {
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const enter = () => animate(el, { y: -4, scale: 1.000 }, SPR_BOUNCE);
    const leave = () => animate(el, { y: 0,  scale: 1.000 }, SPR_DEFAULT);
    const press = () => animate(el, { y: -1, scale: 0.990 }, SPR_SNAPPY);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("pointerdown", press);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); el.removeEventListener("pointerdown", press); };
  }, [ref]);
}

// ── Intersection observer — animate on scroll ─────────────────────────────────
function useReveal(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(el, { opacity: [0, 1], y: [16, 0] }, { ...SPR_DEFAULT, delay });
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

// ── Data ─────────────────────────────────────────────────────────────────────
let industries, businessProblems, useCases, agentTypes, resources,
    stagesPipeline, leakCategories;
try {
  const d = await import("./xizoData.js");
  industries       = d.industries;
  businessProblems = d.businessProblems;
  useCases         = d.useCases;
  agentTypes       = d.agentTypes;
  resources        = d.resources;
  stagesPipeline   = d.stagesPipeline;
  leakCategories   = d.leakCategories;
} catch { industries=[]; businessProblems=[]; useCases=[]; agentTypes=[]; resources=[]; stagesPipeline=[]; leakCategories=[]; }

// ── Router ────────────────────────────────────────────────────────────────────
function parseHash() { const h=window.location.hash.replace("#","") || "home"; const [page,...r]=h.split("/"); return {page,sub:r.join("/")}; }
function useRouter() {
  const [route,setRoute]=useState(parseHash);
  useEffect(()=>{ const h=()=>setRoute(parseHash()); window.addEventListener("hashchange",h); return ()=>window.removeEventListener("hashchange",h); },[]);
  const navigate=useCallback((page,sub)=>{ window.location.hash=sub?`${page}/${sub}`:page; window.scrollTo({top:0,behavior:"instant"}); },[]);
  return {route,navigate};
}

// ── Industry icons ─────────────────────────────────────────────────────────────
const IICONS = {"real-estate":Home,"healthcare":HeartPulse,"finance":DollarSign,"professional-services":Briefcase,"automotive":Car,"ecommerce":ShoppingBag,"manufacturing":Factory,"education":GraduationCap,"hospitality":Hotel,"logistics":Truck,"construction":HardHat,"saas":Code2};
const ICOLORS = {"real-estate":"#5f61ed","healthcare":"#22c55e","finance":"#f59e0b","professional-services":"#7c3aed","automotive":"#ef4444","ecommerce":"#06b6d4","manufacturing":"#f97316","education":"#8b5cf6","hospitality":"#ec4899","logistics":"#14b8a6","construction":"#84cc16","saas":"#3b82f6"};

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV=[
  {l:"AI Audit",p:"audit"},{l:"AI OS",p:"ai-os"},{l:"Orchestration",p:"orchestration"},
  {l:"Industries",p:"industries"},{l:"Use Cases",p:"use-cases"},{l:"Business Problems",p:"problems"},
  {l:"Resources",p:"resources"},{l:"About",p:"about"},
];

function Nav({route,navigate}) {
  const [open,setOpen]=useState(false);
  return (
    <>
      <header className="site-nav">
        <div className="nav-inner">
          <img src={xizoLogo} alt="Xizo" className="nav-logo" onClick={()=>navigate("home")}
            style={{filter:"brightness(0)"}} />
          <nav className="nav-links">
            {NAV.map(n=><button key={n.p} className={`nav-link${route.page===n.p?" active":""}`} onClick={()=>navigate(n.p)}>{n.l}</button>)}
          </nav>
          <div className="nav-actions">
            <button className="btn btn-outline btn-sm" onClick={()=>navigate("contact")}>Log in</button>
            <button className="btn btn-primary btn-sm nav-cta" onClick={()=>navigate("contact")}>
              Request AI Audit <ArrowRight size={13}/>
            </button>
            <button className="nav-ham" onClick={()=>setOpen(o=>!o)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>
      <div className={`mob-menu${open?" open":""}`}>
        {NAV.map(n=><button key={n.p} className="mob-link" onClick={()=>{navigate(n.p);setOpen(false);}}>{n.l}</button>)}
        <button className="btn btn-primary" style={{marginTop:20,width:"100%",justifyContent:"center"}} onClick={()=>{navigate("contact");setOpen(false);}}>
          Request AI Audit <ArrowRight size={14}/>
        </button>
      </div>
    </>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({navigate}) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={xizoLogo} alt="Xizo" className="footer-logo"/>
            <p>We audit your business, identify where value is lost, and build the AI Operating System to solve it.</p>
            <p className="footer-brand-sub">The AI Operating System Company</p>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <div className="footer-links">
              {[["AI Audit","audit"],["AI OS","ai-os"],["Agent Orchestration","orchestration"],
                ["How Xizo Works","how-it-works"],["Integrations","integrations"]].map(([l,p])=>(
                <span key={p} className="footer-link" onClick={()=>navigate(p)}>{l}</span>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Industries</h5>
            <div className="footer-links">
              {["Real Estate","Healthcare","Finance","Professional Services","Automotive"].map(l=>(
                <span key={l} className="footer-link" onClick={()=>navigate("industries")}>{l}</span>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <div className="footer-links">
              {[["About","about"],["Resources","resources"],["Use Cases","use-cases"],["Contact","contact"]].map(([l,p])=>(
                <span key={p} className="footer-link" onClick={()=>navigate(p)}>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Xizo. The AI Operating System Company.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── CTA Band ──────────────────────────────────────────────────────────────────
function CTABand({navigate,title,sub}) {
  return (
    <div className="cta-band">
      <p className="label label-blue" style={{marginBottom:12}}>Get Started</p>
      <h2 className="section-title" style={{maxWidth:600,margin:"0 auto 14px"}}>{title||"Find Out What AI Could Actually Do for Your Business."}</h2>
      <p className="body-lg" style={{maxWidth:500,margin:"0 auto 36px"}}>{sub||"Don't guess where AI belongs. Let Xizo analyse your operations and identify the highest-impact opportunities."}</p>
      <div className="btn-row" style={{justifyContent:"center"}}>
        <button className="btn btn-primary btn-lg" onClick={()=>navigate("contact")}>Request an AI Audit <ArrowRight size={16}/></button>
        <button className="btn btn-outline btn-lg" onClick={()=>navigate("how-it-works")}>See How Xizo Works</button>
      </div>
    </div>
  );
}

// ── OS Visualization ──────────────────────────────────────────────────────────
const OS_NODES=[
  {icon:"💼",label:"Sales"},
  {icon:"📣",label:"Marketing"},
  {icon:"💬",label:"Support"},
  {icon:"💰",label:"Finance"},
  {icon:"⚙️",label:"Operations"},
  {icon:"👥",label:"HR"},
  {icon:"📊",label:"Analytics"},
];

function OSVisualization() {
  const flows=["Lead Response","CRM Update","Invoice Processing","Report Generation","Follow-up Sequence","Approval Routing","Data Sync"];
  return (
    <div className="hero-glass-card">
      <div className="hero-glass-glow"/>
      <div className="os-canvas">
        <div className="os-top-bar">
          <div className="os-dot" style={{background:"#fc5c65"}}/>
          <div className="os-dot" style={{background:"#ffd32a"}}/>
          <div className="os-dot" style={{background:"#05c46b"}}/>
          <span style={{fontSize:11,color:"var(--muted-2)",marginLeft:6,fontWeight:600}}>Xizo AI OS — Live Dashboard</span>
        </div>
        <div className="os-center-hub">
          <span className="os-hub-label">XIZO OS</span>
          <span className="os-hub-name">AI Orchestrator</span>
        </div>
        <div className="os-spokes">
          {OS_NODES.map((n,i)=>(
            <div key={i} className="os-connector-col">
              <div className="os-v-line"/>
              <div className="os-node">
                <span className="os-node-icon">{n.icon}</span>
                <span className="os-node-label">{n.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="os-data-flow">
          {flows.map((f,i)=>(
            <div key={i} className="os-flow-chip" style={{animationDelay:`${i*0.3}s`}}>
              <span className="dot"/>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Orchestration Canvas ──────────────────────────────────────────────────────
const AGENTS=[
  {name:"Lead Intelligence Agent",  role:"Captures and parses inbound enquiry, extracts intent and context", status:"PARSING"},
  {name:"Qualification Agent",      role:"Scores lead against business criteria, assigns tier",               status:"SCORING"},
  {name:"Property Matching Agent",  role:"Finds top matching inventory based on requirements",                 status:"MATCHING"},
  {name:"Sales Agent",              role:"Drafts personalised response and proposal",                          status:"DRAFTING"},
  {name:"Scheduling Agent",         role:"Books viewing slot directly in salesperson calendar",               status:"BOOKING"},
  {name:"CRM Agent",                role:"Creates contact, logs interaction, tags lead status",               status:"LOGGING"},
  {name:"Follow-up Agent",          role:"Initiates structured follow-up sequence",                           status:"QUEUING"},
  {name:"Analytics Agent",          role:"Updates pipeline metrics and conversion tracking",                  status:"UPDATING"},
];

function OrchestrationCanvas() {
  const [idx,setIdx]=useState(-1);
  const [playing,setPlaying]=useState(false);
  const t=useRef(null);
  const play=()=>{
    setIdx(-1); setPlaying(true); let i=0;
    const step=()=>{ setIdx(i); i++; if(i<AGENTS.length){t.current=setTimeout(step,850);}else{setPlaying(false);} };
    t.current=setTimeout(step,300);
  };
  const reset=()=>{clearTimeout(t.current);setIdx(-1);setPlaying(false);};
  useEffect(()=>()=>clearTimeout(t.current),[]);
  return (
    <div className="orch-wrap">
      <div className="orch-header">
        <div>
          <p className="label label-blue" style={{marginBottom:4}}>Live Simulation</p>
          <h3 style={{fontSize:17,fontWeight:700,color:"var(--ink)"}}>Agent Orchestration in Action</h3>
        </div>
        {idx===AGENTS.length-1&&(
          <div className="tag tag-green" style={{gap:6}}>
            <CheckCheck size={12}/> All Complete
          </div>
        )}
      </div>
      <div className="orch-input-card">
        <MessageSquare size={15} className="orch-input-icon"/>
        <div>
          <div className="orch-input-label">Customer Message Received</div>
          <div className="orch-input-text">"Looking for a 3-bed apartment near city centre, budget £450k. Please contact me."</div>
        </div>
      </div>
      <div className="orch-flow">
        {AGENTS.map((a,i)=>{
          const isActive=i===idx, isDone=i<idx;
          return (
            <div key={i} className={`orch-row vis${isActive?" active":""}${isDone?" done":""}`} style={{transitionDelay:`${i*0.04}s`}}>
              <div className="orch-spine">
                <div className="orch-dot"/>
                {i<AGENTS.length-1&&<div className="orch-conn"/>}
              </div>
              <div className="orch-card">
                <div style={{flex:1}}>
                  <div className="orch-agent-name">{a.name}</div>
                  <div className="orch-sub">{a.role}</div>
                </div>
                <div className="orch-status">{isDone?"✓ DONE":isActive?a.status:"WAITING"}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="orch-controls">
        <button className="orch-play" onClick={playing?undefined:play} disabled={playing}>
          {playing?<><Pause size={14}/>Running…</>:<><Play size={14}/>Play Simulation</>}
        </button>
        <button className="orch-reset" onClick={reset}><RotateCcw size={12}/>Reset</button>
      </div>
    </div>
  );
}

// ── Leak Scanner ──────────────────────────────────────────────────────────────
const LEAKS=[
  {id:"revenue",l:"Revenue",items:[
    {t:"Missed Lead Response",m:"62%",d:"of leads not responded to within 5 minutes are lost to competitors"},
    {t:"Follow-up Leakage",m:"23%",d:"of qualified opportunities receive insufficient follow-up and fall out of pipeline"},
    {t:"Missed Renewals",m:"18%",d:"of subscription renewals missed due to lack of proactive outreach"},
    {t:"Slow Quotation",m:"3.2d",d:"average time to deliver a quotation — competitors respond same day"},
  ]},
  {id:"productivity",l:"Productivity",items:[
    {t:"Manual Data Entry",m:"14h",d:"per employee per week spent on manual data entry and system updates"},
    {t:"Report Preparation",m:"8h",d:"per manager per week collecting and formatting reports from multiple systems"},
    {t:"Information Searching",m:"4.5h",d:"per employee per day searching for information across disconnected systems"},
    {t:"Repeated Admin",m:"31%",d:"of employee time spent on repetitive tasks that could be automated"},
  ]},
  {id:"customer",l:"Customer",items:[
    {t:"Slow Support Response",m:"6.2h",d:"average customer support response time — customers expect under 2 hours"},
    {t:"Customer Churn",m:"15%",d:"of customers leave annually due to poor communication and slow support"},
    {t:"Onboarding Drop-off",m:"28%",d:"of new customers don't complete onboarding due to poor handoff"},
    {t:"Repeated Information",m:"67%",d:"of customers must repeat themselves when transferred between departments"},
  ]},
  {id:"operations",l:"Operations",items:[
    {t:"Approval Delays",m:"4.7d",d:"average time for approvals that could be resolved with clear authorisation rules"},
    {t:"Handoff Failures",m:"22%",d:"of work items lost or delayed during department-to-department handoffs"},
    {t:"Exception Backlog",m:"38%",d:"of operational exceptions aren't resolved within expected SLA timeframes"},
    {t:"Duplicate Work",m:"11%",d:"of work duplicated due to lack of visibility between teams and systems"},
  ]},
  {id:"decision",l:"Decision",items:[
    {t:"Delayed Decisions",m:"2.8d",d:"average time to make operational decisions due to missing or fragmented data"},
    {t:"Data Inconsistency",m:"41%",d:"of managers report inconsistent data between their reporting systems"},
    {t:"Anomaly Detection",m:"72h",d:"average time before operational exceptions are identified and escalated"},
    {t:"Visibility Gaps",m:"56%",d:"of leaders lack real-time visibility into operational performance"},
  ]},
];

function LeakScanner() {
  const [active,setActive]=useState("revenue");
  const tab=LEAKS.find(t=>t.id===active);
  return (
    <div className="leak-shell">
      <div className="leak-tabs">
        {LEAKS.map(t=><button key={t.id} className={`leak-tab${active===t.id?" on":""}`} onClick={()=>setActive(t.id)}>{t.l}</button>)}
      </div>
      <div className="leak-body">
        <div className="leak-items">
          {tab.items.map((item,i)=>(
            <div key={i} className="leak-item">
              <div className="leak-item-top">
                <AlertTriangle size={13} style={{color:"#dc2626",flexShrink:0}}/>
                <h4>{item.t}</h4>
              </div>
              <div className="leak-metric">{item.m}</div>
              <div className="leak-desc">{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ROI Calculator ────────────────────────────────────────────────────────────
function ROICalculator() {
  const [f,setF]=useState({leads:200,val:5000,rt:3,conv:12,hrs:40,cost:35});
  const s=(k,v)=>setF(p=>({...p,[k]:Number(v)||0}));
  const leads2=Math.round(f.leads*0.18);
  const rev=Math.round(leads2*f.val*(f.conv/100)*12);
  const hrs=Math.round(f.hrs*0.35*52);
  const prod=Math.round(hrs*f.cost);
  const fmt=n=>n>=1e6?`£${(n/1e6).toFixed(1)}M`:n>=1e3?`£${(n/1e3).toFixed(0)}K`:`£${n}`;
  const fields=[["Monthly Leads","leads",""],["Avg Customer Value (£)","val",""],["Lead Response Time (hrs)","rt",""],["Conversion Rate (%)","conv",""],["Weekly Manual Task Hours","hrs",""],["Avg Hourly Labour Cost (£)","cost",""]];
  return (
    <div className="roi-shell">
      <div className="roi-grid">
        <div className="roi-inputs">
          <h3>Your Business Inputs</h3>
          {fields.map(([label,key])=>(
            <div className="roi-field" key={key}>
              <label>{label}</label>
              <input type="number" value={f[key]} onChange={e=>s(key,e.target.value)} min={0}/>
            </div>
          ))}
        </div>
        <div className="roi-results">
          <h3>Potential Opportunity</h3>
          <div className="roi-result-item">
            <div className="roi-result-label">Recoverable Revenue / Year</div>
            <div className="roi-result-value c-blue">{fmt(rev)}</div>
          </div>
          <div className="roi-result-item">
            <div className="roi-result-label">Productivity Value / Year</div>
            <div className="roi-result-value c-green">{fmt(prod)}</div>
          </div>
          <div className="roi-result-item">
            <div className="roi-result-label">Hours Returned / Year</div>
            <div className="roi-result-value c-violet">{hrs.toLocaleString()}h</div>
          </div>
          <p className="roi-disclaimer">
            <ShieldCheck size={12} style={{display:"inline",marginRight:4,verticalAlign:"middle"}}/>
            Indicative estimates based on industry benchmarks. An AI Audit provides data-driven analysis specific to your business.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Audit Dashboard ───────────────────────────────────────────────────────────
function AuditDashboard() {
  const opps=[
    {num:"01",title:"Lead Response Gap",impact:"HIGH",desc:"Inbound enquiries are assigned manually after an average 2h 47m delay. Intent signals deteriorate rapidly after 5 minutes.",
      mets:[{l:"Current Response",v:"2h 47m",c:"bad"},{l:"AI Target",v:"< 2 min",c:"good"},{l:"Leads at Risk/Mo",v:"73",c:"bad"}],
      agents:"Lead Intelligence + Qualification + Response Agents"},
    {num:"02",title:"Follow-up Leakage",impact:"HIGH",desc:"23% of qualified opportunities receive only one follow-up before being abandoned. No structured re-engagement exists.",
      mets:[{l:"Follow-up Gap",v:"23%",c:"bad"},{l:"Touchpoints/Lead",v:"1.4",c:"bad"},{l:"Industry Best",v:"7–12",c:"good"}],
      agents:"Follow-up + CRM + Sales Orchestration Agents"},
    {num:"03",title:"Manual Reporting Overhead",impact:"MEDIUM",desc:"14 hours per week spent by management manually collecting and formatting performance reports.",
      mets:[{l:"Hours/Week",v:"14h",c:"bad"},{l:"Reports Delayed",v:"62%",c:"bad"},{l:"With AI",v:"Real-time",c:"good"}],
      agents:"Analytics + Reporting + Data Intelligence Agents"},
  ];
  const ic={HIGH:"#dc2626",MEDIUM:""};
  return (
    <div className="audit-dash">
      <div className="audit-dash-bar">
        <span className="audit-dash-title">Xizo AI Audit — Sample Output</span>
        <div className="audit-counts">
          {[["17","Total Gaps"],["5","High"],["8","Medium"],["4","Low"]].map(([n,l])=>(
            <div key={l} className="audit-count"><div className="audit-count-num">{n}</div><div className="audit-count-lbl">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="audit-opps">
        {opps.map(o=>(
          <div key={o.num} className="audit-opp">
            <div className="audit-opp-num">{o.num}</div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <h4 style={{margin:0}}>{o.title}</h4>
                <span className={`tag ${o.impact==="HIGH"?"tag-red":"tag-amber"}`}>{o.impact}</span>
              </div>
              <p>{o.desc}</p>
              <div className="audit-mets">
                {o.mets.map(m=><div key={m.l} className={`audit-met ${m.c}`}><label>{m.l}</label><span>{m.v}</span></div>)}
              </div>
              <p style={{fontSize:12,color:"var(--muted-2)",marginTop:8}}>
                <span style={{color:"var(--blue)",fontWeight:700}}>AI Architecture: </span>{o.agents}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
const CAPS=["Business AI Audit","Revenue Leakage Detection","Agent Orchestration","Workflow Intelligence","CRM Integration","WhatsApp AI","Voice Agents","EHR / EMR Sync","Approval Workflows","Real-Time Analytics","Lead Management","Human-in-the-Loop","Document AI","Finance Automation","Knowledge Engine","Anomaly Detection"];

function HomePage({navigate}) {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const metricsRef = useRef(null);

  // Apple: hero entrance — critical-damped spring, enter from Y axis
  useEffect(() => {
    if (reducedMotion()) return;
    if (heroRef.current)
      animate(heroRef.current, { opacity:[0,1], y:[20,0] }, { ...SPR_DEFAULT, delay: 0.05 });
    if (visualRef.current)
      animate(visualRef.current, { opacity:[0,1], y:[28,0], scale:[0.97,1] }, { ...SPR_SLOW, delay: 0.2 });
  }, []);

  useReveal(metricsRef, 0);

  const PROBLEMS=[
    {q:"Where are you losing revenue?",a:"Leads falling through gaps, follow-up leakage, slow response times"},
    {q:"Where are customers falling through the cracks?",a:"Support delays, onboarding drop-off, poor communication handoffs"},
    {q:"Where is work getting stuck?",a:"Manual approval delays, department handoff failures, exception backlogs"},
    {q:"Where are employees wasting time?",a:"Manual data entry, report preparation, information retrieval"},
    {q:"Where are decisions being delayed?",a:"Missing data, approval bottlenecks, fragmented visibility"},
    {q:"Where is information fragmented?",a:"Disconnected systems, duplicate records, knowledge silos"},
  ];
  const STAGES=[
    {n:"01",t:"Audit",d:"Map every process, system, and workflow. Understand where value is created and where it's lost.",icon:Search},
    {n:"02",t:"Discover",d:"Identify the highest-impact AI opportunities, ranked by business value.",icon:Lightbulb},
    {n:"03",t:"Architect",d:"Design the specific combination of AI agents your business needs.",icon:BrainCircuit},
    {n:"04",t:"Orchestrate",d:"Connect agents into coordinated workflows that integrate with your existing systems.",icon:Cog},
    {n:"05",t:"Optimize",d:"Continuously measure agent performance and refine workflows based on real outcomes.",icon:TrendingUp},
  ];

  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          {/* Apple: assign ref, animate from current value, no overshoot */}
          <div className="hero-copy" ref={heroRef} style={{opacity:0}}>
            <div className="pill" style={{marginBottom:24}}>
              <span className="pill-dot"/>
              The AI Operating System Company
            </div>
            <h1 className="hero-title" style={{marginBottom:24}}>
              Audit the Business.<br/>
              <em>Architect</em> the AI.<br/>
              Orchestrate the Work.
            </h1>
            <p className="hero-sub">
              Xizo audits how your business works, identifies where value is being lost, and builds a coordinated network of AI agents that operates around your real workflows.
            </p>
            <div className="btn-row" style={{justifyContent:"center",marginBottom:16}}>
              <button className="btn btn-primary btn-lg" onClick={()=>navigate("contact")}>
                Start Your AI Audit <ArrowRight size={16}/>
              </button>
              <button className="btn btn-outline btn-lg" onClick={()=>navigate("how-it-works")}>
                See How Xizo Works
              </button>
            </div>
            <p style={{fontSize:12,color:"var(--muted-2)",display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}>
              <ShieldCheck size={13} style={{color:"var(--green)"}}/>
              Business-first AI · Human-controlled · Measurable outcomes
            </p>
          </div>
          {/* Apple: visual enters later, slight scale spring — feels like it materializes */}
          <div className="hero-visual-wrap" ref={visualRef} style={{opacity:0}}>
            <OSVisualization/>
          </div>
        </div>
      </section>

      {/* CAPABILITY STRIP */}
      <div className="cap-strip">
        {[CAPS.slice(0,8),CAPS.slice(8)].map((row,ri)=>(
          <div key={ri} className="cap-row">
            {row.map((c,i)=>(
              <span key={c} className="cap-item">
                {i>0&&<span className="cap-sep"/>}
                <span className="cap-dot"/>{c}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* BUSINESS PROBLEM SECTION */}
      <section className="section section-bg">
        <div className="wrap">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
            <div>
              <p className="label" style={{marginBottom:12}}>The Core Problem</p>
              <h2 className="section-title" style={{marginBottom:20}}>
                We Don't Ask Where AI Can Help.<br/>
                <em>We Ask Where You're Losing Value.</em>
              </h2>
              <p className="body-lg">Most businesses are full of software — CRM, ERP, email, accounting, helpdesk — but employees still spend hours connecting everything manually.</p>
              <p className="body-md" style={{marginTop:16}}>Xizo starts by identifying the exact points where revenue, time, and customer relationships are being lost. Then it builds the AI to fix them.</p>
              <button className="btn btn-ghost" style={{marginTop:28}} onClick={()=>navigate("audit")}>
                Learn About the AI Audit <ArrowRight size={14}/>
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {PROBLEMS.map((p,i)=>(
                <div key={i} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"14px 18px",transition:"all var(--t)"}}>
                  <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:4}}>{p.q}</div>
                  <div style={{fontSize:12,color:"var(--muted)"}}>{p.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE LEAK SCANNER */}
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">The Value Leak Framework</p>
            <h2 className="section-title">Every Business Has Invisible Operational Leaks.</h2>
            <p className="body-lg">Before building any AI, Xizo audits where your business is losing value. These are the most common leakage patterns we find.</p>
          </div>
          <LeakScanner/>
        </div>
      </section>

      {/* 5 STAGES */}
      <section className="section section-bg">
        <div className="wrap">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}}>
            <div>
              <p className="label" style={{marginBottom:12}}>The Xizo Method</p>
              <h2 className="section-title" style={{marginBottom:20}}>
                We Don't Start With Agents.<br/>
                <em>We Start With Your Business.</em>
              </h2>
              <p className="body-lg">Most AI projects fail because they start with technology. We start with the business problem — then design the AI architecture to solve it.</p>
              <button className="btn btn-primary" style={{marginTop:28}} onClick={()=>navigate("how-it-works")}>
                How Xizo Works <ArrowRight size={14}/>
              </button>
            </div>
            <div className="step-flow">
              {STAGES.map((s,i)=>(
                <div key={s.n} className="step-row">
                  <div className="step-spine">
                    <div className="step-dot">{s.n}</div>
                    {i<STAGES.length-1&&<div className="step-line"/>}
                  </div>
                  <div className="step-body">
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORCHESTRATION PREVIEW */}
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">Agent Orchestration</p>
            <h2 className="section-title">See How Agents Work Together <em>as a System.</em></h2>
            <p className="body-lg">Watch a real customer enquiry flow through the Xizo agent network — from first contact to booked meeting, CRM update, and follow-up initiation.</p>
          </div>
          <OrchestrationCanvas/>
          <div style={{textAlign:"center",marginTop:24}}>
            <button className="btn btn-ghost" onClick={()=>navigate("orchestration")}>Explore Full Orchestration <ArrowRight size={14}/></button>
          </div>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="section section-bg">
        <div className="wrap">
          <div className="sh">
            <p className="label">12 Industry AI Operating Systems</p>
            <h2 className="section-title">Purpose-Built AI for the Way <em>Your Industry</em> Actually Works.</h2>
            <p className="body-lg">Xizo doesn't sell the same AI to every business. Each deployment is designed around the specific workflows of your sector.</p>
          </div>
          <div className="ind-grid">
            {(industries||[]).slice(0,6).map(ind=>{
              const Icon=IICONS[ind.id]||Building2, c=ICOLORS[ind.id]||"#5f61ed";
              return (
                <div key={ind.id} className="ind-card" style={{"--acc":c}} onClick={()=>navigate("industries",ind.id)}>
                  <div className="ind-top">
                    <div className="ind-icon-wrap" style={{background:`${c}14`}}><Icon size={20} style={{color:c}}/></div>
                    <span className="ind-count-tag">{(ind.agents||[]).length||7} agents</span>
                  </div>
                  <h3>{ind.name}</h3>
                  <p>{ind.headline}</p>
                </div>
              );
            })}
          </div>
          <div style={{textAlign:"center",marginTop:28}}>
            <button className="btn btn-outline" onClick={()=>navigate("industries")}>View All 12 Industries <ArrowRight size={14}/></button>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">Business Impact</p>
            <h2 className="section-title">AI Measured in Business Outcomes.</h2>
          </div>
          {/* Apple: staggered reveal \u2014 each card springs in with slight delay offset */}
          <div className="feat-grid-4" ref={metricsRef} style={{opacity:0}}>
            {[
              {n:"< 2 min",l:"Lead response time (from 2h 47m)",c:"c-blue"},
              {n:"3\u00d7",l:"More follow-up touchpoints per lead",c:"c-violet"},
              {n:"94%",l:"Onboarding completion rate",c:"c-green"},
              {n:"14h",l:"Returned per employee per week",c:""},
            ].map(({n,l,c},i)=>(
              <div key={i} className="feat-card" style={{textAlign:"center",padding:"32px 20px"}}>
                <div className={`metric-num ${c}`}>{n}</div>
                <p className="metric-label">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-bg">
        <div className="wrap"><CTABand navigate={navigate}/></div>
      </section>
    </main>
  );
}

// ── AI AUDIT ──────────────────────────────────────────────────────────────────
function AuditPage({navigate}) {
  const [open,setOpen]=useState(null);
  const CATS=[
    {icon:TrendingUp,t:"Revenue",d:"Where are leads, customers, and opportunities being lost?",items:["Lead capture and response speed","Follow-up and re-engagement processes","Renewal and upsell opportunity detection","Quotation turnaround time","Lost opportunity analysis"]},
    {icon:Cog,t:"Operations",d:"Where is work getting delayed, duplicated, or stuck?",items:["Approval and authorisation workflows","Department handoff processes","Exception management and escalation","Duplicate work and redundant processes","Workflow bottleneck identification"]},
    {icon:Users,t:"Customer Experience",d:"Where are customers waiting or falling through gaps?",items:["Support response and resolution times","Onboarding process completion rates","Communication channel coverage","Proactive engagement touchpoints","Customer satisfaction monitoring"]},
    {icon:Activity,t:"Productivity",d:"Where are employees spending time on low-value work?",items:["Manual data entry and system updates","Report preparation and distribution","Information retrieval and searching","Meeting scheduling and coordination","Repetitive administrative tasks"]},
    {icon:Database,t:"Data & Systems",d:"Where is information fragmented or inconsistent?",items:["Data duplication across systems","Information fragmentation between departments","Data quality and consistency issues","System integration gaps","Knowledge management effectiveness"]},
    {icon:Brain,t:"Decision Making",d:"Where are approvals and decisions slowing the business?",items:["Approval chain mapping and bottlenecks","Decision support data availability","Anomaly detection and alerting","Management visibility and reporting lag","Strategic KPI monitoring"]},
    {icon:Shield,t:"Risk & Compliance",d:"Where are exceptions being detected too late?",items:["Compliance monitoring coverage","Exception detection and response times","Audit trail completeness","Policy adherence monitoring","Risk signal identification"]},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section" style={{background:"var(--bg-soft)",minHeight:"50vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Sparkles size={12}/>AI Business Audit</div>
          <h1 className="section-title" style={{maxWidth:680,marginBottom:16}}>Find Where Your Business Is Losing Value.</h1>
          <p className="body-lg" style={{maxWidth:520,marginBottom:32}}>Xizo analyses your business processes to identify the workflows where AI can create measurable impact — before a single agent is built.</p>
          <div className="btn-row">
            <button className="btn btn-primary btn-lg" onClick={()=>navigate("contact")}>Request an AI Audit <ArrowRight size={16}/></button>
            <button className="btn btn-outline btn-lg" onClick={()=>navigate("how-it-works")}>See How It Works</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sh">
            <p className="label">Before We Build AI</p>
            <h2 className="section-title">Seven Dimensions We Analyse.</h2>
            <p className="body-lg">Xizo's AI Audit maps how your business actually operates — processes, people, systems, data, and decisions.</p>
          </div>
          <div className="feat-grid-2">
            {CATS.map((c,i)=>{
              const Icon=c.icon; const isOpen=open===i;
              return (
                <div key={i} className="feat-card" style={{cursor:"pointer"}} onClick={()=>setOpen(isOpen?null:i)}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div className="feat-icon feat-icon-sm"><Icon size={16}/></div>
                    <div style={{flex:1}}>
                      <div className="card-title" style={{fontSize:15}}>{c.t}</div>
                      <p className="body-sm" style={{marginTop:2}}>{c.d}</p>
                    </div>
                    <ChevronDown size={15} style={{color:"var(--muted)",transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}/>
                  </div>
                  {isOpen&&(
                    <div style={{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:14}}>
                      {c.items.map(item=>(
                        <div key={item} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                          <ChevronRight size={12} style={{color:"var(--blue)",flexShrink:0}}/>
                          <span style={{fontSize:13,color:"var(--ink-3)"}}>{item}</span>
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

      <section className="section section-bg">
        <div className="wrap">
          <div className="sh center">
            <p className="label">Sample Output</p>
            <h2 className="section-title">A Prioritised AI Opportunity Map.</h2>
            <p className="body-lg">Not a generic AI recommendation — a business-specific analysis ranked by expected value.</p>
          </div>
          <AuditDashboard/>
          <div style={{textAlign:"center",marginTop:36}}>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate("contact")}>Request Your AI Audit <ArrowRight size={16}/></button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── AI OS ─────────────────────────────────────────────────────────────────────
function AIOSPage({navigate}) {
  const EX=[
    {ind:"Real Estate Agency",os:"Sales & Lettings AI OS",color:"#5f61ed",
     agents:["Lead Intelligence","Qualification","Property Matching","Sales","Scheduling","CRM","Follow-up","Analytics"],
     out:"Every inbound enquiry is processed, qualified, matched to properties, and responded to within minutes — automatically."},
    {ind:"Financial Advisory",os:"Client & Compliance AI OS",color:"#f59e0b",
     agents:["Client Intelligence","Compliance","Reporting","Risk Monitoring","Document","Onboarding","Follow-up","Analytics"],
     out:"Client relationships are managed proactively, compliance is monitored continuously, and advisors focus on high-value guidance."},
    {ind:"Professional Services",os:"Project & Client Intelligence AI OS",color:"#7c3aed",
     agents:["Opportunity","Proposal","Project Monitor","Client Comms","Invoice","Knowledge","Scheduling","Analytics"],
     out:"Projects are tracked in real time, client communication is automated, and billing is managed without manual intervention."},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section" style={{background:"var(--bg-soft)",minHeight:"50vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><BrainCircuit size={12}/>AI Operating System</div>
          <h1 className="section-title" style={{maxWidth:720,marginBottom:16}}>One AI Operating System <em>Built Around Your Business.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>Every Xizo deployment is different. We design a business-specific AI OS from the ground up — not a generic collection of agents.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">The Architecture</p>
            <h2 className="section-title">Business → Audit → Architecture → <em>AI OS</em></h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,maxWidth:400,margin:"0 auto 64px"}}>
            {["Understand the Business","AI Business Audit","Identify High-Value Opportunities","Design Agent Architecture","Build & Orchestrate Agents","Business-Specific AI OS"].map((s,i,a)=>(
              <div key={s} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{background:i===a.length-1?"var(--blue-soft)":"var(--bg)",border:`1px solid ${i===a.length-1?"rgba(95,97,237,0.3)":"var(--border-2)"}`,borderRadius:"var(--radius)",padding:"12px 28px",fontWeight:700,fontSize:14,color:i===a.length-1?"var(--blue)":"var(--ink)",minWidth:260,textAlign:"center",boxShadow:i===a.length-1?"0 4px 16px rgba(95,97,237,0.10)":"var(--shadow-sm)"}}>{s}</div>
                {i<a.length-1&&<div style={{width:1,height:24,background:"var(--border-2)"}}/>}
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {EX.map(ex=>(
              <div key={ex.ind} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"var(--radius-xl)",overflow:"hidden",boxShadow:"var(--shadow-sm)"}}>
                <div style={{background:"var(--bg-soft)",borderBottom:"1px solid var(--border)",padding:"20px 24px"}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:ex.color,marginBottom:5}}>{ex.ind}</div>
                  <h3 style={{fontSize:17,fontWeight:700,color:"var(--ink)"}}>{ex.os}</h3>
                </div>
                <div style={{padding:"20px 24px"}}>
                  <p className="label" style={{marginBottom:10}}>Agent Network</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>
                    {ex.agents.map(a=><span key={a} className="tag">{a}</span>)}
                  </div>
                  <p className="body-sm">{ex.out}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Ready to Design Your AI Operating System?" sub="Start with an AI Business Audit — the foundation of everything Xizo builds."/></div></section>
    </main>
  );
}

// ── AGENT ARCHITECTURE ────────────────────────────────────────────────────────
function AgentsPage({navigate}) {
  const [sel,setSel]=useState(null);
  const agents=agentTypes?.length?agentTypes:[
    {id:"lead",name:"Lead Intelligence Agent",role:"Lead Processing",purpose:"Captures, parses and enriches inbound lead data from all channels.",inputs:["Web forms","WhatsApp","Email","Phone enquiries"],actions:["Parse intent","Enrich profile","Score urgency","Tag channel"],connects:["CRM","WhatsApp API","Email","Lead database"],humanApproval:"None required — fully autonomous",kpi:"Lead response time, intent accuracy"},
    {id:"qual",name:"Qualification Agent",role:"Lead Scoring",purpose:"Scores leads against business criteria and routes to appropriate workflow.",inputs:["Lead Intelligence Agent output","CRM history","Scoring model"],actions:["Apply scoring model","Classify lead tier","Route to workflow","Notify sales"],connects:["Lead Intelligence Agent","Sales Agent","CRM Agent"],humanApproval:"High-value enterprise leads may require sales manager review",kpi:"Qualification accuracy, conversion rate by tier"},
    {id:"sales",name:"Sales Agent",role:"Sales Engagement",purpose:"Prepares and sends personalised responses and proposals based on lead context.",inputs:["Qualified lead data","Product/service catalogue","CRM history"],actions:["Draft response","Generate proposal","Send communication","Log interaction"],connects:["CRM","Email","WhatsApp","Scheduling Agent"],humanApproval:"High-value proposals require human approval before sending",kpi:"Response quality score, proposal acceptance rate"},
    {id:"sched",name:"Scheduling Agent",role:"Calendar Management",purpose:"Books meetings, viewings and calls directly in team calendars.",inputs:["Sales Agent request","Calendar availability","Customer preference"],actions:["Check availability","Propose slots","Confirm booking","Send reminders"],connects:["Google/Outlook Calendar","CRM","WhatsApp","Email"],humanApproval:"None required for standard bookings",kpi:"Meeting booking rate, no-show rate"},
    {id:"crm",name:"CRM Agent",role:"Data Management",purpose:"Maintains accurate, up-to-date records across all CRM fields and interactions.",inputs:["All agent outputs","Customer communications","Form submissions"],actions:["Create/update contacts","Log interactions","Maintain pipeline","Tag and segment"],connects:["Salesforce","HubSpot","Zoho","Custom CRM"],humanApproval:"None — automated data management",kpi:"CRM data accuracy, record completeness"},
    {id:"followup",name:"Follow-up Agent",role:"Relationship Management",purpose:"Manages structured follow-up sequences based on lead status and engagement signals.",inputs:["CRM status","Engagement signals","Time triggers"],actions:["Send follow-up","Adjust cadence","Re-engage cold leads","Escalate stale deals"],connects:["CRM","Email","WhatsApp","Sales Agent"],humanApproval:"None for standard sequences; stale deals trigger human review",kpi:"Follow-up completion rate, re-engagement rate"},
    {id:"support",name:"Customer Support Agent",role:"Support Operations",purpose:"Handles customer enquiries, resolves issues, and escalates complex cases.",inputs:["Customer messages","Knowledge base","CRM history"],actions:["Understand request","Search knowledge","Respond to customer","Escalate if needed"],connects:["Helpdesk","Knowledge base","CRM","Escalation system"],humanApproval:"Complex or sensitive issues require human agent escalation",kpi:"First-contact resolution rate, response time, CSAT"},
    {id:"analytics",name:"Analytics & Reporting Agent",role:"Business Intelligence",purpose:"Collects, processes and distributes operational metrics and performance reports.",inputs:["All agent data","CRM data","System logs","KPI targets"],actions:["Aggregate metrics","Detect anomalies","Generate reports","Alert on exceptions"],connects:["All agents","BI tools","Email","Dashboard"],humanApproval:"None — automated reporting",kpi:"Report accuracy, anomaly detection rate"},
  ];
  const s=sel!==null?agents[sel]:null;
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"50vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Bot size={12}/>Agent Architecture</div>
          <h1 className="section-title" style={{maxWidth:680,marginBottom:16}}>Specialised Agents. <em>One Intelligent System.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>Xizo doesn't rely on one general AI. Each agent has a clearly defined responsibility, a specific set of inputs, and a precise role in the workflow.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="ag-layout">
            <div className="ag-graph">
              <p className="label" style={{marginBottom:16}}>Agent Network — Click to explore</p>
              <div className="ag-nodes">
                {agents.map((a,i)=>(
                  <button key={i} className={`ag-node${sel===i?" on":""}`} onClick={()=>setSel(sel===i?null:i)}>
                    <Bot size={20} style={{color:sel===i?"var(--blue)":"var(--muted-2)"}}/>
                    <div className="ag-node-name">{a.name}</div>
                    <div className="ag-node-role">{a.role}</div>
                  </button>
                ))}
              </div>
            </div>
            {s?(
              <div className="ag-panel">
                <span className="tag tag-blue" style={{marginBottom:10}}>{s.role}</span>
                <h3>{s.name}</h3>
                <p className="body-sm" style={{marginTop:6}}>{s.purpose}</p>
                {[["INPUTS",s.inputs],["ACTIONS",s.actions],["CONNECTS TO",s.connects]].map(([label,items])=>(
                  <div className="ag-section" key={label}>
                    <div className="ag-section-label">{label}</div>
                    <ul className="ag-list">{items.map(it=><li key={it}>{it}</li>)}</ul>
                  </div>
                ))}
                <div className="ag-section">
                  <div className="ag-section-label">HUMAN APPROVAL</div>
                  <div className="ag-human-note">{s.humanApproval}</div>
                </div>
                <div className="ag-section">
                  <div className="ag-section-label">KEY METRIC</div>
                  <p style={{fontSize:12,color:"var(--blue-3)",fontWeight:600,margin:0}}>{s.kpi}</p>
                </div>
              </div>
            ):(
              <div className="ag-panel" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380,textAlign:"center"}}>
                <Bot size={36} style={{color:"var(--muted-3)",marginBottom:12}}/>
                <h3 style={{fontSize:15,fontWeight:600,color:"var(--muted)"}}>Select an agent to explore</h3>
                <p className="body-sm" style={{marginTop:6}}>Click any agent to see its purpose, inputs, actions, and human approval requirements.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Ready to Design Your Agent Architecture?" sub="The right combination depends on your specific business workflows. Start with an AI Audit."/></div></section>
    </main>
  );
}

// ── ORCHESTRATION ─────────────────────────────────────────────────────────────
function OrchestrationPage({navigate}) {
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"50vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Zap size={12}/>Agent Orchestration</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Agents Don't Work Alone. <em>They Work as a System.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>The power of Xizo isn't individual agents — it's the orchestration layer that connects them, passes context between them, and ensures the right human is involved at the right moment.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">Live Simulation</p>
            <h2 className="section-title">A Customer Enquiry, <em>Orchestrated by Xizo.</em></h2>
            <p className="body-lg">Press Play to watch a real-world enquiry move through the agent network.</p>
          </div>
          <OrchestrationCanvas/>
        </div>
      </section>
      <section className="section section-bg">
        <div className="wrap">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56}}>
            <div>
              <p className="label" style={{marginBottom:12}}>How It Works</p>
              <h2 className="section-title" style={{marginBottom:20,fontSize:"clamp(26px,3.5vw,38px)"}}>The Xizo Orchestration Layer</h2>
              <p className="body-md" style={{marginBottom:20}}>Every agent in the Xizo network operates within a defined responsibility boundary. The orchestration layer manages:</p>
              {["Context passing between agents","Trigger conditions for each agent","Priority and sequencing of actions","Human approval gates","Exception routing and escalation","Audit logging of every decision"].map(item=>(
                <div key={item} style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                  <CheckCircle size={13} style={{color:"var(--green)",flexShrink:0}}/>
                  <span style={{fontSize:13,color:"var(--ink-3)"}}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="label" style={{marginBottom:12}}>Why It Matters</p>
              <h2 className="section-title" style={{marginBottom:20,fontSize:"clamp(26px,3.5vw,38px)"}}>Coordination Is the Hardest Part.</h2>
              <p className="body-md" style={{marginBottom:16}}>Individual AI agents are relatively easy to build. The hard part is making them work together reliably — without duplicating work, creating gaps, or losing context.</p>
              <p className="body-md" style={{marginBottom:16}}>Xizo's orchestration layer ensures every agent knows what happened before it, acts within its authorised scope, and passes complete context to the next agent.</p>
              <p className="body-md">When a human needs to be involved, the system pauses, presents the relevant context, and waits for authorisation before continuing.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section"><div className="wrap"><CTABand navigate={navigate} title="Design Your Orchestration Architecture." sub="Every business workflow requires a different orchestration approach. Start with an AI Audit."/></div></section>
    </main>
  );
}

// ── BUSINESS PROBLEMS ─────────────────────────────────────────────────────────
const FB_PROBS=[
  {id:"p1",category:"Revenue",title:"Missed Lead Response",impact:"high",description:"Inbound leads are not being contacted quickly enough, causing them to convert with competitors.",aiOpportunity:"Lead Intelligence + Response Agent automates immediate, personalised responses to every enquiry within seconds.",agents:["Lead Intelligence Agent","Response Agent","CRM Agent"],outcome:"Response time reduced from hours to seconds. Lead conversion rate improves significantly."},
  {id:"p2",category:"Revenue",title:"Follow-up Leakage",impact:"high",description:"Qualified opportunities receive insufficient follow-up touchpoints and fall out of the pipeline.",aiOpportunity:"Follow-up Agent manages structured, personalised sequences automatically based on engagement signals.",agents:["Follow-up Agent","CRM Agent","Sales Agent"],outcome:"Every qualified lead receives consistent follow-up. Conversion rates increase."},
  {id:"p3",category:"Customer",title:"Slow Support Response",impact:"high",description:"Customer queries take hours to receive an initial response, leading to frustration and churn.",aiOpportunity:"Customer Support Agent handles all incoming queries instantly, resolving common issues and escalating complex ones.",agents:["Customer Support Agent","Knowledge Agent","Escalation Agent"],outcome:"First-response time drops to seconds. Support team handles fewer repetitive queries."},
  {id:"p4",category:"Operations",title:"Manual Approval Delays",impact:"medium",description:"Approval workflows depend on manual routing and follow-up, creating significant delays.",aiOpportunity:"Approval Orchestration Agent routes requests, notifies approvers, chases responses, and records decisions automatically.",agents:["Approval Agent","Notification Agent","Audit Agent"],outcome:"Approval cycle times reduced. No more lost requests or manual chasing."},
  {id:"p5",category:"Finance",title:"Invoice Processing Delays",impact:"medium",description:"Invoices are processed manually, causing delays, errors, and late payment issues.",aiOpportunity:"Finance Agent automates invoice extraction, matching, approval routing, and payment scheduling.",agents:["Finance Agent","Document Agent","Approval Agent"],outcome:"Invoice processing time reduced. Payment accuracy improves. Cash flow visibility increases."},
  {id:"p6",category:"HR",title:"Slow Candidate Communication",impact:"medium",description:"Candidates receive slow, inconsistent communication during recruitment, damaging employer brand.",aiOpportunity:"HR Agent automates acknowledgements, status updates, interview scheduling, and follow-up throughout recruitment.",agents:["HR Agent","Scheduling Agent","Communication Agent"],outcome:"Candidate experience improves. Time-to-hire reduces. Recruiter admin drops significantly."},
  {id:"p7",category:"Knowledge",title:"Information Scattered Across Systems",impact:"medium",description:"Employees spend hours searching for information across email, documents, CRM, and databases.",aiOpportunity:"Knowledge Intelligence Agent provides instant, accurate answers from all connected information sources.",agents:["Knowledge Agent","Document Agent","Search Agent"],outcome:"Information retrieval time drops from hours to seconds."},
  {id:"p8",category:"Management",title:"Reporting Delays",impact:"medium",description:"Management receives reports hours or days after the period ends, limiting real-time visibility.",aiOpportunity:"Analytics Agent aggregates, processes, and distributes reports automatically on any schedule.",agents:["Analytics Agent","Reporting Agent","Anomaly Agent"],outcome:"Real-time visibility into operations. Anomalies detected immediately."},
];

function ProblemsPage({navigate}) {
  const all=businessProblems?.length?businessProblems:FB_PROBS;
  const cats=["All",...new Set(all.map(p=>p.category))];
  const [cat,setCat]=useState("All"); const [q,setQ]=useState(""); const [expId,setExpId]=useState(null);
  const filtered=all.filter(p=>(cat==="All"||p.category===cat)&&(!q||p.title.toLowerCase().includes(q.toLowerCase())||p.description?.toLowerCase().includes(q.toLowerCase())));
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><AlertTriangle size={12}/>Business Problem Library</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>We Don't Ask Where AI Can Help. <em>We Ask Where You're Breaking.</em></h1>
          <p className="body-lg" style={{maxWidth:520}}>Browse the most common operational problems we identify during AI Business Audits — and see how Xizo addresses each one.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="prob-search-wrap">
            <Search size={15} className="prob-search-icon"/>
            <input className="prob-search" placeholder="Search problems, e.g. 'lead response', 'invoice', 'onboarding'…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <div className="prob-filters">
            {cats.map(c=><button key={c} className={`prob-filter${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
          </div>
          <div className="prob-grid">
            {filtered.map(p=>(
              <div key={p.id} className="prob-card" onClick={()=>setExpId(expId===p.id?null:p.id)}>
                <div className="prob-cat">{p.category}</div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                {expId===p.id&&(
                  <div style={{borderTop:"1px solid var(--border)",paddingTop:14,marginTop:8}}>
                    <div className="label label-blue" style={{marginBottom:6}}>AI Opportunity</div>
                    <p className="body-sm" style={{marginBottom:10}}>{p.aiOpportunity}</p>
                    {p.agents?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>{p.agents.map(a=><span key={a} className="tag tag-blue">{a}</span>)}</div>}
                    <div style={{background:"var(--green-soft)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"var(--radius-sm)",padding:"9px 12px"}}>
                      <div className="label" style={{color:"var(--green)",marginBottom:3}}>Expected Outcome</div>
                      <p className="body-sm">{p.outcome}</p>
                    </div>
                  </div>
                )}
                <div className="prob-footer">
                  <span className={`prob-impact ${p.impact}`}>{(p.impact||"").toUpperCase()} IMPACT</span>
                  <span style={{fontSize:12,color:"var(--blue)",display:"flex",alignItems:"center",gap:3}}>{expId===p.id?"Less":"See Solution"}<ChevronRight size={12}/></span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:"var(--muted)"}}><Search size={28} style={{margin:"0 auto 10px",opacity:0.3}}/><p>No problems found. Try a different keyword or category.</p></div>}
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Don't See Your Specific Problem?" sub="Every business has unique challenges. An AI Audit identifies the specific problems in your workflows."/></div></section>
    </main>
  );
}

// ── INDUSTRIES ────────────────────────────────────────────────────────────────
function IndustriesPage({navigate}) {
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Building2 size={12}/>12 Industries</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Purpose-Built AI for the Way <em>Your Industry</em> Actually Works.</h1>
          <p className="body-lg" style={{maxWidth:560}}>Generic AI doesn't understand your industry. Xizo builds AI Operating Systems designed around the specific workflows of your sector.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="ind-grid">
            {(industries||[]).map(ind=>{
              const Icon=IICONS[ind.id]||Building2,c=ICOLORS[ind.id]||"#5f61ed";
              return (
                <div key={ind.id} className="ind-card" style={{"--acc":c}} onClick={()=>navigate("industries",ind.id)}>
                  <div className="ind-top">
                    <div className="ind-icon-wrap" style={{background:`${c}14`}}><Icon size={20} style={{color:c}}/></div>
                    <span className="ind-count-tag">{(ind.agents||[]).length||7} agents</span>
                  </div>
                  <h3>{ind.name}</h3>
                  <p>{ind.headline}</p>
                  <div className="ind-tags">{(ind.problems||[]).slice(0,2).map(p=><span key={p} className="ind-tag">{p.split(" ").slice(0,3).join(" ")}</span>)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function IndustryDetailPage({id,navigate}) {
  const ind=(industries||[]).find(i=>i.id===id);
  if(!ind) return <main style={{paddingTop:"var(--nav-h)",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center"}}><h2 style={{marginBottom:16}}>Industry not found.</h2><button className="btn btn-outline" onClick={()=>navigate("industries")}><ChevronLeft size={14}/>Back</button></div></main>;
  const Icon=IICONS[id]||Building2,c=ICOLORS[id]||"#5f61ed";
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg">
        <div className="wrap">
          <button className="btn btn-ghost" style={{marginBottom:24}} onClick={()=>navigate("industries")}><ChevronLeft size={14}/>All Industries</button>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
            <div style={{width:56,height:56,borderRadius:14,background:`${c}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={26} style={{color:c}}/></div>
            <div><p className="label" style={{color:c,marginBottom:4}}>Industry AI OS</p><h1 className="section-title" style={{fontSize:"clamp(26px,3.5vw,40px)"}}>{ind.name}</h1></div>
          </div>
          <p className="body-lg" style={{maxWidth:600}}>{ind.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
            <div>
              <p className="label" style={{marginBottom:14}}>Key Business Problems</p>
              {(ind.problems||[]).map((p,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:12}}><AlertTriangle size={13} style={{color:c,flexShrink:0,marginTop:2}}/><span style={{fontSize:13,color:"var(--ink-3)"}}>{p}</span></div>)}
            </div>
            <div>
              <p className="label" style={{marginBottom:14}}>Agent Network</p>
              {(ind.agents||[]).map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"var(--bg-soft)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"10px 14px",marginBottom:7}}><div style={{width:6,height:6,borderRadius:"50%",background:c,flexShrink:0}}/><span style={{fontSize:13,fontWeight:600,color:"var(--ink)"}}>{a}</span></div>)}
            </div>
          </div>
          {ind.metrics?.length>0&&(
            <div style={{marginTop:64}}>
              <div className="sh center"><p className="label">Expected Business Impact</p><h2 className="section-title">Measurable Outcomes.</h2></div>
              <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(ind.metrics.length,3)},1fr)`,gap:20}}>
                {ind.metrics.map((m,i)=>(
                  <div key={i} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"var(--radius-lg)",padding:24,textAlign:"center",boxShadow:"var(--shadow-sm)"}}>
                    <p className="label" style={{marginBottom:16}}>{m.label}</p>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:20}}>
                      <div><div style={{fontWeight:900,fontSize:28,color:"#dc2626"}}>{m.before}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Before</div></div>
                      <ArrowRight size={18} style={{color:c}}/>
                      <div><div style={{fontWeight:900,fontSize:28,color:"var(--green)"}}>{m.after}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>With Xizo</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title={`Build the AI OS for Your ${ind.name} Business.`} sub="Start with an AI Business Audit to identify your highest-value opportunities."/></div></section>
    </main>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowPage({navigate}) {
  const stages=stagesPipeline?.length?stagesPipeline:[
    {num:"01",title:"Audit",description:"We map every process, department, and workflow across your business.",detail:"Using structured interviews, process observation, system analysis, and data review, we build a complete operational picture — including where value is being created, transferred, and lost."},
    {num:"02",title:"Discover",description:"We identify the specific AI opportunities with the highest business value.",detail:"Not every problem needs AI. We prioritise opportunities where automation will have the greatest measurable impact on revenue, efficiency, customer experience, or operational performance."},
    {num:"03",title:"Architect",description:"We design the specific combination of AI agents your business needs.",detail:"We design a custom agent network tailored to your business — defining each agent's responsibility, inputs, actions, and connections to your existing technology stack."},
    {num:"04",title:"Orchestrate",description:"We build and connect agents into coordinated, intelligent workflows.",detail:"Agents are built, tested, and integrated with your existing systems. The orchestration layer ensures they work together reliably, involving humans at the right moments and maintaining complete audit trails."},
    {num:"05",title:"Optimize",description:"We continuously measure performance and improve your AI OS over time.",detail:"After deployment, we monitor every agent's performance against business KPIs, identify bottlenecks, improve workflows, and ensure your AI OS continuously improves as your business evolves."},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Settings size={12}/>The Xizo Method</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Business First. AI Second. <em>Outcomes Always.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>Xizo's five-stage method ensures your AI Operating System is built around the way your business actually works — not around AI technology for its own sake.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {stages.map((s,i)=>(
            <div key={s.num} style={{display:"grid",gridTemplateColumns:"100px 1fr",gap:32,paddingBottom:48,borderBottom:i<stages.length-1?"1px solid var(--border)":"none",marginBottom:i<stages.length-1?48:0}}>
              <div>
                <div style={{fontSize:42,fontWeight:900,letterSpacing:"-0.04em",color:"var(--muted-3)",lineHeight:1}}>{s.num}</div>
                <div className="label label-blue" style={{marginTop:6}}>{s.title}</div>
              </div>
              <div>
                <h3 style={{fontSize:22,fontWeight:700,marginBottom:10,letterSpacing:"-0.01em"}}>{s.description}</h3>
                <p className="body-md">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Start with Step One." sub="Request an AI Business Audit — the foundation of everything Xizo builds."/></div></section>
    </main>
  );
}

// ── USE CASES ─────────────────────────────────────────────────────────────────
function UseCasesPage({navigate}) {
  const cases=useCases?.length?useCases:[
    {id:"lr",title:"Lead Response Automation",problem:"A potential customer contacts the business. Nobody responds quickly enough. Customer chooses a competitor.",steps:["Lead Detection Agent captures enquiry from all channels","Intent Agent understands request, product interest, and urgency","Qualification Agent scores and classifies the lead","Response Agent sends personalised reply within seconds","CRM Agent creates contact record and logs all interactions","Follow-up Agent initiates structured follow-up sequence"],outcome:"Response time drops from hours to seconds. No lead goes unanswered.",metrics:[{l:"Response Time",b:"2h 47m",a:"< 2 min"},{l:"Follow-up Rate",b:"34%",a:"100%"}]},
    {id:"cs",title:"24/7 Customer Support",problem:"Customers ask questions outside business hours. They wait hours. Some leave before a response arrives.",steps:["Customer Support Agent receives enquiry from any channel","Knowledge Agent searches company knowledge base","CRM Agent retrieves customer history and context","Response Agent crafts accurate, personalised reply","Action Agent performs allowed actions (e.g. check order status)","Escalation Agent routes complex issues with full context"],outcome:"24/7 support coverage. First-contact resolution improves dramatically.",metrics:[{l:"Response Time",b:"6.2h",a:"< 30 sec"},{l:"FCR",b:"41%",a:"78%"}]},
    {id:"ob",title:"Customer Onboarding Orchestration",problem:"A customer signs a contract. Handoff to operations is manual. Onboarding is slow, inconsistent, and error-prone.",steps:["Contract signed — Onboarding Agent triggers immediately","Orchestrator coordinates Sales, Finance, Operations, Customer Success","Document Agent collects and processes required paperwork","Setup Agent provisions accounts, access, and systems","Training Agent sends structured onboarding content","Analytics Agent tracks completion rates and progress"],outcome:"Onboarding cycle reduced. Customer experience improves. Fewer errors.",metrics:[{l:"Onboarding Time",b:"14 days",a:"3 days"},{l:"Completion",b:"64%",a:"94%"}]},
    {id:"pc",title:"Payment Collection Automation",problem:"Invoices become overdue. Finance team manually chases payments. Cash flow suffers.",steps:["Finance Agent detects invoice approaching due date","Intelligence Agent checks payment history and relationship value","Communication Agent sends appropriate, personalised reminder","Response Agent records customer response and updated ETA","Escalation Agent involves finance team if payment remains outstanding","Analytics Agent updates cash flow forecasting"],outcome:"Cash collection improves. Finance team focuses on relationships, not chasing.",metrics:[{l:"Days Sales Outstanding",b:"47 days",a:"28 days"},{l:"Manual Chase Time",b:"8h/wk",a:"< 1h/wk"}]},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Target size={12}/>Use Cases</div>
          <h1 className="section-title" style={{maxWidth:680,marginBottom:16}}>Real Business Problems. <em>Real AI Solutions.</em></h1>
          <p className="body-lg" style={{maxWidth:520}}>Every use case begins with a business problem — not an AI capability. Here's how Xizo identifies and solves common operational challenges.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="uc-grid">
            {cases.map(uc=>(
              <div key={uc.id} className="uc-card">
                <div className="uc-head"><h3>{uc.title}</h3><p>{uc.problem}</p></div>
                <div className="uc-body">
                  <p className="label" style={{marginBottom:12}}>Agent Workflow</p>
                  <div className="uc-flow">
                    {uc.steps.map((s,i)=>(
                      <div key={i}>
                        <div className="uc-step"><div className="uc-dot"/><div className="uc-txt">{s}</div></div>
                        {i<uc.steps.length-1&&<div className="uc-conn"/>}
                      </div>
                    ))}
                  </div>
                  {uc.metrics?.length>0&&(
                    <div className="uc-mets">
                      {uc.metrics.map(m=>(
                        <div key={m.l} className="uc-met">
                          <div className="uc-met-label">{m.l}</div>
                          <div className="uc-met-vals">
                            <span className="uc-met-before">{m.b}</span>
                            <ArrowRight size={11} style={{color:"var(--blue)"}}/>
                            <span className="uc-met-after">{m.a}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="uc-outcome"><div className="uc-outcome-label">Business Outcome</div><p>{uc.outcome}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Identify Your Highest-Value Use Cases." sub="An AI Business Audit will map your specific workflows and identify where AI creates the most measurable impact."/></div></section>
    </main>
  );
}

// ── ROI ───────────────────────────────────────────────────────────────────────
function ROIPage({navigate}) {
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><BarChart3 size={12}/>Business Impact</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>AI Should Be Measured in <em>Business Outcomes.</em></h1>
          <p className="body-lg" style={{maxWidth:520}}>Xizo doesn't measure success by the number of agents deployed. It measures success by the business outcomes delivered.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <p className="label">ROI Estimator</p>
            <h2 className="section-title">Estimate Your Potential Business Opportunity.</h2>
            <p className="body-lg">Enter your business parameters for an indicative estimate. An AI Audit provides data-driven analysis specific to your business.</p>
          </div>
          <ROICalculator/>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Get a Real ROI Analysis for Your Business." sub="The estimator uses industry benchmarks. An AI Audit uses your actual data."/></div></section>
    </main>
  );
}

// ── INTEGRATIONS ──────────────────────────────────────────────────────────────
function IntegrationsPage({navigate}) {
  const SYS=[
    {n:"CRM Systems",e:"Salesforce, HubSpot, Zoho",icon:Users},
    {n:"ERP Platforms",e:"SAP, Oracle, Microsoft Dynamics",icon:Database},
    {n:"Email",e:"Gmail, Outlook, Microsoft 365",icon:Mail},
    {n:"WhatsApp / Messaging",e:"WhatsApp Business API, Slack, Teams",icon:MessageSquare},
    {n:"Calendar",e:"Google Calendar, Outlook Calendar",icon:Clock},
    {n:"Accounting",e:"Xero, QuickBooks, Sage",icon:DollarSign},
    {n:"Helpdesk",e:"Zendesk, Freshdesk, Intercom",icon:HeartPulse},
    {n:"Documents",e:"Google Drive, SharePoint, Notion",icon:FileText},
    {n:"Analytics / BI",e:"Tableau, Power BI, Looker",icon:BarChart3},
    {n:"Custom Systems",e:"Internal APIs, databases, legacy systems",icon:Code2},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Link size={12}/>Integrations</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Xizo Doesn't Replace Your Stack. <em>It Makes It Intelligent.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>Xizo sits above and across your existing technology, connecting your systems through an intelligent orchestration layer.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{background:"var(--bg-soft)",border:"1px solid var(--border)",borderRadius:"var(--radius-2xl)",padding:40,marginBottom:48}}>
            <div className="int-layout">
              <div className="int-layer">
                <h4>Your Systems</h4>
                <div className="int-items">{SYS.slice(0,5).map(s=>{const I=s.icon;return(<div key={s.n} className="int-item"><I size={13}/>{s.n}</div>);})}</div>
              </div>
              <div className="int-arrow"><ArrowRight size={20}/></div>
              <div className="int-xizo">
                <h4>Xizo AI OS</h4>
                <p>Intelligent orchestration layer</p>
                <div className="int-chips">
                  {["AI Agents","Workflows","Audit Trail","Human Gates"].map(t=><span key={t} className="tag tag-blue">{t}</span>)}
                </div>
              </div>
              <div className="int-arrow"><ArrowRight size={20}/></div>
              <div className="int-layer">
                <h4>Business Outcomes</h4>
                <div className="int-items">{["Revenue recovered","Hours saved","Customers served","Decisions supported","Operations optimised"].map(o=><div key={o} className="int-item" style={{borderColor:"rgba(34,197,94,0.2)",background:"var(--green-soft)",color:"#16a34a"}}><CheckCircle size={12}/>{o}</div>)}</div>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
            {SYS.map(s=>{const I=s.icon;return(<div key={s.n} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"16px 18px",display:"flex",alignItems:"flex-start",gap:12}}><div style={{width:34,height:34,borderRadius:"var(--radius-sm)",background:"var(--blue-soft)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--blue)",flexShrink:0}}><I size={15}/></div><div><div style={{fontSize:13,fontWeight:700,color:"var(--ink)",marginBottom:2}}>{s.n}</div><div style={{fontSize:11,color:"var(--muted)"}}>{s.e}</div></div></div>);})}</div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Connect Your Existing Systems to an AI OS." sub="Xizo integrates with your current technology stack. An AI Audit identifies the right connection points."/></div></section>
    </main>
  );
}

// ── HUMAN + AI ────────────────────────────────────────────────────────────────
function HumanAIPage({navigate}) {
  const [step,setStep]=useState(0);
  const steps=[
    {l:"AI generates quotation based on brief and pricing rules",auto:true},
    {l:"Approval Required — Manager reviews quotation details",auto:false},
    {l:"Manager approves quotation",auto:false},
    {l:"AI sends quotation to customer with CRM update",auto:true},
    {l:"Follow-up sequence initiated automatically",auto:true},
  ];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><ShieldCheck size={12}/>Human + AI</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Autonomous Where It Should Be. <em>Human Where It Matters.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>Xizo designs AI Operating Systems where automation handles volume and humans handle judgment.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="hai-grid">
            {[
              {t:"Autonomous",label:"Fully Automated",cls:"tag-blue",color:"var(--blue)",desc:"Low-risk, repetitive actions with clear rules and predictable outcomes. No human approval needed.",acts:["Lead data capture and enrichment","CRM record creation and updates","Standard communication sending","Appointment reminder dispatch","Report generation and distribution"]},
              {t:"Human Approval",label:"Approval Required",cls:"tag-amber",color:"var(--amber)",desc:"Consequential decisions where AI prepares the recommendation and a human authorises the action.",acts:["High-value quotation or proposal sending","Contract terms modification","Credit or discount authorisation","Sensitive customer communications","Budget or procurement approvals"]},
              {t:"Human Escalation",label:"Escalation",cls:"tag-violet",color:"#7c3aed",desc:"Complex, sensitive, or exceptional situations requiring experienced human judgment.",acts:["Customer complaints and disputes","Legal or compliance exceptions","High-value relationship decisions","Novel situations outside defined rules","Ethical or policy edge cases"]},
            ].map(l=>(
              <div key={l.t} className="hai-card">
                <span className={`tag ${l.cls}`}>{l.label}</span>
                <h3>{l.t}</h3>
                <p>{l.desc}</p>
                <div className="hai-actions">{l.acts.map(a=><div key={a} className="hai-action">{a}</div>)}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,marginTop:64,alignItems:"center"}}>
            <div>
              <p className="label" style={{marginBottom:12}}>Approval Workflow Demo</p>
              <h2 className="section-title" style={{fontSize:"clamp(24px,3vw,36px)",marginBottom:16}}>Watch a Human Approval Gate in Action.</h2>
              <p className="body-md" style={{marginBottom:24}}>When an AI agent reaches an action requiring human authorisation, the system pauses, presents context, and waits for explicit approval before continuing.</p>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={()=>setStep(s=>Math.min(s+1,steps.length-1))}>Next Step <ArrowRight size={14}/></button>
                {step>0&&<button className="btn btn-outline" onClick={()=>setStep(0)}><RotateCcw size={13}/>Reset</button>}
              </div>
            </div>
            <div style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"var(--radius-xl)",padding:28,boxShadow:"var(--shadow)"}}>
              <p className="label" style={{marginBottom:18}}>Quotation Approval Workflow</p>
              {steps.map((s,i)=>(
                <div key={i} style={{opacity:i<=step?1:0.3,transition:"opacity 0.3s"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,marginTop:1,background:i<step?"var(--green)":i===step?s.auto?"var(--blue)":"var(--amber)":"var(--bg-subtle)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:800,border:`1px solid ${i<step?"var(--green)":i===step?s.auto?"var(--blue)":"var(--amber)":"var(--border-2)"}`}}>
                      {i<step?"✓":s.auto?<Bot size={11}/>:<Users size={11}/>}
                    </div>
                    <div style={{flex:1,paddingBottom:14}}>
                      <div style={{fontSize:13,color:"var(--ink-3)",fontWeight:500}}>{s.l}</div>
                      {i===step&&!s.auto&&<div style={{marginTop:6,background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:6,padding:"6px 10px",fontSize:11,color:"var(--amber)",fontWeight:700}}>⚑ Waiting for human authorisation</div>}
                    </div>
                  </div>
                  {i<steps.length-1&&<div style={{width:1,height:12,background:"var(--border)",marginLeft:11.5}}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Build AI That Works With Your Team, Not Around It." sub="Human control isn't a limitation. It's a design principle."/></div></section>
    </main>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutPage({navigate}) {
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg">
        <div className="wrap-sm">
          <div className="pill pill-blue" style={{marginBottom:20}}><Sparkles size={12}/>About Xizo</div>
          <h1 className="section-title" style={{marginBottom:20}}>Building the Operating Layer for the <em>AI-Native Business.</em></h1>
          <p className="body-lg" style={{marginBottom:16}}>Businesses have tools. They have data. They have people. What they lack is the intelligent operating layer that connects them, coordinates the work, and keeps humans in control of every important decision.</p>
          <p className="body-lg">Xizo is that layer.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64}}>
            <div>
              <p className="label" style={{marginBottom:12}}>Mission</p>
              <h2 className="section-title" style={{fontSize:"clamp(24px,3vw,36px)",marginBottom:16}}>Make Every Business Capable of Operating as an AI-Native Organisation.</h2>
              <p className="body-md" style={{marginBottom:16}}>Most businesses are not AI-native — they're software-native businesses trying to bolt AI onto existing processes. That approach creates more complexity, not less.</p>
              <p className="body-md">Xizo's approach is different. We redesign the operating model first — then build the AI to execute it.</p>
            </div>
            <div>
              <p className="label" style={{marginBottom:12}}>Vision</p>
              <h2 className="section-title" style={{fontSize:"clamp(24px,3vw,36px)",marginBottom:16}}>A Future Where Businesses Define Objectives and AI Coordinates the Execution.</h2>
              <p className="body-md" style={{marginBottom:16}}>The best businesses of the next decade won't be defined by the size of their teams or the number of tools they use. They'll be defined by the intelligence of their operating systems.</p>
              <p className="body-md">Xizo is building the infrastructure for that future — one business-specific AI OS at a time.</p>
            </div>
          </div>
          <hr className="divider" style={{margin:"56px 0"}}/>
          <div className="sh center"><p className="label">Our Values</p><h2 className="section-title">What Xizo Stands For.</h2></div>
          <div className="feat-grid-4">
            {[
              {icon:Target,t:"Business First",d:"We start by understanding the business — not by selling AI. The problem defines the solution."},
              {icon:Users,t:"Humans Remain in Control",d:"AI handles volume. Humans handle judgment. Every deployment has clear human control points."},
              {icon:ShieldCheck,t:"Visible, Not Black-Box",d:"Every agent has a defined responsibility, transparent position, and complete audit trail."},
              {icon:BarChart3,t:"Outcomes Always",d:"We measure success in business outcomes — revenue recovered, hours saved, customers served."},
            ].map(v=>{const I=v.icon;return(<div key={v.t} className="feat-card card-blue"><div className="feat-icon"><I size={18}/></div><div className="card-title" style={{marginBottom:8}}>{v.t}</div><p className="body-sm">{v.d}</p></div>);})}
          </div>
        </div>
      </section>
      <section className="section section-bg"><div className="wrap"><CTABand navigate={navigate} title="Build the AI Operating System Your Business Actually Needs." sub="Audit the Business. Architect the AI. Orchestrate the Work."/></div></section>
    </main>
  );
}

// ── RESOURCES ─────────────────────────────────────────────────────────────────
const FB_RES=[
  {id:"r1",title:"How to Identify AI Opportunities in Your Business",category:"AI Audit",readTime:"7 min",excerpt:"Most businesses start with the wrong question: 'Where can we add AI?' The right question is: 'Where are we losing value?' This article explains a systematic approach to identifying genuine AI opportunities.",content:"The starting point for any AI initiative should be operational analysis, not technology selection. Before evaluating any AI tool or platform, a business needs to understand its own workflows in detail — where value is created, where it's transferred, and where it's lost.\n\nThe most productive AI opportunities are typically found in processes that are high-frequency, rule-based, time-sensitive, and currently dependent on human coordination. These include lead response, customer communication, data entry, report generation, approval routing, and exception handling.\n\nA structured AI audit maps these processes and quantifies the operational cost of the current approach — in time, revenue, and customer experience. This creates a ranked list of AI opportunities ordered by expected business impact, which becomes the foundation for any AI implementation plan.\n\nThe critical insight is that AI works best when it's solving a specific, well-understood problem — not when it's being introduced as a general capability. Define the problem first. The AI solution follows naturally."},
  {id:"r2",title:"AI Agents vs AI Operating Systems — What's the Difference?",category:"AI OS",readTime:"8 min",excerpt:"A single AI agent can automate a task. An AI Operating System coordinates an entire business workflow. Understanding the difference is critical to making the right investment in AI infrastructure.",content:"An AI agent is a specialised software system that performs a specific task autonomously. Individual agents can be valuable, but their value is limited to the specific task they handle.\n\nAn AI Operating System is a coordinated network of specialised agents connected through an orchestration layer. When a customer enquiry arrives, it doesn't go to one agent — it flows through a sequence of agents, each performing their specific function.\n\nThe difference between an agent and an OS is coordination. A single agent is a tool. An OS is an intelligent operational infrastructure. The orchestration layer manages context passing, sequencing, priority, human approval gates, exception handling, and audit logging.\n\nMost businesses that deploy individual AI agents experience limited impact because the real operational complexity lies in the coordination between tasks — not in any individual task itself."},
  {id:"r3",title:"How Agent Orchestration Works",category:"Orchestration",readTime:"9 min",excerpt:"Agent orchestration is the discipline of connecting multiple AI agents into a coherent, reliable workflow. It's the hardest part of AI implementation — and the most important.",content:"When a customer sends an enquiry, a single AI agent cannot handle the full response cycle. The intent needs to be understood, the lead needs to be qualified, the right products or services need to be identified, a response needs to be drafted, a meeting needs to be booked, the CRM needs to be updated, and a follow-up sequence needs to be initiated.\n\nAgent orchestration is the system that manages how these agents communicate with each other. It defines what triggers each agent, what context gets passed between agents, what actions each agent is authorised to take, when to involve a human, and how to handle exceptions.\n\nEffective orchestration requires several components: a reliable messaging layer, a context management system, a human approval gateway, an exception routing system, and a complete audit log of every action taken.\n\nWithout a proper orchestration layer, agents operate independently and the coordination gaps between them create exactly the kind of operational leakage that the AI was supposed to eliminate."},
  {id:"r4",title:"What Is a Business AI Audit?",category:"AI Audit",readTime:"6 min",excerpt:"An AI Business Audit is a structured analysis of how a business operates — where value is created, where it's lost, and where AI can create measurable impact. It's the foundation of every effective AI implementation.",content:"A Business AI Audit is not a technology assessment. It's an operational analysis. The audit maps how the business actually works — not how the org chart suggests it works.\n\nThe audit covers seven dimensions: revenue processes, operational workflows, customer experience, productivity patterns, data quality, decision-making, and risk and compliance.\n\nThe output of an AI audit is a prioritised AI opportunity map — a ranked list of operational gaps where AI can create impact, ordered by expected business value.\n\nThis audit output becomes the business case for AI investment and the blueprint for AI implementation."},
  {id:"r5",title:"The Value Leakage Framework",category:"Business Intelligence",readTime:"7 min",excerpt:"Every business has invisible operational leaks — places where revenue, productivity, customers, and opportunities are being lost without anyone systematically measuring or addressing them.",content:"Value leakage is a term for the operational losses that accumulate when business processes are inefficient, poorly connected, or dependent on manual coordination.\n\nThe five categories of value leakage: revenue leakage (missed leads, slow response, lost follow-ups), productivity leakage (manual data entry, report preparation, information retrieval), customer leakage (slow support, poor onboarding, communication gaps), operational leakage (approval delays, handoff failures, exception backlog), and decision leakage (delayed approvals, fragmented information, poor visibility).\n\nQuantifying leakage is powerful because it converts an abstract operational problem into a business case. If 62 leads per month aren't responded to within the window where conversion probability is highest, and each lead has a potential value of £5,000, the monthly revenue leakage from lead response alone is £310,000."},
  {id:"r6",title:"Building AI-Native Business Operations",category:"AI Transformation",readTime:"10 min",excerpt:"An AI-native business doesn't just use AI tools — it operates through AI infrastructure. Building AI-native operations requires redesigning business processes around AI capabilities, not just adding AI to existing ones.",content:"Most businesses approach AI by identifying their current processes and asking where AI could help. This approach produces incremental improvement but not transformation.\n\nIn an AI-native business, high-frequency, rule-based tasks are not performed by humans — they're delegated to AI agents. Human roles evolve to focus on judgment, creativity, relationship management, and strategic decision-making.\n\nBuilding AI-native operations is a staged process: identify AI opportunities (AI Audit), design the agent architecture, build the orchestration layer, redefine human roles, and continuously optimise.\n\nThe businesses that move first and fastest toward AI-native operations will have structural cost and speed advantages that are difficult for competitors to replicate."},
  {id:"r7",title:"Human + AI: Designing for the Right Balance",category:"Human + AI",readTime:"8 min",excerpt:"The most effective AI implementations are not the most autonomous ones. They're the ones where the division of responsibility between AI and humans is designed thoughtfully.",content:"There's a common misconception that more autonomy equals more value. In practice, the most effective AI deployments are designed around a careful division of responsibility.\n\nDesigning this balance requires classifying every action by two dimensions: frequency (how often does it occur?) and consequence (what happens if it goes wrong?). High-frequency, low-consequence actions should be fully automated. High-consequence actions should involve human authorisation.\n\nThe practical architecture is a three-tier model: fully autonomous, human approval, and human escalation.\n\nThis model isn't just an ethical consideration — it's also a practical one. Autonomous systems without appropriate human control fail unpredictably in edge cases."},
  {id:"r8",title:"Measuring AI ROI in Business Operations",category:"ROI",readTime:"7 min",excerpt:"AI ROI is not measured in number of agents deployed or tasks automated. It's measured in revenue recovered, hours saved, customers retained, and decisions improved.",content:"The most common mistake in AI ROI measurement is focusing on input metrics (tasks automated, queries handled) rather than output metrics (revenue impact, cost savings, customer outcomes).\n\nA credible AI ROI framework measures five categories: revenue impact, productivity impact, customer impact, operational impact, and management impact.\n\nFor each category, the measurement approach is: establish a baseline, estimate the AI-driven improvement, and track actual results post-implementation against the baseline.\n\nImportantly, AI ROI should be measured against the cost of the problem being solved — not against the cost of the AI solution."},
  {id:"r9",title:"The Future of AI-Native Companies",category:"AI Transformation",readTime:"9 min",excerpt:"The next decade will produce a clear divide between businesses that operate through AI infrastructure and those that continue to coordinate manually.",content:"The competitive advantage of AI-native operations is not just efficiency — it's adaptability. A business that operates through an AI Operating System can respond to changes faster than a business that depends on human coordination.\n\nThe structural advantages compound over time because AI Operating Systems improve with data. Every interaction, every customer outcome, every workflow completion produces information that can be used to refine agent behaviour.\n\nThe businesses that will lead their industries in 2030 are not necessarily the ones with the most resources today — they're the ones that start building their AI Operating System infrastructure now.\n\nThe analogy is the internet: in the early 2000s, building a web presence seemed optional. Within a decade, businesses without digital infrastructure were structurally disadvantaged. AI infrastructure will follow the same pattern."},
  {id:"r10",title:"Business Process Intelligence — The Foundation of Effective AI",category:"Business Intelligence",readTime:"8 min",excerpt:"AI without business process intelligence is a solution looking for a problem. Understanding how your business actually operates is the foundation of every effective AI implementation.",content:"Business process intelligence is the discipline of understanding, in detail, how work actually happens within an organisation — as opposed to how it's supposed to happen according to policies and org charts.\n\nProcess intelligence covers four dimensions: process mapping, resource analysis, performance measurement, and gap identification.\n\nFor AI implementation, process intelligence is invaluable because it prevents automating a broken process. If a process is inefficient, automating it doesn't fix it — it makes the broken process run faster.\n\nProcess intelligence also provides the baseline metrics that make ROI measurement possible. The businesses that invest in process intelligence before AI implementation consistently achieve better outcomes, faster."},
];

function ResourcesPage({navigate}) {
  const arts=resources?.length?resources:FB_RES;
  const [sel,setSel]=useState(null);
  const cats=["All",...new Set(arts.map(a=>a.category))];
  const [cat,setCat]=useState("All");
  const filtered=arts.filter(a=>cat==="All"||a.category===cat);
  if(sel){
    const art=arts.find(a=>a.id===sel);
    if(art) return (
      <main style={{paddingTop:"var(--nav-h)"}}>
        <section className="section">
          <div className="wrap-sm">
            <button className="btn btn-ghost" style={{marginBottom:32}} onClick={()=>setSel(null)}><ChevronLeft size={14}/>Back to Resources</button>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <span className="tag tag-blue">{art.category}</span>
              <span className="label">{art.readTime} read</span>
            </div>
            <h1 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-0.025em",lineHeight:1.15,marginBottom:20}}>{art.title}</h1>
            <p style={{fontSize:18,color:"var(--muted)",lineHeight:1.7,fontStyle:"italic",marginBottom:36,borderBottom:"1px solid var(--border)",paddingBottom:36}}>{art.excerpt}</p>
            {art.content.split("\n\n").map((para,i)=><p key={i} style={{fontSize:16,lineHeight:1.8,marginBottom:22,color:"var(--ink-3)"}}>{para}</p>)}
            <hr className="divider" style={{margin:"40px 0"}}/>
            <CTABand navigate={navigate} title="Ready to Apply These Insights?" sub="Request an AI Business Audit and identify your specific opportunities."/>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"45vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><FileText size={12}/>Resources</div>
          <h1 className="section-title" style={{maxWidth:700,marginBottom:16}}>Practical Intelligence for <em>AI-Native Business Leaders.</em></h1>
          <p className="body-lg" style={{maxWidth:560}}>In-depth analysis on AI Operating Systems, agent orchestration, business audits, and the future of AI-native operations.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:36}}>
            {cats.map(c=><button key={c} className={`prob-filter${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
          </div>
          <div className="res-grid">
            {filtered.map(art=>(
              <div key={art.id} className="res-card" onClick={()=>setSel(art.id)}>
                <div className="res-card-top"><span className="tag tag-blue">{art.category}</span></div>
                <div className="res-card-body"><h3>{art.title}</h3><p>{art.excerpt}</p></div>
                <div className="res-card-foot"><span className="res-time">{art.readTime} read</span><span className="btn-ghost" style={{fontSize:12}}>Read <ArrowRight size={12}/></span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPage() {
  const [form,setForm]=useState({name:"",company:"",email:"",website:"",industry:"",size:"",challenge:"",stack:"",notes:""});
  const [done,setDone]=useState(false);
  const u=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  if(done) return (
    <main style={{paddingTop:"var(--nav-h)",minHeight:"80vh",display:"flex",alignItems:"center"}}>
      <div style={{textAlign:"center",maxWidth:520,margin:"0 auto",padding:"0 24px"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"var(--green-soft)",border:"1px solid rgba(34,197,94,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",color:"var(--green)"}}><CheckCircle size={28}/></div>
        <h2 style={{fontSize:28,fontWeight:800,marginBottom:12}}>Your AI transformation journey starts here.</h2>
        <p className="body-md">We've received your request and will be in touch within 24 hours to discuss your AI Business Audit.</p>
      </div>
    </main>
  );
  const INDS=["Real Estate","Healthcare","Finance & Insurance","Professional Services","Automotive","E-commerce","Manufacturing","Education","Hospitality","Logistics","Construction","SaaS / Technology","Other"];
  const SIZES=["1–10","11–50","51–200","201–500","500+"];
  return (
    <main style={{paddingTop:"var(--nav-h)"}}>
      <section className="section section-bg" style={{minHeight:"40vh",display:"flex",alignItems:"center"}}>
        <div className="wrap">
          <div className="pill pill-blue" style={{marginBottom:20}}><Mail size={12}/>Request an AI Audit</div>
          <h1 className="section-title" style={{maxWidth:680,marginBottom:16}}>Find Out What AI Could Actually Do for <em>Your Business.</em></h1>
          <p className="body-lg" style={{maxWidth:520}}>Don't guess where AI belongs. Let Xizo analyse your operations and identify the highest-impact opportunities.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="contact-shell">
            <div className="contact-info">
              <h2 style={{fontSize:26,fontWeight:800,marginBottom:14,letterSpacing:"-0.02em"}}>Let's Start with Your Business.</h2>
              <p>Every AI Business Audit starts with a conversation about how your business works, where it's under-performing, and where you want to take it.</p>
              <div className="contact-deets" style={{marginTop:32}}>
                {[
                  {icon:Mail,t:"Email",v:<a href="mailto:xizo.ai.group@gmail.com">xizo.ai.group@gmail.com</a>},
                  {icon:Phone,t:"Phone",v:<a href="tel:+916382347050">+91 638 234 7050</a>},
                  {icon:MessageSquare,t:"WhatsApp",v:<a href="https://wa.me/916382347050" target="_blank" rel="noopener noreferrer">+91 638 234 7050</a>},
                ].map(({icon:I,t,v})=>(
                  <div key={t} className="contact-det">
                    <div className="contact-det-icon"><I size={15}/></div>
                    <div><strong>{t}</strong><p>{v}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-form-wrap">
              <h3 style={{fontSize:19,fontWeight:700,marginBottom:24}}>Request an AI Business Audit</h3>
              <form onSubmit={e=>{e.preventDefault();setDone(true);}}>
                <div className="form-row">
                  <div className="form-field"><label>Full Name *</label><input type="text" value={form.name} onChange={u("name")} placeholder="Your name" required/></div>
                  <div className="form-field"><label>Company *</label><input type="text" value={form.company} onChange={u("company")} placeholder="Your company" required/></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label>Work Email *</label><input type="email" value={form.email} onChange={u("email")} placeholder="you@company.com" required/></div>
                  <div className="form-field"><label>Website</label><input type="url" value={form.website} onChange={u("website")} placeholder="https://"/></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label>Industry *</label><select value={form.industry} onChange={u("industry")} required><option value="">Select industry</option>{INDS.map(i=><option key={i}>{i}</option>)}</select></div>
                  <div className="form-field"><label>Company Size</label><select value={form.size} onChange={u("size")}><option value="">Select size</option>{SIZES.map(s=><option key={s}>{s} employees</option>)}</select></div>
                </div>
                <div className="form-field"><label>Primary Business Challenge *</label><textarea value={form.challenge} onChange={u("challenge")} required placeholder="What's the biggest operational challenge or growth bottleneck your business is facing?"/></div>
                <div className="form-field"><label>Current Technology Stack</label><input type="text" value={form.stack} onChange={u("stack")} placeholder="e.g. Salesforce, HubSpot, Google Workspace, Xero…"/></div>
                <div className="form-field"><label>Additional Information</label><textarea value={form.notes} onChange={u("notes")} style={{minHeight:72}} placeholder="Anything else that would help us understand your business."/></div>
                <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",justifyContent:"center",marginTop:8}}>Submit Request <ArrowRight size={15}/></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Page wrapper — spring entrance, Apple: enter from same axis as exit ───────
function Page({ children }) {
  const ref = useRef(null);
  useSpringEntrance(ref);
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const {route,navigate}=useRouter();
  const render=()=>{
    // Key on route so Page re-mounts and re-animates on navigation
    const key = route.page + (route.sub ? "/" + route.sub : "");
    const content = (() => {
      switch(route.page) {
        case "home":          return <HomePage          navigate={navigate}/>;
        case "audit":         return <AuditPage         navigate={navigate}/>;
        case "ai-os":         return <AIOSPage          navigate={navigate}/>;
        case "agents":        return <AgentsPage        navigate={navigate}/>;
        case "orchestration": return <OrchestrationPage navigate={navigate}/>;
        case "problems":      return <ProblemsPage      navigate={navigate}/>;
        case "industries":    return route.sub?<IndustryDetailPage id={route.sub} navigate={navigate}/>:<IndustriesPage navigate={navigate}/>;
        case "how-it-works":  return <HowPage           navigate={navigate}/>;
        case "use-cases":     return <UseCasesPage      navigate={navigate}/>;
        case "roi":           return <ROIPage           navigate={navigate}/>;
        case "integrations":  return <IntegrationsPage  navigate={navigate}/>;
        case "human-ai":      return <HumanAIPage       navigate={navigate}/>;
        case "about":         return <AboutPage         navigate={navigate}/>;
        case "resources":     return <ResourcesPage     navigate={navigate}/>;
        case "contact":       return <ContactPage/>;
        default:              return <HomePage          navigate={navigate}/>;
      }
    })();
    return <Page key={key}>{content}</Page>;
  };
  return (<><Nav route={route} navigate={navigate}/>{render()}<Footer navigate={navigate}/></>);
}
