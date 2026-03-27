import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBagIcon,
    CalendarIcon,
    HomeIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,
    ClipboardDocumentListIcon,
    XMarkIcon,
    Bars3Icon
} from '@heroicons/react/24/outline';
import './Nav.css';

const Nav = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { to: '/', label: 'Home', icon: HomeIcon, requiresAuth: false },
        { to: '/products', label: 'Shop', icon: ShoppingBagIcon, requiresAuth: false },
        { to: '/weekly-market', label: 'Weekly Market', icon: CalendarIcon, requiresAuth: false, special: true },
    ];

    const authLinks = user ? [
        { to: '/cart', label: 'Cart', icon: ShoppingBagIcon, badge: cartCount, requiresAuth: true },
        { to: '/orders', label: 'My Orders', icon: ClipboardDocumentListIcon, requiresAuth: true },
    ] : [];

    return (
        <>
            <nav className="main-nav">
                <div className="nav-container">
                    {/* Logo */}
                    <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
                        <div className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4L4 10L16 16L28 10L16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <path d="M4 16L16 22L28 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <path d="M4 22L16 28L28 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <circle cx="16" cy="16" r="3" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="logo-text">
                            <span className="logo-main">FRAICH'HEURE</span>
                            <span className="logo-tagline">Food · Health · Care</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="nav-links-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link ${link.special ? 'nav-link-special' : ''}`}
                            >
                                <link.icon className="nav-icon" />
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        {authLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="nav-link">
                                <link.icon className="nav-icon" />
                                <span>{link.label}</span>
                                {link.badge > 0 && (
                                    <span className="nav-badge">{link.badge}</span>
                                )}
                            </Link>
                        ))}

                        {/* Auth Section */}
                        {user ? (
                            <div className="nav-user">
                                <div className="user-avatar">
                                    <UserCircleIcon className="avatar-icon" />
                                    <span className="user-name">{user.name.split(' ')[0]}</span>
                                </div>
                                <button onClick={handleLogout} className="nav-logout-btn">
                                    <ArrowRightOnRectangleIcon className="nav-icon" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="nav-auth">
                                <Link to="/login" className="nav-login-btn">
                                    <UserCircleIcon className="nav-icon" />
                                    <span>Login</span>
                                </Link>
                                <Link to="/register" className="nav-register-btn">
                                    <UserPlusIcon className="nav-icon" />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`mobile-nav-link ${link.special ? 'mobile-nav-link-special' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <link.icon className="nav-icon" />
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        {authLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="mobile-nav-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <link.icon className="nav-icon" />
                                <span>{link.label}</span>
                                {link.badge > 0 && (
                                    <span className="mobile-nav-badge">{link.badge}</span>
                                )}
                            </Link>
                        ))}

                        <div className="mobile-auth-divider"></div>

                        {user ? (
                            <>
                                <div className="mobile-user-info">
                                    <UserCircleIcon className="mobile-user-icon" />
                                    <span>{user.name}</span>
                                </div>
                                <button onClick={handleLogout} className="mobile-logout-btn">
                                    <ArrowRightOnRectangleIcon className="nav-icon" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="mobile-auth-buttons">
                                <Link to="/login" className="mobile-login-btn" onClick={() => setMobileMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/register" className="mobile-register-btn" onClick={() => setMobileMenuOpen(false)}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;