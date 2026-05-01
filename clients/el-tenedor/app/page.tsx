"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { IntroAnimation } from "./IntroAnimation";

// ─── TYPES ─────────────────────────────────────────────────────────
type MenuCat =
  | "aperitivos"
  | "tablas"
  | "ensaladas"
  | "sandwiches"
  | "especialidad"
  | "principales"
  | "acompanantes"
  | "ninos"
  | "cervezas"
  | "sangria"
  | "bebidas";

type MenuItem = { name: string; desc?: string; price?: string };

// ─── MENU DATA ─────────────────────────────────────────────────────
const MENU: Record<MenuCat, MenuItem[]> = {
  aperitivos: [
    { name: "Entremeses Boricuas", desc: "Bacalaítos, alcapurrias, mozzarella sticks, piononos y sorullitos de maíz; una selección perfecta para compartir.", price: "$24.95" },
    { name: "Chorizo Argentino", desc: "Chorizo a la parrilla, jugoso y perfectamente sazonado.", price: "$13.95" },
    { name: "Fondue de Chorizo", desc: "Cremosa mezcla de quesos fundidos con chorizo salteado.", price: "$12.95" },
    { name: "Camarones Empanados con Aioli", desc: "Camarones crujientes acompañados de aioli cremoso con un toque de ajo.", price: "$12.95" },
    { name: "Calamares Fritos", desc: "Calamares ligeramente empanados y fritos, acompañados de salsa de la casa.", price: "$12.95" },
    { name: "Croquetas", desc: "Croquetas artesanales rellenas de jamón serrano, queso manchego o bacalao.", price: "$11.95" },
    { name: "Queso Frito a la Tenedor", desc: "Crujiente por fuera y suave por dentro, servido caliente con salsa de la casa.", price: "$11.95" },
    { name: "Sopa del Día", desc: "Preparación fresca del chef elaborada con ingredientes de temporada.", price: "$8.95" },
  ],

  tablas: [
    { name: "Tabla de Carnes", desc: "Selección de sirloin, churrasco, chuletón y pechuga a la parrilla, acompañada de tostones crujientes.", price: "$125.95" },
    { name: "Tabla de Chorizo y Queso Manchego", desc: "Selección de chorizo con queso manchego curado.", price: "$14.95" },
    { name: "Tabla de Jamón Serrano y Queso Manchego", desc: "Finas lonjas de jamón serrano con queso manchego curado.", price: "$14.95" },
  ],

  ensaladas: [
    { name: "Ensalada del Chef", desc: "Fresca mezcla de lechugas con jamón, pavo, queso, huevo y vegetales de temporada.", price: "$16.95" },
    { name: "Ensalada de Pollo", desc: "Pechuga de pollo a la parrilla con vegetales y aderezo de la casa.", price: "$16.95" },
    { name: "Ensalada César", desc: "Lechuga romana, crutones, parmesano y aderezo César tradicional.", price: "$15.95" },
  ],

  sandwiches: [
    { name: "Tenedor Burger", desc: "Hamburger de la casa con queso, lechuga, tomate y salsa especial.", price: "$17.95" },
    { name: "El Junqueño", desc: "Sándwich especial con sabores inspirados en la gastronomía italiana.", price: "$14.95" },
    { name: "El Cubano", desc: "Cerdo, jamón, queso suizo, pepinillos y mostaza en pan tostado.", price: "$14.95" },
    { name: "Sándwich de Pavo", desc: "Pavo, lechuga, tomate y queso en pan tostado.", price: "$13.95" },
    { name: "Sándwich de Atún", price: "$13.95" },
  ],

  especialidad: [
    { name: "Churrasco 32 oz", price: "$112.95" },
    { name: "Churrasco 24 oz",  price: "$84.55" },
    { name: "Churrasco 16 oz",  price: "$56.95" },
    { name: "Churrasco 10 oz",  price: "$34.95" },
    { name: "Sirloin 32 oz", price: "$104.95" },
    { name: "Sirloin 24 oz",  price: "$77.95" },
    { name: "Sirloin 16 oz",  price: "$58.95" },
    { name: "Sirloin 10 oz",  price: "$36.95" },
  ],

  principales: [
    { name: "Mar y Tierra", desc: "Sirloin, camarones y pechuga de pollo a la parrilla.", price: "$59.95" },
    { name: "Filete Mignon en Salsa de Champiñones", desc: "Filete mignon con salsa de champiñones.", price: "49.95" },
    { name: "T-Bone Steak 16 oz", desc: "Corte premium a la parrilla.", price: "$39.95" },
    { name: "Rib Eye 16 oz", desc: "Jugoso corte con excelente marmoleo y sabor intenso.", price: "$59.95" },
    { name: "Costillas de Res", desc: "Cocidas lentamente hasta quedar jugosas.", price: "$29.95" },
    { name: "Filete de Salmón", desc: "Salmón a la parrilla.", price: "$24.95" },
    { name: "Camarones a la Tenedor", desc: "Salteados al estilo de la casa.", price: "$24.95" },
    { name: "Chuletón de Cerdo Corte Francés", desc: "Corte grueso a la parrilla.", price: "$21.95" },
    { name: "Pechuga de Pollo a la Parrilla", desc: "Pechuga jugosa a la parrilla.", price: "$21.95" },
    { name: "Pechuga Empanada o a la Milanesa",desc: "Crujiente por fuera y jugosa por dentro.", price: "$22.95" },
  ],

  acompanantes: [
    { name: "Arroz y Habichuelas" },
    { name: "Mamposteao del Día" },
    { name: "Tostones de Plátano" },
    { name: "Papa Asada" },
    { name: "Papas Fritas" },
    { name: "Pasta en Salsa Alfredo" },
    { name: "Mofongo de Yuca" },
    { name: "Gnocchi" },
  ],

  ninos: [
    { name: "Pechuga de Pollo", price: "$14.95" },
    { name: "Flatbread Pizza", desc: "Queso o pepperoni.", price: "$12.95" },
    { name: "Mac & Cheese", price: "$8.95" },
    { name: "Chicken Tenders", price: "$11.95" },
  ],

  cervezas: [
    { name: "Corona", price: "$5.75" },
    { name: "Modelo", price: "$5.75" },
    { name: "Peroni", price: "$5.75" },
    { name: "Samuel Adams", price: "$5.75" },
    { name: "Heineken", price: "$5.50" },
    { name: "Estrella Galicia", price: "$5.50" },
    { name: "Michelob", price: "$4.50" },
    { name: "Medalla", price: "$4.00" },
  ],

  sangria: [
    { name: "Jarra de Sangría", desc: "Tinta o blanca.", price: "$28.95" },
    { name: "Copa de Sangría", desc: "Tinta o blanca.", price: "$10.00" },
  ],

  bebidas: [
    { name: "Piña Colada", price: "$7.25" },
    { name: "Frappés", price: "$7.25" },
    { name: "Jugos", price: "$4.50" },
    { name: "Refrescos", price: "$3.50" },
  ],
};

