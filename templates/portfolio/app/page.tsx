// templates/portfolio/app/page.tsx
import { ContactForm } from "@cindiweb/ui";

const WORK = [
  {
    title: "Verdant Studio",
    category: "Brand Identity + Web",
    year: "2024",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    title: "Petal Commerce",
    category: "E-commerce · Next.js",
    year: "2024",
    img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
  },
  {
    title: "Nomad Finance",
    category: "Dashboard · Design System",
    year: "2023",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Forma Architects",
    category: "Web + CMS",
    year: "2023",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
];

const SERVICES = [
  { title: "Web Design", desc: "Sites that reflect your brand and convert visitors into clients." },
  { title: "Development", desc: "Next.js, TypeScript, headless CMS. Fast, scalable, maintainable." },
  { title: "Design Systems", desc: "Component libraries and style guides your team can actually use." },
];

const SKILLS = [
  "Next.js", "TypeScript", "Tailwind CSS", "Figma",
  "Node.js", "PostgreSQL", "Framer Motion", "Vercel",
];

export default function Page() {
  return (
    <div className="bg-[#f4f1ec] text-[#141210]" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f4f1ec]/90 backdrop-blur-sm border-b border-[#d9d3ca]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-sm tracking-tight">Alex Mora</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#6b6560]">
            <a href="#work" className="hover:text-[#141210] transition-colors">Work</a>
            <a href="#services" className="hover:text-[#141210] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#141210] transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="text-sm bg-[#141210] text-[#f4f1ec] px-5 py-2.5 hover:bg-[#2d2a27] transition-colors"
          >
            Hire me
          </a>
        </div>
      </header>

      {/* HERO — fixed: pt-24 for nav offset, no min-h-screen, content-driven height */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* status badge */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs text-[#6b6560] border border-[#d9d3ca] px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available for new projects
          </span>
        </div>

        <h1
          className="text-[18vw] sm:text-[15vw] md:text-[11vw] font-bold leading-[0.92] tracking-tight text-[#141210] mb-8"
        >
          Designer<br />&amp; Developer
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-6">
          <p className="text-[#6b6560] text-base leading-relaxed max-w-md">
            I build websites and digital products for ambitious brands. Based in San Juan, PR. Working globally.
          </p>
          <a
            href="#work"
            className="text-sm underline underline-offset-4 text-[#6b6560] hover:text-[#141210] transition-colors whitespace-nowrap"
          >
            View Work ↓
          </a>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="border-t border-[#d9d3ca] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-xs tracking-[0.4em] uppercase text-[#a09890]">Selected Work</h2>
            <span className="text-xs text-[#a09890]">{WORK.length} Projects</span>
          </div>

          <div className="flex flex-col divide-y divide-[#d9d3ca]">
            {WORK.map(({ title, category, year, img }, i) => (
              <div
                key={title}
                className="group flex items-center gap-6 py-6 cursor-pointer hover:bg-[#ede8e0] -mx-6 px-6 transition-colors"
              >
                <span className="text-xs text-[#c4bbb1] w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-16 h-12 overflow-hidden shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl md:text-2xl font-medium flex-1 group-hover:translate-x-1 transition-transform">{title}</h3>
                <div className="hidden md:flex items-center gap-8 text-sm text-[#a09890]">
                  <span>{category}</span>
                  <span>{year}</span>
                </div>
                <span className="text-[#a09890] group-hover:text-[#141210] transition-colors">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#141210] text-[#f4f1ec] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#6b6560] mb-16">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {SERVICES.map(({ title, desc }) => (
              <div key={title}>
                <h3 className="text-2xl font-medium mb-4">{title}</h3>
                <p className="text-[#a09890] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#6b6560] mb-6">Tools & Technologies</p>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-4 py-2 border border-white/10 text-[#a09890] hover:border-white/30 hover:text-[#f4f1ec] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-[#d9d3ca] py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-[#141210] italic mb-8">
            "Alex took our brand from a messy Squarespace to a site that actually reflects who we are. The whole process was smooth and the result exceeded every expectation."
          </p>
          <p className="text-sm text-[#a09890]">— Sofia R., CEO at Verdant Studio</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#ede8e0] border-t border-[#d9d3ca] py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Let's build<br />something great.
            </h2>
            <p className="text-[#6b6560] text-sm leading-relaxed mb-10 max-w-sm">
              I take on a small number of projects each quarter to keep quality high. If you have something interesting, let's talk.
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#6b6560]">
              <a href="mailto:hello@alexmora.co" className="hover:text-[#141210] transition-colors">
                hello@alexmora.co
              </a>
              <a href="#" className="hover:text-[#141210] transition-colors">LinkedIn →</a>
            </div>
          </div>
          {/* ContactForm on light background — theme="light" is default, looks clean here */}
          <div>
            <ContactForm variant="card" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d9d3ca] px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[#a09890]">
          <span>Alex Mora</span>
          <span>© 2025 · All rights reserved</span>
        </div>
      </footer>

    </div>
  );
}