import { Navbar, Footer, Button, ContactForm } from "@cindiweb/ui";

const PROJECTS = [
  { title: "Rebrand — Anchor Coffee", tags: ["Brand", "Web"], year: "2024", img: "https://placehold.co/600x400/1a1a2e/fff?text=Anchor+Coffee" },
  { title: "App UI — Finlo Finance", tags: ["UX", "Mobile"], year: "2024", img: "https://placehold.co/600x400/0f3460/fff?text=Finlo" },
  { title: "Campaign — Nova Agency", tags: ["Art Direction"], year: "2023", img: "https://placehold.co/600x400/533483/fff?text=Nova" },
];

const SKILLS = ["UI/UX Design", "Brand Identity", "Motion Design", "Next.js", "Figma", "Illustration"];

export default function Page() {
  return (
    <>
      <Navbar logo={<span className="font-bold">Jordan Lee</span>} links={[
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]} />
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <p className="text-sm text-indigo-500 tracking-widest uppercase mb-4">Designer & Developer</p>
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
          I craft digital<br />experiences that stick.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-8">5 years building brands and interfaces for startups and studios across the globe.</p>
        <div className="flex gap-4">
          <Button size="lg">View Work</Button>
          <Button size="lg" variant="ghost">Download CV</Button>
        </div>
      </section>
      {/* Work */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Selected Work</h2>
        <div className="flex flex-col gap-12">
          {PROJECTS.map((p) => (
            <div key={p.title} className="grid md:grid-cols-2 gap-8 items-center group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{p.year}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Skills */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s) => <span key={s} className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">{s}</span>)}
          </div>
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className="max-w-2xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's work together</h2>
        <p className="text-gray-500 mb-10">Have a project in mind? Send me a message and let's talk.</p>
        <ContactForm />
      </section>
      <Footer brandName="Jordan Lee" />
    </>
  );
}