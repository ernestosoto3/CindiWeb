// templates/blog/app/page.tsx

const FEATURED = {
  title: "The quiet art of doing less and noticing more",
  category: "Mindfulness",
  date: "March 8, 2025",
  readTime: "6 min read",
  excerpt: "We optimize, iterate, and ship — but we rarely ask what we lose in the relentless push forward. Here's what I found when I finally slowed down.",
  img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
}

const POSTS = [
  { title: "Why I deleted my productivity system", category: "Work", date: "Feb 28", readTime: "4 min", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80" },
  { title: "On writing every day for a year", category: "Writing", date: "Feb 14", readTime: "7 min", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80" },
  { title: "The tools I actually use in 2025", category: "Tools", date: "Jan 30", readTime: "5 min", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" },
  { title: "How I stopped chasing metrics and started enjoying the work", category: "Creativity", date: "Jan 18", readTime: "8 min", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
]

const TOPICS = ["All", "Writing", "Work", "Mindfulness", "Tools", "Creativity", "Books"]

export default function Page() {
  return (
    <div style={{ backgroundColor: "#fafaf8", color: "#1c1c1a", fontFamily: "Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        .blog-featured { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
        .blog-posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem 2.5rem; }
        .blog-topics { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: 1fr; gap: 2rem; }
          .blog-posts-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>

      {/* NAV */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(250,250,248,0.95)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e8e6e1",
      }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.02em" }}>Marginalia</span>
          <nav style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", color: "#78716c", fontFamily: "system-ui, sans-serif" }}>
            <a href="#writing" style={{ color: "inherit", textDecoration: "none" }}>Writing</a>
            <a href="#topics" style={{ color: "inherit", textDecoration: "none" }}>Topics</a>
            <a href="#newsletter" style={{ color: "inherit", textDecoration: "none" }}>Newsletter</a>
          </nav>
          <a href="#newsletter" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.55rem 1.2rem", border: "1px solid #1c1c1a", color: "#1c1c1a", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>
            Subscribe
          </a>
        </div>
      </header>

      {/* MASTHEAD */}
      <section style={{ borderBottom: "1px solid #e8e6e1", padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#a8a29e", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>A journal on work, writing, and living deliberately</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem" }}>Marginalia</h1>
          <p style={{ fontSize: "1.05rem", color: "#78716c", lineHeight: 1.7, maxWidth: "36rem", margin: "0 auto 2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            By Jordan Wells — writer, reader, and occasional overthinker. Essays on slowness, creativity, and the life between the lines.
          </p>
          <a href="#newsletter" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", backgroundColor: "#1c1c1a", color: "#fafaf8", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>
            Get the newsletter
          </a>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 2rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#a8a29e", marginBottom: "2rem", fontFamily: "system-ui, sans-serif" }}>Featured</p>
        <div className="blog-featured">
          <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={FEATURED.img} alt={FEATURED.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "1rem" }}>{FEATURED.category}</span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.2, marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>{FEATURED.title}</h2>
            <p style={{ fontSize: "0.9rem", color: "#78716c", lineHeight: 1.7, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>{FEATURED.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.78rem", color: "#a8a29e", fontFamily: "system-ui, sans-serif", marginBottom: "1.5rem" }}>
              <span>{FEATURED.date}</span><span>·</span><span>{FEATURED.readTime}</span>
            </div>
            <a href="#" style={{ fontSize: "0.8rem", color: "#1c1c1a", textDecoration: "underline", textUnderlineOffset: "4px", fontFamily: "system-ui, sans-serif" }}>Read essay →</a>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section id="topics" style={{ borderTop: "1px solid #e8e6e1", borderBottom: "1px solid #e8e6e1", padding: "1.25rem 2rem", backgroundColor: "#f5f3ef" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div className="blog-topics">
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", fontFamily: "system-ui, sans-serif", marginRight: "0.5rem" }}>Topics:</span>
            {TOPICS.map((topic) => (
              <button key={topic} style={{ fontSize: "0.78rem", padding: "0.35rem 0.9rem", border: "1px solid #d6d0c9", backgroundColor: "transparent", color: "#78716c", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section id="writing" style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 2rem" }}>
        <div className="blog-posts-grid">
          {POSTS.map(({ title, category, date, readTime, img }) => (
            <article key={title} style={{ cursor: "pointer" }}>
              <div style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "1.25rem" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "0.5rem" }}>{category}</span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.3, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{title}</h3>
              <div style={{ fontSize: "0.78rem", color: "#a8a29e", fontFamily: "system-ui, sans-serif", display: "flex", gap: "0.75rem" }}>
                <span>{date}</span><span>·</span><span>{readTime}</span>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid #e8e6e1" }}>
          <a href="#" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", border: "1px solid #d6d0c9", color: "#78716c", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Load more</a>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" style={{ backgroundColor: "#1c1c1a", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#78716c", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>The Newsletter</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 400, color: "#fafaf8", marginBottom: "1.25rem" }}>Slow down your inbox.</h2>
          <p style={{ fontSize: "0.95rem", color: "#78716c", lineHeight: 1.7, marginBottom: "2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            One essay, twice a month. No noise, no sponsors, no algorithm.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, minWidth: "200px", padding: "0.85rem 1rem", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#fafaf8", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" as const }} />
            <button style={{ backgroundColor: "#fafaf8", color: "#1c1c1a", padding: "0.85rem 1.5rem", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif", cursor: "pointer", textTransform: "uppercase" as const }}>
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#52524e", marginTop: "1rem", fontFamily: "system-ui, sans-serif" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e8e6e1", padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.78rem", color: "#a8a29e", fontFamily: "system-ui, sans-serif" }}>
        <span style={{ fontFamily: "Georgia, serif", color: "#1c1c1a" }}>Marginalia</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Archive</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>RSS</a>
        </div>
        <span>© 2025 Jordan Wells</span>
      </footer>
    </div>
  )
}