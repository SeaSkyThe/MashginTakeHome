
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                padding: "5rem 0",
                marginTop: "auto",
            }}
        >
            <Typography
                variant="body2"
                align="center"
                sx={{ opacity: 0.5 }}
            >
                &copy; 2025 Mashgin Restaurant. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;

