"use client"

import { cn } from "@/lib/utils"

interface PillProps {
  label: string
  onClick: () => void
  active?: boolean
  color?: string
}

export function Pill({ label, onClick, active = false, color }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        color ? "" : "bg-teal-100 text-teal-800 hover:bg-teal-200 focus:ring-teal-500",
        active && !color && "bg-teal-600 text-white hover:bg-teal-700",
      )}
      style={
        color
          ? {
              backgroundColor: `${color}20`, // 20% opacity for background
              color: color,
              borderColor: color,
              borderWidth: "1px",
            }
          : {}
      }
    >
      {label}
    </button>
  )
}
