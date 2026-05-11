import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import aiHead from "@/assets/ai-head.png";
import aiVideo from "@/assets/ai-head.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zuri AI — The Autonomous Hotel" },
      { name: "description", content: "Zuri is an autonomous AI system that runs every department of your hotel 24/7. Built on Claude AI. Running live in Zanzibar since 2025." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

const agents = [
  { name: "General Manager", desc: "The GM that never sleeps. Sends a 06:00 briefing to the owner. Writes a journal every night. Coordinates every other agent.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20l3-10 4 4 3-8 4 6 3-4 3 12z"/><circle cx="12" cy="4" r="1.5" fill="currentColor"/></svg> },
  { name: "Housekeeping", desc: "Assigns tasks by name in Swahili. Verifies completion via photo + AI vision scoring 0–100. Below 85 = auto redo with feedback.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 4.5l-15 15M9 9l6 6M4 22l4-4"/><path d="M14 4l-2 2 6 6 2-2z"/></svg> },
  { name: "Revenue Management", desc: "Real-time occupancy, ADR and RevPAR. Auto-adjusts nightly rates within your band. Knows your peak seasons and competitors.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8M21 7v6h-6"/></svg> },
  { name: "Security", desc: "Briefs the night guard at 18:00. Checks in at 02:00. Reminds them to feed the dogs by 19:00. Watches CCTV with AI vision.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg> },
  { name: "Guest Experience", desc: "Reads every message. Detects sentiment in real time. Replies in the guest's language. Escalates complaints before they reach TripAdvisor.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { name: "Food & Beverage", desc: "Daily kitchen briefings with guest count + dietary needs. Dinner brief at 16:00. Tracks F&B revenue and flags underperformance.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h2v11M7 11V2M11 2v20M21 15V2a4 4 0 00-4 4v7h4z"/></svg> },
  { name: "HR Coach", desc: "Personal 3-sentence coaching at 07:15 — based on yesterday's actual mistakes. Tracks staff performance scores over time.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { name: "Maintenance", desc: "Predicts equipment failures from repair history. Flags items repaired 3+ times in 90 days. Assigns and follows up with technicians.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a5 5 0 00-6.4 6.4l-6 6a1 1 0 001.4 1.4l6-6a5 5 0 006.4-6.4l-2.5 2.5-2.3-2.3 2.4-2.6z"/></svg> },
  { name: "Finance", desc: "Daily P&L by department. Weekly financial summary to owner. Flags any department over budget by >10%.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { name: "Storekeeper", desc: "Photo-verified inventory withdrawal. Staff send a photo, Zuri's vision AI verifies it, then deducts. Nothing leaves untracked.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4a2 2 0 001-1.7z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/></svg> },
  { name: "Procurement", desc: "Auto-generates POs at reorder threshold. Tracks supplier performance and delivery times.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.8a2 2 0 002-1.6L23 6H6"/></svg> },
  { name: "Booking Integration", desc: "Booking.com & Airbnb sync. The moment a reservation arrives, Zuri creates pre-arrival tasks and sends a personal welcome message.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { name: "Self-Learning System", desc: "Researches hospitality topics every night, synthesises findings, adds to its own knowledge base. Smarter every single morning.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 00-4 4 4 4 0 00-2 7.5 4 4 0 002 7.5 4 4 0 008 0 4 4 0 002-7.5A4 4 0 0016 6a4 4 0 00-4-4z"/><path d="M12 6v15M8.5 9.5l3.5 2 3.5-2M9 16l3-1.5 3 1.5"/></svg> },
];

const orbitOuter = [
  { cls: "n1", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 4.5l-15 15M9 9l6 6"/><path d="M14 4l-2 2 6 6 2-2z"/></svg> },
  { cls: "n2", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8M21 7v6h-6"/></svg> },
  { cls: "n3", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg> },
  { cls: "n4", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h2v11M7 11V2M11 2v20M21 15V2a4 4 0 00-4 4v7h4z"/></svg> },
  { cls: "n5", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { cls: "n6", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4a2 2 0 001-1.7z M3.3 7L12 12l8.7-5"/></svg> },
  { cls: "n7", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { cls: "n8", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
];

const timeline = [
  { dot: "D0", day: "BEFORE WE ARRIVE", h: "Preparation", p: "You complete the implementation guide. Every staff member downloads Slack. All system credentials gathered. Router and camera access confirmed." },
  { dot: "D1", day: "DAY 1 — ARRIVAL", h: "On-site setup", p: "Server installed. Zuri connected to your network. Database seeded with your property — every room, every staff member, every SOP. Slack workspace live." },
  { dot: "D2", day: "DAY 2 — INTEGRATION", h: "Systems connected", p: "Booking.com XML push active. Airbnb synced. CCTV streams wired. All API integrations tested. Zuri reads its first real reservation." },
  { dot: "D3", day: "DAY 3 — TRAINING", h: "Staff trained in person", p: "Every team member trained in their language. Housekeeping learns photo submission in Swahili. Security learns evening briefings. By day's end — every person has completed their first real Zuri task." },
  { dot: "D4", day: "DAY 4 — GO LIVE", h: "Zuri goes live at 06:00", p: "First morning briefing sent to the owner. All 16 scheduled jobs firing. We stay on-site for supervision and fine-tuning. By evening — Zuri runs independently. You go home. Zuri stays." },
];

function Index() {
  useEffect(() => {
    const nav = document.getElementById("topNav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => observer.observe(el));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-noise"></div>
      </div>

      <nav className="top" id="topNav">
        <div className="container nav-inner">
          <a href="#" className="logo">
            <span className="logo-mark"><span></span></span>
            ZURI&nbsp;AI
          </a>
          <div className="nav-links">
            <a href="#agents">Agents</a>
            <a href="#how">How it works</a>
            <a href="#proof">Proof</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="nav-cta">
            <a href="#cta" className="btn btn-ghost">Sign in</a>
            <a href="#cta" className="btn btn-primary">Book demo →</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" id="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="hero-badge">
                  <span className="live-dot"></span>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--text-1)" }}>LIVE IN ZANZIBAR · AUTONOMOUS SINCE 2025</span>
                </div>
                <h1 className="h-hero">
                  <span className="line">Your hotel.</span>
                  <span className="line"><em>Fully managed.</em></span>
                  <span className="line">No managers required.</span>
                </h1>
                <p className="lead">
                  Zuri is an autonomous AI system that runs every department of your hotel — housekeeping, revenue, security, food &amp; beverage, finance, maintenance — 24/7. <strong style={{ color: "var(--text-0)" }}>Not software you manage. An AI that manages for you.</strong>
                </p>
                <div className="hero-ctas">
                  <a href="#cta" className="btn btn-primary btn-lg">Book a demo →</a>
                  <a href="#how" className="btn btn-ghost btn-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    Watch how it works
                  </a>
                </div>
                <div className="trust-row">
                  <span>Built on Claude AI</span>
                  <span className="sep"></span>
                  <span>Powered by Anthropic</span>
                  <span className="sep"></span>
                  <span>4.6 ★ Live property</span>
                </div>
              </div>

              <div className="brain-stage">
                <div className="brain-bg-glow"></div>
                <div className="brain-rings">
                  <div className="brain-ring ring-1"></div>
                  <div className="brain-ring ring-2"></div>
                  <div className="brain-ring ring-3"></div>
                  <div className="brain-ring ring-4"></div>
                </div>
                <video
          autoPlay
          loop
          muted
          playsInline
          poster={aiHead}
          className="ai-head-img"
          width={1024}
          height={1024}
        >
          <source src={aiVideo} type="video/mp4" />
        </video>
                <div className="orbit">
                  <div className="orbit-track">
                    {orbitOuter.map((n) => (
                      <div key={n.cls} className={`agent-node counter ${n.cls}`}>{n.svg}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-stats reveal">
              <div className="h-stat"><div className="h-stat-num"><em>13</em></div><div className="h-stat-label">Specialist agents</div></div>
              <div className="h-stat"><div className="h-stat-num"><em>24/7</em></div><div className="h-stat-label">Autonomous ops</div></div>
              <div className="h-stat"><div className="h-stat-num"><em>4</em> days</div><div className="h-stat-label">To go live</div></div>
              <div className="h-stat"><div className="h-stat-num"><em>40-60%</em></div><div className="h-stat-label">Productivity gain</div></div>
            </div>
          </div>
        </section>

        <section id="problem">
          <div className="container">
            <div className="problem-grid">
              <div className="reveal">
                <div className="eyebrow eyebrow-accent" style={{ marginBottom: 24 }}>// THE PROBLEM</div>
                <h2 className="h-section">Hotel management<br/>is <em>broken.</em></h2>
                <p className="text-lg" style={{ marginTop: 28, maxWidth: 480 }}>A typical 50-room property employs 8–15 managers just to coordinate what the front-line staff already know how to do. Every shift change loses information. Every manager asleep at 2 AM is a gap in your operation.</p>
                <p className="text-lg" style={{ marginTop: 20, maxWidth: 480 }}>The hospitality industry spends billions every year on management layers that exist to pass information between people — not to create value.</p>
              </div>
              <div className="reveal">
                <div className="stat-row"><div className="stat-num">8–15</div><div className="stat-text">Managers per 50-room property, doing coordination — not creating value</div></div>
                <div className="stat-row"><div className="stat-num">100%</div><div className="stat-text">Of shift changes lose information through handover gaps</div></div>
                <div className="stat-row"><div className="stat-num">2 AM</div><div className="stat-text">Every silent night-shift hour is a failure waiting to happen</div></div>
              </div>
            </div>
            <div className="problem-closer reveal">ZURI ELIMINATES THE MANAGEMENT LAYER — <strong>ENTIRELY.</strong></div>
          </div>
        </section>

        <section id="agents">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// WHAT ZURI DOES</div>
              <h2 className="h-section"><em>13 specialist agents.</em><br/>One brain. Zero managers.</h2>
              <p>Each agent is a domain expert. They coordinate through a central General Manager AI. They never sleep, never get sick, never have a bad day.</p>
            </div>
            <div className="agents-grid reveal-stagger">
              {agents.map((a) => (
                <div key={a.name} className="agent-card">
                  <div className="agent-icon">{a.icon}</div>
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-desc">{a.desc}</div>
                </div>
              ))}
            </div>
            <div className="think-loop reveal">
              <div className="think-loop-pulse">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>
              <div>
                <h4>Autonomous Think Loop — every <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent-2)" }}>15 minutes</em></h4>
                <p>Zuri scans your entire property — open incidents, overdue tasks, silent staff, unwelcomed arrivals — and acts proactively. <strong style={{ color: "var(--text-0)" }}>It notices things before you do.</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section id="how">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// HOW IT WORKS</div>
              <h2 className="h-section">Your staff already have phones.<br/>Zuri <em>lives in Slack.</em></h2>
            </div>
            <div className="hiw-grid reveal-stagger">
              <div className="hiw-step"><div className="hiw-num">01 / SLACK WORKSPACE</div><h3>Staff get tasks in their language.</h3><p>Housekeeping, security, kitchen — every assignment is specific, timed, and tied to real guests and real rooms. They download Slack on their phone. That's the entire onboarding.</p></div>
              <div className="hiw-step"><div className="hiw-num">02 / OWNER CHANNEL</div><h3>You get the full picture.</h3><p>Every morning briefing, every alert, every financial summary arrives in your Slack. Ask Zuri anything — "What's our occupancy next week?" — get a real answer with real data, in seconds.</p></div>
              <div className="hiw-step"><div className="hiw-num">03 / CONNECTED SYSTEMS</div><h3>One connection. Full visibility.</h3><p>Booking.com, Airbnb, your PMS, your cameras, your router. Zuri reads incoming reservations. It monitors your security cameras. It integrates with your inventory system.</p></div>
            </div>
          </div>
        </section>

        <section id="twin">
          <div className="container">
            <div className="twin-grid">
              <div className="twin-visual reveal">
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                  <defs>
                    <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFB088"/>
                      <stop offset="60%" stopColor="#FF6B35"/>
                      <stop offset="100%" stopColor="#6e2010"/>
                    </radialGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#27272A" strokeDasharray="2 6"/>
                  <circle cx="200" cy="200" r="170" fill="none" stroke="#1A1A1D"/>
                  <g stroke="rgba(255,107,53,0.4)" strokeWidth="1" strokeDasharray="2 4">
                    <line x1="200" y1="200" x2="200" y2="60"/>
                    <line x1="200" y1="200" x2="340" y2="200"/>
                    <line x1="200" y1="200" x2="200" y2="340"/>
                    <line x1="200" y1="200" x2="60" y2="200"/>
                  </g>
                  <circle cx="200" cy="200" r="52" fill="url(#coreG)" filter="url(#glow)"/>
                  <text x="200" y="208" textAnchor="middle" fill="white" fontFamily="JetBrains Mono" fontSize="16" fontWeight="600">ZURI</text>
                </svg>
              </div>
              <div className="reveal">
                <div className="eyebrow eyebrow-accent" style={{ marginBottom: 16 }}>// THE DIGITAL TWIN</div>
                <h2 className="h-section">Before Zuri runs your property,<br/>we build a <em>perfect replica</em> of it.</h2>
                <p className="text-lg" style={{ marginTop: 24 }}>Every room. Every staff member. Every standard. Every procedure. Every system login. This is your Digital Twin — a living model of your property that Zuri uses to make decisions.</p>
                <div className="twin-callout">→ The better the Digital Twin, the smarter Zuri is from day one.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="implementation">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// IMPLEMENTATION — 4 DAYS</div>
              <h2 className="h-section"><em>Four days</em> from kickoff<br/>to autonomous.</h2>
            </div>
            <div className="timeline reveal-stagger">
              {timeline.map((t) => (
                <div key={t.dot} className="timeline-item">
                  <div className="timeline-dot">{t.dot}</div>
                  <div className="timeline-card">
                    <div className="timeline-day">{t.day}</div>
                    <h4>{t.h}</h4>
                    <p>{t.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="replaces">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// THE CLEAR LINE</div>
              <h2 className="h-section">What stays. <em>What goes.</em></h2>
            </div>
            <div className="replaces-grid">
              <div className="replaces-card danger reveal">
                <div className="caption">▼ WHAT ZURI REPLACES</div>
                <ul className="replaces-list">
                  <li>Duty manager (night &amp; weekend)</li>
                  <li>Housekeeping supervisor</li>
                  <li>Revenue manager</li>
                  <li>HR training coordinator</li>
                  <li>Maintenance coordinator</li>
                  <li>Inventory manager</li>
                  <li>Shift handover reports</li>
                  <li>Manual task assignment</li>
                  <li>Paper-based checklists</li>
                  <li>Management WhatsApp groups</li>
                </ul>
              </div>
              <div className="replaces-card success reveal">
                <div className="caption">▲ WHAT ZURI DOES NOT REPLACE</div>
                <div className="doesnt-replace">
                  <h3>Your staff.</h3>
                  <p>Zuri manages, coordinates, trains, and monitors — but your housekeepers still clean, your security still patrols, your chef still cooks.</p>
                  <p style={{ marginTop: 16 }}>Zuri makes your existing team <strong style={{ color: "var(--text-0)" }}>40–60% more productive</strong> by removing every coordination layer between them and their work.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="builton" style={{ padding: "60px 0" }}>
          <div className="container">
            <p className="center mono" style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.15em", marginBottom: 32 }}>POWERED BY</p>
            <div className="logos reveal">
              <div className="logo-item">Anthropic · Claude</div>
              <div className="logo-item">Google · Gemini</div>
              <div className="logo-item">PostgreSQL</div>
              <div className="logo-item">Slack</div>
              <div className="logo-item">Booking.com</div>
              <div className="logo-item">FastAPI</div>
            </div>
          </div>
        </section>

        <section id="proven">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// PROVEN AT</div>
              <h2 className="h-section">Live in Zanzibar.<br/><em>Autonomous since 2025.</em></h2>
            </div>
            <div className="proven-card reveal">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.15em" }}>● LIVE DEPLOYMENT</div>
                  <h3 style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 6 }}>Ayana's Villa — Paje, Zanzibar</h3>
                  <p style={{ color: "var(--text-1)", marginTop: 8 }}>5-bedroom luxury villa · Entire property rental · Up to 10 guests</p>
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.1em" }}>TANZANIA · EAST AFRICA</div>
              </div>
              <div className="proven-stats">
                <div className="proven-stat"><div className="num">4.6 ★</div><div className="label">Airbnb rating</div></div>
                <div className="proven-stat"><div className="num">2025</div><div className="label">Live since</div></div>
                <div className="proven-stat"><div className="num">100%</div><div className="label">Autonomous</div></div>
              </div>
              <p className="text-md">Staff: <strong style={{ color: "var(--text-0)" }}>Lillian</strong> (housekeeping), <strong style={{ color: "var(--text-0)" }}>Kelvin</strong> (security), and a full operational team — all managed by Zuri.</p>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="container">
            <div className="section-head reveal">
              <div className="eyebrow eyebrow-accent">// PRICING</div>
              <h2 className="h-section">Built for properties<br/>of <em>any size.</em></h2>
            </div>
            <div className="pricing-grid reveal-stagger">
              <div className="price-card">
                <div className="price-tier">Boutique</div>
                <div className="price-amount">$600<small>/mo</small></div>
                <div className="price-range">1 to 20 rooms</div>
                <ul className="price-features">
                  <li>Core 6 agents</li>
                  <li>Slack integration</li>
                  <li>Weekly owner report</li>
                  <li>Email support</li>
                </ul>
                <a href="#cta" className="btn btn-ghost">Get started</a>
              </div>
              <div className="price-card featured">
                <div className="price-badge">Most Popular</div>
                <div className="price-tier">Property</div>
                <div className="price-amount">$1,200<small>/mo</small></div>
                <div className="price-range">21 to 100 rooms</div>
                <ul className="price-features">
                  <li>All 13 agents</li>
                  <li>PMS + POS integration</li>
                  <li>Staff mobile app</li>
                  <li>Custom training programme</li>
                  <li>Priority support</li>
                </ul>
                <a href="#cta" className="btn btn-primary">Book a demo →</a>
              </div>
              <div className="price-card">
                <div className="price-tier">Enterprise</div>
                <div className="price-amount">Custom</div>
                <div className="price-range">100+ rooms or multi-property</div>
                <ul className="price-features">
                  <li>Everything in Property</li>
                  <li>Multi-property management</li>
                  <li>Custom agent development</li>
                  <li>On-site implementation</li>
                  <li>Dedicated success manager + SLA</li>
                </ul>
                <a href="#cta" className="btn btn-ghost">Contact sales</a>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta" id="cta">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow eyebrow-accent" style={{ marginBottom: 24 }}>// THE AI THAT NEVER SLEEPS SO YOU CAN</div>
              <h2 className="h-section">Your property,<br/><em>running itself.</em></h2>
              <p>Book a 30-minute demo. See Zuri manage a real property in real time.</p>
              <a href="mailto:hello@zuri.ai" className="btn btn-primary btn-lg" style={{ fontSize: 16, padding: "18px 36px" }}>Book demo →</a>
              <div className="mono-foot">OR EMAIL hello@zuri.ai</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo"><span className="logo-mark"><span></span></span> ZURI&nbsp;AI</div>
              <p className="footer-tag">The AI that never sleeps so you can.</p>
            </div>
            <div className="footer-col">
              <h5>Product</h5>
              <a href="#agents">Agents</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#cta">Security</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#proven">About</a>
              <a href="#cta">Careers</a>
              <a href="#cta">Blog</a>
              <a href="#cta">Press</a>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <a href="mailto:hello@zuri.ai">hello@zuri.ai</a>
              <a>Zanzibar, Tanzania</a>
              <a>+255 XXX XXX</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ZURI AI · ALL RIGHTS RESERVED</span>
            <span>BUILT ON CLAUDE BY ANTHROPIC</span>
          </div>
        </div>
      </footer>
    </>
  );
}
