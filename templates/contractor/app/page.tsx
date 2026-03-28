"use client"

// templates/contractor/app/page.tsx
import { useState } from "react"

const SERVICES = [
  { icon: "🏠", title: "Home Remodeling", desc: "Kitchens, bathrooms, full home renovations. On time, on budget." },
  { icon: "🔧", title: "Plumbing & HVAC", desc: "Installations, repairs, and emergency service. Licensed & insured." },
  { icon: "⚡", title: "Electrical Work", desc: "Panel upgrades, rewiring, EV charger installs. Code-compliant." },
  { icon: "🪟", title: "Windows & Doors", desc: "Energy-efficient replacements that reduce your utility bills." },
  { icon: "🏗️", title: "Additions & ADUs", desc: "Room additions, garage conversions, accessory dwelling units." },
  { icon: "🎨", title: "Interior & Exterior Paint", desc: "Clean lines, premium materials, and crews that show up on time." },
]

const PROJECTS = [
  { title: "Sunset Hills Kitchen Remodel", tag: "Remodel", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
  { title: "Downtown Loft Bathroom", tag: "Renovation", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80" },
  { title: "Eastside Home Addition", tag: "Addition", img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=700&q=80" },
  { title: "Hillcrest ADU Build", tag: "New Build", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
]

const REVIEWS = [
  { text: "Mason & Sons finished our kitchen 3 days early. The crew was professional, clean, and the quality is outstanding.", name: "David R.", location: "Homeowner, San Diego" },
  { text: "We've used them twice now. Fair quotes, no surprises, and the work holds up. Easy recommendation.", name: "Tanya & Chris L.", location: "Homeowners, Chula Vista" },
  { text: "Called for an emergency plumbing issue at 7pm. They showed up within 2 hours and fixed it same night.", name: "Greg M.", location: "Property Manager" },
]

const STATS = [
  { value: "400+", label: "Projects completed" },
  { value: "18 yrs", label: "In business" },
  { value: "100%", label: "Licensed & insured" },
  { value: "4.8★", label: "Google rating" },
]

function QuoteForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem",
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#ffffff", fontSize: "0.875rem",
    fontFamily: "system-ui, sans-serif", outline: "none",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.7rem", letterSpacing: "0.15em",
    textTransform: "uppercase", color: "#71717a",
    fontFamily: "system-ui, sans-serif", marginBottom: "0.4rem",
  }

  if (sent) return (
    <div style={{ padding: "2rem", border: "1px solid rgba(249,115,22,0.4)", backgroundColor: "rgba(249,115,22,0.08)", textAlign: "center" }}>
      <p style={{ fontSize: "1rem", color: "#f97316", fontWeight: 700 }}>We'll be in touch within 24 hours.</p>
      <p style={{ fontSize: "0.85rem", color: "#71717a", marginTop: "0.5rem", fontFamily: "system-ui, sans-serif" }}>A team member will reach out to schedule your free estimate.</p>
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={labelStyle}>Name *</label>
        <input style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Project Details *</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }} placeholder="Describe what you need done…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button
        onClick={() => { if (form.name && form.email) setSent(true) }}
        style={{
          width: "100%", padding: "1rem",
          backgroundColor: "#f97316", color: "#ffffff",
          border: "none", fontSize: "0.85rem", fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif", cursor: "pointer",
        }}
      >
        Request Free Quote
      </button>
    </div>
  )
}

export default function Page() {
  return (
    <div style={{ backgroundColor: "#f8f7f5", color: "#111110", fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        .con-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .con-projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .con-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .con-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
        .con-quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 768px) {
          .con-services-grid { grid-template-columns: 1fr; }
          .con-projects-grid { grid-template-columns: 1fr; }
          .con-reviews-grid { grid-template-columns: 1fr; }
          .con-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .con-quote-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#111110", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: "4.5rem" }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>Mason<span style={{ color: "#f97316" }}>&</span>Sons</span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "#a1a1aa" }}>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#work" style={{ color: "inherit", textDecoration: "none" }}>Our Work</a>
          <a href="#quote" style={{ color: "inherit", textDecoration: "none" }}>Get a Quote</a>
        </nav>
        <a href="tel:5551234567" style={{ backgroundColor: "#f97316", color: "#ffffff", padding: "0.6rem 1.4rem", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}>
          (555) 123-4567
        </a>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden", backgroundColor: "#111110" }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Construction" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #111110 50%, transparent 100%)" }} />
        <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto", padding: "6rem 2.5rem", width: "100%" }}>
          <div style={{ maxWidth: "36rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#f97316", color: "#ffffff", padding: "0.35rem 0.85rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2rem" }}>
              <span>●</span> Licensed · Bonded · Insured
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 5vw, 5.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
              We build.<br />You enjoy.
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#a1a1aa", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "30rem" }}>
              San Diego's most trusted general contractor for home remodels, additions, and repairs. 18 years. 400+ projects.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#quote" style={{ backgroundColor: "#f97316", color: "#ffffff", padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem", fontWeight: 700 }}>Get a Free Quote</a>
              <a href="#work" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem" }}>See Our Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: "#f97316", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="con-stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>{value}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>What We Do</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Services</h2>
        </div>
        <div className="con-services-grid">
          {SERVICES.map(({ icon, title, desc }) => (
            <div key={title} style={{ padding: "2rem", border: "1px solid #e5e3e0", backgroundColor: "#ffffff" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{icon}</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#71717a", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section id="work" style={{ backgroundColor: "#111110", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>Portfolio</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>Recent Work</h2>
          </div>
          <div className="con-projects-grid">
            {PROJECTS.map(({ title, tag, img }) => (
              <div key={title} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(to top, rgba(17,17,16,0.9), transparent)" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "0.3rem" }}>{tag}</span>
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1rem" }}>{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f8f7f5" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem", textAlign: "center" }}>Reviews</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center", marginBottom: "3.5rem" }}>What clients say</h2>
          <div className="con-reviews-grid">
            {REVIEWS.map(({ text, name, location }) => (
              <div key={name} style={{ backgroundColor: "#ffffff", padding: "2rem", border: "1px solid #e5e3e0" }}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#52525b", marginBottom: "1.25rem" }}>"{text}"</p>
                <p style={{ fontWeight: 700, fontSize: "0.875rem" }}>{name}</p>
                <p style={{ fontSize: "0.75rem", color: "#a1a1aa", marginTop: "0.2rem" }}>{location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" style={{ backgroundColor: "#111110", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div className="con-quote-grid">
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#f97316", marginBottom: "1rem" }}>Free Estimate</p>
              <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Get a free<br />quote today.
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#a1a1aa", lineHeight: 1.7, marginBottom: "2rem" }}>
                Describe your project and we'll get back to you within 24 hours with a no-obligation estimate.
              </p>
              <div style={{ fontSize: "0.85rem", color: "#71717a", lineHeight: 2.2 }}>
                <p>Mon – Fri: 7am – 6pm</p>
                <p>Saturday: 8am – 4pm</p>
                <p style={{ marginTop: "0.75rem", color: "#f97316" }}>(555) 123-4567</p>
                <p>hello@masonandsons.com</p>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0a0a09", padding: "1.75rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#52525b" }}>
        <span style={{ fontWeight: 800, color: "#ffffff" }}>Mason<span style={{ color: "#f97316" }}>&</span>Sons</span>
        <span>© 2025 Mason & Sons Construction</span>
      </footer>
    </div>
  )
}