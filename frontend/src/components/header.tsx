import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "../types/cart";



interface HeaderProps {
    cartItems: CartItem[];
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ cartItems, setIsCartOpen }) => {
    return (
        <AppBar position="fixed" color="secondary" elevation={1} >
            <Toolbar>
                <IconButton
                    color="inherit"
                >
                    <img src="/mashginlogo.png" alt="mashginlogo" width="30" height="30" />
                </IconButton>
                <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                    <Typography variant="h5" noWrap component="div"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.25rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            userSelect: 'none',
                        }}

                    >
                        MASHGIN RESTAURANT
                    </Typography>
                </Box>
                <IconButton
                    color="inherit"
                    onClick={() => setIsCartOpen(true)}
                    aria-label="cart"
                >
                    <Badge badgeContent={cartItems.reduce((total, item) => total + item.quantity, 0)} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

