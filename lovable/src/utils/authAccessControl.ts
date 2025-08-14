/**
 * Auth Access Control Utility
 *
 * This module manages conditional access to the user login module based on:
 * 1. Homepage visit requirement (must visit homepage first)
 * 2. Admin development mode (disables user login when enabled)
 * 3. Production domain check (only active on www.gaiaexchanges.com)
 * 4. localStorage state management for tracking
 */

// Constants for localStorage keys
export const STORAGE_KEYS = {
  HOMEPAGE_VISITED: "gaia_homepage_visited",
  ADMIN_DEV_MODE: "gaia_admin_dev_mode",
} as const;

// Production domain constant
export const PRODUCTION_DOMAIN = "www.gaiaexchanges.com";

/**
 * Interface for auth access control state
 */
export interface AuthAccessState {
  hasVisitedHomepage: boolean;
  isAdminDevMode: boolean;
  isProductionDomain: boolean;
  canAccessUserAuth: boolean;
}

/**
 * Checks if the current domain is the production domain
 */
export const isProductionDomain = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.location.hostname === PRODUCTION_DOMAIN;
};

/**
 * Checks if homepage has been visited (stored in localStorage)
 */
export const hasVisitedHomepage = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.HOMEPAGE_VISITED) === "true";
  } catch (error) {
    console.warn("Failed to check homepage visit status:", error);
    return false;
  }
};

/**
 * Sets the homepage visited flag in localStorage
 */
export const setHomepageVisited = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.HOMEPAGE_VISITED, "true");
  } catch (error) {
    console.warn("Failed to set homepage visited flag:", error);
  }
};

/**
 * Checks if admin development mode is enabled
 */
export const isAdminDevMode = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_DEV_MODE) === "true";
  } catch (error) {
    console.warn("Failed to check admin dev mode status:", error);
    return false;
  }
};

/**
 * Toggles admin development mode
 */
export const setAdminDevMode = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_DEV_MODE, enabled.toString());
  } catch (error) {
    console.warn("Failed to set admin dev mode:", error);
  }
};

/**
 * Gets the current auth access state
 */
export const getAuthAccessState = (): AuthAccessState => {
  const hasVisited = hasVisitedHomepage();
  const isAdminDev = isAdminDevMode();
  const isProd = isProductionDomain();

  // User auth is accessible if:
  // 1. User has visited homepage AND
  // 2. Admin dev mode is NOT enabled AND
  // 3. Either in production OR admin dev mode is explicitly disabled
  const canAccessUserAuth = hasVisited && !isAdminDev && (isProd || !isAdminDev);

  return {
    hasVisitedHomepage: hasVisited,
    isAdminDevMode: isAdminDev,
    isProductionDomain: isProd,
    canAccessUserAuth,
  };
};

/**
 * Clears all auth access control flags (for testing/debugging)
 */
export const clearAuthAccessFlags = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HOMEPAGE_VISITED);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_DEV_MODE);
  } catch (error) {
    console.warn("Failed to clear auth access flags:", error);
  }
};

/**
 * Debug helper to log current auth access state
 */
export const debugAuthAccess = (): void => {
  if (typeof window === "undefined") return;
  const state = getAuthAccessState();
  console.group("🔐 Auth Access Control Debug");
  console.log("Domain:", window.location.hostname);
  console.log("Is Production Domain:", state.isProductionDomain);
  console.log("Has Visited Homepage:", state.hasVisitedHomepage);
  console.log("Is Admin Dev Mode:", state.isAdminDevMode);
  console.log("Can Access User Auth:", state.canAccessUserAuth);
  console.groupEnd();
};
