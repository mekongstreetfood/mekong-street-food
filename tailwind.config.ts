import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        accent: {
          DEFAULT: "#FF003C",
          secondary: "#FF8A00",
        },
        foreground: "#F5F5F5",
        muted: "rgba(245, 245, 245, 0.55)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "neon-glow":
          "linear-gradient(135deg, #FF003C 0%, #FF8A00 50%, #FF003C 100%)",
      },
      animation: {
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "smoke": "smoke 20s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(255, 0, 60, 0.5), 0 0 40px rgba(255, 138, 0, 0.25)",
          },
          "50%": {
            boxShadow:
              "0 0 32px rgba(255, 0, 60, 0.85), 0 0 64px rgba(255, 138, 0, 0.45)",
          },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        smoke: {
          "0%, 100%": { opacity: "0.35", transform: "translateY(0) scale(1)" },
          "50%": { opacity: "0.55", transform: "translateY(-2%) scale(1.02)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
