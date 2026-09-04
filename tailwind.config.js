/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4C1D95",
          900: "#3B0764",
        },
        accent: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        sunshine: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        ink: {
          DEFAULT: "#1E1B2E",
          soft: "#6B6478",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        brand: "0 10px 30px -6px rgba(124,58,237,0.35)",
        accent: "0 10px 30px -6px rgba(244,63,94,0.35)",
        card: "0 6px 20px rgba(30,27,46,0.08)",
        "card-hover": "0 16px 34px rgba(30,27,46,0.16)",
        glow: "0 0 0 4px rgba(124,58,237,0.15)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(124,58,237,0.45)" },
          "50%": { boxShadow: "0 0 0 10px rgba(124,58,237,0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp .6s ease both",
        shimmer: "shimmer 1.6s linear infinite",
        floaty: "floaty 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
}
