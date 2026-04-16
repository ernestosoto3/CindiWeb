"use client";

import { useState, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type MenuCat =
  | "aperitivos" | "tablas" | "ensaladas" | "sandwiches"
  | "principales" | "acompanantes" | "postres" | "bebidas" | "ninos";
type MenuItem = { name: string; desc?: string; price?: string };

// ─── MENU DATA — updated from rev1 PDF ───────────────────────────────────────
const MENU: Record<MenuCat, MenuItem[]> = {
  aperitivos: [
    { name: "Queso Frito a la Tenedor", desc: "Crujiente por fuera y suave por dentro, servido caliente con un toque de salsa", price: "$11.95" },
    { name: "Fondue de Chorizo", desc: "Cremosa mezcla de quesos fundidos con chorizo salteado, perfecta para compartir", price: "$12.95" },
    { name: "Croquetas", desc: "Artesanales rellenas de Jamón Serrano, Queso Manchego o Bacalao", price: "$11.95" },
    { name: "Cóctel de Camarones", desc: "Camarones frescos con salsa cóctel clásica y un toque cítrico", price: "$12.95" },
    { name: "Chorizo Argentino", desc: "A la parrilla, jugoso y perfectamente sazonado", price: "$10.95" },
    { name: "Camarones Empanados con Aioli", desc: "Crujientes, acompañados de aioli cremoso con toque de ajo", price: "$12.95" },
    { name: "Entremeses Boricuas", desc: "Bacalaitos, alcapurrias, mozzarella sticks, piononos y sorullitos de maíz" },
    { name: "Calamares Fritos", desc: "Ligeramente empanados y fritos, acompañados de salsa de la casa", price: "$12.95" },
    { name: "Sopa del Día", desc: "Preparación fresca del chef con ingredientes de temporada", price: "$8.95" },
  ],
  tablas: [
    { name: "Tabla de Chorizo y Queso Manchego", desc: "Chorizo de sabor intenso con queso manchego curado", price: "$14.95" },
    { name: "Tabla de Jamón Serrano y Queso Manchego", desc: "Finas lonjas de jamón serrano con queso manchego curado", price: "$14.95" },
    { name: "Tabla de Carnes", desc: "Sirloin, churrasco, chuletón y pechuga a la parrilla con tostones crujientes", price: "$89.95" },
  ],
  ensaladas: [
    { name: "Ensalada del Chef", desc: "Lechugas con jamón, pavo, queso, huevo y vegetales de temporada", price: "$16.95" },
    { name: "Ensalada de Pollo", desc: "Pechuga a la parrilla con vegetales crujientes y aderezo de la casa", price: "$16.95" },
    { name: "Ensalada César", desc: "Lechuga romana, crutones, parmesano y aderezo César tradicional", price: "$15.95" },
    { name: "Ensalada de Steak", desc: "Tiras de steak a la parrilla sobre mezcla de lechugas y vegetales", price: "$17.95" },
  ],
  sandwiches: [
    { name: "El Yunqueño", desc: "Sándwich especial de la casa con sabores de la tradición puertorriqueña", price: "$14.95" },
    { name: "El Cubano", desc: "Cerdo, jamón, queso suizo, pepinillos y mostaza en pan tostado", price: "$14.95" },
    { name: "Sándwich de Pavo", desc: "Pavo fresco con lechuga, tomate y queso en pan tostado", price: "$13.95" },
    { name: "Sándwich de Atún", desc: "Ensalada de atún preparada en casa con vegetales frescos", price: "$13.95" },
    { name: "Tenedor Burger", desc: "Jugosa hamburguesa con queso, lechuga, tomate y salsa especial", price: "$17.95" },
  ],
  principales: [
    { name: "Churrasco", desc: "Jugoso corte a la parrilla, preparado al término deseado" },
    { name: "Sirloin", desc: "Clásico corte a la parrilla, lleno de sabor" },
    { name: "T-Bone Steak", desc: "Corte premium con el equilibrio perfecto entre filete y strip" },
    { name: "Filete Mignon en Salsa de Champiñones", desc: "Tierno filete mignon con cremosa salsa de champiñones", price: "$27.95" },
    { name: "Costillas de Res", desc: "Cocidas lentamente hasta lograr una carne suave y jugosa", price: "$24.95" },
    { name: "Chuletón de Cerdo Corte Francés", desc: "Corte grueso a la parrilla con sabor intenso", price: "$19.95" },
    { name: "Empanada de Res", desc: "Crujiente empanada rellena de carne sazonada", price: "$19.95" },
    { name: "Empanada de Res a la Milanesa", desc: "Empanada de res empanizada y dorada al estilo milanesa", price: "$20.95" },
    { name: "Mar y Tierra", desc: "Sirloin, camarones y pechuga de pollo a la parrilla", price: "$37.95" },
    { name: "Pechuga de Pollo a la Parrilla", desc: "Jugosa, sazonada y preparada a la parrilla", price: "$18.95" },
    { name: "Empanada de Pollo", desc: "Rellena de pollo sazonado, dorada al momento", price: "$18.95" },
    { name: "Empanada de Pollo a la Milanesa", desc: "Empanada de pollo empanizada estilo milanesa", price: "$19.95" },
    { name: "Filete de Salmón", desc: "Salmón fresco a la parrilla con sabor delicado", price: "$24.95" },
    { name: "Camarones a la Tenedor", desc: "Salteados al estilo de la casa con sabor intenso", price: "$24.95" },
  ],
  acompanantes: [
    { name: "Arroz y Habichuelas" },
    { name: "Mamposteao del Día" },
    { name: "Tostones de Plátano" },
    { name: "Papa Asada" },
    { name: "Papas Fritas" },
    { name: "Pasta en Salsa Blanca" },
    { name: "Mofongo de Yuca" },
    { name: "Gnocchi de Yautía" },
  ],
  postres: [
    { name: "Tenedor Cake", desc: "Bizcocho especial de la casa", price: "$9.95" },
    { name: "Tenedor Molten", desc: "Pastel de chocolate caliente con centro fundido", price: "$11.95" },
    { name: "Flan", desc: "Queso, vainilla o calabaza, textura suave y cremosa al estilo tradicional", price: "$8.95" },
    { name: "Cheesecake", price: "$9.95" },
  ],
  bebidas: [
    { name: "Corona", price: "$5.75" }, { name: "Medalla", price: "$4.00" },
    { name: "Modelo", price: "$5.75" }, { name: "Peroni", price: "$5.75" },
    { name: "Michelob", price: "$4.50" }, { name: "Heineken", price: "$5.50" },
    { name: "Estrella Galicia", price: "$5.50" }, { name: "Samuel Adams", price: "$5.75" },
    { name: "Jarra de Sangría", price: "$28.95" },
    { name: "Copa de Sangría", desc: "Tinta o blanca", price: "$8.00" },
    { name: "Piña Colada", price: "$7.25" },
    { name: "Frappes", price: "$7.25" },
    { name: "Refrescos", price: "$3.50" },
    { name: "Old Fashioned", desc: "Bourbon, azúcar, bitters y toque de naranja" },
    { name: "Espresso Martini", desc: "Vodka, espresso y licor de café" },
    { name: "Margarita", desc: "Tequila, triple sec y jugo fresco de limón" },
  ],
  ninos: [
    { name: "Chicken Nuggets", price: "$9.95" },
    { name: "Mac & Cheese", price: "$6.95" },
    { name: "Flatbread Pizza", desc: "Queso o pepperoni", price: "$12.95" },
    { name: "Pechuga de Pollo", price: "$14.95" },
  ],
};

const TABS: { key: MenuCat; label: string }[] = [
  { key: "aperitivos",   label: "Aperitivos" },
  { key: "tablas",       label: "Tablas para compartir" },
  { key: "ensaladas",    label: "Ensaladas" },
  { key: "sandwiches",   label: "Sándwiches" },
  { key: "principales",  label: "Platos principales" },
  { key: "acompanantes", label: "Acompañantes" },
  { key: "postres",      label: "Postres" },
  { key: "bebidas",      label: "Bebidas" },
  { key: "ninos",        label: "Menú de niños" },
];

const GALLERY = [
  { label: "Carnes a la parrilla", src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&q=80" },
  { label: "El salón histórico",   src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=80" },
  { label: "Mariscos",             src: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&q=80" },
  { label: "Selección de vinos",   src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80" },
  { label: "Alta cocina",          src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" },
];

// ─── SVG ICONS (no OS emojis) ─────────────────────────────────────────────────

/** Sun icon for light mode indicator */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

/** Moon icon for dark mode indicator */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

/** Beef/steak icon — exact Lucide `beef` icon paths, clean professional render */
function SteakIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12.5" cy="8.5" r="2.5"/>
      <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"/>
      <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/>
    </svg>
  );
}

/** Fish icon — 24×24 grid, same weight as beef and calendar */
function FishIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <path d="M6 12 C6 7.5 9 5 13 5 C17 5 21 7.5 21 12 C21 16.5 17 19 13 19 C9 19 6 16.5 6 12 Z"/>
      {/* tail — two lines from body-left meeting at a point */}
      <path d="M6 12 L2 7"/>
      <path d="M6 12 L2 17"/>
      {/* belly line */}
      <path d="M10 15 Q13 16.5 16 15"/>
      {/* eye */}
      <circle cx="16.5" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

/** Calendar icon for reservations */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8"  y1="2" x2="8"  y2="6"/>
      <line x1="3"  y1="10" x2="21" y2="10"/>
    </svg>
  );
}

// ─── ORNAMENT ─────────────────────────────────────────────────────────────────
function Ornament() {
  return <div className="ornament"><div className="ornament-gem" /></div>;
}

// ─── THEME TOGGLE — SVG only, no OS emojis ────────────────────────────────────
function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="theme-toggle"
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Menú",          href: "#menu" },
    { label: "Nosotros",      href: "#about" },
    { label: "Galería",       href: "#gallery" },
    { label: "Horarios",      href: "#hours" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "var(--bg)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "background 0.45s, border-color 0.45s",
    }}>
      <nav style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 2.5rem", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo — Great Vibes matches the sign's italic script */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span className="font-script" style={{
            fontSize: "1.7rem", color: "var(--primary)",
            letterSpacing: "0.02em", lineHeight: 1, display: "block",
          }}>
            El Tenedor
          </span>
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: "0.38rem",
            letterSpacing: "0.42em", textTransform: "uppercase",
            color: "var(--text-3)", display: "block", marginTop: "1px",
          }}>
            Juncos · Est. 1974
          </span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ display: "flex", gap: "2.4rem", listStyle: "none" }}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: "var(--text-2)", textDecoration: "none",
                fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase",
                fontWeight: 400, transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-2)")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button onClick={() => setOpen(!open)} className="nav-burger" style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-2)", fontSize: "0.6rem",
            letterSpacing: "0.22em", textTransform: "uppercase",
            fontFamily: "'Raleway', sans-serif",
          }}>
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{
          background: "var(--bg)", borderTop: "1px solid var(--border)",
          padding: "1.4rem 2.5rem 1.8rem",
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "0.8rem 0",
              borderBottom: "1px solid var(--border)",
              color: "var(--text-2)", textDecoration: "none",
              fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── HERO — tightened top padding to reduce gap under nav ────────────────────
function Hero() {
  return (
    <section
      className="hero-grid"
      style={{
        height: "100vh",       /* exactly viewport height — no extra space */
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        paddingTop: "68px",    /* nav height only — no extra vertical padding */
      }}
    >
      {/* Left text panel */}
      <div style={{
        background: "var(--bg-2)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "3rem 4rem 3rem",    /* reduced top/bottom from 5rem to 3rem */
        position: "relative",
      }}>
        {/* Fade border */}
        <div style={{
          position: "absolute", right: 0, top: "15%", bottom: "15%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, var(--border-md), transparent)",
        }} />

        <p className="anim-fade-up eyebrow d1">
          Restaurante · Est. 1974 · Juncos, Puerto Rico
        </p>

        {/* Script heading matches the actual sign font */}
        <h1 className="anim-fade-up d2 font-script" style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: "var(--primary)",
          marginBottom: "0.2rem",
          lineHeight: 1.1,
        }}>
          El Tenedor
        </h1>

        <p className="anim-fade-up d2 font-cinzel" style={{
          fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
          color: "var(--secondary)",
          letterSpacing: "0.22em",
          marginBottom: "1.4rem",
          textTransform: "uppercase",
        }}>
          Fine Dining · Juncos, Puerto Rico
        </p>

        <div style={{
          width: "32px", height: "1px",
          background: "linear-gradient(to right, var(--secondary), transparent)",
          margin: "0 0 1.6rem",
        }} className="anim-fade-up d3" />

        <p className="anim-fade-up d3 font-crimson" style={{
          fontStyle: "italic", fontSize: "1rem",
          color: "var(--text-2)", lineHeight: 1.65,
          marginBottom: "2.2rem", maxWidth: "340px",
        }}>
          Desde 1974, una experiencia única construida dentro de las paredes
          de una destilería de ron centenaria en Juncos.
        </p>

        <div className="anim-fade-up d4" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <a href="#menu" className="btn-primary">Ver el menú</a>
        </div>

        {/* Credential badge — absolute bottom-left on desktop, inline on mobile */}
        <div className="hero-badge">
          <span className="font-cinzel" style={{
            fontSize: "2.8rem", fontWeight: 400,
            color: "var(--primary)", lineHeight: 1,
          }}>50+</span>
          <span style={{
            fontSize: "0.46rem", letterSpacing: "0.34em",
            textTransform: "uppercase", color: "var(--text-3)",
            display: "block", marginTop: "0.2rem",
          }}>Años de excelencia</span>
        </div>

        <style>{`
          .hero-badge {
            position: absolute;
            bottom: 2.2rem;
            left: 3.5rem;
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          @media (max-width: 860px) {
            .hero-badge {
              position: static;
              margin-top: 2rem;
              padding-top: 1.4rem;
              border-top: 1px solid var(--border);
            }
            .hero-badge span:first-child {
              font-size: 2rem !important;
            }
          }
        `}</style>
      </div>

      {/* Right photo — fills the full right half */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-eltenedor.jpeg"
          alt="Restaurante El Tenedor — Juncos, Puerto Rico"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 10s ease" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        />
        {/* Left-to-right cream fade so text side blends into photo */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, var(--bg-2) 0%, transparent 25%)",
          opacity: 0.35,
        }} />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .hero-grid > div:first-child { padding: 5rem 2rem 3rem !important; min-height: auto; }
          .hero-grid > div:last-child  { height: 45vw; min-height: 240px; }
        }
      `}</style>
    </section>
  );
}

// ─── QUOTE STRIP ──────────────────────────────────────────────────────────────
function QuoteStrip() {
  return (
    <div className="quote-strip">
      <Ornament />
      <p className="quote-text" style={{ marginTop: "1.5rem" }}>
        "No solo servimos comida. Ofrecemos el tiempo, el espacio y la historia
        para que una noche se convierta en un recuerdo que queda."
      </p>
      <cite className="quote-attr" style={{ marginTop: "0.8rem", display: "block" }}>
        — Luis Mantero, propietario · El Tenedor
      </cite>
    </div>
  );
}

// ─── FEATURE CARDS — SVG icons instead of emojis ─────────────────────────────
function Features() {
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="feature-grid">
          {[
            {
              icon: <SteakIcon />,
              title: "Carnes a la parrilla",
              body: "Nuestra especialidad: churrasco, sirloin y T-bone preparados con fuego y técnica. Cortes premium desde 8 hasta 32 onzas.",
            },
            {
              icon: <FishIcon />,
              title: "Mariscos del mar",
              body: "Salmón fresco, camarones a la Tenedor y una selección de mariscos que llevan los sabores del Caribe a su mesa.",
            },
            {
              icon: <CalendarIcon />,
              title: "Reservaciones",
              body: "Reserve su mesa con anticipación. Para grupos de 8 o más personas, contáctenos directamente al (787) 734-6573.",
            },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrap">
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MENU — sidebar stretches to match content, no white gap ─────────────────
function Menu() {
  const [active, setActive] = useState<MenuCat>("aperitivos");

  return (
    <section id="menu" className="section" style={{
      background: "var(--bg)", borderBottom: "1px solid var(--border-md)",
    }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Menú</span>
          <h2 className="section-title font-cinzel">Nuestra <em>selección</em></h2>
          <Ornament />
        </div>

        <div className="menu-layout">
          {/* Sidebar — bg matches bg-2, no height limit, stretches with content */}
          <nav className="menu-sidebar" aria-label="Categorías del menú">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`menu-btn${active === t.key ? " active" : ""}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="menu-content">
            {MENU[active].map((item, i) => (
              <div key={i} className="menu-row">
                <div>
                  <p className="menu-item-name">{item.name}</p>
                  {item.desc && <p className="menu-item-desc">{item.desc}</p>}
                </div>
                {item.price
                  ? <span className="menu-item-price">{item.price}</span>
                  : <span className="menu-item-tbd">Consultar</span>
                }
              </div>
            ))}
          </div>
        </div>

        <p style={{
          textAlign: "center", marginTop: "1.6rem",
          fontSize: "0.56rem", letterSpacing: "0.18em", color: "var(--text-3)",
        }}>
          Los precios pueden variar · Infórmenos sobre alergias o restricciones dietéticas
        </p>
      </div>
    </section>
  );
}

