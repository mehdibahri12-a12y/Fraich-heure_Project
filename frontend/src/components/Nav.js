import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Nav.css';

const Nav = () => {
    // Get user and logout from AuthContext
    const { user, logout } = useAuth();  // THIS WAS MISSING
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="main-nav">
            <div className="nav-brand">
                <Link to="/">Organic Store</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/weekly-market">Weekly Market</Link>
                <Link to="/cart" className="cart-link">
                    🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </Link>
                {user ? (
                    <>
                        <span className="welcome-text">Welcome, {user.name}!</span>
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                <Link to="/orders">My Orders</Link>
            </div>
        </nav>
    );
};

export default Nav;