import axios from 'axios';
import { API_URL } from '../config';

export const productService = {
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    searchProducts: async (query) => {
        try {
            const response = await axios.get(`${API_URL}/products/search?q=${query}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};