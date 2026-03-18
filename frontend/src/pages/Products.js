import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'all',
        'food',
        'grains',
        'spices',
        'oils',
        'beauty'
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
            console.error(err);
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
                <div className="spinner"></div>
                <p>Loading our organic products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-error">
                <p>{error}</p>
                <button onClick={fetchProducts}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Our Organic Products</h1>
                <p>Fresh, natural, and sustainably sourced</p>
            </div>

            <div className="products-controls">
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => filterByCategory(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="no-products">
                    <p>No products found</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;