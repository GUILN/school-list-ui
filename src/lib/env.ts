/**
 * Environment configuration utilities
 * This file handles environment variables in a way that's compatible with both Vite and Jest
 */

/**
 * Get API URL from environment variables
 * This function works in both Vite (production) and Jest (testing) environments
 */
export function getApiUrl(): string {
  // In production/development with Vite
  if (typeof globalThis !== "undefined" && "VITE_API_URL" in globalThis) {
    return (
      (globalThis as { VITE_API_URL?: string }).VITE_API_URL ||
      "http://localhost:3000/api"
    );
  }

  // In Node.js environment (Jest)
  if (typeof process !== "undefined" && process.env) {
    return process.env.VITE_API_URL || "http://localhost:3000/api";
  }

  // Fallback for tests
  return "http://localhost:3000/api";
}

/**
 * Check if we're in development mode
 * Compatible with both Vite and Jest environments
 */
export function isDevelopmentMode(): boolean {
  // In Node.js environment (Jest)
  if (typeof process !== "undefined" && process.env) {
    return process.env.NODE_ENV === "development";
  }

  // Default fallback for tests
  return false;
}
