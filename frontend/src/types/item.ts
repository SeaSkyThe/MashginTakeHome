
export interface Item {
    id: number;
    image_id: string;
    name: string;
    price: number;
    category_id: number;
}

export interface Category {
    id: number;
    image_id: string;
    name: string;
    items: Item[];
}

export interface OrderItem {
    id: number;
    quantity: number;
}

export interface Order {
    items: OrderItem[];
    customer_name: string;
    customer_email: string;
    card_number: string;
    card_holder_name: string;
    cvc: string;
    expiration_date: string;
}

