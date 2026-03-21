import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const weeklyProductService = {
    // Get current weekly products
    getCurrentWeeklyProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/weekly`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get weekly products by category
    getWeeklyProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/weekly/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};