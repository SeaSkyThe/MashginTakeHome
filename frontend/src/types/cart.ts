import { Item } from './api';

interface CartItem extends Item {
    quantity: number;
}

export default CartItem;
