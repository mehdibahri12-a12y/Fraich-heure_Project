import axios from 'axios';
import { API_URL } from '../config';

export const weeklyProductService = {
    getCurrentWeeklyProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/weekly`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getWeeklyProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/weekly/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};