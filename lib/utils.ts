import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Array of visually distinct colors for pills
const colorPalette = [
  "#2563eb", // blue-600
  "#7c3aed", // violet-600
  "#db2777", // pink-600
  "#ea580c", // orange-600
  "#16a34a", // green-600
  "#0891b2", // cyan-600
  "#4f46e5", // indigo-600
  "#c026d3", // fuchsia-600
  "#ca8a04", // yellow-600
  "#be123c", // rose-700
  "#0d9488", // teal-600
  "#9333ea", // purple-600
]

// Function to get a random color from the palette
export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colorPalette.length)
  return colorPalette[randomIndex]
}
