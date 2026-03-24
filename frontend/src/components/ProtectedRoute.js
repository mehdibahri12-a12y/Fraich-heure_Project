import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="protected-loading">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <motion.div
                className="protected-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="message-card">
                    <div className="message-icon">🌱</div>
                    <h2>Welcome to Food-Health-Care</h2>
                    <p>Please log in or create an account to access our organic products and weekly market.</p>
                    <div className="message-buttons">
                        <a href="/login" className="message-login-btn">Login</a>
                        <a href="/register" className="message-register-btn">Create Account</a>
                    </div>
                    <p className="message-note">
                        New to organic? <br/> Join us and discover fresh, natural products from local farmers.
                    </p>
                </div>
            </motion.div>
        );
    }

    return children;
};

export default ProtectedRoute;