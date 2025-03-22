import api from './apiClient';
import { Category } from '../types/item';
import { AxiosResponse } from 'axios';

export const getItems = async (): Promise<Category[]> => {
    const response: AxiosResponse<Category[]> = await api.get('/items');
    return response.data;
};
