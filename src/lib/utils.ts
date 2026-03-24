import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isDevelopmentMode as envIsDevelopmentMode } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely checks if we're in development mode, compatible with both Vite and Jest environments
 */
export function isDevelopmentMode(): boolean {
  return envIsDevelopmentMode();
}
