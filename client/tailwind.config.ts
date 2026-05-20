import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#00D4FF",
          violet: "#7C3AED",
          navy: "#0A0F1E",
        },
      },

      fontFamily: {
        mono: ["Space Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },

      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        glitch: {
          "0%, 100%": {
            textShadow:
              "2px 0 #00D4FF, -2px 0 #7C3AED",
          },
          "25%": {
            textShadow:
              "-2px 0 #00D4FF, 2px 0 #7C3AED",
          },
          "50%": {
            textShadow:
              "2px 2px #00D4FF, -2px -2px #7C3AED",
          },
          "75%": {
            textShadow:
              "-2px 2px #00D4FF, 2px -2px #7C3AED",
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },

      animation: {
        fadeInUp: "fadeInUp 0.4s ease-out",
        glitch: "glitch 1.5s infinite",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },

  plugins: [],
};

export default config;