import { Navbar, Footer, HeroSection, Button, TeamGrid, ContactForm } from "@cindiweb/ui"

const services = [
  { name: "Haircut & Style", price: "$65+", desc: "Precision cuts tailored to your face shape." },
  { name: "Color & Highlights", price: "$120+", desc: "Balayage, ombré, and full-color services." },
  { name: "Blowout", price: "$45+", desc: "Smooth, voluminous finish every time." },
  { name: "Deep Conditioning", price: "$35+", desc: "Restore moisture and shine to any hair type." },
  { name: "Manicure", price: "$30+", desc: "Classic and gel options available." },
  { name: "Facial", price: "$80+", desc: "Customized skincare treatments." },
]

const team = [
  { name: "Alessia Romero", role: "Master Stylist", bio: "12 years specializing in color." },
  { name: "Dana Kim", role: "Colorist", bio: "Balayage & keratin expert." },
  { name: "Marcus Bell", role: "Barber", bio: "Fades, tapers, and classic cuts." },
  { name: "Priya Nair", role: "Esthetician", bio: "Skin & facial treatments." },
]

export default function SalonPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-lg font-bold tracking-tight">Lumière Salon</span>}
        links={[
          { label: "Services", href: "#services" },
          { label: "Team", href: "#team" },
          { label: "Book", href: "#book" },
        ]}
        cta={<Button variant="primary" size="sm">Book Now</Button>}
      />

      <HeroSection
        headline="Your Best Look, Every Visit"
        subheadline="Premium hair, skin, and nail services in a relaxing, boutique environment."
        primaryCta={<Button variant="primary">Book an Appointment</Button>}
      />

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={`${service.name}-${service.price}`} className="rounded-xl border border-gray-200 p-6">
              <div className="mb-2 flex items-start justify-between">
                <p className="font-semibold text-gray-900">{service.name}</p>
                <span className="text-sm font-medium text-pink-600">{service.price}</span>
              </div>
              <p className="text-sm text-gray-500">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Meet the Team</h2>
          <TeamGrid members={team} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Our Work</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400"
            >
              Photo {index + 1}
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Book an Appointment</h2>
          <p className="mb-10 text-center text-gray-500">
            Call us at (555) 012-3456 or send a message below.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer brandName="Lumière Salon" />
    </div>
  )
}