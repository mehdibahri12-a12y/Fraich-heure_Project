import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Cart.css';

const Cart = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any organic goodies yet!</p>
                <Link to="/products" className="shop-now-btn">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.productId} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.imageUrl} alt={item.name} />
                            </div>

                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="item-price">${item.price.toFixed(2)} / {item.unit}</p>
                            </div>

                            <div className="cart-item-quantity">
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    className="qty-btn"
                                >−</button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="qty-btn"
                                >+</button>
                            </div>

                            <div className="cart-item-subtotal">
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="remove-btn"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Items ({cartItems.length})</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total">
                        <strong>Total</strong>
                        <strong>${cartTotal.toFixed(2)}</strong>
                    </div>

                    <button
                        className="checkout-btn"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </button>

                    <button onClick={clearCart} className="clear-cart-btn">
                        Clear Cart
                    </button>

                    <Link to="/products" className="continue-shopping">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;