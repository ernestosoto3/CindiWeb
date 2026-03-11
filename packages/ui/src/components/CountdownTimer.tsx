"use client"

import { useEffect, useState } from "react"

export interface CountdownTimerProps {
  targetDate: string
  label?: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime()

  if (Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const diff = Math.max(0, target - Date.now())

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function CountdownTimer({
  targetDate,
  label = "Event starts in",
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      setTimeLeft(getTimeLeft(targetDate))
    }

    update()

    const id = window.setInterval(update, 1000)

    return () => window.clearInterval(id)
  }, [targetDate])

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ]

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {label && (
        <p className="text-sm uppercase tracking-widest text-gray-500">
          {label}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="min-w-[72px] rounded-xl bg-gray-900 px-4 py-3 text-white flex flex-col items-center"
          >
            <span className="text-2xl font-bold tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs text-gray-400">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}