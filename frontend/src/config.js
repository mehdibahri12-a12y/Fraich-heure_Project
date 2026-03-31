// API Configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_URL = isDevelopment
  ? 'http://localhost:5000/api'
  : 'https://mern-final-project-n759.onrender.com/api';