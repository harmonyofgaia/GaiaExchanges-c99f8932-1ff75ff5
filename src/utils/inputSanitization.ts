/**
 * Comprehensive input sanitization utilities
 */

import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes input by removing potentially dangerous XSS vectors
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";

  // Use sanitize-html to remove dangerous tags and attributes
  const sanitized = sanitizeHtml(input, {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all attributes
    allowedSchemes: ["http", "https", "mailto"], // Only allow safe URL schemes
    disallowedTagsMode: "discard",
  });

  return sanitized.trim();
}

/**
 * Validates and sanitizes email addresses
 */
export function validateEmail(email: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  const sanitized = sanitizeInput(email);

  if (!sanitized) {
    return { isValid: false, sanitized: "", error: "Email is required" };
  }

  if (sanitized.length > 254) {
    return { isValid: false, sanitized, error: "Email is too long" };
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(sanitized)) {
    return { isValid: false, sanitized, error: "Invalid email format" };
  }

  return { isValid: true, sanitized };
}

/**
 * Validates text input with length and content checks
 */
export function validateTextInput(
  input: string,
  options: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    allowHtml?: boolean;
  } = {},
): { isValid: boolean; sanitized: string; error?: string } {
  const {
    minLength = 0,
    maxLength = 1000,
    required = false,
    allowHtml = false,
  } = options;

  const sanitized = allowHtml ? input.trim() : sanitizeInput(input);

  if (required && !sanitized) {
    return { isValid: false, sanitized: "", error: "This field is required" };
  }

  if (sanitized.length < minLength) {
    return {
      isValid: false,
      sanitized,
      error: `Minimum length is ${minLength} characters`,
    };
  }

  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      sanitized,
      error: `Maximum length is ${maxLength} characters`,
    };
  }

  return { isValid: true, sanitized };
}

/**
 * Rate limiting utility for form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(
    identifier: string,
    maxAttempts: number = 5,
    windowMs: number = 60000,
  ): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter((time) => now - time < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);

    return true;
  }

  getRemainingTime(identifier: string, windowMs: number = 60000): number {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;

    const oldestAttempt = Math.min(...userAttempts);
    const timeRemaining = windowMs - (Date.now() - oldestAttempt);

    return Math.max(0, timeRemaining);
  }
}

export const rateLimiter = new RateLimiter();

/**
 * CSRF token generation and validation
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export function validateCSRFToken(
  token: string,
  expectedToken: string,
): boolean {
  if (!token || !expectedToken || token.length !== expectedToken.length) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }

  return result === 0;
}
