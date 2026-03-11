export interface ReviewCardProps {
  quote: string
  author: string
  rating?: number
  location?: string
  className?: string
}

export function ReviewCard({
  quote,
  author,
  rating = 5,
  location,
  className = "",
}: ReviewCardProps) {
  const safeRating = Math.max(0, Math.min(5, rating))

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-3 ${className}`}>
      <div className="flex gap-0.5" aria-label={`${safeRating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < safeRating ? "text-yellow-400" : "text-gray-200"}>
            ★
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-gray-700">{quote}</p>

      <div>
        <p className="text-sm font-semibold text-gray-900">{author}</p>
        {location && <p className="text-xs text-gray-500">{location}</p>}
      </div>
    </div>
  )
}