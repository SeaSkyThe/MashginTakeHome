import { useState } from 'react'
import { Category } from './types/api'
import CartItem from './types/cart'
import Header from './components/header'
import Footer from './components/footer'
import Body from './components/body'
import { Box } from '@mui/material';
import './App.css'

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header cartItems={cartItems} setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
            <Box sx={{ flex: 1 }}>
                <Body categories={categories} setCategories={setCategories} cartItems={cartItems} setCartItems={setCartItems} />
            </Box>
            <Footer />
        </Box>
    )
}

export default App
