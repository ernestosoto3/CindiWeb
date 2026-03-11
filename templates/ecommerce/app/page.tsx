// templates/ecommerce/app/page.tsx

const PRODUCTS = [
  {
    name: "Ridge Ceramic Mug",
    category: "Kitchen",
    price: "$42",
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
  {
    name: "Woven Throw Blanket",
    category: "Home",
    price: "$128",
    img: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80",
  },
  {
    name: "Linen Apron",
    category: "Kitchen",
    price: "$68",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    name: "Hand-thrown Vase",
    category: "Decor",
    price: "$95",
    img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
  },
  {
    name: "Oak Serving Board",
    category: "Kitchen",
    price: "$84",
    img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
  },
  {
    name: "Merino Wool Pillow",
    category: "Home",
    price: "$110",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
  },
];

const CATEGORIES = ["All", "Kitchen", "Home", "Decor"];

export default function Page() {
  return (
    <div className="bg-[#f9f6f1] text-[#1c1917]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#f9f6f1]/95 backdrop-blur-sm border-b border-[#e8e0d5]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg tracking-[0.12em] uppercase font-light">Maison</span>
          <nav
            className="hidden md:flex items-center gap-8 text-sm text-[#78716c]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <a href="#shop" className="hover:text-[#1c1917] transition-colors">Shop</a>
            <a href="#story" className="hover:text-[#1c1917] transition-colors">Our Story</a>
            <a href="#" className="hover:text-[#1c1917] transition-colors">Journal</a>
          </nav>
          <a href="#" className="text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            Cart (0)
          </a>
        </div>
      </header>

      {/* HERO — fixed: no min-h-screen on mobile, image is decorative below on mobile */}
      <section className="grid md:grid-cols-2">
        {/* text side — stands on its own at any height */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[#a8a29e] mb-6"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Handcrafted · Small Batch
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] mb-8 text-[#1c1917]">
            Objects made<br />to last.
          </h1>
          <p
            className="text-[#78716c] leading-relaxed max-w-sm mb-10"
            style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}
          >
            We work with small-scale makers across Europe to bring you pieces that age gracefully and live in your home for decades.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#shop"
              className="text-sm bg-[#1c1917] text-[#f9f6f1] px-8 py-3.5 hover:bg-[#292524] transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Shop Now
            </a>
            <a
              href="#story"
              className="text-sm text-[#78716c] px-8 py-3.5 border border-[#d6cfc6] hover:border-[#a8a29e] transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Our Story
            </a>
          </div>
        </div>
        {/* image — full height on desktop, aspect ratio box on mobile */}
        <div className="relative aspect-4/3 md:aspect-auto md:min-h-140">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80"
            alt="Artisan home goods"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-b border-[#e8e0d5] bg-[#f0ebe3] py-6">
        <div
          className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {[
            "🌿 Sustainably sourced",
            "🔨 Handmade by artisans",
            "📦 Free shipping over $100",
            "↩ 30-day returns",
          ].map((item) => (
            <span key={item} className="text-sm text-[#78716c]">{item}</span>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#a8a29e] mb-2"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              New Arrivals
            </p>
            <h2 className="text-4xl font-light">Shop</h2>
          </div>
          <div className="hidden md:flex gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="text-xs tracking-widest uppercase px-4 py-2 border border-[#d6cfc6] text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917] transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS.map(({ name, category, price, img }) => (
            <div key={name} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden bg-[#ede8e0] mb-4">
                <img
                  src={img}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="flex items-start justify-between gap-2"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <div>
                  <p className="text-sm font-medium text-[#1c1917]">{name}</p>
                  <p className="text-xs text-[#a8a29e] mt-0.5 tracking-wider uppercase">{category}</p>
                </div>
                <p className="text-sm text-[#1c1917] font-medium">{price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="text-sm border border-[#d6cfc6] text-[#78716c] px-10 py-3.5 hover:border-[#1c1917] hover:text-[#1c1917] transition-all"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            View All Products
          </a>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="bg-[#1c1917] text-[#f9f6f1] py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#a8a29e] mb-6"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Est. 2016
            </p>
            <h2 className="text-5xl font-light leading-tight mb-8">
              We believe<br />in slow making.
            </h2>
            <p
              className="text-[#a8a29e] leading-relaxed mb-6"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}
            >
              Maison started as a single potter's studio in Lisbon. Today we partner with 14 makers across Portugal, France, and Denmark — each chosen for their craft, not their output.
            </p>
            <p
              className="text-[#a8a29e] leading-relaxed"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}
            >
              Every piece you buy comes with the maker's name and story. We think that matters.
            </p>
          </div>
          <div className="aspect-4/5 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=80"
              alt="Potter at work"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-[#e8e0d5] py-20 px-6 text-center">
        <h3 className="text-3xl font-light mb-3">Join our list.</h3>
        <p
          className="text-[#78716c] text-sm mb-8"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          New arrivals and maker stories, once a month.
        </p>
        <div
          className="flex max-w-md mx-auto gap-2"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 text-sm border border-[#d6cfc6] bg-transparent placeholder-[#c4bbb1] focus:outline-none focus:border-[#1c1917]"
          />
          <button className="px-6 py-3 text-sm bg-[#1c1917] text-[#f9f6f1] hover:bg-[#292524] transition-colors">
            Subscribe
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8e0d5] px-6 py-10">
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#a8a29e]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <span
            className="tracking-[0.12em] uppercase text-[#1c1917] font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Maison
          </span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#1c1917] transition-colors">Shipping</a>
            <a href="#" className="hover:text-[#1c1917] transition-colors">Returns</a>
            <a href="#" className="hover:text-[#1c1917] transition-colors">Contact</a>
          </div>
          <span>© 2025 Maison</span>
        </div>
      </footer>

    </div>
  );
}