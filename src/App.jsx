import React, { useEffect } from 'react';
import './index.css';

function App() {
  useEffect(() => {
    
  // Nav shrink + close mobile menu on scroll
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shrink', window.scrollY > 40);
  });
  document.querySelectorAll('#nav .links a').forEach(a => a.addEventListener('click', () => { navToggle.checked = false; }));

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.14 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animate bars when solution section is visible
  const bars = document.querySelectorAll('.bar-fill');
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('filled'); barIO.unobserve(e.target); } });
  }, { threshold:0.3 });
  bars.forEach(b => barIO.observe(b));

  // Agent tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.agent-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.agent-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  }, []);

  return (
    <>
      

{/* ============ NAV ============ */}
<nav id="nav">
  <div className="wrap">
    <a href="#hero"><img className="logo" src="data:image/png;base64,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" alt="Xizo" /></a>
    <input type="checkbox" id="nav-toggle" />
    <ul className="links">
      <li><a href="#problem">Problem</a></li>
      <li><a href="#agents">Agents</a></li>
      <li><a href="#industries">Industries</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#cta" className="btn btn-primary" style={{'padding': '10px 18px'}}>Book a call</a></li>
    </ul>
    <label htmlFor="nav-toggle" className="burger" aria-label="Toggle menu"><span></span><span></span><span></span></label>
  </div>
</nav>

{/* ============ HERO ============ */}
<header id="hero">
  <div className="hero-swoosh"></div>
  <div className="hero-swoosh thin"></div>
  <div className="wrap">
    <div className="hero-tag">AI Systems for Your Own Brand</div>
    <h1>Stop losing time.<br />Stop losing <span className="accent">customers.</span></h1>
    <p className="hero-sub">Businesses don't fail because they lack customers — they struggle because their systems are slow, manual, and unable to keep up. Xizo builds custom AI agents that run under your brand, around the clock.</p>
    <div className="hero-ctas">
      <a href="#cta" className="btn btn-primary">Book a free audit</a>
      <a href="#agents" className="btn btn-ghost">See what agents can do</a>
    </div>
    <div className="hero-stats">
      <div className="hstat"><b>10</b><span>AI agents ready to deploy</span></div>
      <div className="hstat"><b>24/7</b><span>Always on, never tired</span></div>
      <div className="hstat"><b>0</b><span>Missed leads after hours</span></div>
    </div>
  </div>
</header>

{/* ============ PROBLEM ============ */}
<section className="sec" id="problem">
  <div className="wrap">
    <div className="sec-head reveal">
      <div>
        <div className="eyebrow">Where the money leaks out</div>
        <h2>Businesses are losing<br />money every day.</h2>
      </div>
      <p className="section-lead">Most companies unknowingly lose revenue because of inefficient processes — not because they lack customers.</p>
    </div>

    <div className="problem-grid reveal">
      <div className="p-card"><span className="pn">01</span><h3>Slow Customer Response</h3><p>Customers expect immediate replies. Waiting even a few minutes can cost the sale.</p></div>
      <div className="p-card"><span className="pn">02</span><h3>Missed Leads</h3><p>Prospects reach out after hours. Nobody responds — a competitor wins the customer.</p></div>
      <div className="p-card"><span className="pn">03</span><h3>Repetitive Manual Work</h3><p>Hours lost to copying data, sending emails, building reports and spreadsheets.</p></div>
      <div className="p-card"><span className="pn">04</span><h3>Rising Employee Costs</h3><p>Growth usually means more staff, salaries, training, and management overhead.</p></div>
      <div className="p-card"><span className="pn">05</span><h3>Human Errors</h3><p>Wrong invoices, missing details, forgotten follow-ups — small mistakes get expensive.</p></div>
      <div className="p-card"><span className="pn">06</span><h3>Support Overload</h3><p>Teams answer the same questions on repeat, leaving less time to solve real problems.</p></div>
      <div className="p-card"><span className="pn">07</span><h3>Poor Communication</h3><p>Information scattered across email, WhatsApp, spreadsheets, and paper.</p></div>
      <div className="p-card"><span className="pn">08</span><h3>Difficult to Scale</h3><p>Growing usually means hiring more people, with costs climbing faster than output.</p></div>
    </div>
  </div>
</section>

{/* ============ SOLUTION / COMPARE ============ */}
<section className="sec dark" id="solution">
  <div className="wrap">
    <div className="sec-head reveal">
      <div>
        <div className="eyebrow">Before and after</div>
        <h2>Intelligent systems<br />that work <span style={{'color': 'var(--accent-2)'}}>24/7.</span></h2>
      </div>
      <p className="section-lead">Our AI never sleeps, never forgets, never gets tired, and never misses an opportunity.</p>
    </div>

    <div className="compare reveal">
      <div className="c-col without">
        <div className="clabel">Without Xizo</div>
        <div className="c-step">Lead messages after hours — no reply until next morning.</div>
        <div className="c-step">Staff manually re-type customer details into three systems.</div>
        <div className="c-step">Invoices drafted by hand, sent whenever someone has time.</div>
        <div className="c-step">Same support questions answered one by one, all day.</div>
        <div className="c-step">Follow-ups depend on someone remembering to do them.</div>
      </div>
      <div className="c-col with">
        <div className="clabel">With Xizo</div>
        <div className="c-step">Lead is greeted, qualified, and booked within seconds — any hour.</div>
        <div className="c-step">Customer data syncs automatically across every system.</div>
        <div className="c-step">Invoices generate and send themselves on schedule.</div>
        <div className="c-step">Common questions answered instantly, day or night.</div>
        <div className="c-step">Every follow-up is triggered automatically, on time.</div>
      </div>
    </div>

    <div className="bars reveal">
      <div className="bar-row"><div className="blabel"><span>Customer response time</span><span>Minutes → Seconds</span></div><div className="bar-track"><div className="bar-fill" data-w="88%" style={{'-W': '88%'}}></div></div></div>
      <div className="bar-row"><div className="blabel"><span>Team productivity</span><span>Repetitive work removed</span></div><div className="bar-track"><div className="bar-fill" data-w="76%" style={{'-W': '76%'}}></div></div></div>
      <div className="bar-row"><div className="blabel"><span>Operational cost</span><span>Reduced, same headcount</span></div><div className="bar-track"><div className="bar-fill" data-w="64%" style={{'-W': '64%'}}></div></div></div>
    </div>
  </div>
</section>

{/* ============ AGENTS ============ */}
<section className="sec" id="agents">
  <div className="wrap">
    <div className="sec-head reveal">
      <div>
        <div className="eyebrow">Your AI workforce</div>
        <h2>Ten agents,<br />one team.</h2>
      </div>
      <p className="section-lead">Deployed under your brand. Front-line agents talk to customers; back-office agents keep the business running behind the scenes.</p>
    </div>

    <div className="tabs reveal" role="tablist">
      <button className="tab active" data-tab="front">Front line</button>
      <button className="tab" data-tab="back">Back office</button>
    </div>

    <div className="agent-panel active reveal" data-panel="front">
      <div className="a-card"><div className="an">AGENT 01</div><h3>AI Customer Support Agent</h3><ul><li>Available 24/7, every day</li><li>Answers questions instantly</li><li>Supports multiple languages</li><li>Handles thousands of chats at once</li></ul></div>
      <div className="a-card"><div className="an">AGENT 02</div><h3>AI Voice Receptionist</h3><ul><li>Answers incoming phone calls</li><li>Books appointments in real time</li><li>Transfers calls when needed</li><li>Collects customer information</li></ul></div>
      <div className="a-card"><div className="an">AGENT 03</div><h3>AI Sales Agent</h3><ul><li>Responds to new leads instantly</li><li>Qualifies prospects automatically</li><li>Schedules meetings on the calendar</li><li>Follows up so nothing is missed</li></ul></div>
      <div className="a-card"><div className="an">AGENT 04</div><h3>AI Appointment Booking Agent</h3><ul><li>Books appointments automatically</li><li>Sends reminders, cuts no-shows</li><li>Reschedules bookings on request</li><li>Keeps every calendar in sync</li></ul></div>
      <div className="a-card"><div className="an">AGENT 05</div><h3>AI CRM Agent</h3><ul><li>Updates customer records automatically</li><li>Tracks every interaction</li><li>Creates reminders for the team</li><li>Keeps data accurate, always</li></ul></div>
    </div>

    <div className="agent-panel" data-panel="back">
      <div className="a-card"><div className="an">AGENT 06</div><h3>AI Email Automation</h3><ul><li>Responds to customer emails</li><li>Categorizes every inquiry</li><li>Drafts replies for review or auto-send</li><li>Routes to the right department</li></ul></div>
      <div className="a-card"><div className="an">AGENT 07</div><h3>AI Marketing Assistant</h3><ul><li>Creates social media posts</li><li>Drafts ads and email campaigns</li><li>Writes product descriptions and blogs</li><li>Keeps content flowing consistently</li></ul></div>
      <div className="a-card"><div className="an">AGENT 08</div><h3>AI HR Assistant</h3><ul><li>Screens resumes against role criteria</li><li>Schedules interviews automatically</li><li>Answers employee questions</li><li>Automates onboarding steps</li></ul></div>
      <div className="a-card"><div className="an">AGENT 09</div><h3>AI Finance Assistant</h3><ul><li>Processes invoices</li><li>Tracks expenses in real time</li><li>Generates financial reports</li><li>Flags unusual transactions</li></ul></div>
      <div className="a-card"><div className="an">AGENT 10</div><h3>AI Knowledge Assistant</h3><ul><li>Understands your company documents</li><li>Answers employee questions instantly</li><li>Provides accurate company information</li><li>Cuts down time spent searching</li></ul></div>
    </div>
  </div>
</section>

{/* ============ BENEFITS + INDUSTRIES ============ */}
<section className="sec dark" id="industries">
  <div className="wrap">
    <div className="split">
      <div className="reveal">
        <div className="eyebrow">What businesses gain</div>
        <h2 style={{'fontSize': '30px'}}>Results businesses typically see</h2>
        <div className="checklist" style={{'marginTop': '26px'}}>
          <div className="check-item"><span className="mark">✓</span>Faster customer response</div>
          <div className="check-item"><span className="mark">✓</span>Higher customer satisfaction</div>
          <div className="check-item"><span className="mark">✓</span>Reduced operational costs</div>
          <div className="check-item"><span className="mark">✓</span>Increased productivity</div>
          <div className="check-item"><span className="mark">✓</span>Improved sales conversion</div>
          <div className="check-item"><span className="mark">✓</span>Better decision making</div>
          <div className="check-item"><span className="mark">✓</span>Fewer manual errors</div>
          <div className="check-item"><span className="mark">✓</span>Faster business growth</div>
          <div className="check-item"><span className="mark">✓</span>24/7 availability</div>
          <div className="check-item"><span className="mark">✓</span>Greater efficiency</div>
        </div>
      </div>
      <div className="reveal">
        <div className="eyebrow">Who we work with</div>
        <h2 style={{'fontSize': '30px'}}>Industries we serve</h2>
        <div className="tags" style={{'marginTop': '26px'}}>
          <span className="tag-pill">Healthcare</span><span className="tag-pill">Real Estate</span><span className="tag-pill">Manufacturing</span>
          <span className="tag-pill">Education</span><span className="tag-pill">Retail</span><span className="tag-pill">Finance</span>
          <span className="tag-pill">Insurance</span><span className="tag-pill">Hospitality</span><span className="tag-pill">Restaurants</span>
          <span className="tag-pill">Construction</span><span className="tag-pill">Legal Services</span><span className="tag-pill">Travel</span>
          <span className="tag-pill">E-commerce</span><span className="tag-pill">Professional Services</span><span className="tag-pill">Startups</span>
          <span className="tag-pill">SMBs</span><span className="tag-pill">Large Enterprises</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ============ PROCESS ============ */}
