import { Navbar, Footer, Button, ContactForm } from "@cindiweb/ui";

const MENU = {
  Starters: [
    { name: "Burrata & Tomato", desc: "Heirloom tomatoes, fresh burrata, basil oil", price: "$16" },
    { name: "Tuna Tartare", desc: "Soy-lime dressing, avocado, sesame crisp", price: "$19" },
  ],
  Mains: [
    { name: "Braised Short Rib", desc: "Red wine jus, celery root purée, crispy shallots", price: "$38" },
    { name: "Pan-Seared Halibut", desc: "Lemon beurre blanc, capers, wilted spinach", price: "$34" },
    { name: "Wild Mushroom Risotto", desc: "Truffle oil, parmesan, chives (v)", price: "$28" },
  ],
  Desserts: [
    { name: "Dark Chocolate Tart", desc: "Salted caramel, vanilla crème", price: "$12" },
    { name: "Seasonal Sorbet", desc: "Ask your server for today's selection", price: "$9" },
  ],
};

export default function Page() {
  return (
    <>
      <Navbar logo={<span className="font-bold italic">Sotto Voce</span>} links={[
        { label: "Menu", href: "#menu" },
        { label: "Hours", href: "#hours" },
        { label: "Reserve", href: "#reserve" },
      ]} cta={<Button size="sm">Reserve a Table</Button>} />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1600x900/1a1208/fff?text=')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-white px-6">
          <p className="text-sm tracking-[0.4em] uppercase text-amber-400 mb-4">Fine Dining · Downtown</p>
          <h1 className="text-6xl md:text-7xl font-bold italic mb-6">Sotto Voce</h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto mb-8">Modern European cuisine in an intimate setting. Open Tuesday–Sunday.</p>
          <Button size="lg">Reserve a Table</Button>
        </div>
      </section>
      {/* Menu */}
      <section id="menu" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Menu</h2>
        {Object.entries(MENU).map(([section, items]) => (
          <div key={section} className="mb-14">
            <h3 className="text-xs uppercase tracking-widest text-amber-600 mb-6 border-b border-gray-200 pb-3">{section}</h3>
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <p className="font-bold text-gray-900 whitespace-nowrap">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* Hours + Reserve */}
      <section className="bg-gray-50" id="hours">
        <div className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hours</h3>
            {[["Tuesday – Friday", "5:00 pm – 10:00 pm"], ["Saturday", "4:00 pm – 11:00 pm"], ["Sunday", "4:00 pm – 9:00 pm"], ["Monday", "Closed"]].map(([day, time]) => (
              <div key={day} className="flex justify-between py-3 border-b border-gray-200 text-sm">
                <span className="text-gray-600">{day}</span>
                <span className="font-medium text-gray-900">{time}</span>
              </div>
            ))}
          </div>
          <div id="reserve">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Reservation</h3>
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer brandName="Sotto Voce" links={[{ label: "123 Main St, Downtown", href: "#" }]} />
    </>
  );
}