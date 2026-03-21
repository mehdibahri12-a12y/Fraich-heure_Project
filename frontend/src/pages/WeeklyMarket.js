import React, { useState, useEffect } from 'react';
import { weeklyProductService } from '../services/weeklyProductService';
import { useCart } from '../context/CartContext';
import './WeeklyMarket.css';

const WeeklyMarket = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();

    const categories = [
        'all',
        'vegetable',
        'fruit',
        'dairy',
        'eggs',
        'chicken',
        'cheese'
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
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filterByCategory = (category) => {
        setSelectedCategory(category);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            vegetable: '🥬',
            fruit: '🍎',
            dairy: '🥛',
            eggs: '🥚',
            chicken: '🍗',
            cheese: '🧀'
        };
        return icons[category] || '🌱';
    };

    const getCategoryLabel = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        // Convert weekly product to cart item format
        const cartProduct = {
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            unit: product.unit,
            isWeekly: true
        };
        addToCart(cartProduct, 1);
        alert(`Added ${product.name} to your weekly basket!`);
    };

    if (loading) {
        return (
            <div className="weekly-loading">
                <div className="spinner"></div>
                <p>Loading this week's fresh picks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weekly-error">
                <p>{error}</p>
                <button onClick={fetchWeeklyProducts}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="weekly-market">
            <div className="weekly-header">
                <h1>🌱 This Week's Fresh Market</h1>
                <p>Direct from local farmers • Changes every week</p>
                {products.length > 0 && (
                    <div className="week-badge">
                        📅 Week of {new Date(products[0]?.weekOf || Date.now()).toLocaleDateString()}
                    </div>
                )}
            </div>

            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => filterByCategory(category)}
                    >
                        {category !== 'all' && getCategoryIcon(category)} {getCategoryLabel(category)}
                    </button>
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-weekly-products">
                    <p>No products available in this category this week.</p>
                    <p>Check back next week for fresh new items!</p>
                </div>
            ) : (
                <div className="weekly-grid">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="weekly-card">
                            <div className="weekly-card-image">
                                <img src={product.imageUrl} alt={product.name} />
                                <span className="farmer-badge">👨‍🌾 {product.farmer}</span>
                            </div>

                            <div className="weekly-card-content">
                                <div className="weekly-category">
                                    {getCategoryIcon(product.category)} {getCategoryLabel(product.category)}
                                </div>
                                <h3>{product.name}</h3>

                                <div className="weekly-price">
                                    ${product.price.toFixed(2)} <span>/ {product.unit}</span>
                                </div>

                                {product.description && (
                                    <p className="weekly-description">{product.description}</p>
                                )}

                                {product.farmerLocation && (
                                    <div className="farmer-location">
                                        📍 {product.farmerLocation}
                                    </div>
                                )}

                                <div className="weekly-stock">
                                    {product.availableQuantity > 0 ? (
                                        <span className="in-stock">✓ {product.availableQuantity} available</span>
                                    ) : (
                                        <span className="out-of-stock">✗ Sold out</span>
                                    )}
                                </div>

                                <button
                                    className="add-weekly-btn"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.availableQuantity === 0}
                                >
                                    Add to Weekly Basket
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeeklyMarket;