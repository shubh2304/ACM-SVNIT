import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020408",
        surface: "#0D1117",
        "surface-2": "#111827",
        cyan: {
          DEFAULT: "#00D4FF",
          50: "#E6FBFF",
          100: "#CCFBFF",
          200: "#99F5FF",
          300: "#66EFFF",
          400: "#33E9FF",
          500: "#00D4FF",
          600: "#00AACC",
          700: "#007F99",
          800: "#005566",
          900: "#002A33",
        },
        violet: {
          DEFAULT: "#7B2FFF",
          50: "#F3EBFF",
          100: "#E6D5FF",
          200: "#CCABFF",
          300: "#B381FF",
          400: "#9957FF",
          500: "#7B2FFF",
          600: "#6225CC",
          700: "#491C99",
          800: "#311266",
          900: "#180933",
        },
        text: {
          primary: "#F0F4FF",
          muted: "#6B7FA3",
          subtle: "#3D4F6E",
        },
        border: "rgba(0, 212, 255, 0.15)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-cyan": "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "glow-violet": "radial-gradient(ellipse at center, rgba(123,47,255,0.15) 0%, transparent 70%)",
        "grid-pattern": "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "ticker": "ticker 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)",
        "glow-violet": "0 0 20px rgba(123,47,255,0.3), 0 0 60px rgba(123,47,255,0.1)",
        "card": "0 0 0 1px rgba(0,212,255,0.1), 0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(0,212,255,0.3), 0 8px 40px rgba(0,212,255,0.1)",
      },
      borderColor: {
        DEFAULT: "rgba(0, 212, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
