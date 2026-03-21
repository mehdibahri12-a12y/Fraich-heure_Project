import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams(); // Gets the product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await productService.getProductById(id);
            setProduct(data);
        } catch (err) {
            setError('Product not found');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`Added ${quantity} × ${product.name} to cart!`);
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-error">
                <h2>Oops!</h2>
                <p>{error || 'Product not found'}</p>
                <Link to="/products" className="back-link">← Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <Link to="/products" className="back-link">← Back to Products</Link>

            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.imageUrl} alt={product.name} />
                    {!product.isAvailable && (
                        <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                </div>

                <div className="product-detail-info">
                    <span className="product-category">{product.category}</span>
                    <h1>{product.name}</h1>

                    <div className="product-meta">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <span className="product-unit">per {product.unit}</span>
                    </div>

                    <div className="product-origin">
                        <span>🌱 From: {product.origin || 'Local farms'}</span>
                        {product.isOrganic && <span className="organic-badge">100% Organic</span>}
                    </div>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="product-stock">
                        {product.stock > 0 ? (
                            <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                        ) : (
                            <span className="out-of-stock">✗ Out of Stock</span>
                        )}
                    </div>

                    {product.isAvailable && product.stock > 0 && (
                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >−</button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= product.stock}
                                >+</button>
                            </div>

                            <button
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;