import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// Available theme options
export const AVAILABLE_THEMES = {
  dark: {
    name: "Dark",
    description: "Classic dark theme with matrix aesthetics",
    icon: "🌙",
  },
  light: {
    name: "Light",
    description: "Clean light theme for daytime use",
    icon: "☀️",
  },
  mellow: {
    name: "Mellow Colorful",
    description: "Soft, warm colors with earth tones",
    icon: "🌈",
  },
  space: {
    name: "Space",
    description: "Deep space theme with cosmic colors",
    icon: "🚀",
  },
  forest: {
    name: "Forest",
    description: "Natural forest theme with green harmony",
    icon: "🌲",
  },
  ocean: {
    name: "Ocean",
    description: "Deep ocean blues and aqua tones",
    icon: "🌊",
  },
} as const;

export type ThemeName = keyof typeof AVAILABLE_THEMES;

// Lock context for UI protection
interface LockContextType {
  isLocked: boolean;
  toggleLock: () => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export function useLock() {
  const context = useContext(LockContext);
  if (context === undefined) {
    throw new Error("useLock must be used within a LockProvider");
  }
  return context;
}

function LockProvider({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Load lock state from localStorage
    const stored = localStorage.getItem("gaia-ui-lock");
    if (stored) {
      setIsLocked(JSON.parse(stored));
    }
  }, []);

  const toggleLock = () => {
    const newLockState = !isLocked;
    setIsLocked(newLockState);
    localStorage.setItem("gaia-ui-lock", JSON.stringify(newLockState));
  };

  return <LockContext.Provider value={{ isLocked, toggleLock }}>{children}</LockContext.Provider>;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={Object.keys(AVAILABLE_THEMES)}
      {...props}
    >
      <LockProvider>{children}</LockProvider>
    </NextThemesProvider>
  );
}
