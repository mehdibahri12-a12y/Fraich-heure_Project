import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        { id: 'all', name: 'All Products', icon: '🌿' },
        { id: 'food', name: 'Food', icon: '🍲' },
        { id: 'grains', name: 'Grains', icon: '🌾' },
        { id: 'spices', name: 'Spices', icon: '🌶️' },
        { id: 'oils', name: 'Oils', icon: '🫒' },
        { id: 'beauty', name: 'Beauty', icon: '🌸' }
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchProducts();
            return;
        }

        try {
            setLoading(true);
            const results = await productService.searchProducts(searchQuery);
            setProducts(results);
        } catch (err) {
            setError('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const filterByCategory = async (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            fetchProducts();
        } else {
            try {
                setLoading(true);
                const data = await productService.getProductsByCategory(category);
                setProducts(data);
            } catch (err) {
                setError('Failed to load category');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="products-loading">
                <div className="organic-spinner"></div>
                <p>Harvesting fresh products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-error">
                <div className="error-icon">🌱</div>
                <p>{error}</p>
                <button onClick={fetchProducts}>Try Again</button>
            </div>
        );
    }

    return (
        <motion.div
            className="products-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="products-header">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    From Farm to Table
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Discover our curated collection of organic treasures
                </motion.p>
            </div>

            <div className="products-controls">
                <form onSubmit={handleSearch} className="search-bar">
                    <MagnifyingGlassIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search organic products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                <button
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <AdjustmentsHorizontalIcon />
                    <span>Categories</span>
                </button>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            className="category-filters"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => filterByCategory(category.id)}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {products.length === 0 ? (
                <motion.div
                    className="no-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="empty-state-icon">🍃</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or browse our categories</p>
                </motion.div>
            ) : (
                <motion.div
                    className="products-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Products;