// ─── TABS ──────────────────────────────────────────────────────────
const TABS: { key: MenuCat; label: string }[] = [
  { key: "aperitivos", label: "Aperitivos" },
  { key: "tablas", label: "Tablas para compartir" },
  { key: "ensaladas", label: "Ensaladas" },
  { key: "sandwiches", label: "Sándwiches" },
  { key: "especialidad", label: "Especialidad de la casa" },
  { key: "principales", label: "Platos principales" },
  { key: "acompanantes", label: "Acompañantes" },
  { key: "ninos", label: "Menú de niños" },
  { key: "cervezas", label: "Cervezas" },
  { key: "sangria", label: "Sangría" },
  { key: "bebidas", label: "Bebidas" },
];

const GALLERY = [
  { label: "Chimenea Rum Caray", src: "/images/rumcaray-chimenea.JPG" },
  { label: "Selección de vinos",   src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80" },
  { label: "Alta cocina",          src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" },
  { label: "El salón histórico",   src: "/images/interior-el-tenedor.JPG"},
];

const HISTORY_CARDS = [
  { year: "1915", title: "La destilería",      body: "La destilería de ron Ron Caray inicia operaciones en Juncos, convirtiéndose en pilar de la comunidad por más de dos décadas." },
  { year: "1974", title: "Nace El Tenedor",    body: "Julio Mantero funda El Tenedor dentro de las paredes de la antigua destilería. El nombre surge porque el tenedor es el utensilio más utilizado en la mesa." },
  { year: "Hoy",  title: "50+ años de legado", body: "Bajo la dirección de Luis Mantero, el restaurante acumula 19 premios de Mesones Gastronómicos y prepara el relanzamiento del Ron Caray, ganador de medalla de oro en Miami." },
];

const HOURS_DATA = [
  { day: "Jueves",  time: "11:00 am – 9:00 pm" },
  { day: "Viernes", time: "11:00 am – 10:00 pm" },
  { day: "Sábado",  time: "11:00 am – 10:00 pm" },
  { day: "Domingo", time: "11:00 am – 9:00 pm" },
];

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
function SteakIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12.5" cy="8.5" r="2.5"/>
      <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"/>
      <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/>
    </svg>
  );
}
function FishIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12 C6 7.5 9 5 13 5 C17 5 21 7.5 21 12 C21 16.5 17 19 13 19 C9 19 6 16.5 6 12 Z"/>
      <path d="M6 12 L2 7"/><path d="M6 12 L2 17"/>
      <path d="M10 15 Q13 16.5 16 15"/>
      <circle cx="16.5" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

