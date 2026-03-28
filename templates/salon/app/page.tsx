"use client"

// templates/salon/app/page.tsx
import { useState } from "react"

const SERVICES = [
  { name: "Signature Facial", duration: "60 min", price: "$95", desc: "Deep cleanse, exfoliation, and custom masque tailored to your skin." },
  { name: "Swedish Massage", duration: "90 min", price: "$130", desc: "Full-body relaxation with warm oils and long, flowing strokes." },
  { name: "Balayage & Color", duration: "2–3 hrs", price: "From $180", desc: "Hand-painted highlights for a natural, sun-kissed finish." },
  { name: "Keratin Treatment", duration: "2 hrs", price: "$220", desc: "Smoothing treatment for frizz-free, glossy hair lasting 3–4 months." },
  { name: "Classic Mani-Pedi", duration: "75 min", price: "$65", desc: "Nail shaping, cuticle care, and your choice of gel or classic polish." },
  { name: "Lash Lift & Tint", duration: "45 min", price: "$85", desc: "Curl, lift, and darken your natural lashes — no extensions needed." },
]

const TEAM = [
  { name: "Sofia Reyes", role: "Master Colorist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Camille Noel", role: "Esthetician", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Jade Moreau", role: "Nail Artist", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80" },
]

const REVIEWS = [
  { text: "Sofia completely transformed my hair. I've never felt more confident walking out of a salon.", name: "Isabella T." },
  { text: "The most relaxing facial I've ever had. My skin glowed for weeks. Already booked my next visit.", name: "Renata M." },
  { text: "Velour feels like a sanctuary. Every visit is an experience, not just an appointment.", name: "Caroline B." },
]

