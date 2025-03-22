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
            main: "#6A994E",
        },
        warning: {
            main: "#FFBE0B",
        },
        error: {
            main: "#D7263D",
        },
        info: {
            main: "#3A86FF",
        },
    },
    typography: {
        fontFamily: "'monospace', 'Roboto', 'Arial', sans-serif",
    }
});

export default theme;

