import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f6ff",
          100: "#ebeefe",
          200: "#d6dcfc",
          300: "#b3bdf8",
          400: "#8993f2",
          500: "#5c62ea",
          600: "#4042d6",
          700: "#3436ad",
          800: "#2d2e86",
          900: "#202052"
        }
      },
      boxShadow: {
        glow: "0 0 30px -10px rgba(92, 98, 234, 0.5)"
      }
    }
  },
  plugins: []
};

export default config;