<section className="sec" id="process">
  <div className="wrap">
    <div className="sec-head reveal">
      <div>
        <div className="eyebrow">How we build it</div>
        <h2>From first call<br />to live AI.</h2>
      </div>
      <p className="section-lead">A fixed, transparent process — from studying how your business runs today, to an agent live under your brand.</p>
    </div>

    <div className="timeline reveal">
      <div className="t-step"><div className="tn">Step 01</div><h3>Business Process Analysis</h3><p>We study how your business actually operates, day to day.</p></div>
      <div className="t-step"><div className="tn">Step 02</div><h3>Identify Bottlenecks</h3><p>We find exactly what's slowing the business down.</p></div>
      <div className="t-step"><div className="tn">Step 03</div><h3>Design AI Solution</h3><p>A custom AI system is designed around your workflow.</p></div>
      <div className="t-step"><div className="tn">Step 04</div><h3>Development</h3><p>We build and integrate the AI with your existing tools.</p></div>
      <div className="t-step"><div className="tn">Step 05</div><h3>Testing</h3><p>Everything is tested thoroughly before it touches a customer.</p></div>
      <div className="t-step"><div className="tn">Step 06</div><h3>Deployment</h3><p>Your AI goes live, under your brand.</p></div>
      <div className="t-step"><div className="tn">Step 07</div><h3>Optimization</h3><p>Continuous improvements keep performance climbing.</p></div>
    </div>
  </div>
