import { Navbar, Footer, HeroSection, Button, ReviewCard, ContactForm } from "@cindiweb/ui"

const projects = [
  { title: "Kitchen Remodel", tag: "Renovation", year: "2024" },
  { title: "Deck & Pergola", tag: "Outdoor", year: "2024" },
  { title: "Bathroom Overhaul", tag: "Plumbing", year: "2023" },
  { title: "Basement Finish", tag: "Interior", year: "2023" },
  { title: "Roof Replacement", tag: "Roofing", year: "2024" },
  { title: "Driveway Paving", tag: "Exterior", year: "2023" },
]

const reviews = [
  {
    quote: "Showed up on time, finished early, and the work was immaculate. Highly recommend.",
    author: "Sandra T.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote: "Best contractor I've hired in 10 years. Fair pricing and zero surprises.",
    author: "Marcus W.",
    location: "Round Rock, TX",
    rating: 5,
  },
  {
    quote: "Professional crew, great communication throughout the whole project.",
    author: "Lisa M.",
    location: "Cedar Park, TX",
    rating: 4,
  },
]

export default function ContractorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-lg font-bold tracking-tight">Apex Builds</span>}
        links={[
          { label: "Projects", href: "#projects" },
          { label: "Reviews", href: "#reviews" },
          { label: "Quote", href: "#quote" },
        ]}
        cta={<Button variant="primary" size="sm">Get a Quote</Button>}
      />

      <HeroSection
        headline="Built Right. Built to Last."
        subheadline="Residential and commercial contracting services across Central Texas. Licensed, insured, and on time."
        primaryCta={<Button variant="primary">Request a Free Quote</Button>}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">What We Do</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {["General Contracting", "Kitchen & Bath", "Roofing", "Flooring", "Decks & Patios", "Plumbing & Electric"].map((service) => (
            <div key={service} className="rounded-xl border border-gray-200 p-5 text-center">
              <p className="font-semibold text-gray-800">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Recent Projects</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={`${project.title}-${project.year}`} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex aspect-video items-center justify-center bg-gray-100 text-sm text-gray-400">
                  Project Photo
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                    <p className="text-xs text-gray-500">{project.tag}</p>
                  </div>
                  <span className="text-xs text-gray-400">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">What Clients Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={`${review.author}-${review.location ?? ""}`} {...review} />
          ))}
        </div>
      </section>

      <section id="quote" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Get a Free Quote</h2>
          <p className="mb-10 text-center text-gray-500">
            Describe your project and we&apos;ll follow up within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer brandName="Apex Builds" />
    </div>
  )
}