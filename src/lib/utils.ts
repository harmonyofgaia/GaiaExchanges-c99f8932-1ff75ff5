
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Disable popups for production
export const isProduction = process.env.NODE_ENV === 'production'

// Toast configuration for production (no popups)
export const toastConfig = {
  disabled: isProduction,
  position: 'bottom-right' as const,
  duration: isProduction ? 0 : 3000
}