</section>

{/* ============ FAQ ============ */}
<section className="sec dark" id="faq">
  <div className="wrap">
    <div className="sec-head reveal">
      <div>
        <div className="eyebrow">Questions, answered</div>
        <h2>Frequently asked.</h2>
      </div>
    </div>

    <div className="faq reveal">
      <details open>
        <summary>How long does implementation take?</summary>
        <p>Most agents go live within a few weeks of kickoff, depending on how many systems we're integrating with and how much customization the workflow needs.</p>
      </details>
      <details>
        <summary>Is my business data secure?</summary>
        <p>Yes. We use enterprise-grade security and cloud infrastructure, and access to your data is scoped to only what each agent needs to do its job.</p>
      </details>
      <details>
        <summary>Will this replace my team?</summary>
        <p>No. Xizo removes repetitive, low-value work so your team can spend time on the things that actually need a person — relationships, judgment calls, and creative work.</p>
      </details>
      <details>
        <summary>What does it cost?</summary>
        <p>Pricing depends on which agents you need and how deep the integration goes. Book a free audit and we'll scope it against your actual workflow before quoting anything.</p>
      </details>
      <details>
        <summary>Which tools do you integrate with?</summary>
        <p>Your existing CRM, calendar, WhatsApp/email, and most common business software. If we haven't built a connector for something you use, we'll build one.</p>
      </details>
    </div>
  </div>
