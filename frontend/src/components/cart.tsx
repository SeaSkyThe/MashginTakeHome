import { CartItem } from "../types/cart";
import { Grid2, Box, Divider, Drawer, IconButton, List, ListItem, Typography, Button } from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";

export interface CartDrawerProps {
    subtotal: number;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCartOpen: boolean;
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ subtotal, cartItems, setCartItems, setIsCartOpen, isCartOpen, setIsCheckoutOpen }) => {
    const handleQuantityChange = (id: number, change: number) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + change } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    
    return (
        <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
            <Box sx={{ width: {md: 430}, display: "flex", flexDirection: "column", height: "100vh" }}>

                <Grid2 sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                    <Grid2 size={8}>
                        <Typography variant="h6" sx={{ paddingLeft: 2, fontWeight: "bold" }} color="secondary">Shopping Cart</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <IconButton onClick={() => setIsCartOpen(false)}>
                            <Close />
                        </IconButton>
                    </Grid2>
                </Grid2>


                <Divider />

                <List sx={{ flex: 1, overflowY: "auto", paddingLeft: 3 }}>
                    {cartItems.length === 0 ? (
                        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>Your cart is empty</Typography>
                    ) : (
                        cartItems.map((item) => (
                            <ListItem key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <img src={`/${item.image_id}.jpg`} alt={item.name} width={50} height={50} style={{ borderRadius: 8 }} />

                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${item.price * item.quantity}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <IconButton size="small" onClick={() => handleQuantityChange(item.id, -1)}>
                                        <Remove />
                                    </IconButton>
                                    <Typography variant="body1">{item.quantity}</Typography>
                                    <IconButton size="small" onClick={() => handleQuantityChange(item.id, 1)}>
                                        <Add />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>

                <Divider />

                {cartItems.length > 0 && (
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", paddingBottom: 2 }} color="secondary">
                            Subtotal: ${subtotal.toFixed(2)}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={
                                () => {
                                    setIsCheckoutOpen(true);
                                    //setIsCartOpen(false);
                                }
                            }
                            sx={{ letterSpacing: ".2em" }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                )}

            </Box>
        </Drawer>
    );
};

export default CartDrawer;

