import { Navbar, Footer, Button } from "@cindiweb/ui"

const posts = [
  {
    title: "How I Built a 6-Figure Freelance Business in 18 Months",
    tag: "Business",
    date: "Mar 5, 2026",
    readTime: "8 min",
  },
  {
    title: "The Morning Routine That Changed My Creative Output",
    tag: "Productivity",
    date: "Feb 28, 2026",
    readTime: "5 min",
  },
  {
    title: "Why I Left My Agency Job to Write Full-Time",
    tag: "Career",
    date: "Feb 20, 2026",
    readTime: "6 min",
  },
  {
    title: "10 Tools Every Content Creator Actually Needs",
    tag: "Tools",
    date: "Feb 10, 2026",
    readTime: "7 min",
  },
  {
    title: "A Beginner's Guide to Newsletter Monetization",
    tag: "Monetization",
    date: "Jan 30, 2026",
    readTime: "9 min",
  },
  {
    title: "Stop Waiting to Feel Ready — Ship It",
    tag: "Mindset",
    date: "Jan 22, 2026",
    readTime: "4 min",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-lg font-bold tracking-tight">The Craft</span>}
        links={[
          { label: "Articles", href: "#articles" },
          { label: "Newsletter", href: "#newsletter" },
          { label: "About", href: "#about" },
        ]}
        cta={<Button variant="secondary" size="sm">Subscribe</Button>}
      />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Writing · Business · Creativity
        </span>
        <h1 className="mt-4 mb-6 text-5xl font-bold leading-tight text-gray-900">Ideas worth reading.</h1>
        <p className="mb-8 text-lg text-gray-500">
          Honest essays on building a creative career, shipping consistently, and living deliberately.
        </p>
        <Button variant="primary">Read Latest Post</Button>
      </section>

      <section className="mx-auto mb-20 max-w-5xl px-6">
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 md:grid-cols-2">
          <div className="flex aspect-video items-center justify-center bg-gray-100 text-gray-400 md:aspect-auto">
            Featured Image
          </div>
          <div className="flex flex-col justify-center gap-4 p-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">Featured</span>
            <h2 className="text-2xl font-bold leading-snug text-gray-900">
              How I Built a 6-Figure Freelance Business in 18 Months
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              The exact steps, mistakes, and mindset shifts that took me from broke to booked — without an audience or an email list.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Button variant="primary" size="sm">Read Article</Button>
              <span className="text-xs text-gray-400">8 min read · Mar 5, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="mx-auto mb-20 max-w-5xl px-6 py-10">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">All Articles</h2>
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <div
              key={`${post.title}-${post.date}`}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <span className="mr-3 text-xs uppercase tracking-wide text-gray-400">{post.tag}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{post.title}</h3>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{post.readTime} read</span>
            </div>
          ))}
        </div>
      </section>

      <section id="newsletter" className="bg-gray-900 py-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Join 4,200+ readers</h2>
          <p className="mb-8 text-gray-400">One essay every week. No spam. Unsubscribe any time.</p>
          <div className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary" size="sm">Subscribe</Button>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl">
          👩‍💻
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Written by Jordan Ellis</h2>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-500">
          Freelance writer, educator, and recovering perfectionist. I write about doing creative work for a living — without burning out.
        </p>
      </section>

      <Footer brandName="The Craft" />
    </div>
  )
}