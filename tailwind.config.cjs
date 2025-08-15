/** @type {import("tailwindcss").Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        ".bg-background": { backgroundColor: String(theme("colors.background")) },
        ".text-foreground": { color: String(theme("colors.foreground")) },
        ".border-border": { borderColor: String(theme("colors.border")) },
      });
    }),
    require("tailwindcss-animate"),
  ],
};
