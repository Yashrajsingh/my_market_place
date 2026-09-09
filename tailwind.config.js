/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-style neutral scale — used as the app's primary accent (buttons, links, active states)
        brand: {
          50: "#EAF4FE",
          100: "#D6E9FD",
          200: "#ADD3FB",
          300: "#7DB8F8",
          400: "#4098F5",
          500: "#0071E3",
          600: "#0058B0",
          700: "#004689",
          800: "#003368",
          900: "#00224A",
        },
        // Muted system red — used sparingly for deals/sale/destructive accents
        accent: {
          50: "#FFF1F0",
          100: "#FFE1DE",
          200: "#FFC2BC",
          300: "#FF9D97",
          400: "#FF6B61",
          500: "#FF3B30",
          600: "#D70015",
          700: "#A20014",
          800: "#7D0010",
          900: "#57000B",
        },
        sunshine: {
          300: "#FFD97D",
          400: "#FFC64D",
          500: "#FF9F0A",
          600: "#D97E00",
        },
        ink: {
          DEFAULT: "#1D1D1F",
          soft: "#6E6E73",
        },
        // Re-map Tailwind's stock vivid palettes to the same neutral/blue/red system so any
        // component still using violet-*/purple-*/pink-*/rose-*/fuchsia-* classes stays in theme.
        violet: {
          50: "#EAF4FE", 100: "#D6E9FD", 200: "#ADD3FB", 300: "#7DB8F8", 400: "#4098F5",
          500: "#0071E3", 600: "#0058B0", 700: "#004689", 800: "#003368", 900: "#00224A",
        },
        purple: {
          50: "#FBFBFD", 100: "#F5F5F7", 200: "#E8E8ED", 300: "#D2D2D7", 400: "#AEAEB2",
          500: "#8E8E93", 600: "#6E6E73", 700: "#515154", 800: "#3A3A3C", 900: "#1D1D1F",
        },
        fuchsia: {
          50: "#FBFBFD", 100: "#F5F5F7", 200: "#E8E8ED", 300: "#D2D2D7", 400: "#AEAEB2",
          500: "#8E8E93", 600: "#6E6E73", 700: "#515154", 800: "#3A3A3C", 900: "#1D1D1F",
        },
        pink: {
          50: "#FFF1F0", 100: "#FFE1DE", 200: "#FFC2BC", 300: "#FF9D97", 400: "#FF6B61",
          500: "#FF3B30", 600: "#D70015", 700: "#A20014", 800: "#7D0010", 900: "#57000B",
        },
        rose: {
          50: "#FFF1F0", 100: "#FFE1DE", 200: "#FFC2BC", 300: "#FF9D97", 400: "#FF6B61",
          500: "#FF3B30", 600: "#D70015", 700: "#A20014", 800: "#7D0010", 900: "#57000B",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text",
          "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif",
        ],
        display: [
          "-apple-system", "BlinkMacSystemFont", "SF Pro Display",
          "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif",
        ],
      },
      boxShadow: {
        brand: "0 8px 24px -6px rgba(0,0,0,0.18)",
        accent: "0 8px 24px -6px rgba(0,0,0,0.18)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 28px rgba(0,0,0,0.12)",
        glow: "0 0 0 4px rgba(0,113,227,0.15)",
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
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,113,227,0.35)" },
          "50%": { boxShadow: "0 0 0 10px rgba(0,113,227,0)" },
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
