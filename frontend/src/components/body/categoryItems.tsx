import React from 'react';
import { Grid2 } from '@mui/material';
import { Item } from '../../types/item';
import { CartItem } from '../../types/cart';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';

interface CategoryItemsProps {
    items: Item[];
    cartItems: CartItem[];
    selectedCategoryId: number | null;
    onAddToCart: (item: Item) => void;
    onRemoveFromCart: (item: Item) => void;
}


const CategoryItems: React.FC<CategoryItemsProps> = ({ items, cartItems, selectedCategoryId, onAddToCart, onRemoveFromCart }) => {

    const getAddedQuantity = (item: Item) => {
        const cartItem = cartItems?.find(cartItem => cartItem.id === item.id);
        if (cartItem) {
            return cartItem.quantity;
        }
        return 0;
    }

    const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
        return (
            <Card sx={{ width: "95%", display: 'flex', flexDirection: 'column', borderRadius: 5 }}>
                <CardMedia
                    component="img"
                    height="300"
                    alt={item.name}
                    image={`/${item.image_id}.jpg`}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "left" }} >
                    <Typography variant="h6" component="div" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name} {getAddedQuantity(item) > 0 ? ` (${getAddedQuantity(item)})` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => onAddToCart(item)} color="success">
                        <Add />
                    </IconButton>
                    <IconButton onClick={() => onRemoveFromCart(item)} color="error">
                        <Remove />
                    </IconButton>
                </CardActions>
            </Card>
        );
    };


    return (
        <Grid2 container spacing={5}>
            {items
                .filter((item) => item.category_id === selectedCategoryId) // Filter items based on selected category
                .map((item) => (
                    <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4 }} >
                        <ItemCard
                            item={item}
                        />
                    </Grid2>
                ))}
        </Grid2>
    );
};

export default CategoryItems;