// Rum bottle icon for "Una destilería histórica" card
function RumBottleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Cork */}
      <rect x="10.5" y="1" width="3" height="2" rx="0.5"/>
      {/* Neck */}
      <path d="M10.5 3 L10.5 6 M13.5 3 L13.5 6"/>
      {/* Shoulder curve */}
      <path d="M10.5 6 Q7 8 7 10"/>
      <path d="M13.5 6 Q17 8 17 10"/>
      {/* Body */}
      <path d="M7 10 L7 20 Q7 22 12 22 Q17 22 17 20 L17 10"/>
      {/* Label band */}
      <line x1="7" y1="13" x2="17" y2="13"/>
      <line x1="7" y1="17" x2="17" y2="17"/>
    </svg>
  );
}

function Ornament({ variant = "light" }: { variant?: "light" | "dark" }) {
  return <div className={`ornament ornament-${variant}`}><div className="ornament-gem" /></div>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
// PDF pg1: burger pushed to right edge of nav
// PDF pg3: hours in drawer, full-width phone
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const desktopLinks = [
    { label: "Menú",      href: "#menu" },
    { label: "Nosotros",  href: "#about" },
    { label: "Galería",   href: "#gallery" },
    { label: "Horarios",  href: "#hours" },
    { label: "Ubicación", href: "https://www.google.com/maps/place/1+Cll+Emilia+Principe,+Juncos,+00777", external: true },
  ];

  const mobileLinks = [
    { label: "Menú",      href: "#menu" },
    { label: "Nosotros",  href: "#about" },
    { label: "Galería",   href: "#gallery" },
    { label: "Ubicación", href: "https://www.google.com/maps/place/1+Cll+Emilia+Principe,+Juncos,+00777", external: true },
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
        // On mobile: use padding-right: 1rem so burger sits flush right
        padding: "0 2.5rem", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <span className="font-script" style={{ fontSize: "1.7rem", color: "var(--primary)", letterSpacing: "0.02em", lineHeight: 1, display: "block" }}>El Tenedor</span>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.38rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginTop: "1px" }}>Juncos · Est. 1974</span>
        </a>

        <ul className="nav-desktop" style={{ display: "flex", gap: "2.4rem", listStyle: "none" }}>
          {desktopLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
                style={{ color: "var(--text-2)", textDecoration: "none", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 400, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-2)")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger — right-aligned via margin-left: auto on mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px" }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "1.4rem 1.5rem 1.8rem" }}>
          {mobileLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
              style={{ display: "block", padding: "0.85rem 0", borderBottom: "1px solid var(--border)", color: "var(--text-2)", textDecoration: "none", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
          <div style={{ paddingTop: "1.2rem" }}>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: "0.5rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.9rem" }}>
              Horario de servicio
            </p>
            {HOURS_DATA.map((h, i) => (
              <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: i < HOURS_DATA.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-3)", fontWeight: 300 }}>{h.day}</span>
                <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.9rem", color: "var(--text)" }}>{h.time}</span>
              </div>
            ))}
            <a href="tel:7877346573" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", height: "48px", width: "100%", background: "var(--primary)", color: "var(--text-inv)", textDecoration: "none", fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 11.93a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.94 6.94l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (787) 734-6573
            </a>
          </div>
        </div>
      )}

      {/* Push burger to right edge on mobile */}
      <style>{`
        @media (max-width: 860px) {
          .nav-burger { margin-left: auto; }
        }
      `}</style>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
