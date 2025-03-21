import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#e9e5e2",
        },
        secondary: {
            main: "#a74023",
        },
        background: {
            default: "#f3f1ef",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#212426",
            secondary: "#ce8a52",
        },
        success: {
            main: "#6A994E", // Earthy Green (for available items)
        },
        warning: {
            main: "#FFBE0B", // Bright Yellow (for limited availability)
        },
        error: {
            main: "#D7263D", // Rich Red (for unavailable items)
        },
        info: {
            main: "#3A86FF", // Blue (for special info)
        },
    },
    typography: {
        fontFamily: "'monospace', 'Roboto', 'Arial', sans-serif",
    }
    //  h1: {
    //    fontSize: "2.8rem",
    //    fontWeight: 700,
    //    fontFamily: "'Playfair Display', serif",
    //  },
    //  h2: {
    //    fontSize: "2.2rem",
    //    fontWeight: 600,
    //    fontFamily: "'Playfair Display', serif",
    //  },
    //  h3: {
    //    fontSize: "1.8rem",
    //    fontWeight: 500,
    //    fontFamily: "'Playfair Display', serif",
    //  },
    //  body1: {
    //    fontSize: "1rem",
    //    fontFamily: "'Roboto', sans-serif",
    //  },
    //  button: {
    //    textTransform: "none",
    //    fontWeight: 600,
    //  },
    //},
    //components: {
    //  MuiButton: {
    //    styleOverrides: {
    //      root: {
    //        borderRadius: "12px",
    //        padding: "10px 20px",
    //        fontWeight: "bold",
    //        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    //      },
    //    },
    //  },
    //  MuiCard: {
    //    styleOverrides: {
    //      root: {
    //        borderRadius: "16px",
    //        padding: "20px",
    //        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
    //      },
    //    },
    //  },
    //  MuiAppBar: {
    //    styleOverrides: {
    //      root: {
    //        backgroundColor: "#B83B5E",
    //        color: "#FFFFFF",
    //      },
    //    },
    //  },
    //  MuiTypography: {
    //    styleOverrides: {
    //      h1: {
    //        color: "#B83B5E",
    //      },
    //      h2: {
    //        color: "#F08A5D",
    //      },
    //    },
    //  },
    //},
});

export default theme;

