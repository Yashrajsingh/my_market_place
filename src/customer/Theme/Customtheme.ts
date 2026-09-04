import { createTheme } from "@mui/material";

/* =====================================================
   BRAND TOKENS — bold & vibrant marketplace identity
   Violet (trust/primary action) + Rose (energy/deals)
===================================================== */

export const brand = {
  violet: "#7C3AED",
  violetDark: "#5B21B6",
  violetLight: "#A78BFA",
  rose: "#F43F5E",
  roseDark: "#BE123C",
  roseLight: "#FB7185",
  amber: "#F59E0B",
  ink: "#1E1B2E",
  inkSoft: "#6B6478",
};

export const gradients = {
  brand: "linear-gradient(135deg, #7C3AED 0%, #D946EF 50%, #F43F5E 100%)",
  brandSoft: "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(244,63,94,0.10))",
  cta: "linear-gradient(135deg, #7C3AED 0%, #F43F5E 100%)",
  sunset: "linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)",
  dark: "linear-gradient(160deg, #150F27 0%, #241736 55%, #3B0F35 100%)",
};

const customeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brand.violet,
      light: brand.violetLight,
      dark: brand.violetDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: brand.rose,
      light: brand.roseLight,
      dark: brand.roseDark,
      contrastText: "#ffffff",
    },
    warning: {
      main: brand.amber,
    },
    success: {
      main: "#16A34A",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8F7FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: brand.ink,
      secondary: brand.inkSoft,
    },
    divider: "rgba(30,27,46,0.08)",
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: '"Poppins", "Inter", "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: "none" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 700,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 9,
          paddingBottom: 9,
          transition: "transform .25s ease, box-shadow .25s ease, background .25s ease",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #7C3AED, #A21CAF)",
          boxShadow: "0 10px 24px rgba(124,58,237,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #6D28D9, #86198F)",
            boxShadow: "0 14px 30px rgba(124,58,237,0.45)",
            transform: "translateY(-2px)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #F43F5E, #FB923C)",
          boxShadow: "0 10px 24px rgba(244,63,94,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #E11D48, #EA580C)",
            boxShadow: "0 14px 30px rgba(244,63,94,0.45)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5, transform: "translateY(-1px)" },
        },
        text: {
          "&:hover": { background: "rgba(124,58,237,0.08)" },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 600 },
        colorSuccess: { backgroundColor: "#DCFCE7", color: "#15803D" },
        colorWarning: { backgroundColor: "#FEF3C7", color: "#B45309" },
        colorError: { backgroundColor: "#FEE2E2", color: "#B91C1C" },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        rounded: { borderRadius: 16 },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 6px 20px rgba(30,27,46,0.08)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: brand.violet,
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
          background: "linear-gradient(90deg,#7C3AED,#F43F5E)",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          "&.Mui-selected": { color: brand.violet },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: brand.ink,
          fontSize: 12,
          borderRadius: 8,
          padding: "6px 10px",
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 999, height: 8 },
        bar: { borderRadius: 999, background: "linear-gradient(90deg,#7C3AED,#F43F5E)" },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700 },
      },
    },
  },
});

export default customeTheme;