function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    border: "1px solid #e8ddd4", backgroundColor: "#fdf9f5",
    fontSize: "0.875rem", fontFamily: "system-ui, sans-serif",
    color: "#1a1108", outline: "none", boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.7rem", letterSpacing: "0.15em",
    textTransform: "uppercase", color: "#9c8370",
    fontFamily: "system-ui, sans-serif", marginBottom: "0.4rem",
  }

  if (sent) return (
    <div style={{ padding: "2rem", border: "1px solid #e8ddd4", backgroundColor: "#fdf9f5", textAlign: "center" }}>
      <p style={{ fontSize: "1rem", color: "#b07d5a", fontFamily: "Georgia, serif" }}>Thank you!</p>
      <p style={{ fontSize: "0.85rem", color: "#9c8370", fontFamily: "system-ui, sans-serif", marginTop: "0.5rem" }}>We'll confirm your appointment within 24 hours.</p>
    </div>
  )

  return (
    <div style={{ padding: "2rem", border: "1px solid #e8ddd4", backgroundColor: "#ffffff" }}>
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
          <label style={labelStyle}>Service *</label>
          <input style={inputStyle} type="text" placeholder="e.g. Balayage & Color" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>Notes</label>
          <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }} placeholder="Preferred date, time, or anything else…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        </div>
        <button
          onClick={() => { if (form.name && form.email) setSent(true) }}
          style={{
            width: "100%", padding: "0.9rem",
            backgroundColor: "#1a1108", color: "#fdf9f5",
            border: "none", fontSize: "0.8rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif", cursor: "pointer",
          }}
        >
          Request Booking
        </button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div style={{ backgroundColor: "#fdf9f5", color: "#1a1108", fontFamily: "Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        .salon-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; }
        .salon-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background-color: #f0e8de; }
        .salon-photos { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        .salon-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .salon-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .salon-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .salon-book { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 768px) {
          .salon-hero { grid-template-columns: 1fr; min-height: auto; }
          .salon-hero-img { display: none; }
          .salon-services-grid { grid-template-columns: 1fr; }
          .salon-photos { grid-template-columns: repeat(2, 1fr); }
          .salon-team-grid { grid-template-columns: 1fr; gap: 2rem; }
          .salon-reviews-grid { grid-template-columns: 1fr; gap: 2rem; }
          .salon-stats { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .salon-book { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      {/* NAV */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "4.5rem",
        backgroundColor: "rgba(253,249,245,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #f0e8de",
      }}>
        <span style={{ fontSize: "1.1rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300, color: "#b07d5a" }}>Velour</span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9c8370", fontFamily: "system-ui, sans-serif" }}>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#team" style={{ color: "inherit", textDecoration: "none" }}>Team</a>
          <a href="#book" style={{ color: "inherit", textDecoration: "none" }}>Book</a>
        </nav>
        <a href="#book" style={{
          fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "0.6rem 1.4rem", backgroundColor: "#b07d5a", color: "#fdf9f5",
          textDecoration: "none", fontFamily: "system-ui, sans-serif",
        }}>Book Now</a>
      </header>

      {/* HERO */}
      <section className="salon-hero">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 2.5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b07d5a", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Beauty · Wellness · Care</p>
          <h1 style={{ fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem", letterSpacing: "-0.01em" }}>
            You deserve<br />to feel<br /><em>radiant.</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#7a6555", maxWidth: "28rem", marginBottom: "2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            Velour is a boutique beauty studio in the heart of the city. We believe every visit should leave you feeling restored — not just styled.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#book" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2.2rem", backgroundColor: "#1a1108", color: "#fdf9f5", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Book a Service</a>
            <a href="#services" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2.2rem", border: "1px solid #d4c4b5", color: "#7a6555", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>View Services</a>
          </div>
        </div>
        <div className="salon-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80" alt="Salon interior" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fdf9f5 0%, transparent 15%)" }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: "1px solid #f0e8de", borderBottom: "1px solid #f0e8de", backgroundColor: "#f7f0e8", padding: "2rem 0" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="salon-stats" style={{ textAlign: "center" }}>
            {[["8+", "Years in business"], ["2,400+", "Happy clients"], ["4.9★", "Average rating"]].map(([val, label]) => (
              <div key={label as string}>
                <p style={{ fontSize: "2rem", fontWeight: 300, color: "#b07d5a", marginBottom: "0.25rem" }}>{val}</p>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c8370", fontFamily: "system-ui, sans-serif" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b07d5a", marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>What We Offer</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300 }}>Our Services</h2>
        </div>
        <div className="salon-services-grid">
          {SERVICES.map(({ name, duration, price, desc }) => (
            <div key={name} style={{ backgroundColor: "#fdf9f5", padding: "2.5rem 2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 400 }}>{name}</h3>
                <span style={{ fontSize: "0.95rem", color: "#b07d5a", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap", marginLeft: "1rem" }}>{price}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#9c8370", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", marginBottom: "0.75rem" }}>{duration}</p>
              <p style={{ fontSize: "0.9rem", color: "#7a6555", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="salon-photos">
        {["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80","https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80","https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=500&q=80"].map((src, i) => (
          <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          </div>
        ))}
      </section>

      {/* TEAM */}
      <section id="team" style={{ maxWidth: "56rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b07d5a", marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>The People</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300 }}>Meet the Team</h2>
        </div>
        <div className="salon-team-grid">
          {TEAM.map(({ name, role, img }) => (
            <div key={name} style={{ textAlign: "center" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", marginBottom: "1.25rem" }}>
                <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
              </div>
              <p style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: "0.3rem" }}>{name}</p>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#b07d5a", fontFamily: "system-ui, sans-serif" }}>{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ backgroundColor: "#1a1108", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b07d5a", textAlign: "center", marginBottom: "3.5rem", fontFamily: "system-ui, sans-serif" }}>Client Love</p>
          <div className="salon-reviews-grid">
            {REVIEWS.map(({ text, name }) => (
              <div key={name}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#c4b5a5", fontStyle: "italic", marginBottom: "1.25rem" }}>"{text}"</p>
                <p style={{ fontSize: "0.8rem", color: "#6b5d4e", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" style={{ maxWidth: "56rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div className="salon-book">
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b07d5a", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Ready?</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.15 }}>Book your visit.</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#7a6555", fontFamily: "system-ui, sans-serif", fontWeight: 300, marginBottom: "2rem" }}>
              Fill out the form and we'll confirm your appointment within 24 hours. Walk-ins welcome Tuesday through Saturday.
            </p>
            <div style={{ fontSize: "0.85rem", color: "#9c8370", lineHeight: 2, fontFamily: "system-ui, sans-serif" }}>
              <p>Tue – Fri: 9am – 7pm</p>
              <p>Saturday: 9am – 6pm</p>
              <p>Sun – Mon: Closed</p>
              <p style={{ marginTop: "1rem" }}>hello@velour.studio</p>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #f0e8de", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#c4b5a5", fontFamily: "system-ui, sans-serif" }}>
        <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia, serif", color: "#b07d5a" }}>Velour</span>
        <span>© 2025 Velour Studio</span>
      </footer>
    </div>
  )
}