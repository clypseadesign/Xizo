import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Car,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Database,
  FileCheck2,
  GitBranch,
  Grip,
  HeartPulse,
  Home,
  Link2,
  LockKeyhole,
  Map,
  MessageSquareText,
  MousePointer2,
  Network,
  ShieldCheck,
  Target,
  UserCheck,
  Workflow
} from "lucide-react";
import heroSystemImage from "./assets/hero.png";
import { industries, storyChapters } from "./xizoData";

const industryIcons = {
  "real-estate": Building2,
  healthcare: HeartPulse,
  "professional-services": BriefcaseBusiness,
  "finance-insurance": ShieldCheck,
  automotive: Car
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
  Service: ClipboardList
};

function getInitialRoute() {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("industry/")) {
    const industryId = hash.split("/")[1];
    if (industries.some((industry) => industry.id === industryId)) {
      return { page: "industry", industryId };
    }
  }
  if (hash === "agents") return { page: "agents", industryId: industries[0].id };
  return { page: "home", industryId: industries[0].id };
}

function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const selectedIndustry = useMemo(
    () => industries.find((industry) => industry.id === route.industryId) ?? industries[0],
    [route.industryId]
  );

  const navigate = useCallback((page, industryId = route.industryId) => {
    const nextHash = page === "home" ? "" : page === "agents" ? "agents" : `industry/${industryId}`;
    window.history.pushState(null, "", nextHash ? `#${nextHash}` : window.location.pathname);
    setRoute({ page, industryId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route.industryId]);

  useEffect(() => {
    const onPopState = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <main className="app-shell" style={{ "--accent": selectedIndustry.accent }}>
      <SiteNav route={route} navigate={navigate} />
      {route.page === "home" ? <HomePage navigate={navigate} /> : null}
      {route.page === "agents" ? <AgentsPage navigate={navigate} /> : null}
      {route.page === "industry" ? <IndustryPage industry={selectedIndustry} navigate={navigate} /> : null}
      <SiteFooter navigate={navigate} />
    </main>
  );
}

function SiteNav({ route, navigate }) {
  return (
    <header className="site-nav">
      <button className="brand-button" type="button" onClick={() => navigate("home")} aria-label="Open Xizo home">
        <span className="brand-mark" aria-hidden="true">
          <Network size={19} />
        </span>
        <span>
          <strong>Xizo</strong>
          <small>Agentic OS for Business</small>
        </span>
      </button>
      <nav aria-label="Primary navigation">
        <button className={route.page === "home" ? "active" : ""} type="button" onClick={() => navigate("home")}>
          <Home size={16} aria-hidden="true" />
          Home
        </button>
        <button className={route.page === "agents" ? "active" : ""} type="button" onClick={() => navigate("agents")}>
          <Bot size={16} aria-hidden="true" />
          AI Agents
        </button>
        <button className={route.page === "industry" ? "active" : ""} type="button" onClick={() => navigate("industry")}>
          <Workflow size={16} aria-hidden="true" />
          Industry OS
        </button>
      </nav>
      <button className="primary-btn" type="button" onClick={() => navigate("agents")}>
        Explore OS Pages
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI employees, one operating system</p>
          <h1>Xizo builds the agentic OS for every business workflow.</h1>
          <p>
            The next business website should not feel like a brochure. It should let customers see their business become
            an AI operating system: agents, workflows, approvals, integrations, and outcomes, all visible in one place.
          </p>
          <div className="button-row">
            <button className="primary-btn large" type="button" onClick={() => navigate("agents")}>
              Open AI Agents Page
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button className="secondary-btn large" type="button" onClick={() => navigate("industry", "real-estate")}>
              View Real Estate OS
              <Map size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="hero-board" aria-label="Xizo command center preview">
          <div className="board-header">
            <div>
              <span>Live workflow</span>
              <strong>Lead to human-approved action</strong>
            </div>
            <span className="live-chip">Operational</span>
          </div>
          <div className="board-stage">
            <img className="hero-system-asset" src={heroSystemImage} alt="Layered Xizo operating system visual" />
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
              <p>High-impact actions keep context, rationale, and audit trail attached.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">Brand identity</p>
          <h2>The Xizo story</h2>
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
      </section>

      <section className="section-band split-band">
        <div>
          <p className="eyebrow">Product architecture</p>
          <h2>Do not sell disconnected agents. Show the operating system.</h2>
          <p className="body-copy">
            Xizo pages should move the visitor from problem to agent, from agent to workflow, from workflow to human
            approval, and from approval to measurable business outcome.
          </p>
        </div>
        <div className="architecture-list">
          {["Industry problem", "AI workforce", "Movable workflow canvas", "Mind map explanation", "Human approval", "Build this agent"].map((item) => (
            <div key={item}>
              <BadgeCheck size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AgentsPage({ navigate }) {
  return (
    <section className="page-section">
      <div className="section-heading wide">
        <p className="eyebrow">AI Agents page</p>
        <h1>Choose an industry. Explore the AI operating system behind it.</h1>
        <p>
          Every industry page explains the business problem, the agents that solve it, the movable workflow canvas, and
          the mind map that shows how each agent receives information and produces action.
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

function IndustryPage({ industry, navigate }) {
  const [selectedAgentId, setSelectedAgentId] = useState(industry.agents[0].id);
  const [positionsByIndustry, setPositionsByIndustry] = useState(() =>
    Object.fromEntries(
      industries.map((item) => [item.id, Object.fromEntries(item.agents.map((agent) => [agent.id, agent.position]))])
    )
  );

  const firstAgentId = industry.agents[0].id;

  useEffect(() => {
    setSelectedAgentId(firstAgentId);
  }, [industry.id, firstAgentId]);

  const positions = positionsByIndustry[industry.id];
  const selectedAgent = industry.agents.find((agent) => agent.id === selectedAgentId) ?? industry.agents[0];

  const updateNode = useCallback((agentId, nextPosition) => {
    setPositionsByIndustry((current) => ({
      ...current,
      [industry.id]: {
        ...current[industry.id],
        [agentId]: nextPosition
      }
    }));
  }, [industry.id]);

  return (
    <section className="industry-page" style={{ "--accent": industry.accent }}>
      <div className="industry-hero">
        <div>
          <button className="text-btn" type="button" onClick={() => navigate("agents")}>
            <ArrowRight className="rotate-180" size={16} aria-hidden="true" />
            Back to AI Agents
          </button>
          <p className="eyebrow">{industry.shortName}</p>
          <h1>{industry.headline}</h1>
          <p>{industry.story}</p>
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
        />
        <AgentPanel agent={selectedAgent} />
      </div>

      <div className="bottom-grid">
        <MindMap agent={selectedAgent} />
        <AgentList industry={industry} selectedAgentId={selectedAgent.id} onSelect={setSelectedAgentId} />
      </div>
    </section>
  );
}

function DraggableCanvas({ industry, positions, selectedAgentId, onSelect, onMove }) {
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
      offsetY: event.clientY - rect.top - current.y
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

  const endDrag = () => {
    dragRef.current = null;
  };

  const agents = industry.agents;

  return (
    <section className="canvas-panel" aria-label={`${industry.name} movable workflow canvas`}>
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Miro-style canvas</p>
          <h2>Move nodes. Select an agent. Watch the mind map update.</h2>
        </div>
        <span className="hint-chip">
          <MousePointer2 size={16} aria-hidden="true" />
          Drag nodes
        </span>
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
              onPointerDown={(event) => startDrag(event, agent)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <span>
                <Icon size={17} aria-hidden="true" />
              </span>
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

function AgentPanel({ agent }) {
  const Icon = agentIcons[agent.category] ?? Bot;
  return (
    <aside className="agent-panel-card" aria-label="Selected agent explanation">
      <div className="agent-title">
        <span>
          <Icon size={21} aria-hidden="true" />
        </span>
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
        <span>Sensitive or high-impact actions can require human approval before execution.</span>
      </div>
    </aside>
  );
}

function MiniList({ title, items, icon: Icon }) {
  return (
    <div className="mini-list">
      <h3>
        <Icon size={16} aria-hidden="true" />
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MindMap({ agent }) {
  return (
    <section className="mindmap-panel" aria-label={`${agent.name} mind map`}>
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Mind map</p>
          <h2>{agent.name} operating logic</h2>
        </div>
        <span className="hint-chip">
          <GitBranch size={16} aria-hidden="true" />
          Live from selected node
        </span>
      </div>
      <div className="mindmap">
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
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

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

function SiteFooter({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>Xizo</strong>
        <span>AI employees. One operating system. Human control.</span>
      </div>
      <button className="secondary-btn" type="button" onClick={() => navigate("agents")}>
        Explore AI Agents
      </button>
    </footer>
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default App;