</section>

{/* ============ CTA ============ */}
<section id="cta">
  <div className="wrap">
    <div className="reveal">
      <div className="eyebrow" style={{'justifyContent': 'center'}}>Let's talk</div>
      <h2>Let's build your <span className="accent">AI workforce.</span></h2>
      <p className="promise">We don't replace people. We remove repetitive work so people can focus on creativity, customer relationships, and business growth.</p>
      <a href="mailto:xizo.ai.group@gmail.com?subject=Free%20AI%20Audit%20Request" className="btn btn-primary">Book a free audit</a>
      <div className="cta-contacts">
        <a href="mailto:xizo.ai.group@gmail.com">xizo.ai.group@gmail.com</a>
        <span style={{'color': 'var(--steel)'}}>·</span>
        <a href="tel:+916382354705">+91 63823 54705</a>
      </div>
    </div>
  </div>
</section>

{/* ============ FOOTER ============ */}
<footer>
  <div className="wrap">
    <div className="foot-top">
      <img className="foot-logo" src="data:image/png;base64,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" alt="Xizo" />
      <div className="foot-links">
        <a href="#problem">Problem</a>
        <a href="#agents">Agents</a>
        <a href="#industries">Industries</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="foot-social">
        <a href="#">LinkedIn</a>
        <a href="#">Instagram</a>
        <a href="#">X</a>
      </div>
    </div>
    <div className="foot-bottom">
      <span>© 2026 XIZO — AI SYSTEMS FOR YOUR OWN BRAND</span>
      <span>PRIVACY POLICY · TERMS OF SERVICE</span>
    </div>
  </div>
</footer>




    </>
  );
}

export default App;
