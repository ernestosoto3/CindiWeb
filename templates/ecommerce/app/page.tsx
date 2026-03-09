import { HeroSection, Button, Navbar, Footer } from "@cindiweb/ui";

const PRODUCTS = [
  { id: 1, name: "Handmade Ceramic Mug", price: "$34", category: "Kitchen", img: "https://placehold.co/400x300/f5f0eb/333?text=Mug" },
  { id: 2, name: "Linen Tote Bag", price: "$48", category: "Accessories", img: "https://placehold.co/400x300/e8f0e8/333?text=Tote" },
  { id: 3, name: "Soy Candle Set", price: "$52", category: "Home", img: "https://placehold.co/400x300/f0e8f5/333?text=Candle" },
  { id: 4, name: "Wool Throw Blanket", price: "$89", category: "Home", img: "https://placehold.co/400x300/e8ecf5/333?text=Blanket" },
  { id: 5, name: "Artisan Soap Bar", price: "$18", category: "Beauty", img: "https://placehold.co/400x300/f5ebe8/333?text=Soap" },
  { id: 6, name: "Pressed Flower Print", price: "$65", category: "Art", img: "https://placehold.co/400x300/f0f5e8/333?text=Print" },
];

export default function Page() {
  return (
    <>
      <Navbar
        logo={<span className="text-lg font-bold">Bloom & Co.</span>}
        links={[
          { label: "Shop", href: "#shop" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <HeroSection
        headline="Handcrafted with love."
        subheadline="Artisan goods made for everyday living. Small-batch, ethically sourced, beautifully made."
        cta={<Button size="lg">Shop Now</Button>}
      />
      <section id="shop" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-3xl font-bold text-gray-900">Our Collection</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="mb-4 overflow-hidden rounded-xl">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">{p.category}</p>
              <p className="font-semibold text-gray-900">{p.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-bold text-indigo-600">{p.price}</p>
                <Button size="sm" variant="secondary">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer brandName="Bloom & Co." />
    </>
  );
}