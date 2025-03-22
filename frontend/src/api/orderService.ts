import { CheckoutPayload } from "../types/checkout";
import api from './apiClient';
import { AxiosResponse } from 'axios';

export const placeOrder = async (payload: CheckoutPayload): Promise<any> => {
    const response: AxiosResponse<any> = await api.post('/order', payload);
    return {
        status: response.status,
        data: response.data,
    }
};
