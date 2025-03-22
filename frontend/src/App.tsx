import { useState } from 'react'
import { Category } from './types/item'
import { CartItem } from './types/cart'
import Header from './components/header'
import Footer from './components/footer'
import Body from './components/body'
import { Box } from '@mui/material';
import './App.css'
import CartDrawer from './components/cart'
import CheckoutForm from './components/checkout'

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header cartItems={cartItems} setIsCartOpen={setIsCartOpen} />

            <CartDrawer
                subtotal={calculateSubtotal()}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setIsCartOpen={setIsCartOpen}
                isCartOpen={isCartOpen}
                setIsCheckoutOpen={setIsCheckoutOpen}
                isCheckoutOpen={isCheckoutOpen}
            />

            <CheckoutForm
                subtotal={calculateSubtotal()}
                cartItems={cartItems}
                setCartItems={setCartItems}
                isCheckoutOpen={isCheckoutOpen}
                setIsCheckoutOpen={setIsCheckoutOpen}
            />

            <Box sx={{ flex: 1 }}>
                <Body
                    categories={categories}
                    setCategories={setCategories}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                />
            </Box>
            <Footer />


        </Box>
    )
}

export default App
