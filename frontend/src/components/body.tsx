import React, { useEffect, useState } from 'react'
import { Category, Item } from '../types/api';
import CartItem from '../types/cart';
import { getItems } from '../api/itemsService';
import { Box } from '@mui/material';
import CategoryTabs from './body/categoryTabs';
import CategoryDivider from './body/categoryDivider';
import CategoryItems from './body/categoryItems';


export interface BodyProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}


const Body: React.FC<BodyProps> = ({ categories, setCategories, cartItems, setCartItems }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        getItems().then((response) => {
            setCategories(response);
            setSelectedCategory(response[0]);
        });
    }, []);

    const addToCart = (item: Item) => {
        console.log(cartItems)
        var cartItem = cartItems.find(cartItem => cartItem.id === item.id)
        if (cartItem) {
            cartItem.quantity++;
            setCartItems([...cartItems]);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item: Item) => {
        var cartItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (cartItem) {
            cartItem.quantity--;
            if (cartItem.quantity <= 0) {
                setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
                return;
            }
            setCartItems([...cartItems]);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: { xs: 1, sm: 2 }, maxWidth: { xs: '100%', md: 1200 }, margin: '0 auto' }}>
            <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <CategoryDivider selectedCategory={selectedCategory} />

            <CategoryItems
                items={selectedCategory ? selectedCategory.items : []}
                selectedCategoryId={selectedCategory ? selectedCategory.id : null}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
            />




        </Box>
    )
}

export default Body;
