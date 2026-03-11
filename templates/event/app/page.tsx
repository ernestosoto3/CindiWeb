import { Navbar, Footer, Button, TeamGrid, CountdownTimer } from "@cindiweb/ui"

const schedule = [
  { time: "9:00 AM", title: "Registration & Coffee", track: "All" },
  { time: "10:00 AM", title: "Opening Keynote: The Future of Creative Work", track: "Main Stage" },
  { time: "11:30 AM", title: "Workshop: Building in Public", track: "Track A" },
  { time: "1:00 PM", title: "Lunch & Networking", track: "All" },
  { time: "2:00 PM", title: "Panel: From Side Project to Studio", track: "Main Stage" },
  { time: "3:30 PM", title: "Workshop: Monetizing Your Audience", track: "Track B" },
  { time: "5:00 PM", title: "Closing Remarks + Happy Hour", track: "All" },
]

const speakers = [
  { name: "Maya Lin", role: "Founder, Craft Studio", imagePlaceholder: "🎙️" },
  { name: "Theo Park", role: "Author & Educator", imagePlaceholder: "✍️" },
  { name: "Sana Reyes", role: "Product Designer", imagePlaceholder: "🎨" },
  { name: "David Osei", role: "Indie Hacker", imagePlaceholder: "🚀" },
  { name: "Chloe Marsh", role: "Newsletter Creator", imagePlaceholder: "📩" },
  { name: "Raj Iyer", role: "Venture Partner", imagePlaceholder: "💼" },
]

export default function EventPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-lg font-bold tracking-tight">Maker Summit</span>}
        links={[
          { label: "Schedule", href: "#schedule" },
          { label: "Speakers", href: "#speakers" },
          { label: "Tickets", href: "#tickets" },
        ]}
        cta={<Button variant="primary" size="sm">Get Tickets</Button>}
      />

      <section className="bg-gray-900 px-6 py-24 text-center text-white">
        <span className="mb-4 block text-xs uppercase tracking-widest text-gray-400">
          September 15, 2026 · Austin, TX
        </span>
        <h1 className="mb-4 text-5xl font-bold leading-tight">Maker Summit 2026</h1>
        <p className="mx-auto mb-12 max-w-xl text-lg text-gray-300">
          A one-day conference for independent creators, builders, and entrepreneurs.
        </p>
        <CountdownTimer targetDate="2026-09-15T09:00:00" label="Event starts in" />
        <div className="mt-12">
          <Button variant="primary">Get Your Ticket — $199</Button>
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Schedule</h2>
        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={`${item.time}-${item.title}`}
              className="flex flex-col gap-3 rounded-xl border border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="w-20 shrink-0 text-sm font-mono text-gray-400">{item.time}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              </div>
              <span className="w-fit rounded bg-gray-100 px-2 py-1 text-xs text-gray-400">
                {item.track}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="speakers" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Speakers</h2>
          <TeamGrid members={speakers} />
        </div>
      </section>

      <section id="tickets" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Get Your Ticket</h2>
        <p className="mb-10 text-gray-500">Limited seats. Early bird pricing ends June 1.</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { name: "General Admission", price: "$199", perks: ["Full day access", "Lunch included", "Digital recordings"] },
            { name: "VIP", price: "$399", perks: ["All GA perks", "Speaker dinner", "Workshop priority seating", "Printed workbook"] },
          ].map((ticket) => (
            <div key={ticket.name} className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-8">
              <p className="text-lg font-bold text-gray-900">{ticket.name}</p>
              <p className="text-3xl font-bold text-gray-900">{ticket.price}</p>
              <ul className="space-y-2 text-left text-sm text-gray-600">
                {ticket.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <Button variant="primary">Buy Ticket</Button>
            </div>
          ))}
        </div>
      </section>

      <Footer brandName="Maker Summit" />
    </div>
  )
}