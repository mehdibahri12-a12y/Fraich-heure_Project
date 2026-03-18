import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
                {!product.isAvailable && (
                    <span className="out-of-stock">Out of Stock</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description.substring(0, 60)}...</p>

                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)} / {product.unit}</span>
                    <Link to={`/product/${product._id}`} className="view-btn">
                        View Details
                    </Link>
                </div>

                {product.origin && (
                    <small className="product-origin">🌱 {product.origin}</small>
                )}
            </div>
        </div>
    );
};

export default ProductCard;