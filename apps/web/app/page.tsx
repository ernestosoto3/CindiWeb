"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════════════
   COPY
═══════════════════════════════════════════════════════════════════ */
const i18n = {
  es: {
    nav: { services: "Servicios", process: "Proceso", templates: "Plantillas", work: "Proyectos", contact: "Contacto", cta: "Agendar Llamada" },
    hero: { eyebrow: "Agencia Web · Puerto Rico", sub: "Sitios y apps a medida para negocios que quieren crecer con claridad y confianza." },
    tagline: "Web premium que convierte.",
    work: { label: "// proyectos" },
    terminal: ["> Sincronizando tokens de diseño...", "> Revalidando caché...", "> Compilando grupos de rutas...", "> Compilación exitosa", "> App lista en localhost:3000"],
  },
  en: {
    nav: { services: "Services", process: "Process", templates: "Templates", work: "Work", contact: "Contact", cta: "Book a Call" },
    hero: { eyebrow: "Web Agency · Puerto Rico", sub: "Custom websites and apps for businesses that want growth with clarity and trust." },
    tagline: "Premium web that converts.",
    work: { label: "// work" },
    terminal: ["> Syncing design tokens...", "> Revalidating cache...", "> Compiling route groups...", "> Build successful", "> App ready on localhost:3000"],
  },
} as const;

type Lang = keyof typeof i18n;

/* ═══════════════════════════════════════════════════════════════════
   THEMES & CONSTANTS
═══════════════════════════════════════════════════════════════════ */
const themes = {
  light: { bg: "#FAFAF7", ink: "#111111", secondary: "#555555", muted: "#8D8D8D", border: "rgba(0,0,0,0.08)", navBg: "rgba(250,250,247,0.97)" },
  dark: { bg: "#0A0A0C", ink: "#EEEEEE", secondary: "#AAAAAA", muted: "#666666", border: "rgba(255,255,255,0.08)", navBg: "rgba(10,10,12,0.97)" },
} as const;

/** Set false before launch — obvious tint so you can spot layout/interaction changes while reviewing. */
const REVIEW_TINTED_BACKGROUND = true;
const reviewSurfaces = {
  light: { bg: "#DDD6FE", navBg: "rgba(221,214,254,0.94)", heroWash: "rgba(139,92,246,0.06)" },
  dark: { bg: "#1A1625", navBg: "rgba(26,22,37,0.94)", heroWash: "rgba(167,139,250,0.08)" },
} as const;

type Theme = keyof typeof themes;

const MONO = "'Space Mono', monospace";
const ACCENT = "#3366FF";
const NAV_H = 64;
const GLIDE_MAX = 52;

const SYN = { kw: "#C678DD", cmt: "#5C6370" };
const TRAFFIC_PLAIN = ["#FF5F56", "#FFBD2E", "#27C93F"] as const;
const TRAFFIC_BORDERED = ["#FF6B4A", "#FFB627", "#2ECDA7"] as const;

/* ═══════════════════════════════════════════════════════════════════
   ASCII ART
═══════════════════════════════════════════════════════════════════ */
const _C = "#C678DD"; const _i1 = "#61AFEF"; const _n = "#ABB2BF";
const _d = "#D19A66"; const _i2 = "#E5C07B"; const _W = "#98C379";
const _e = "#56B6C2"; const _b = "#E06C75";

const ASCII_ROWS: [string, string][][] = [
  [["  ,ad8888ba,   ", _C], ["88  ", _i1], ["              ", _n], ["        88  ", _d], ["88  ", _i2], ["I8,        8        ,8I   ", _W], ["           ", _e], ["88           ", _b]],
  [[" d8\"'    `\"8b  ", _C], ["\"\"  ", _i1], ["              ", _n], ["        88  ", _d], ["\"\"  ", _i2], ["`8b       d8b       d8'   ", _W], ["           ", _e], ["88           ", _b]],
  [["d8'            ", _C], ["    ", _i1], ["              ", _n], ["        88  ", _d], ["    ", _i2], ["\"8,     ,8\"8,     ,8\"    ", _W], ["           ", _e], ["88           ", _b]],
  [["88             ", _C], ["88  ", _i1], ["8b,dPPYba,    ", _n], [",adPPYb,88  ", _d], ["88  ", _i2], ["Y8     8P Y8     8P   ", _W], [",adPPYba,  ", _e], ["88,dPPYba,   ", _b]],
  [["88             ", _C], ["88  ", _i1], ["88P'   `\"8a  ", _n], ["a8\"    `Y88  ", _d], ["88  ", _i2], ["`8b   d8' `8b   d8'  ", _W], ["a8P_____88  ", _e], ["88P'    \"8a  ", _b]],
  [["Y8,            ", _C], ["88  ", _i1], ["88       88  ", _n], ["8b       88  ", _d], ["88  ", _i2], ["`8a a8'   `8a a8'   ", _W], ["8PP\"\"\"\"\"\"\"  ", _e], ["88       d8  ", _b]],
  [[" Y8a.    .a8P  ", _C], ["88  ", _i1], ["88       88  ", _n], ["\"8a,   ,d88  ", _d], ["88  ", _i2], [" `8a8'     `8a8'    ", _W], ["\"8b,   ,aa  ", _e], ["88b,   ,a8\"  ", _b]],
  [["  `\"Y8888Y\"'   ", _C], ["88  ", _i1], ["88       88   ", _n], ["`\"8bbdP\"Y8  ", _d], ["88  ", _i2], ["  `8'       `8'      ", _W], ["`\"Ybbd8\"'  ", _e], ["8Y\"Ybbd8\"'   ", _b]],
];

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
type Pt = { x: number; y: number };
type Velocity = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function resolveInset(value: unknown, total: number) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    if (value.endsWith("%")) return (parseFloat(value) / 100) * total;
    if (value.endsWith("px")) return parseFloat(value);
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
}

