import axios from 'axios';

const API_URL = 'https://mern-final-project-n759.onrender.com/api';

export const productService = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Search products
    searchProducts: async (query) => {
        try {
            const response = await axios.get(`${API_URL}/products/search?q=${query}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};