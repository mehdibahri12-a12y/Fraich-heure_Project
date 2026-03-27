import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HeartIcon,
    TruckIcon,
    SparklesIcon,
    HomeIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';
import './Home.css';

const Home = () => {
    const features = [
        { icon: '🌿', title: '100% Organic', description: 'Certified organic products from local farms' },
        { icon: HeartIcon, title: 'Farm to Table', description: 'Fresh harvest delivered directly to you' },
        { icon: TruckIcon, title: 'Free Delivery', description: 'On orders over $50, within 2-3 days' },
        { icon: SparklesIcon, title: 'Weekly Market', description: 'New seasonal products every week' }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero-badge">Welcome to</span>
                        <h1>Fraich'heure</h1>
                        <p>Your trusted source for organic goodness, straight from nature's heart to your table.</p>
                        <div className="hero-buttons">
                            <Link to="/products" className="hero-btn-primary">Shop Now</Link>
                            <Link to="/weekly-market" className="hero-btn-secondary">Weekly Market</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2>Why Choose Us?</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="feature-icon">
                                    {typeof feature.icon === 'string' ?
                                        <span style={{ fontSize: '2rem' }}>{feature.icon}</span> :
                                        <feature.icon />
                                    }
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Weekly Market Preview */}
            <section className="weekly-preview">
                <div className="container">
                    <div className="preview-content">
                        <div className="preview-text">
                            <span className="preview-badge">Fresh Every Week</span>
                            <h2>Discover Our Weekly Market</h2>
                            <p>Seasonal fruits, vegetables, dairy, and more - directly from local farmers. New products arrive every week!</p>
                            <Link to="/weekly-market" className="preview-btn">
                                Explore This Week's Harvest
                                <span>→</span>
                            </Link>
                        </div>
                        <div className="preview-floral">
                            <div className="floral-icon">🌸</div>
                            <div className="floral-icon">🌻</div>
                            <div className="floral-icon">🍎</div>
                            <div className="floral-icon">🥬</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p>"The quality is amazing! The vegetables taste like they were picked this morning."</p>
                            <div className="customer">- Sarah M.</div>
                        </div>
                        <div className="testimonial-card">
                            <p>"I love the weekly market concept. Always excited to see what's new from local farmers."</p>
                            <div className="customer">- David K.</div>
                        </div>
                        <div className="testimonial-card">
                            <p>"Finally found a reliable source for organic products. Highly recommend!"</p>
                            <div className="customer">- Elena R.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Start Your Organic Journey?</h2>
                    <p>Join our community and experience the taste of real, organic food.</p>
                    <Link to="/register" className="cta-btn">Create Free Account</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;