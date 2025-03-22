import { CartItem } from './cart';

export interface CheckoutPayload {
    items: CartItem[];
    customer_name: string;
    customer_email: string;
    card_number: string;
    cardholder_name: string;
    cvc: string;
    expiration_date: string;
}
