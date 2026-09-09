import { createTheme } from "@mui/material";

/* =====================================================
   BRAND TOKENS — quiet, premium, Apple Store–inspired
   Blue (primary action) + Red (deals/energy, used sparingly)
===================================================== */

export const brand = {
  violet: "#0071E3",
  violetDark: "#0058B0",
  violetLight: "#4098F5",
  rose: "#FF3B30",
  roseDark: "#D70015",
  roseLight: "#FF6B61",
  amber: "#FF9F0A",
  ink: "#1D1D1F",
  inkSoft: "#6E6E73",
};

export const gradients = {
  brand: "linear-gradient(135deg, #1D1D1F 0%, #1D1D1F 100%)",
  brandSoft: "linear-gradient(135deg, rgba(0,113,227,0.08), rgba(0,113,227,0.08))",
  cta: "linear-gradient(135deg, #0071E3 0%, #0071E3 100%)",
  sunset: "linear-gradient(135deg, #FF3B30 0%, #FF9F0A 100%)",
  dark: "linear-gradient(160deg, #1D1D1F 0%, #2C2C2E 55%, #1D1D1F 100%)",
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
      main: "#34C759",
    },
    error: {
      main: "#FF3B30",
    },
    background: {
      default: "#F5F5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: brand.ink,
      secondary: brand.inkSoft,
    },
    divider: "rgba(0,0,0,0.08)",
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: "none" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 980,
          textTransform: "none",
          fontWeight: 600,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 9,
          paddingBottom: 9,
          transition: "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
        },
        containedPrimary: {
          backgroundColor: brand.violet,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: brand.violetDark,
            boxShadow: "none",
          },
        },
        containedSecondary: {
          backgroundColor: brand.rose,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: brand.roseDark,
            boxShadow: "none",
          },
        },
        outlined: {
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.16)",
          "&:hover": { borderWidth: 1 },
        },
        text: {
          "&:hover": { background: "rgba(0,113,227,0.08)" },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 600 },
        colorSuccess: { backgroundColor: "#E6F9EB", color: "#1B7A34" },
        colorWarning: { backgroundColor: "#FFF2DF", color: "#B4650A" },
        colorError: { backgroundColor: "#FFE9E7", color: "#B0180F" },
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
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
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
          background: brand.violet,
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
        bar: { borderRadius: 999, background: brand.violet },
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