// PDF pg1: utility buttons ~half width, left-aligned, original height
// PDF pg1: eliminate the chimenea image that was appearing below hero on mobile
// Text: taller mobile hero (min-height: 115svh)
function Hero() {
  return (
    <section className="hero-grid" style={{ height: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", paddingTop: "68px" }}>

      <div className="hero-text-panel" style={{ background: "var(--bg-2)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 4rem 3rem", position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: "15%", bottom: "15%", width: "1px", background: "linear-gradient(to bottom, transparent, var(--border-md), transparent)" }} />

        <p className="anim-fade-up eyebrow d1">Restaurante · Est. 1974 · Juncos, Puerto Rico</p>
        <h1 className="anim-fade-up d2 font-script" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--primary)", marginBottom: "0.2rem", lineHeight: 1.1 }}>El Tenedor</h1>
        <p className="anim-fade-up d2 font-cinzel" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)", color: "var(--secondary)", letterSpacing: "0.22em", marginBottom: "1.4rem", textTransform: "uppercase" }}>Steakhouse · Juncos, Puerto Rico</p>
        <div style={{ width: "32px", height: "1px", background: "linear-gradient(to right, var(--secondary), transparent)", margin: "0 0 1.6rem" }} className="anim-fade-up d3" />

        {/*
          Mobile utility cluster — PDF pg1:
          - Left-aligned (not full-width)
          - ~half width each (~48% so both fit side by side with a gap, OR stacked at original btn size)
          - Original height (48px)
          - The PDF shows them stacked but left-aligned and narrower than full-width
        */}
        <div className="hero-utility-cluster anim-fade-up d3">
          <a href="#menu" className="utility-btn utility-btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Ver Menú
          </a>
          <a href="https://www.google.com/maps/place/1+Cll+Emilia+Principe,+Juncos,+00777" target="_blank" rel="noopener noreferrer" className="utility-btn utility-btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Cómo llegar
          </a>
        </div>

        <p className="anim-fade-up d3 font-crimson" style={{ fontStyle: "italic", fontSize: "1rem", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "2.2rem", maxWidth: "340px" }}>
          Desde 1974, una experiencia única construida dentro de las paredes de una destilería de ron centenaria en Juncos.
        </p>

        {/* Desktop CTA */}
        <div className="anim-fade-up d4 hero-desktop-cta" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <a href="#menu" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Ver Menú
          </a>
        </div>

        <div className="hero-badge">
          <span className="font-cinzel" style={{ fontSize: "2.8rem", fontWeight: 400, color: "var(--primary)", lineHeight: 1 }}>50+</span>
          <span style={{ fontSize: "0.46rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginTop: "0.2rem" }}>Años de excelencia</span>
        </div>

        <style>{`
          .hero-utility-cluster { display: none; }
          .utility-btn {
            display: inline-flex; align-items: center; justify-content: center;
            gap: 0.45rem; font-family: 'Raleway', sans-serif; font-weight: 600;
            font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
            text-decoration: none; height: 48px;
            transition: background 0.2s, color 0.2s;
          }
          .utility-btn-primary  { background: var(--primary); color: var(--text-inv); }
          .utility-btn-primary:active  { background: var(--primary-2); }
          .utility-btn-secondary {
            background: transparent; color: var(--primary);
            border: 1px solid var(--border-str);
          }
          .utility-btn-secondary:active { background: var(--primary-fade); }
          .hero-badge {
            position: absolute; bottom: 2.2rem; left: 3.5rem;
            display: flex; flex-direction: column; gap: 0;
          }

          @media (max-width: 860px) {
            /* Utility cluster: left-aligned, stacked, auto width (content-fit) */
            .hero-utility-cluster {
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 0.5rem;
              margin-bottom: 1.4rem;
            }
            .utility-btn {
              width: auto !important;
              min-width: 0 !important;
              justify-content: flex-start !important;
              padding: 0 1.4rem !important;
            }
            .hero-desktop-cta { display: none !important; }

            /* Hero bg image faded from right — stronger cream tint on left for text contrast */
            .hero-text-panel {
              background-image: url('/images/hero-eltenedor.jpeg') !important;
              background-size: cover !important;
              background-position: center right !important;
            }
            .hero-text-panel::before {
              content: '';
              position: absolute; inset: 0; z-index: 0;
              background: linear-gradient(
                to right,
                rgba(237,228,207,0.97) 0%,
                rgba(237,228,207,0.96) 40%,
                rgba(237,228,207,0.88) 58%,
                rgba(237,228,207,0.60) 72%,
                rgba(237,228,207,0.20) 88%,
                transparent 100%
              );
            }
            .hero-text-panel > * { position: relative; z-index: 1; }

            .hero-badge {
              position: static !important;
              margin-top: 1.4rem;
              padding-top: 1.2rem;
              border-top: 1px solid rgba(107,61,30,0.15);
            }
            .hero-badge span:first-child { font-size: 2rem !important; }
          }
        `}</style>
      </div>

      {/* Desktop-only image panel */}
      <div className="hero-image-panel" style={{ position: "relative", overflow: "hidden" }}>
        <img src="/images/hero-eltenedor.jpeg" alt="Restaurante El Tenedor — Juncos, Puerto Rico"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 10s ease" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--bg-2) 0%, transparent 25%)", opacity: 0.35 }} />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; height: auto !important; min-height: 100svh; }
          .hero-grid > div:first-child { padding: 4rem 1.25rem 2.5rem !important; min-height: 100svh; }

          /* Hide desktop image panel completely */
          .hero-image-panel {
            display: none !important;
            height: 0 !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── QUOTE STRIP ──────────────────────────────────────────────────────────────
function QuoteStrip() {
  return (
    <div className="quote-strip">
      <Ornament variant="dark" />
      <p className="quote-text" style={{ marginTop: "1.5rem" }}>
        "No solo servimos comida, ofrecemos el tiempo, el espacio y la historia
        para que una visita se convierta en un recuerdo inolvidable."
      </p>
      <cite className="quote-attr" style={{ marginTop: "0.8rem", display: "block", color: "var(--accent-2)" }}>
        — Luis Mantero, propietario · El Tenedor
      </cite>
    </div>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
// PDF pg2: card 3 icon changed to BuildingIcon (antique building)
// Mobile: scroll-reveal one-by-one via IntersectionObserver
function Features() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth > 860) return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(28px)";
      card.style.transition = `opacity 0.55s ease ${i * 0.18}s, transform 0.55s ease ${i * 0.18}s`;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
              obs.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );
      obs.observe(card);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const FEATURES = [
    { icon: <SteakIcon />, title: "Carnes a la parrilla",    body: "Nuestra especialidad: churrasco, sirloin y T-bone preparados con fuego y técnica. Cortes premium desde 8 hasta 32 onzas." },
    { icon: <FishIcon />,  title: "Mariscos del mar",         body: "Salmón fresco, camarones a la Tenedor y una selección de mariscos que llevan los sabores del Caribe a su mesa." },
    // PDF pg2: icon changed to RumBottleIcon for the distillery card
    { icon: <RumBottleIcon />, title: "Una destilería histórica", body: "Ubicado en un edificio centenario que fue la destilería de ron Ron Caray. Atmósfera única con paredes de ladrillo, arcos históricos y una chimenea que ha visto décadas pasar." },
  ];

  return (
    <section className="section" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" ref={(el) => { cardRefs.current[i] = el; }}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────
// PDF pg2: replace horizontal scroll tabs with a dropdown on mobile
// Shows: current category label + chevron ▾ → tapping reveals a dropdown list
function Menu() {
  const [active, setActive] = useState<MenuCat>("aperitivos");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeLabel = TABS.find((t) => t.key === active)?.label ?? "";

  return (
    <section id="menu" className="section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border-md)" }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Menú</span>
          <h2 className="section-title font-cinzel">Nuestra <em>selección</em></h2>
          <Ornament />
        </div>
        <div className="menu-layout">

          {/* Desktop sidebar — unchanged */}
          <nav className="menu-sidebar menu-sidebar-desktop" aria-label="Categorías del menú">
            {TABS.map((t) => (
              <button key={t.key}
                className={`menu-btn${active === t.key ? " active" : ""}`}
                onClick={() => setActive(t.key)}>{t.label}</button>
            ))}
          </nav>

          {/* Mobile dropdown selector — hidden on desktop */}
          <div className="menu-dropdown-wrapper">
            <button
              className="menu-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
            >
              <span className="menu-dropdown-label">{activeLabel}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="menu-dropdown-list" role="listbox">
                {TABS.filter((t) => t.key !== active).map((t) => (
                  <button
                    key={t.key}
                    role="option"
                    aria-selected={false}
                    className="menu-dropdown-item"
                    onClick={() => { setActive(t.key); setDropdownOpen(false); }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="menu-content">
            {MENU[active].map((item, i) => (
              <div key={i} className="menu-row">
                <div>
                  <p className="menu-item-name">{item.name}</p>
                  {item.desc && <p className="menu-item-desc">{item.desc}</p>}
                </div>
                {item.price ? <span className="menu-item-price">{item.price}</span> : null}
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "1.6rem", fontSize: "0.56rem", letterSpacing: "0.18em", color: "var(--text-3)" }}>
          Los precios pueden variar · Infórmenos sobre alergias o restricciones dietéticas
        </p>
      </div>

      <style>{`
        /* Desktop: sidebar visible, dropdown hidden */
        .menu-sidebar-desktop { display: flex; flex-direction: column; }
        .menu-dropdown-wrapper { display: none; }

        /* Mobile: sidebar hidden, dropdown shown */
        @media (max-width: 640px) {
          .menu-layout { grid-template-columns: 1fr !important; }
          .menu-sidebar-desktop { display: none !important; }
          .menu-dropdown-wrapper {
            display: block !important;
            border-bottom: 1px solid var(--border-md);
            background: var(--bg-2);
            position: relative;
          }
          .menu-dropdown-trigger {
            width: 100%; display: flex; align-items: center; justify-content: space-between;
            background: none; border: none; cursor: pointer;
            padding: 0.9rem 1.2rem; min-height: 48px;
            font-family: 'Raleway', sans-serif; font-size: 0.72rem;
            font-weight: 500; color: var(--primary); letter-spacing: 0.08em;
          }
          .menu-dropdown-label { flex: 1; text-align: left; }
          .menu-dropdown-list {
            position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
            background: var(--bg-2); border: 1px solid var(--border-md);
            border-top: none; box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          }
          .menu-dropdown-item {
            display: block; width: 100%; background: none; border: none;
            border-bottom: 1px solid var(--border); cursor: pointer;
            padding: 0.85rem 1.2rem; text-align: left; min-height: 48px;
            font-family: 'Raleway', sans-serif; font-size: 0.7rem;
            color: var(--text-2); letter-spacing: 0.06em;
            transition: background 0.15s;
          }
          .menu-dropdown-item:last-child { border-bottom: none; }
          .menu-dropdown-item:hover { background: var(--primary-fade); }
          .menu-dropdown-item.active { color: var(--primary); font-weight: 500; background: var(--primary-fade); }
          .menu-content { padding: 0.5rem 1rem 1.5rem !important; }
          .menu-row { gap: 0.75rem; padding: 0.9rem 0 !important; }
          .menu-item-name { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
// PDF pg3: stat grid back to vertical (1-col stacked) on mobile
// PDF pg3: "El espacio" section heading centered on mobile
// PDF pg1: chimenea image eliminated on mobile (the second about image)
function About() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <section id="about" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">

        {/* Desktop: original 2-col layout */}
        <div className="two-col about-desktop-only" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", marginBottom: "5rem" }}>
          <div className="about-img corner-accent" style={{ aspectRatio: "4/5" }}>
            <img src="/images/campa-eltenedor.jpeg" alt="Interior El Tenedor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span className="eyebrow">Nuestra historia</span>
            <h2 className="section-title font-cinzel" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}>
              Una destilería de ron.<br /><em>Un restaurante de leyenda.</em>
            </h2>
            <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, var(--secondary), transparent)", marginBottom: "1.8rem" }} />
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              El Tenedor fue fundado en 1974 por Julio Mantero en lo que fue la destilería de ron familiar Ron Caray, que operó desde 1915 hasta 1942. El nombre surgió porque, según don Julio, el tenedor es el utensilio que más se utiliza en la mesa.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              La icónica chimenea de ladrillo, visible desde la carretera y una de las pocas que permanece intacta en Puerto Rico, es símbolo del pueblo de Juncos y punto de referencia histórico del área este.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, fontWeight: 300 }}>
              Hoy, bajo la dirección de Luis Mantero, acumula{" "}
              <span style={{ color: "var(--primary)", fontWeight: 500 }}>19 premios de Mesones Gastronómicos</span>
              {" "}y se prepara para un nuevo capítulo que incluye el relanzamiento del{" "}
              <span style={{ color: "var(--secondary)", fontWeight: 500 }}>Ron Caray</span>, ganador de medalla de oro en Miami.
            </p>
          </div>
        </div>

        {/* Mobile: image + accordion */}
        <div className="about-mobile-only">
          <div className="about-img corner-accent" style={{ aspectRatio: "16/9", marginBottom: "1.6rem" }}>
            <img src="/images/campa-eltenedor.jpeg" alt="Interior El Tenedor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span className="eyebrow">Nuestra historia</span>
          <h2 className="section-title font-cinzel" style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)", marginBottom: "1.2rem" }}>
            Una destilería de ron.<br /><em>Un restaurante de leyenda.</em>
          </h2>
          <div className="history-accordion">
            {HISTORY_CARDS.map((card, i) => (
              <div key={i} className={`history-card${openCard === i ? " open" : ""}`}>
                <button className="history-card-header" onClick={() => setOpenCard(openCard === i ? null : i)} aria-expanded={openCard === i}>
                  <span className="history-card-year">{card.year}</span>
                  <span className="history-card-title">{card.title}</span>
                  <span className="history-card-chevron" aria-hidden>{openCard === i ? "−" : "+"}</span>
                </button>
                <div className="history-card-body"><p>{card.body}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat grid */}
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

        {/* "El espacio" — desktop: 2-col; mobile: centered text + image hidden */}
        <div className="two-col espacio-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div className="espacio-text">
            <span className="eyebrow">El espacio</span>
            <h2 className="section-title font-cinzel" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}>
              La destilería que<br /><em>se convirtió en leyenda.</em>
            </h2>
            <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, var(--secondary), transparent)", marginBottom: "1.8rem" }} />
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
              Las paredes de ladrillo, los arcos de la antigua destilería y la chimenea que ha visto décadas pasar crean una atmósfera que ningún restaurante nuevo puede fabricar.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.9, fontWeight: 300 }}>
              Aquí, la historia no es decoración. Es el cimiento de todo lo que servimos.
            </p>
          </div>
          {/* Chimenea image — hidden on mobile (PDF pg1) */}
          <div className="about-img corner-accent espacio-img" style={{ aspectRatio: "4/3" }}>
            <img src="/images/chimenea-eltenedor.jpeg" alt="Chimenea histórica El Tenedor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          /* Stat grid: vertical stacked (1-col) per PDF pg3 */
          .stat-grid {
            grid-template-columns: 1fr !important;
            background: transparent !important;
            gap: 0 !important;
            border: 1px solid var(--border-md) !important;
          }
          .stat-card {
            border-bottom: 1px solid var(--border-md) !important;
            padding: 1.6rem 1.5rem !important;
          }
          .stat-card:last-child { border-bottom: none !important; }

          /* "El espacio" on mobile: eyebrow + heading centered, body text left */
          .espacio-section { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .espacio-text .eyebrow { display: block; text-align: center; }
          .espacio-text .section-title { text-align: center; }
          .espacio-text > div[style] { margin-left: auto; margin-right: auto; }
          .espacio-text p { text-align: left !important; }

          /* Chimenea image: hidden on mobile — removed from flow entirely */
          .espacio-img { display: none !important; visibility: hidden !important; position: absolute !important; pointer-events: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);
  const prev = useCallback(() => setCurrent((c) => (c === 0 ? GALLERY.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c === GALLERY.length - 1 ? 0 : c + 1)), []);

  return (
    <section id="gallery" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "5rem 2.5rem 2.5rem", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <span className="eyebrow">La experiencia</span>
        <h2 className="section-title font-cinzel">Un festín para <em>los sentidos</em></h2>
        <Ornament />
      </div>

      <div className="gallery-grid gallery-desktop-only">
        {GALLERY.map((g, i) => (
          <div key={i} className="gal">
            <img src={g.src} alt={g.label} loading="lazy" />
            <span className="gal-label">{g.label}</span>
          </div>
        ))}
      </div>

      <div className="gallery-carousel"
        onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? 0; }}
        onTouchMove={(e)  => { touchDelta.current = (e.touches[0]?.clientX ?? touchStart.current) - touchStart.current; }}
        onTouchEnd={() => {
          if (touchDelta.current < -44) next();
          else if (touchDelta.current > 44) prev();
          touchDelta.current = 0;
        }}
      >
        <div className="gallery-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {GALLERY.map((g, i) => (
            <div key={i} className="gallery-carousel-slide">
              <img src={g.src} alt={g.label} loading="lazy" />
              <div className="gal-label-overlay"><span className="gal-label">{g.label}</span></div>
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-btn-prev" onClick={prev} aria-label="Imagen anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="carousel-btn carousel-btn-next" onClick={next} aria-label="Imagen siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div className="carousel-dots" role="tablist">
          {GALLERY.map((_, i) => (
            <button key={i} role="tab" aria-selected={i === current}
              className={`carousel-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)} aria-label={`Imagen ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOURS & LOCATION ─────────────────────────────────────────────────────────
// PDF pg3:
//   - Phone number moved next to "Dirección" label (inline, same info-group)
//   - "Sitio web" entry removed from both desktop and mobile
function HoursLocation() {
  return (
    <section id="hours" className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Visítanos</span>
          <h2 className="section-title font-cinzel">Horarios & <em>ubicación</em></h2>
          <Ornament />
        </div>
        <div className="hours-grid">
          <div>
            <p className="hours-label">Horario de servicio</p>
            {HOURS_DATA.map((h, i) => (
              <div key={i} className="hours-row" style={i === HOURS_DATA.length - 1 ? { borderBottom: "none" } : {}}>
                <span className="hours-day">{h.day}</span>
                <span className="hours-time font-crimson">{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="hours-label">Dónde encontrarnos</p>

            {/* Dirección */}
            <div className="info-group">
              <p className="info-label">Dirección</p>
              <p className="info-value">
                Calle Emilia Príncipe #1{"\n"}Urb. Madrid, Juncos, PR 00777
              </p>
            </div>

            {/* Teléfono — separate labeled entry below Dirección (PDF pg3 + desktop restore) */}
            <div className="info-group">
              <p className="info-label">Teléfono</p>
              <a href="tel:7877346573" className="info-value">
                (787) 734-6573
              </a>
            </div>

            {/* Sitio web removed */}
          </div>
        </div>
        <div className="map-full map-styled" style={{ marginTop: "3rem", overflow: "hidden", fontSize: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2043.2144033420805!2d-65.92215648291152!3d18.231131583390056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03593bde021911%3A0xd9e10ca67a255969!2s1%20Cll%20Emilia%20Principe%2C%20Juncos%2C%2000777!5e1!3m2!1sen!2spr!4v1776529286409!5m2!1sen!2spr"
            width="100%" height="420"
            style={{ border: 0, display: "block", verticalAlign: "bottom", filter: "saturate(0.55) sepia(0.2)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="El Tenedor — Juncos, PR"
          />
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--dark-bg)", borderTop: "1px solid rgba(255,255,255,.05)", padding: "4.5rem 2.5rem 2.5rem", textAlign: "center" }}>
      <p className="font-script" style={{ fontSize: "2.8rem", color: "var(--dark-text)", letterSpacing: "0.02em", marginBottom: "0.3rem", lineHeight: 1.1 }}>El Tenedor</p>
      <p className="font-crimson" style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--accent-2)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Est. 1974 · Juncos, Puerto Rico</p>
      <div style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, rgba(244, 212, 120, 1), transparent)", margin: "1.5rem auto" }} />
      <p style={{ fontSize: "0.7rem", color: "var(--accent-2)", marginBottom: "0.3rem" }}>Calle Emilia Príncipe #1, Urb. Madrid · Juncos, PR 00777</p>
      <p style={{ fontSize: "0.7rem", color: "var(--accent-2)", marginBottom: "1.8rem" }}>(787) 734-6573</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2.2rem", marginBottom: "2.2rem" }}>
        <a href="https://www.facebook.com/share/18c82624TL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(244, 212, 120, 1)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--dark-text)")}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(244, 212, 120, 1)")}>
          Facebook
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(244, 212, 120, 1)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--dark-text)")}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(244, 212, 120, 1)")}>
          Instagram
        </a>
      </div>
      <p style={{ fontSize: "0.56rem", color: "rgba(200,190,160,.25)", letterSpacing: "0.1em" }}>© {new Date().getFullYear()} El Tenedor · Todos los derechos reservados</p>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
// Scroll-to-top fix: lock html overflow during intro so browser can't
// restore scroll position, then unlock + scroll to top on complete.
export default function ElTenedorPage(): JSX.Element {
  const [introActive, setIntroActive] = useState(true);

  // Lock scroll during intro so browser cannot restore position mid-animation
  useEffect(() => {
    if (introActive) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.scrollTop = 0;
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [introActive]);

  const handleIntroComplete = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setIntroActive(false);
  }, []);

  return (
    <>
      {introActive && <IntroAnimation onComplete={handleIntroComplete} />}
      <Nav />
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