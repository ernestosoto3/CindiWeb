// templates/events/app/page.tsx

const SPEAKERS = [
  { name: "Priya Kapoor", role: "CEO, Lattice AI", topic: "The next wave of human-machine collaboration", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Marcus Chen", role: "Partner, Andreessen Horowitz", topic: "What founders get wrong about product-market fit", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Yara Osei", role: "Design Lead, Linear", topic: "Craft at scale: shipping beautiful products fast", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { name: "Tom Bellamy", role: "Co-founder, Vercel", topic: "The platform era and what comes next", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Aisha Rahman", role: "Staff Eng, Stripe", topic: "Infrastructure decisions that compound over time", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { name: "Leo Fontaine", role: "Founder, Raycast", topic: "Building tools people love to open every morning", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
]

const SCHEDULE = [
  { time: "8:00 AM", title: "Registration & Breakfast", type: "break" },
  { time: "9:00 AM", title: "Opening Keynote — Priya Kapoor", type: "keynote", room: "Main Stage" },
  { time: "10:15 AM", title: "Track Sessions — Choose Your Path", type: "session", room: "Rooms A, B, C" },
  { time: "12:00 PM", title: "Lunch & Networking", type: "break" },
  { time: "1:30 PM", title: "Panel: Building in the AI Era", type: "panel", room: "Main Stage" },
  { time: "3:00 PM", title: "Workshop Blocks", type: "session", room: "Rooms A, B" },
  { time: "4:30 PM", title: "Fireside Chat — Marcus Chen", type: "keynote", room: "Main Stage" },
  { time: "6:00 PM", title: "Rooftop Reception & Demos", type: "social" },
]

const TICKETS = [
  { tier: "General", price: "$299", perks: ["Full conference access", "Lunch included", "Talk recordings"], featured: false },
  { tier: "Pro", price: "$599", perks: ["Everything in General", "Workshop access", "Speaker dinner", "Priority seating"], featured: true },
  { tier: "Team (5 seats)", price: "$2,200", perks: ["5 Pro passes", "Private table at dinner", "Company listing in program", "Invoice billing"], featured: false },
]

const TYPE_COLORS: Record<string, string> = {
  keynote: "#a78bfa", panel: "#34d399", session: "#60a5fa", break: "#6b7280", social: "#f59e0b",
}

export default function Page() {
  return (
    <div style={{ backgroundColor: "#09090b", color: "#fafafa", fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        .ev-speakers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ev-tickets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start; }
        .ev-venue-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .ev-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
        .ev-countdown { display: flex; gap: 2.5rem; justify-content: center; margin-top: 5rem; }
        @media (max-width: 768px) {
          .ev-speakers-grid { grid-template-columns: 1fr; }
          .ev-tickets-grid { grid-template-columns: 1fr; }
          .ev-venue-grid { grid-template-columns: 1fr; }
          .ev-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ev-countdown { gap: 1.5rem; margin-top: 3rem; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(9,9,11,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: "4.5rem" }}>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>Forge<span style={{ color: "#a78bfa" }}>.</span>25</span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "#71717a" }}>
          <a href="#speakers" style={{ color: "inherit", textDecoration: "none" }}>Speakers</a>
          <a href="#schedule" style={{ color: "inherit", textDecoration: "none" }}>Schedule</a>
          <a href="#tickets" style={{ color: "inherit", textDecoration: "none" }}>Tickets</a>
        </nav>
        <a href="#tickets" style={{ backgroundColor: "#a78bfa", color: "#09090b", padding: "0.6rem 1.4rem", textDecoration: "none", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em" }}>
          Get Tickets
        </a>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto", padding: "6rem 2.5rem", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(167,139,250,0.3)", padding: "0.4rem 1rem", marginBottom: "2.5rem", borderRadius: 999 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a78bfa", display: "inline-block" }} />
            <span style={{ fontSize: "0.78rem", color: "#a78bfa", letterSpacing: "0.1em" }}>San Francisco · May 14–15, 2025</span>
          </div>
          <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "2rem", background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 60%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            FORGE<br />2025
          </h1>
          <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#71717a", lineHeight: 1.6, maxWidth: "38rem", margin: "0 auto 3rem" }}>
            Two days. 24 speakers. One room full of people who actually ship things.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#tickets" style={{ backgroundColor: "#a78bfa", color: "#09090b", padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.05em" }}>Get Your Ticket →</a>
            <a href="#speakers" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fafafa", padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem" }}>See Speakers</a>
          </div>
          <div className="ev-countdown">
            {[["64", "Days"], ["14", "Hours"], ["32", "Minutes"], ["09", "Seconds"]].map(([val, unit]) => (
              <div key={unit} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fafafa", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "0.7rem", color: "#52525b", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.5rem" }}>{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="ev-stats-grid">
            {[["24", "Speakers"], ["800+", "Attendees"], ["3", "Tracks"], ["2", "Days"]].map(([val, label]) => (
              <div key={label}>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: "#a78bfa", letterSpacing: "-0.03em" }}>{val}</p>
                <p style={{ fontSize: "0.72rem", color: "#52525b", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section id="speakers" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "0.75rem" }}>Lineup</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Speakers</h2>
        </div>
        <div className="ev-speakers-grid">
          {SPEAKERS.map(({ name, role, topic, img }) => (
            <div key={name} style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)", padding: "1.75rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(167,139,250,0.3)" }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem" }}>{name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#71717a", marginTop: "0.1rem" }}>{role}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.5, fontStyle: "italic" }}>"{topic}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "6rem 2rem", backgroundColor: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "0.75rem" }}>Day 1 — May 14</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Schedule</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SCHEDULE.map(({ time, title, type, room }, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "6rem 1fr", gap: "1.5rem", alignItems: "start", padding: "1.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.78rem", color: "#52525b", paddingTop: "0.2rem" }}>{time}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: TYPE_COLORS[type] || "#6b7280", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>{title}</p>
                  </div>
                  {room && <p style={{ fontSize: "0.75rem", color: "#52525b", marginTop: "0.3rem", marginLeft: "1rem" }}>{room}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETS */}
      <section id="tickets" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "0.75rem" }}>Join Us</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Tickets</h2>
            <p style={{ fontSize: "0.9rem", color: "#71717a", marginTop: "0.75rem" }}>Early bird pricing ends April 1st</p>
          </div>
          <div className="ev-tickets-grid">
            {TICKETS.map(({ tier, price, perks, featured }) => (
              <div key={tier} style={{ position: "relative", padding: "2rem", border: featured ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.08)", backgroundColor: featured ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.02)", boxShadow: featured ? "0 0 40px rgba(167,139,250,0.15)" : "none" }}>
                {featured && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", backgroundColor: "#a78bfa", color: "#09090b", fontSize: "0.7rem", fontWeight: 800, padding: "3px 12px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most popular
                  </div>
                )}
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a", marginBottom: "1rem" }}>{tier}</p>
                <p style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1.5rem", color: featured ? "#a78bfa" : "#fafafa" }}>{price}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: 10 }}>
                  {perks.map((perk) => (
                    <li key={perk} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "0.85rem", color: "#a1a1aa" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={featured ? "#a78bfa" : "#52525b"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "0.85rem", backgroundColor: featured ? "#a78bfa" : "transparent", border: featured ? "none" : "1px solid rgba(255,255,255,0.15)", color: featured ? "#09090b" : "#fafafa", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
                  Buy Ticket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "5rem 2rem", backgroundColor: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div className="ev-venue-grid">
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "1rem" }}>Venue</p>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>The Armory<br />San Francisco</h2>
              <p style={{ fontSize: "0.9rem", color: "#71717a", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                1800 Mission St, San Francisco, CA 94103. A converted historic venue with 10,000 sq ft of event space, breakout rooms, and a rooftop terrace.
              </p>
              <p style={{ fontSize: "0.82rem", color: "#52525b", lineHeight: 2 }}>Doors open at 8:00 AM both days<br />Nearest BART: 16th St Mission</p>
            </div>
            <div style={{ aspectRatio: "1", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80" alt="Venue" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.78rem", color: "#52525b" }}>
        <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.1em", color: "#fafafa" }}>FORGE<span style={{ color: "#a78bfa" }}>.</span>25</span>
        <span>© 2025 Forge Conference</span>
        <a href="mailto:hello@forgeconf.com" style={{ color: "#71717a", textDecoration: "none" }}>hello@forgeconf.com</a>
      </footer>
    </div>
  )
}