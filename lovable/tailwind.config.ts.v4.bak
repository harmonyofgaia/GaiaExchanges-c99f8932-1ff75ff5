import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))"
      }
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        ".bg-background": { backgroundColor: String(theme("colors.background")) },
        ".text-foreground": { color: String(theme("colors.foreground")) },
        ".border-border": { borderColor: String(theme("colors.border")) }
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-animate")
  ]
};

export default config;
