// templates/restaurant/app/page.tsx
import { ContactForm } from "@cindiweb/ui";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MENU = {
  Starters: [
    { name: "Burrata & Heirloom", desc: "Slow-roasted tomatoes, torn basil, aged balsamic", price: "$16" },
    { name: "Tuna Tartare", desc: "Soy-lime dressing, avocado mousse, sesame crisp", price: "$19" },
    { name: "Charred Leek Velouté", desc: "Crème fraîche, chive oil, smoked paprika", price: "$14" },
  ],
  Mains: [
    { name: "Braised Short Rib", desc: "Red wine jus, celery root purée, crispy shallots", price: "$38" },
    { name: "Pan-Seared Halibut", desc: "Lemon beurre blanc, capers, wilted spinach", price: "$34" },
    { name: "Wild Mushroom Risotto", desc: "Truffle oil, aged parmesan, chives (v)", price: "$28" },
    { name: "Duck Confit", desc: "Cherry gastrique, lentil ragù, micro greens", price: "$36" },
  ],
  Desserts: [
    { name: "Dark Chocolate Tart", desc: "Salted caramel, vanilla crème fraîche", price: "$12" },
    { name: "Lavender Panna Cotta", desc: "Honey tuile, seasonal berries", price: "$11" },
    { name: "Seasonal Sorbet", desc: "Ask your server for today's selection", price: "$9" },
  ],
};

const HOURS = [
  ["Tuesday – Thursday", "5:00 pm – 10:00 pm"],
  ["Friday – Saturday", "4:30 pm – 11:00 pm"],
  ["Sunday", "4:00 pm – 9:00 pm"],
  ["Monday", "Closed"],
];

const TESTIMONIALS = [
  { quote: "The short rib alone is worth the trip. One of the best meals I've had in the city.", author: "Maria G.", via: "Google" },
  { quote: "Intimate, warm, and the service is impeccable. We go back every anniversary.", author: "James & Clara", via: "Yelp" },
  { quote: "I brought a client here and closed the deal. The room does the work for you.", author: "Daniel P.", via: "OpenTable" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="bg-[#0e0b07] text-[#f5f0e8]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0e0b07]/90 backdrop-blur-sm border-b border-white/5">
        <span className="text-xl tracking-[0.15em] uppercase font-light text-[#c9a96e]">Sotto Voce</span>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-[#a89880]">
          <a href="#menu" className="hover:text-[#c9a96e] transition-colors">Menu</a>
          <a href="#hours" className="hover:text-[#c9a96e] transition-colors">Hours</a>
          <a href="#reserve" className="hover:text-[#c9a96e] transition-colors">Reserve</a>
        </nav>
        <a
          href="#reserve"
          className="text-xs tracking-[0.2em] uppercase px-5 py-2.5 border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0e0b07] transition-all"
        >
          Reserve
        </a>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80"
          alt="Restaurant atmosphere"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0e0b07] via-[#0e0b07]/30 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <p className="text-xs tracking-[0.5em] uppercase text-[#c9a96e] mb-6">Fine Dining · Downtown</p>
          <h1
            className="text-7xl md:text-9xl font-light italic text-[#f5f0e8] leading-none mb-8"
            style={{ letterSpacing: "-0.02em" }}
          >
            Sotto Voce
          </h1>
          <p className="text-[#a89880] text-lg font-light max-w-sm mx-auto mb-12 tracking-wide">
            Modern European cuisine.<br />Open Tuesday through Sunday.
          </p>
          <a
            href="#reserve"
            className="inline-block text-xs tracking-[0.3em] uppercase px-10 py-4 border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0e0b07] transition-all"
          >
            Reserve a Table
          </a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
          <div className="w-px h-10 bg-[#c9a96e]" />
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-t border-b border-white/10 py-16 px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Experience", value: "12 Years" },
            { label: "Seats", value: "48 Only" },
            { label: "Michelin", value: "Recognized" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-3xl font-light text-[#c9a96e] mb-1">{value}</p>
              <p className="text-xs tracking-[0.3em] uppercase text-[#6b5d4e]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="max-w-3xl mx-auto px-8 py-28">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Seasonal</p>
          <h2 className="text-5xl font-light italic text-[#f5f0e8]">Our Menu</h2>
        </div>

        {Object.entries(MENU).map(([section, items]) => (
          <div key={section} className="mb-16">
            <h3 className="text-xs tracking-[0.4em] uppercase text-[#6b5d4e] mb-8 border-b border-white/10 pb-3">
              {section}
            </h3>
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between items-start gap-6">
                  <div>
                    <p className="text-[#f5f0e8] font-light text-lg">{item.name}</p>
                    <p className="text-sm text-[#6b5d4e] mt-1 font-light">{item.desc}</p>
                  </div>
                  <p className="text-[#c9a96e] font-light whitespace-nowrap text-sm mt-1">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* PHOTO STRIP */}
      <section className="grid grid-cols-3 gap-1">
        {[
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
        ].map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] text-center mb-16">What Guests Say</p>
          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIALS.map(({ quote, author, via }) => (
              <div key={author} className="flex flex-col gap-6">
                <p className="text-[#a89880] font-light leading-relaxed italic text-sm">"{quote}"</p>
                <div>
                  <p className="text-[#f5f0e8] text-sm">{author}</p>
                  <p className="text-xs text-[#6b5d4e] tracking-widest uppercase mt-0.5">{via}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOURS + RESERVE */}
      <section className="bg-[#130f09] border-t border-white/10" id="hours">
        <div className="max-w-4xl mx-auto px-8 py-28 grid md:grid-cols-2 gap-20">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">Hours</p>
            {HOURS.map(([day, time]) => (
              <div key={day} className="flex justify-between py-4 border-b border-white/10 text-sm">
                <span className="text-[#6b5d4e] font-light">{day}</span>
                <span className="text-[#f5f0e8] font-light">{time}</span>
              </div>
            ))}
            {/* Fixed: no Date(), no browser-auto-linkable phone — plain text avoids hydration mismatch */}
            <div className="mt-10">
              <p className="text-xs text-[#6b5d4e] leading-loose">
                123 Main Street, Downtown
              </p>
              <p className="text-xs text-[#6b5d4e]">
                reservations@sottovoce.com
              </p>
              <p className="text-xs text-[#6b5d4e]">
                (555) 012-3456
              </p>
            </div>
          </div>

          <div id="reserve">
            {/*
              theme="dark" — tells ContactForm to render transparent inputs
              with light borders and white text, matching the dark background.
              submitLabel changed to be reservation-specific.
            */}
            <ContactForm
              theme="dark"
              submitLabel="Request Reservation"
              successMessage="Thank you — we'll confirm your reservation by email."
              fields={[
                { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
                { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
                { name: "guests", label: "Party Size", type: "text", placeholder: "e.g. 2 guests", required: true },
                { name: "message", label: "Special Requests", type: "textarea", placeholder: "Dietary needs, occasion…", rows: 3 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FOOTER — hardcoded year avoids SSR/client hydration mismatch */}
      <footer className="border-t border-white/10 px-8 py-10 flex items-center justify-between text-xs text-[#3d3329] tracking-widest uppercase">
        <span>Sotto Voce</span>
        <span>© 2025</span>
      </footer>

    </div>
  );
}