export interface TeamMember {
  id?: string
  name: string
  role: string
  bio?: string
  imagePlaceholder?: string
}

export interface TeamGridProps {
  members: TeamMember[]
  className?: string
}

export function TeamGrid({ members, className = "" }: TeamGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {members.map((member, index) => (
        <div
          key={member.id ?? `${member.name}-${index}`}
          className="flex flex-col items-center text-center gap-3"
        >
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
            {member.imagePlaceholder ?? "👤"}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
            <p className="text-xs text-gray-500">{member.role}</p>
          </div>

          {member.bio && (
            <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
          )}
        </div>
      ))}
    </div>
  )
}