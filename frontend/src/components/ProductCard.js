import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
                {!product.isAvailable && (
                    <span className="out-of-stock-badge">Out of Stock</span>
                )}
                {product.isOrganic && (
                    <span className="product-badge">100% Organic</span>
                )}
            </div>

            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                    {product.description?.substring(0, 80)}...
                </p>

                <div className="product-footer">
                    <span className="product-price">
                        ${product.price.toFixed(2)} <small>/ {product.unit}</small>
                    </span>
                    <Link to={`/product/${product._id}`} className="view-details-btn">
                        View Details
                    </Link>
                </div>

                {product.origin && (
                    <div className="product-origin">
                        <span>🌱 {product.origin}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;