// ─── ABOUT  ──────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">

        {/* Row 1 */}
        <div className="two-col" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center", marginBottom: "5rem",
        }}>
          <div className="about-img corner-accent" style={{ aspectRatio: "4/5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/campa-eltenedor.jpeg"
              alt="Interior El Tenedor"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div>
            <span className="eyebrow">Nuestra historia</span>
            <h2 className="section-title font-cinzel" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}>
              Una destilería de ron.<br /><em>Un restaurante de leyenda.</em>
            </h2>
            <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, var(--secondary), transparent)", marginBottom: "1.8rem" }} />
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              El Tenedor fue fundado en 1974 por Julio Mantero en lo que fue la
              destilería de ron familiar Ron Caray, que operó desde 1915 hasta 1942.
              El nombre surgió porque, según don Julio, el tenedor es el utensilio que
              más se utiliza en la mesa.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              La icónica chimenea de ladrillo, visible desde la carretera y una de las
              pocas que permanece intacta en Puerto Rico, es símbolo del pueblo de Juncos
              y punto de referencia histórico del área este.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, fontWeight: 300 }}>
              Hoy, bajo la dirección de Luis Mantero, acumula{" "}
              <span style={{ color: "var(--primary)", fontWeight: 500 }}>19 premios de Mesones Gastronómicos</span>
              {" "}y se prepara para un nuevo capítulo que incluye el relanzamiento del{" "}
              <span style={{ color: "var(--secondary)", fontWeight: 500 }}>Ron Caray</span>,
              ganador de medalla de oro en Miami.
            </p>
          </div>
        </div>

        {/* Stats — fading green top accent on hover */}
        <div className="stat-grid" style={{ marginBottom: "5rem" }}>
          {[
            { n: "1974", l: "Año de fundación" },
            { n: "19",   l: "Premios Mesones Gastronómicos" },
            { n: "50+",  l: "Años sirviendo a Puerto Rico" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <p className="stat-num font-cinzel">{s.n}</p>
              <p className="stat-label">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="two-col" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center",
        }}>
          <div>
            <span className="eyebrow">El espacio</span>
            <h2 className="section-title font-cinzel" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}>
              La destilería que<br /><em>se convirtió en leyenda.</em>
            </h2>
            <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, var(--secondary), transparent)", marginBottom: "1.8rem" }} />
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              Las paredes de ladrillo, los arcos de la antigua destilería y la chimenea
              que ha visto décadas pasar crean una atmósfera que ningún restaurante nuevo
              puede fabricar.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, fontWeight: 300 }}>
              Aquí, la historia no es decoración. Es el cimiento de todo lo que servimos.
            </p>
          </div>

          <div className="about-img corner-accent" style={{ aspectRatio: "4/3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/chimenea-eltenedor.jpeg"
              alt="Chimenea histórica El Tenedor"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "5rem 2.5rem 2.5rem", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <span className="eyebrow">La experiencia</span>
        <h2 className="section-title font-cinzel">Un festín para <em>los sentidos</em></h2>
        <Ornament />
      </div>
      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <div key={i} className="gal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={g.label} />
            <span className="gal-label">{g.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HOURS & LOCATION ─────────────────────────────────────────────────────────
function HoursLocation() {
  const HOURS = [
    { day: "Lunes – Jueves", time: "11:00 am – 9:00 pm" },
    { day: "Viernes",        time: "11:00 am – 10:00 pm" },
    { day: "Sábado",         time: "11:00 am – 10:00 pm" },
    { day: "Domingo",        time: "11:00 am – 10:00 pm" },
  ];

  return (
    <section id="hours" className="section" style={{
      background: "var(--bg-2)", borderTop: "1px solid var(--border)",
    }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Visítanos</span>
          <h2 className="section-title font-cinzel">Horarios & <em>ubicación</em></h2>
          <Ornament />
        </div>

        <div className="hours-grid">
          <div>
            <p className="hours-label">Horario de servicio</p>
            {HOURS.map((h, i) => (
              <div key={i} className="hours-row" style={i === HOURS.length - 1 ? { borderBottom: "none" } : {}}>
                <span className="hours-day">{h.day}</span>
                <span className="hours-time font-crimson">{h.time}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="hours-label">Dónde encontrarnos</p>
            {[
              { label: "Dirección",  text: "Calle Emilia Príncipe #1\nUrb. Madrid, Juncos, PR 00777" },
              { label: "Teléfono",   text: "(787) 734-6573", href: "tel:7877346573" },
              { label: "Sitio web",  text: "eltenedorpr.com", href: "https://eltenedorpr.com" },
            ].map((item, i) => (
              <div key={i} className="info-group">
                <p className="info-label">{item.label}</p>
                {item.href ? (
                  <a href={item.href}
                    target={item.href.startsWith("https") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="info-value">
                    {item.text}
                  </a>
                ) : (
                  <p className="info-value">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Full-width map spanning both columns */}
        <div className="map-full">
          <p>Mapa — agregar iframe aquí</p>
        </div>
      </div>
    </section>
  );
}


// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: "var(--dark-bg)",
      borderTop: "1px solid rgba(255,255,255,.05)",
      padding: "4.5rem 2.5rem 2.5rem",
      textAlign: "center",
    }}>
      {/* Script logo matching sign */}
      <p className="font-script" style={{
        fontSize: "2.8rem", color: "var(--dark-text)",
        letterSpacing: "0.02em", marginBottom: "0.3rem", lineHeight: 1.1,
      }}>
        El Tenedor
      </p>
      <p className="font-crimson" style={{
        fontStyle: "italic", fontSize: "0.9rem",
        color: "var(--dark-muted)", letterSpacing: "0.1em", marginBottom: "0.2rem",
      }}>
        Est. 1974 · Juncos, Puerto Rico
      </p>

      <div style={{
        width: "1px", height: "24px",
        background: "linear-gradient(to bottom, rgba(200,190,160,.2), transparent)",
        margin: "1.5rem auto",
      }} />

      <p style={{ fontSize: "0.7rem", color: "var(--dark-muted)", marginBottom: "0.3rem" }}>
        Calle Emilia Príncipe #1, Urb. Madrid · Juncos, PR 00777
      </p>
      <p style={{ fontSize: "0.7rem", color: "var(--dark-muted)", marginBottom: "1.8rem" }}>
        (787) 734-6573 · eltenedorpr.com
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "2.2rem", marginBottom: "2.2rem" }}>
        {["Instagram", "Facebook"].map(s => (
          <a key={s} href="#" style={{
            fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(200,190,160,.4)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--dark-text)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(200,190,160,.4)")}>
            {s}
          </a>
        ))}
      </div>

      <p style={{ fontSize: "0.56rem", color: "rgba(200,190,160,.25)", letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} El Tenedor · Todos los derechos reservados
      </p>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ElTenedorPage(): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("et-theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("et-theme", next);
  };

  return (
    <>
      <Nav theme={theme} onToggle={toggleTheme} />
      <main>
        <Hero />
        <Features />
        <QuoteStrip />
        <Menu />
        <About />
        <Gallery />
        <HoursLocation />
      </main>
      <Footer />
    </>
  );
}