function resolveInitialBrowserPosition(
  style: CSSProperties,
  sectionRect: DOMRect,
  width: number,
  height: number
): Pt {
  const hasLeft = style.left !== undefined;
  const hasRight = style.right !== undefined;
  const hasTop = style.top !== undefined;
  const hasBottom = style.bottom !== undefined;

  const x = hasLeft
    ? resolveInset(style.left, sectionRect.width)
    : hasRight
      ? sectionRect.width - width - resolveInset(style.right, sectionRect.width)
      : 0;

  const y = hasTop
    ? resolveInset(style.top, sectionRect.height)
    : hasBottom
      ? sectionRect.height - height - resolveInset(style.bottom, sectionRect.height)
      : 0;

  const headerMinY = Math.max(0, NAV_H - sectionRect.top);

  return {
    x: clamp(x, 0, Math.max(0, sectionRect.width - width)),
    y: clamp(y, headerMinY, Math.max(headerMinY, sectionRect.height - height)),
  };
}

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════════════════════════ */
function TrafficDots({
  colors,
  size = 8,
  bordered = false,
}: {
  colors: readonly string[];
  size?: number;
  bordered?: boolean;
}) {
  return (
    <>
      {colors.map((c, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: c,
            ...(bordered ? { border: "1.5px solid #111" } : {}),
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRAWABLE HERO SVG
═══════════════════════════════════════════════════════════════════ */
function DrawableHero({
  color,
  animate,
  onComplete,
  onMeasure,
}: {
  color: string;
  animate: boolean;
  onComplete?: () => void;
  onMeasure?: (textWidth: number) => void;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const [ready, setReady] = useState(!animate);
  const [length, setLength] = useState(5000);

  useEffect(() => {
    if (!animate) return;

    const el = textRef.current;
    if (!el) return;

    const run = () => {
      try {
        const tw = el.getComputedTextLength();
        onMeasure?.(tw);
        setLength(Math.max(tw * 6, 5000));
      } catch {
        setLength(5000);
      }
      window.setTimeout(() => setReady(true), 100);
    };

    if (document.fonts) {
      document.fonts.ready.then(run);
    } else {
      window.setTimeout(run, 400);
    }
  }, [animate]);

  useEffect(() => {
    if (!animate || !ready || !onComplete) return;
    const t = window.setTimeout(onComplete, INTRO_DRAW_MS);
    return () => window.clearTimeout(t);
  }, [animate, ready, onComplete]);

  const base: CSSProperties = {
    fontFamily: MONO,
    fontSize: "100px",
    fontWeight: 700,
    letterSpacing: "-3px",
  };

  if (animate) {
    return (
      <svg
        viewBox="0 0 820 110"
        style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
        aria-label="CINDIWEB"
      >
        <text
          ref={textRef}
          x="410"
          y="88"
          textAnchor="middle"
          style={{
            ...base,
            fill: "none",
            stroke: color,
            strokeWidth: 1.8,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeDasharray: length,
            strokeDashoffset: ready ? 0 : length,
            transition: ready ? "stroke-dashoffset 2.8s cubic-bezier(0.65,0,0.35,1)" : "none",
          }}
        >
          CINDIWEB
        </text>

        <text
          x="410"
          y="88"
          textAnchor="middle"
          style={{
            ...base,
            fill: color,
            opacity: ready ? 1 : 0,
            transition: ready ? "opacity 0.9s ease 2.2s" : "none",
          }}
        >
          CINDIWEB
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 820 110"
      style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
      aria-label="CINDIWEB"
    >
      <text x="0" y="88" style={{ ...base, fill: color }}>
        CINDIWEB
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TYPEWRITER LINE
═══════════════════════════════════════════════════════════════════ */
function TypewriterLine({
  text,
  color,
  startDelay,
  charDelay = 42,
  onDone,
}: {
  text: string;
  color: string;
  startDelay: number;
  charDelay?: number;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay, text]);

  useEffect(() => {
    if (!started) return;

    if (displayed.length >= text.length) {
      const doneTimer = window.setTimeout(() => onDoneRef.current?.(), 120);
      return () => window.clearTimeout(doneTimer);
    }

    const t = window.setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, charDelay);

    return () => window.clearTimeout(t);
  }, [started, displayed, text, charDelay]);

  return (
    <div style={{ color, marginBottom: 9, whiteSpace: "pre-wrap", minHeight: "1.1em" }}>
      {displayed}
      {started && displayed.length < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: "0.85em",
            background: color,
            verticalAlign: "middle",
            animation: "blink 0.55s step-end infinite",
            marginLeft: 2,
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TERMINAL SHAPE
═══════════════════════════════════════════════════════════════════ */
function TerminalShape({
  active,
  lines,
  onSequenceDone,
}: {
  active: boolean;
  lines: readonly string[];
  onSequenceDone?: () => void;
}) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [showAscii, setShowAscii] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setCompleted([]);
      setShowAscii(false);
      firedRef.current = false;
      setTypingStarted(false);
      return;
    }

    const t = window.setTimeout(() => setTypingStarted(true), 140);
    return () => window.clearTimeout(t);
  }, [active]);

  const getDelay = (i: number) => {
    let d = 180;
    for (let j = 0; j < i; j++) {
      const prevLine = lines[j] ?? "";
      d += prevLine.length * 42 + 320;
    }
    return d;
  };

  useEffect(() => {
    if (completed.length < lines.length) return;
    const t = window.setTimeout(() => setShowAscii(true), 500);
    return () => window.clearTimeout(t);
  }, [completed, lines.length]);

  useEffect(() => {
    if (!showAscii || firedRef.current) return;
    firedRef.current = true;
    const t = window.setTimeout(() => onSequenceDone?.(), 900);
    return () => window.clearTimeout(t);
  }, [showAscii, onSequenceDone]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.97)",
        backdropFilter: "blur(8px)",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(87,224,255,0.14)",
        boxShadow: "0 26px 64px rgba(0,0,0,0.28)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 38,
          flexShrink: 0,
          background: "linear-gradient(90deg,rgba(17,54,76,0.72),rgba(10,26,40,0.86))",
          borderBottom: "1px solid rgba(87,224,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_PLAIN} size={8} />
        </div>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "0.58rem",
            color: "rgba(214,236,255,0.62)",
            letterSpacing: "0.08em",
          }}
        >
          Terminal
        </span>
        <div style={{ width: 34 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: "18px 18px 20px",
          fontFamily: MONO,
          fontSize: "0.6rem",
          lineHeight: 1.6,
          color: "#D6ECFF",
          overflowY: "auto",
        }}
      >
        {!active && (
          <div style={{ marginTop: 4 }}>
            <span style={{ color: "#9BE37A" }}>$ </span>
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 13,
                background: "#9BE37A",
                animation: "blink 1s step-end infinite",
                verticalAlign: "middle",
              }}
            />
          </div>
        )}

        {active && (
          <>
            <div style={{ marginBottom: 10, color: "#9BE37A" }}>
              <span>$ </span>
              {!typingStarted && (
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 13,
                    background: "#9BE37A",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>

            {lines.map((line, i) => (
              <TypewriterLine
                key={`${i}-${line}`}
                text={line}
                color={i === lines.length - 1 ? "#8FE388" : i === lines.length - 2 ? "#5DB7FF" : "#F0B35E"}
                startDelay={getDelay(i)}
                charDelay={42}
                onDone={() => setCompleted((p) => (p.includes(i) ? p : [...p, i]))}
              />
            ))}

            {showAscii && (
              <div style={{ marginTop: 18, opacity: 0, animation: "fadeUpSoft 0.65s ease forwards" }}>
                {ASCII_ROWS.map((row, ri) => (
                  <div
                    key={ri}
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      lineHeight: 1.15,
                      whiteSpace: "pre",
                      fontFamily: MONO,
                      fontSize: "clamp(0.19rem,0.28vw,0.36rem)",
                    }}
                  >
                    {row.map(([text, col], ti) => (
                      <span key={ti} style={{ color: col }}>
                        {text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {showAscii && (
              <div style={{ marginTop: 14, opacity: 0, animation: "fadeUpSoft 0.3s ease 0.6s forwards" }}>
                <span style={{ color: "#9BE37A" }}>$ </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 13,
                    background: "#9BE37A",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "middle",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BROWSER TEMPLATES
═══════════════════════════════════════════════════════════════════ */
function BrowserRestaurant({ lang }: { lang: Lang }) {
  const copy = {
    es: { tag: "Alta Cocina · Centro", desc: "Cocina europea moderna.\nExperiencia de lujo.", cta: "Reservar", nav: "Reserva" },
    en: { tag: "Fine Dining · Downtown", desc: "Modern European cuisine.\nQuiet luxury feel.", cta: "Reserve", nav: "Reserve" },
  }[lang];

  return (
    <div style={{ width: "100%", height: "100%", background: "#FAF7F3", borderRadius: 18, border: "2px solid #111", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.06)" }}>
      <div style={{ height: 30, background: "#F2ECE3", borderBottom: "2px solid #111", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_BORDERED} size={7} bordered />
        </div>
        <div style={{ width: 118, height: 11, borderRadius: 999, background: "rgba(0,0,0,0.06)" }} />
      </div>
      <div style={{ position: "relative", height: "calc(100% - 30px)", background: "linear-gradient(180deg,rgba(90,50,45,0.82) 0%,rgba(90,50,45,0.58) 42%,rgba(250,247,243,1) 100%)" }}>
        <div style={{ position: "relative", zIndex: 1, padding: 18, color: "#FAF7F3" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, fontFamily: MONO, fontSize: "0.48rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,247,243,0.86)" }}>
            <span>Sotto Voce</span>
            <span>{copy.nav}</span>
          </div>
          <div style={{ marginTop: 22 }}>
            <p style={{ fontFamily: MONO, fontSize: "0.44rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#D9A299", marginBottom: 8 }}>{copy.tag}</p>
            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 0.95, color: "#FAF7F3" }}>
              Sotto
              <br />
              Voce
            </h3>
            <p style={{ marginTop: 10, marginBottom: 12, color: "rgba(250,247,243,0.78)", fontSize: "0.5rem", maxWidth: 118, lineHeight: 1.45 }}>{copy.desc}</p>
            <div style={{ display: "inline-block", padding: "6px 11px", border: "1px solid #D9A299", fontFamily: MONO, fontSize: "0.42rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#D9A299" }}>{copy.cta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserSaaS({ lang }: { lang: Lang }) {
  const copy = {
    es: { badge: "AHORA EN BETA", h1: "Entrega más", h2: "rápido,", h3: "sin el caos.", sub: "La plataforma todo-en-uno para equipos que se mueven rápido.", cta: "Empieza gratis", note: "Sin tarjeta →", nav: ["Precios", "Docs", "Blog"], signup: "Registro" },
    en: { badge: "NOW IN BETA", h1: "Ship", h2: "faster,", h3: "without the mess.", sub: "The all-in-one platform for teams who move fast.", cta: "Start free", note: "No credit card →", nav: ["Pricing", "Docs", "Blog"], signup: "Sign up" },
  }[lang];

  return (
    <div style={{ width: "100%", height: "100%", background: "#0F0F1A", borderRadius: 18, border: "1px solid rgba(99,102,241,0.3)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
      <div style={{ height: 30, background: "#1A1A2E", borderBottom: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_PLAIN} size={7} />
        </div>
        <div style={{ width: 118, height: 11, borderRadius: 999, background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div style={{ padding: 18, height: "calc(100% - 30px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.52rem", fontWeight: 700, color: "#818CF8" }}>Flowlane</span>
          <div style={{ display: "flex", gap: 8 }}>
            {copy.nav.map((l: string) => (
              <span key={l} style={{ fontFamily: MONO, fontSize: "0.36rem", color: "rgba(255,255,255,0.4)" }}>
                {l}
              </span>
            ))}
            <span style={{ fontFamily: MONO, fontSize: "0.36rem", color: "#818CF8", border: "1px solid rgba(129,140,248,0.4)", padding: "2px 6px", borderRadius: 4 }}>{copy.signup}</span>
          </div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 999, padding: "3px 10px", marginBottom: 14 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#818CF8" }} />
          <span style={{ fontFamily: MONO, fontSize: "0.34rem", color: "#818CF8", letterSpacing: "0.06em" }}>{copy.badge}</span>
        </div>
        <h2 style={{ margin: "0 0 10px", fontSize: "1.05rem", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.04em", lineHeight: 1.1, maxWidth: 200 }}>
          <span style={{ color: "#818CF8" }}>{copy.h1}</span>
          <br />
          {copy.h2}
          <br />
          {copy.h3}
        </h2>
        <p style={{ fontSize: "0.44rem", color: "rgba(255,255,255,0.45)", maxWidth: 180, lineHeight: 1.5, marginBottom: 14 }}>{copy.sub}</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: "#6366F1", borderRadius: 6, padding: "5px 14px", fontFamily: MONO, fontSize: "0.4rem", color: "#fff", fontWeight: 700 }}>{copy.cta}</div>
          <span style={{ fontSize: "0.37rem", color: "rgba(255,255,255,0.35)" }}>{copy.note}</span>
        </div>
      </div>
    </div>
  );
}

function BrowserEcommerce({ lang }: { lang: Lang }) {
  const products = lang === "es"
    ? [
        { name: "Suéter Merino", price: "$128", color: "#C8B8A2" },
        { name: "Camisa Lino", price: "$96", color: "#A8B8C0" },
        { name: "Pantalón Slim", price: "$114", color: "#B8C4AA" },
        { name: "Tote Canvas", price: "$54", color: "#D4C0B4" },
      ]
    : [
        { name: "Merino Crew", price: "$128", color: "#C8B8A2" },
        { name: "Linen Shirt", price: "$96", color: "#A8B8C0" },
        { name: "Slim Chino", price: "$114", color: "#B8C4AA" },
        { name: "Canvas Tote", price: "$54", color: "#D4C0B4" },
      ];

  const nav = lang === "es" ? ["Mujer", "Hombre", "Rebajas"] : ["Women", "Men", "Sale"];

  return (
    <div style={{ width: "100%", height: "100%", background: "#FDFCFA", borderRadius: 18, border: "1px solid rgba(0,0,0,0.1)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.05)" }}>
      <div style={{ height: 30, background: "#F5F0EA", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_BORDERED} size={7} bordered />
        </div>
        <div style={{ width: 90, height: 9, borderRadius: 999, background: "rgba(0,0,0,0.07)" }} />
      </div>
      <div style={{ padding: "12px 14px", height: "calc(100% - 30px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700, color: "#1A1A1A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Atelier</span>
          <div style={{ display: "flex", gap: 8 }}>
            {nav.map((l) => (
              <span key={l} style={{ fontSize: "0.38rem", color: "#666" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {products.map((p, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10 }}>
              <div style={{ height: 52, background: p.color, borderRadius: "10px 10px 0 0", opacity: 0.85 }} />
              <div style={{ padding: "6px 8px" }}>
                <div style={{ fontSize: "0.4rem", color: "#222", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: "0.38rem", color: "#888" }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrowserPortfolio({ lang }: { lang: Lang }) {
  const tags = lang === "es" ? ["Marca", "Web", "Motion"] : ["Branding", "Web", "Motion"];
  const headline = lang === "es" ? ["Dirección", "Creativa &", "Diseño de Marca"] : ["Creative", "Direction &", "Brand Design"];
  const link = lang === "es" ? "Proyectos →" : "Selected Work →";

  return (
    <div style={{ width: "100%", height: "100%", background: "#0C0C0C", borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
      <div style={{ height: 30, background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_PLAIN} size={7} />
        </div>
        <div style={{ width: 90, height: 9, borderRadius: 999, background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div style={{ padding: 18, height: "calc(100% - 30px)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.52rem", color: "rgba(255,255,255,0.9)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Maren</span>
          <span style={{ fontSize: "0.38rem", color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 1 }}>{link}</span>
        </div>
        <div style={{ fontSize: "3.2rem", fontWeight: 800, color: "rgba(255,255,255,0.07)", letterSpacing: "-0.06em", lineHeight: 0.9, marginBottom: 14 }}>24</div>
        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F0F0F0", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 180, marginBottom: 10 }}>
          {headline.map((l, i) => (
            <span key={i}>
              {l}
              <br />
            </span>
          ))}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontSize: "0.35rem", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", padding: "2px 7px", borderRadius: 999 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrowserBlog({ lang }: { lang: Lang }) {
  const copy = {
    es: {
      vol: "Vol. 12 · Abr 2025",
      tag: "Diseño · 8 min",
      title: ["El Caso Contra", "el Diseño Limpio"],
      excerpt: "Por qué las interfaces más memorables abrazan la fricción productiva y la tensión visual.",
      posts: ["La IA No Salvará una Mala Estrategia", "Tipografía como Identidad"],
    },
    en: {
      vol: "Vol. 12 · Apr 2025",
      tag: "Design · 8 min read",
      title: ["The Case Against", "Clean Design"],
      excerpt: "Why the most memorable interfaces embrace productive friction and visual tension.",
      posts: ["AI Tools Won't Save Bad Strategy", "Type as Identity"],
    },
  }[lang];

  return (
    <div style={{ width: "100%", height: "100%", background: "#FFFEF9", borderRadius: 18, border: "1px solid rgba(0,0,0,0.09)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.04)" }}>
      <div style={{ height: 30, background: "#F9F7F0", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <TrafficDots colors={TRAFFIC_BORDERED} size={7} bordered />
        </div>
        <div style={{ width: 90, height: 9, borderRadius: 999, background: "rgba(0,0,0,0.06)" }} />
      </div>
      <div style={{ padding: "12px 16px", height: "calc(100% - 30px)" }}>
        <div style={{ borderBottom: "2px solid #111", paddingBottom: 8, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 900, letterSpacing: "-0.04em", color: "#111" }}>THE SIGNAL</span>
          <span style={{ fontSize: "0.35rem", color: "#888", fontFamily: MONO }}>{copy.vol}</span>
        </div>
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 10, marginBottom: 8 }}>
          <span style={{ fontSize: "0.35rem", color: "#888", fontFamily: MONO, textTransform: "uppercase", letterSpacing: "0.1em" }}>{copy.tag}</span>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 4, marginBottom: 5 }}>
            {copy.title.map((l, i) => (
              <span key={i}>
                {l}
                <br />
              </span>
            ))}
          </h3>
          <p style={{ fontSize: "0.38rem", color: "#666", lineHeight: 1.5 }}>{copy.excerpt}</p>
        </div>
        {copy.posts.map((title, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: "0.55rem", fontWeight: 800, color: "rgba(0,0,0,0.15)", fontFamily: MONO }}>
              0{i + 2}
            </span>
            <span style={{ fontSize: "0.42rem", color: "#333", fontWeight: 600 }}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING BROWSER
═══════════════════════════════════════════════════════════════════ */
function FloatingBrowser({
  id,
  children,
  visible,
  initialStyle,
  delay,
  terminalRef,
  isActive,
  initialVelocity,
  onActivate,
  onRelease,
}: {
  id: number;
  children: React.ReactNode;
  visible: boolean;
  initialStyle: CSSProperties;
  delay: string;
  terminalRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  initialVelocity: Velocity;
  onActivate: (id: number) => void;
  onRelease: () => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  const width = Number((initialStyle as { width?: number }).width ?? 240);
  const height = Number((initialStyle as { height?: number }).height ?? 260);
  const zi = Math.min(Number((initialStyle as { zIndex?: number }).zIndex ?? 3), 5);

  const [pos, setPos] = useState<Pt | null>(null);
  const posRef = useRef<Pt | null>(null);

  const [dragging, setDragging] = useState(false);
  const [livePos, setLivePos] = useState<Pt | null>(null);
  const dragOffset = useRef<Pt | null>(null);

  const [entered, setEntered] = useState(false);
  const [entranceDelta, setEntranceDelta] = useState<Pt>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const driftBlendRef = useRef(1);

  const velRef = useRef<Velocity>(initialVelocity);

  const getSectionRect = useCallback(() => {
    return (elRef.current?.closest("section") as HTMLElement | null)?.getBoundingClientRect() ?? null;
  }, []);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    velRef.current = initialVelocity;
  }, [initialVelocity.x, initialVelocity.y]);

  useEffect(() => {
    if (!visible || posRef.current) return;

    const sectionRect = getSectionRect();
    if (!sectionRect) return;

    const target = resolveInitialBrowserPosition(initialStyle, sectionRect, width, height);
    setPos(target);
    posRef.current = target;

    const delayMs = parseFloat(delay) * 1000;
    let timeoutId: number | null = null;
    let r1 = 0;
    let r2 = 0;

    if (terminalRef.current) {
      const tR = terminalRef.current.getBoundingClientRect();
      setEntranceDelta({
        x: tR.left + tR.width / 2 - (sectionRect.left + target.x + width / 2),
        y: tR.top + tR.height / 2 - (sectionRect.top + target.y + height / 2),
      });
    } else {
      setEntranceDelta({ x: 0, y: 56 });
    }

    timeoutId = window.setTimeout(() => {
      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setEntered(true));
      });
    }, delayMs);

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [visible, delay, getSectionRect, height, initialStyle, terminalRef, width]);

  useEffect(() => {
    if (!visible || !entered || dragging || isActive || !posRef.current) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.6667, 2);
      last = now;

      const sectionRect = getSectionRect();
      const current = posRef.current;
      if (!sectionRect || !current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const headerMinY = Math.max(0, NAV_H - sectionRect.top);
      const minX = 0;
      const maxX = Math.max(0, sectionRect.width - width);
      const minY = headerMinY;
      const maxY = Math.max(minY, sectionRect.height - height);

      const driftTarget = hoveredRef.current ? 0 : 1;
      driftBlendRef.current += (driftTarget - driftBlendRef.current) * 0.14;
      const drift = driftBlendRef.current * driftBlendRef.current;

      let nextX = current.x + velRef.current.x * dt * drift;
      let nextY = current.y + velRef.current.y * dt * drift;

      let nextVX = velRef.current.x;
      let nextVY = velRef.current.y;

      if (nextX <= minX) {
        nextX = minX;
        nextVX = Math.abs(nextVX);
      } else if (nextX >= maxX) {
        nextX = maxX;
        nextVX = -Math.abs(nextVX);
      }

      if (nextY <= minY) {
        nextY = minY;
        nextVY = Math.abs(nextVY);
      } else if (nextY >= maxY) {
        nextY = maxY;
        nextVY = -Math.abs(nextVY);
      }

      velRef.current = { x: nextVX, y: nextVY };

      const next = { x: nextX, y: nextY };
      posRef.current = next;
      setPos(next);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dragging, entered, getSectionRect, height, isActive, visible, width]);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    if (!visible) return;

    const onResize = () => {
      const sectionRect = getSectionRect();
      const current = posRef.current;
      if (!sectionRect || !current) return;

      const headerMinY = Math.max(0, NAV_H - sectionRect.top);
      const next = {
        x: clamp(current.x, 0, Math.max(0, sectionRect.width - width)),
        y: clamp(current.y, headerMinY, Math.max(headerMinY, sectionRect.height - height)),
      };

      posRef.current = next;
      setPos(next);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getSectionRect, height, visible, width]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!posRef.current) return;

    const sectionRect = getSectionRect();
    if (!sectionRect) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    onActivate(id);
    setDragging(true);

    const currentViewportPos = {
      x: sectionRect.left + posRef.current.x,
      y: sectionRect.top + posRef.current.y,
    };

    dragOffset.current = {
      x: e.clientX - currentViewportPos.x,
      y: e.clientY - currentViewportPos.y,
    };

    setLivePos(currentViewportPos);
  }, [getSectionRect, id, onActivate]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !dragOffset.current) return;

    const sectionRect = getSectionRect();
    if (!sectionRect) return;

    const minViewportX = sectionRect.left;
    const maxViewportX = sectionRect.right - width;
    const minViewportY = Math.max(sectionRect.top, NAV_H);
    const maxViewportY = sectionRect.bottom - height;

    const nextX = clamp(e.clientX - dragOffset.current.x, minViewportX, maxViewportX);
    const nextY = clamp(e.clientY - dragOffset.current.y, minViewportY, maxViewportY);

    setLivePos({ x: nextX, y: nextY });
  }, [dragging, getSectionRect, height, width]);

  const endDrag = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const sectionRect = getSectionRect();
    if (sectionRect && livePos) {
      const headerMinY = Math.max(0, NAV_H - sectionRect.top);

      const next = {
        x: clamp(livePos.x - sectionRect.left, 0, Math.max(0, sectionRect.width - width)),
        y: clamp(livePos.y - sectionRect.top, headerMinY, Math.max(headerMinY, sectionRect.height - height)),
      };

      posRef.current = next;
      setPos(next);
    }

    setDragging(false);
    setLivePos(null);
    dragOffset.current = null;
    onRelease();
  }, [dragging, getSectionRect, height, livePos, onRelease, width]);

  if (!pos && !livePos) {
    return (
      <div
        ref={elRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    );
  }

  const renderStyle: CSSProperties = dragging && livePos
    ? {
        position: "fixed",
        left: livePos.x,
        top: livePos.y,
        width,
        height,
        zIndex: 8,
      }
    : {
        position: "absolute",
        left: pos?.x ?? 0,
        top: pos?.y ?? 0,
        width,
        height,
        zIndex: zi,
      };

  const cardLift = hovered && !dragging && entered ? "translate3d(0,-8px,0) scale(1.018)" : "translate3d(0,0,0) scale(1)";
  const cardShadow = hovered && !dragging ? `0 0 0 2px rgba(51,102,255,0.42), 0 20px 48px rgba(51,102,255,0.14)` : "none";

  return (
    <div
      ref={elRef}
      data-cursor="active"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        ...renderStyle,
        opacity: visible ? 1 : 0,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
        willChange: "left, top, transform, opacity",
        transform: !dragging && !entered ? `translate3d(${entranceDelta.x}px, ${entranceDelta.y}px, 0) scale(0.66)` : "translate3d(0,0,0) scale(1)",
        transition: !dragging && !entered
          ? "transform 0.72s cubic-bezier(0.22,1,0.36,1), opacity 0.46s ease"
          : dragging
            ? "none"
            : "opacity 0.28s ease, transform 0.42s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 18,
          transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)",
          transform: cardLift,
          boxShadow: cardShadow,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BROWSER LAYOUT CONFIG
═══════════════════════════════════════════════════════════════════ */
const BROWSER_CONFIGS: {
  type: "restaurant" | "saas" | "ecommerce" | "portfolio" | "blog";
  style: CSSProperties;
  delay: string;
  velocity: Velocity;
}[] = [
  { type: "restaurant", style: { top: GLIDE_MAX + 2, right: "4.5%", width: 248, height: 292, zIndex: 3 }, delay: "0s", velocity: { x: -0.68, y: 0.54 } },
  { type: "portfolio", style: { bottom: "2.5%", left: "54%", width: 234, height: 258, zIndex: 2 }, delay: "0.16s", velocity: { x: 0.62, y: -0.5 } },
  { type: "ecommerce", style: { bottom: "2.5%", right: "6%", width: 248, height: 268, zIndex: 3 }, delay: "0.3s", velocity: { x: -0.6, y: -0.56 } },
  { type: "blog", style: { bottom: "6%", left: "70%", width: 228, height: 252, zIndex: 2 }, delay: "0.44s", velocity: { x: -0.5, y: 0.62 } },
  { type: "saas", style: { top: GLIDE_MAX + 214, right: "4%", width: 238, height: 268, zIndex: 2 }, delay: "0.58s", velocity: { x: -0.7, y: 0.48 } },
];

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
const NAV_LINKS = ["services", "process", "templates", "work", "contact"] as const;
type LogoPhase = "draw" | "settle" | "done";
type TerminalPhase = "hidden" | "entering" | "visible" | "exiting";
const INTRO_DRAW_MS = 3100;
const INTRO_SETTLE_MS = 700;
const HERO_REVEAL_DELAY_MS = 340;
const TERMINAL_DELAY_MS = 150;

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("light");

  const [logoPhase, setLogoPhase] = useState<LogoPhase>("draw");
  const [introDone, setIntroDone] = useState(false);

  const [terminalPhase, setTerminalPhase] = useState<TerminalPhase>("hidden");
  const [terminalStarted, setTerminalStarted] = useState(false);

  const [browsersVisible, setBrowsersVisible] = useState(false);
  const [activeBrowserId, setActiveBrowserId] = useState(-1);
  const [textWidth, setTextWidth] = useState(460);
  const [heroVisible, setHeroVisible] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorSmoothRef = useRef({ x: 0, y: 0 });
  const cursorRafRef = useRef(0);
  const [cursorMotionOk, setCursorMotionOk] = useState(true);

  const terminalRef = useRef<HTMLDivElement>(null);
  const logoAnchorRef = useRef<HTMLDivElement>(null);

  const anchorRectRef = useRef<DOMRect | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const measureAnchor = useCallback(() => {
    if (!logoAnchorRef.current) return;
    const r = logoAnchorRef.current.getBoundingClientRect();
    anchorRectRef.current = r;
    setAnchorRect(r);
  }, []);

  useEffect(() => {
    measureAnchor();
    window.addEventListener("resize", measureAnchor);
    return () => window.removeEventListener("resize", measureAnchor);
  }, [measureAnchor]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCursorMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;
    const show = introDone && cursorMotionOk;
    ring.style.opacity = show ? "1" : "0";
    dot.style.opacity = show ? "1" : "0";
  }, [introDone, cursorMotionOk]);

  useEffect(() => {
    if (!introDone || !cursorMotionOk) return;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const onMove = (e: MouseEvent) => {
      cursorTargetRef.current = { x: e.clientX, y: e.clientY };
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const active = !!under?.closest('[data-cursor="active"]');
      ring.classList.toggle("cursor-ring--active", active);
      dot.classList.toggle("cursor-dot--active", active);

      const hr = heroSectionRef.current;
      if (hr) {
        const r = hr.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          const px = ((e.clientX - r.left) / r.width) * 100;
          const py = ((e.clientY - r.top) / r.height) * 100;
          hr.style.setProperty("--hx", `${px}%`);
          hr.style.setProperty("--hy", `${py}%`);
        }
      }
    };

    const tick = () => {
      const target = cursorTargetRef.current;
      const s = cursorSmoothRef.current;
      s.x += (target.x - s.x) * 0.16;
      s.y += (target.y - s.y) * 0.16;
      ring.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      cursorRafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    cursorRafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(cursorRafRef.current);
    };
  }, [introDone, cursorMotionOk]);

  const handleDrawComplete = useCallback(() => {
    measureAnchor();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLogoPhase("settle");
      });
    });

    const t1 = window.setTimeout(() => setHeroVisible(true), HERO_REVEAL_DELAY_MS);
    const t2 = window.setTimeout(() => {
      setLogoPhase("done");
      setIntroDone(true);
    }, INTRO_SETTLE_MS);

    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [measureAnchor]);

  useEffect(() => {
    if (!introDone) return;

    const t = window.setTimeout(() => {
      setTerminalPhase("entering");
    }, TERMINAL_DELAY_MS);

    return () => window.clearTimeout(t);
  }, [introDone]);

  const handleSequenceDone = useCallback(() => {
    setBrowsersVisible(true);

    const t = window.setTimeout(() => {
      setTerminalStarted(false);
      setTerminalPhase("exiting");
    }, 5000);

    return () => window.clearTimeout(t);
  }, []);

  const handleBrowserActivate = useCallback((id: number) => {
    setActiveBrowserId(id);
  }, []);

  const t = i18n[lang];
  const c = themes[theme];
  const dk = theme === "dark";
  const review = REVIEW_TINTED_BACKGROUND ? reviewSurfaces[theme] : null;
  const pageBg = review?.bg ?? c.bg;
  const navBgLive = review?.navBg ?? c.navBg;
  const heroWash = review?.heroWash ?? "rgba(51,102,255,0.035)";

  const overlayWidth = anchorRect
  ? anchorRect.width
  : Math.min(820, typeof window !== "undefined" ? window.innerWidth - 80 : 820);

const introLogoScale = typeof window !== "undefined"
  ? window.innerWidth < 768
    ? 1.35
    : 1.9
  : 1.9;

// Outer div: translate only. Inner div: scale only.
// Separating them lets scale complete early (400ms) so the final 500ms of motion
// is a correctly-sized logo gliding to rest — no late-stage compression.
const overlayOuterStyle: CSSProperties = (() => {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const ar = anchorRectRef.current;

  if (logoPhase === "draw") {
    if (!ar) {
      return {
        position: "fixed", left: "50%", top: "50%",
        width: overlayWidth, display: "block",
        transform: "translate(-50%, -50%)",
        transformOrigin: "center center",
        transition: "none",
        zIndex: 50, pointerEvents: "none", opacity: 1,
      };
    }
    const svgScale = ar.width / 820;
    // tx/ty center the text baseline (SVG y=88) at screen center.
    const tx = vw / 2 - ar.left - ar.width / 2;
    const ty = vh / 2 - ar.top - 88 * svgScale;
    return {
      position: "fixed", left: ar.left, top: ar.top, width: ar.width, display: "block",
      transform: `translate(${tx}px, ${ty}px)`,
      transformOrigin: "top left",
      transition: "none",
      zIndex: 50, pointerEvents: "none", opacity: 1,
    };
  }

  if (!ar) {
    return {
      position: "fixed", left: "50%", top: "50%",
      width: overlayWidth, display: "block",
      transform: "translate(-50%, -50%)",
      transformOrigin: "center center",
      transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)",
      zIndex: 50, pointerEvents: "none", opacity: 1,
    };
  }

  const svgScale = ar.width / 820;
  // textOffset in CSS pixels: how far to shift left so SVG-centered text aligns with x=0 static.
  const textWidthPx = textWidth * svgScale;
  const tx = textWidthPx / 2 - ar.width / 2;
  return {
    position: "fixed", left: ar.left, top: ar.top, width: ar.width, display: "block",
    transform: `translate(${tx}px, 0px)`,
    transformOrigin: "top left",
    transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)",
    zIndex: 50, pointerEvents: "none", opacity: 1,
  };
})();

// Inner div scales around the text baseline (y=88/110 ≈ 80% of SVG height).
// Scale completes in 400ms; the text reaches final size before the translate lands.
const overlayInnerStyle: CSSProperties = {
  transform: logoPhase === "draw" ? `scale(${introLogoScale})` : "scale(1)",
  transformOrigin: "50% 80%",
  transition: logoPhase === "settle" ? "transform 300ms cubic-bezier(0.33,1,0.68,1)" : "none",
};

  const terminalBaseStyle: CSSProperties = {
    position: "absolute",
    top: "20%",
    right: "11%",
    width: 398,
    height: "52vh",
    zIndex: 8,
    pointerEvents: terminalPhase === "hidden" ? "none" : "auto",
    transition: "filter 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
    borderRadius: 20,
  };

  const terminalStyle: CSSProperties =
    terminalPhase === "entering"
      ? {
          ...terminalBaseStyle,
          transform: "translate3d(0, 110%, 0)",
          opacity: 0,
          animation: "terminalPopUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards",
        }
      : terminalPhase === "visible"
        ? {
            ...terminalBaseStyle,
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
          }
        : terminalPhase === "exiting"
          ? {
              ...terminalBaseStyle,
              transform: "translate3d(0, 0, 0)",
              opacity: 1,
              animation: "terminalPopDown 0.48s cubic-bezier(0.55,0,1,0.45) forwards",
            }
          : {
              ...terminalBaseStyle,
              transform: "translate3d(0, 110%, 0)",
              opacity: 0,
            };

  return (
    <div
      className="home-root"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: pageBg,
        color: c.ink,
        overflowX: "hidden",
        minHeight: "100vh",
        transition: "background 0.5s, color 0.5s",
        cursor: introDone && cursorMotionOk ? "none" : "auto",
      }}
    >
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden />
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }

        @keyframes fadeUpSoft {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes terminalPopUp {
          from {
            transform: translate3d(0, 110%, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0%, 0);
            opacity: 1;
          }
        }

        @keyframes terminalPopDown {
          from {
            transform: translate3d(0, 0%, 0);
            opacity: 1;
          }
          to {
            transform: translate3d(0, 110%, 0);
            opacity: 0;
          }
        }

        @keyframes scrollPulse {
          0%   {transform:scaleY(0);transform-origin:top;}
          50%  {transform:scaleY(1);transform-origin:top;}
          51%  {transform:scaleY(1);transform-origin:bottom;}
          100% {transform:scaleY(0);transform-origin:bottom;}
        }

        .cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          width: 44px;
          height: 44px;
          margin: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(51,102,255,0.42);
          pointer-events: none;
          z-index: 10050;
          opacity: 0;
          will-change: transform, width, height, border-color;
          transition: width 0.38s cubic-bezier(0.22,1,0.36,1), height 0.38s cubic-bezier(0.22,1,0.36,1),
            border-color 0.38s ease, opacity 0.25s ease;
        }
        .cursor-ring.cursor-ring--active {
          width: 58px;
          height: 58px;
          border-color: rgba(51,102,255,0.78);
        }
        .cursor-dot {
          position: fixed;
          left: 0;
          top: 0;
          width: 7px;
          height: 7px;
          margin: 0;
          border-radius: 50%;
          background: ${ACCENT};
          pointer-events: none;
          z-index: 10051;
          opacity: 0;
          will-change: transform;
          transition: transform 0.12s ease, opacity 0.2s ease, background 0.25s ease;
        }
        .cursor-dot.cursor-dot--active {
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(51,102,255,0.45);
        }

        .nav-link-premium {
          position: relative;
          display: inline-block;
          transition: color 0.34s cubic-bezier(0.22,1,0.36,1), transform 0.34s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link-premium::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 1px;
          background: ${c.ink};
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link-premium:hover {
          color: ${c.ink} !important;
          transform: translateY(-1px);
        }
        .nav-link-premium:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-icon-btn {
          transition: color 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }
        .nav-icon-btn:hover {
          transform: translateY(-1px);
          opacity: 1;
        }

        .nav-cta-outline {
          transition: background 0.35s cubic-bezier(0.22,1,0.36,1), color 0.35s ease,
            border-color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s ease;
        }
        .nav-cta-outline:hover {
          background: ${c.ink};
          color: ${dk ? "#0A0A0C" : "#fff"} !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(17,17,17,0.14);
        }

        .hero-stage {
          --hx: 38%;
          --hy: 36%;
          --hero-wash: ${heroWash};
        }
        .hero-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(
            720px circle at var(--hx) var(--hy),
            var(--hero-wash) 0%,
            transparent 62%
          );
          opacity: 1;
          transition: opacity 0.4s ease;
        }

        .hero-logo-target {
          transition: filter 0.4s ease, opacity 0.35s ease;
        }
        .hero-logo-target:hover {
          filter: brightness(1.06) contrast(1.02);
        }

        .hero-cta-primary {
          box-shadow: ${dk ? "none" : "0 10px 26px rgba(17,17,17,0.12)"};
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease,
            filter 0.38s ease, background 0.35s ease, color 0.35s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          filter: brightness(1.05);
          box-shadow: ${dk ? "0 12px 32px rgba(0,0,0,0.35)" : "0 16px 36px rgba(17,17,17,0.2)"};
        }
        .hero-cta-primary:active {
          transform: translateY(-1px);
        }

        .hero-cta-ghost {
          transition: color 0.32s ease, border-color 0.32s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-cta-ghost:hover {
          color: ${c.ink} !important;
          border-bottom-color: ${c.ink} !important;
          transform: translateX(3px);
        }

        .terminal-shell {
          transition: filter 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .terminal-shell:hover {
          filter: brightness(1.07) saturate(1.05);
        }

        @media (hover: none) {
          .cursor-ring, .cursor-dot { display: none !important; }
          .home-root { cursor: auto !important; }
        }

        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${ACCENT}; color: #fff; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: NAV_H,
          background: navBgLive,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${c.border}`,
          opacity: introDone ? 1 : 0,
          transform: introDone ? "translateY(0)" : "translateY(-8px)",
          transition: "background 0.5s, opacity 0.58s ease, transform 0.58s ease, border-color 0.4s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 3rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            data-cursor="active"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: SYN.kw }}>const</span> <span style={{ color: c.ink }}>CINDIWEB</span>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map((k) => (
              <a
                key={k}
                href={`#${k}`}
                data-cursor="active"
                className="nav-link-premium"
                style={{
                  textDecoration: "none",
                  color: c.secondary,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {t.nav[k]}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              type="button"
              data-cursor="active"
              className="nav-icon-btn"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: c.muted,
                fontFamily: MONO,
                letterSpacing: "0.1em",
                padding: "0.35rem 0.4rem",
                minWidth: 20,
              }}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            <div style={{ width: 1, height: 16, background: c.border }} />

            <button
              type="button"
              data-cursor="active"
              className="nav-icon-btn"
              onClick={() => setTheme(dk ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "none",
                fontSize: "0.85rem",
                color: c.muted,
                padding: "0.25rem 0.35rem",
                lineHeight: 1,
              }}
            >
              {dk ? "☀" : "☾"}
            </button>

            <div style={{ width: 1, height: 16, background: c.border }} />

            <a
              href="#contact"
              data-cursor="active"
              className="nav-cta-outline"
              style={{
                color: c.ink,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                padding: "0.5rem 1.25rem",
                border: `1.5px solid ${c.ink}`,
                whiteSpace: "nowrap",
              }}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: NAV_H,
          zIndex: 99,
          pointerEvents: "none",
          background: navBgLive,
          backdropFilter: "blur(16px)",
        }}
      />

{logoPhase !== "done" && (
  <div
    style={overlayOuterStyle}
    onTransitionEnd={(e) => {
      if (logoPhase === "settle" && e.propertyName === "transform") {
        setLogoPhase("done");
        setIntroDone(true);
      }
    }}
  >
    <div style={overlayInnerStyle}>
      <DrawableHero
        color={c.ink}
        animate={true}
        onComplete={handleDrawComplete}
        onMeasure={setTextWidth}
      />
    </div>
  </div>
)}

      <section
        ref={heroSectionRef}
        className="hero-stage"
        style={{
          minHeight: "100vh",
          paddingTop: NAV_H,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 3rem",
            width: "100%",
            position: "relative",
            zIndex: 20,
            pointerEvents: "auto",
          }}
        >
          <div style={{ width: "100%", maxWidth: 760 }}>
            <div
              ref={logoAnchorRef}
              data-cursor="active"
              className="hero-logo-target"
              style={{
                width: "100%",
                maxWidth: 760,
                height: 112,
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <div style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.36s ease" }}>
                {logoPhase !== "draw" && <DrawableHero color={c.ink} animate={false} />}
              </div>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.62s ease, transform 0.62s ease",
                pointerEvents: "auto",
              }}
            >
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: SYN.cmt,
                  marginBottom: "1.4rem",
                }}
              >
                <span>{"//"}</span> {t.hero.eyebrow}
              </p>

              <p
                style={{
                  fontSize: "clamp(1.45rem,2.8vw,2.05rem)",
                  color: c.ink,
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  marginBottom: "1rem",
                  maxWidth: 520,
                  lineHeight: 1.1,
                }}
              >
                {t.tagline}
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  color: c.secondary,
                  lineHeight: 1.58,
                  maxWidth: 440,
                  marginBottom: "2rem",
                }}
              >
                {t.hero.sub}
              </p>

              <div style={{ display: "flex", gap: "1rem", alignItems: "center", pointerEvents: "auto" }}>
                <a
                  href="#contact"
                  data-cursor="active"
                  className="hero-cta-primary"
                  style={{
                    background: c.ink,
                    color: dk ? "#0A0A0C" : "#fff",
                    padding: "0.95rem 1.85rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {lang === "es" ? "Hablemos" : "Let's Talk"}
                </a>

                <a
                  href="#work"
                  data-cursor="active"
                  className="hero-cta-ghost"
                  style={{
                    color: c.secondary,
                    fontSize: "0.76rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderBottom: `1px solid ${c.border}`,
                    paddingBottom: 1,
                  }}
                >
                  {t.work.label} →
                </a>
              </div>
            </div>
          </div>
        </div>

        {terminalPhase !== "hidden" && (
          <div
            ref={terminalRef}
            data-cursor="active"
            className="terminal-shell"
            style={terminalStyle}
            onAnimationEnd={() => {
              if (terminalPhase === "entering") {
                setTerminalPhase("visible");
                setTerminalStarted(true);
              } else if (terminalPhase === "exiting") {
                setTerminalPhase("hidden");
              }
            }}
          >
            <TerminalShape active={terminalStarted} lines={t.terminal} onSequenceDone={handleSequenceDone} />
          </div>
        )}

        {BROWSER_CONFIGS.map((cfg, i) => (
          <FloatingBrowser
            key={i}
            id={i}
            visible={browsersVisible}
            initialStyle={cfg.style}
            delay={cfg.delay}
            terminalRef={terminalRef}
            isActive={activeBrowserId === i}
            initialVelocity={cfg.velocity}
            onActivate={handleBrowserActivate}
            onRelease={() => setActiveBrowserId(-1)}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {cfg.type === "restaurant" && <BrowserRestaurant lang={lang} />}
              {cfg.type === "saas" && <BrowserSaaS lang={lang} />}
              {cfg.type === "ecommerce" && <BrowserEcommerce lang={lang} />}
              {cfg.type === "portfolio" && <BrowserPortfolio lang={lang} />}
              {cfg.type === "blog" && <BrowserBlog lang={lang} />}
            </div>
          </FloatingBrowser>
        ))}

        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.55s ease",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.25em", color: c.muted }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: c.muted, opacity: 0.4, animation: "scrollPulse 2.5s ease-in-out infinite" }} />
        </div>
      </section>
    </div>
  );
}