import React, { useState, useEffect } from 'react';
import { weeklyProductService } from '../services/weeklyProductService';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBagIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import './WeeklyMarket.css';

const WeeklyMarket = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [addedToCart, setAddedToCart] = useState({});
    const { addToCart } = useCart();

    const categories = [
        { id: 'all', name: 'All Fresh Picks', icon: '🌿' },
        { id: 'vegetable', name: 'Vegetables', icon: '🥬' },
        { id: 'fruit', name: 'Fruits', icon: '🍎' },
        { id: 'dairy', name: 'Dairy', icon: '🥛' },
        { id: 'eggs', name: 'Eggs', icon: '🥚' },
        { id: 'chicken', name: 'Chicken', icon: '🍗' },
        { id: 'cheese', name: 'Cheese', icon: '🧀' }
    ];

    useEffect(() => {
        fetchWeeklyProducts();
    }, []);

    const fetchWeeklyProducts = async () => {
        try {
            setLoading(true);
            const data = await weeklyProductService.getCurrentWeeklyProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load weekly products');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        const cartProduct = {
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            unit: product.unit,
            isWeekly: true
        };
        addToCart(cartProduct, 1);

        setAddedToCart({ [product._id]: true });
        setTimeout(() => {
            setAddedToCart({});
        }, 2000);
    };

    if (loading) {
        return (
            <div className="weekly-loading">
                <div className="floral-spinner">
                    <span style={{ fontSize: '2rem' }}>🌱</span>
                </div>
                <p>Gathering this week's harvest...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weekly-error">
                <div className="error-flower">🌸</div>
                <p>{error}</p>
                <button onClick={fetchWeeklyProducts}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="weekly-market-page">
            <div className="weekly-hero">
                <motion.div
                    className="weekly-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="hero-floral-decoration">🌼 🌸 🌻</div>
                    <h1>This Week's Fresh Market</h1>
                    <p>Direct from local farmers • Harvested with love</p>
                    <div className="week-badge">
                        <span className="week-icon">📅</span>
                        Week of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </div>
                </motion.div>
            </div>

            <div className="weekly-categories">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`weekly-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <motion.div
                    className="no-weekly-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="empty-flower">🌱</div>
                    <h3>Coming Soon!</h3>
                    <p>New seasonal products arriving next week</p>
                    <p className="small-note">Check back for fresh harvest</p>
                </motion.div>
            ) : (
                <div className="weekly-grid">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="weekly-product-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="weekly-card-image">
                                <img src={product.imageUrl} alt={product.name} />
                                <div className="farmer-tag">
                                    <span>👨‍🌾</span>
                                    <span>{product.farmer}</span>
                                </div>
                            </div>

                            <div className="weekly-card-content">
                                <div className="weekly-category-badge">
                                    {categories.find(c => c.id === product.category)?.icon} {product.category}
                                </div>
                                <h3>{product.name}</h3>
                                <div className="weekly-price">
                                    ${product.price.toFixed(2)} <span>/ {product.unit}</span>
                                </div>
                                {product.description && (
                                    <p className="weekly-description">{product.description}</p>
                                )}
                                <div className="weekly-stock">
                                    {product.availableQuantity > 0 ? (
                                        <span className="in-stock">✓ Fresh & Available</span>
                                    ) : (
                                        <span className="sold-out">Sold Out</span>
                                    )}
                                </div>
                                <button
                                    className="add-weekly-basket-btn"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.availableQuantity === 0}
                                >
                                    <AnimatePresence mode="wait">
                                        {addedToCart[product._id] ? (
                                            <motion.span
                                                key="added"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="added-confirmation"
                                            >
                                                <CheckCircleIcon /> Added!
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="add"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <ShoppingBagIcon />&nbsp; Add to Weekly Basket
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeeklyMarket;