import { useState, useEffect, useCallback} from "react";

type BackgroundStyle =
  | "classic"
  | "plasma"
  | "galaxy"
  | "forest"
  | "ocean"
  | "fire"
  | "ice"
  | "void"
  | "rainbow"
  | "matrix";

export function useGlobalBackground() {
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>("classic");

  useEffect(() => {
    // Load background preference from localStorage
    const savedBackground = localStorage.getItem("harmony-background") as BackgroundStyle;
    if (savedBackground) {
      setBackgroundStyle(savedBackground);
    }

    // Listen for background changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "harmony-background" && e.newValue) {
        setBackgroundStyle(e.newValue as BackgroundStyle);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const changeBackground = (style: BackgroundStyle) => {
    setBackgroundStyle(style);
    localStorage.setItem("harmony-background", style);
    // Trigger storage event for other windows/tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "harmony-background",
        newValue: style,
      })
    );
  };

  return {
    backgroundStyle,
    changeBackground,
  };
}
