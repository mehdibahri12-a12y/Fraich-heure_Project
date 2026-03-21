import React, { useState } from 'react'; // Remove useEffect import if not needed elsewhere
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        zipCode: user?.address?.zipCode || '',
        phone: user?.phone || '',
        specialInstructions: '',
        paymentMethod: 'cash'
    });

    // REMOVE THIS useEffect completely - it's causing the problem!
    // React.useEffect(() => {
    //   if (cartItems.length === 0) {
    //     navigate('/cart');
    //   }
    // }, [cartItems.length, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare order items
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            itemType: item.isWeekly ? 'WeeklyProduct' : 'Product',
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            unit: item.unit
        }));

        const orderData = {
            items: orderItems,
            totalAmount: cartTotal,
            deliveryAddress: {
                street: formData.street,
                city: formData.city,
                zipCode: formData.zipCode
            },
            phone: formData.phone,
            specialInstructions: formData.specialInstructions,
            paymentMethod: formData.paymentMethod,
            orderType: cartItems.some(item => item.isWeekly) ? 'weekly' : 'regular'
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/orders',
                orderData,
                { headers: { 'x-auth-token': token } }
            );

            // Clear cart
            clearCart();

            // Navigate directly to order confirmation
            // The cart is empty now, but we're navigating immediately
            navigate(`/order-confirmation/${response.data._id}`);

        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order. Please try again.');
            setLoading(false);
        }
    };

    // If cart is empty, show message (but don't auto-redirect)
    if (cartItems.length === 0 && !loading) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <p>Add some items to your cart before checking out.</p>
                <Link to="/products" className="shop-now-btn">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-section">
                        <h2>Delivery Information</h2>

                        <div className="form-group">
                            <label>Street Address</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Additional Information</h2>

                        <div className="form-group">
                            <label>Special Instructions (optional)</label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Any special delivery instructions or notes?"
                            />
                        </div>

                        <div className="form-group">
                            <label>Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            >
                                <option value="cash">Cash on Delivery</option>
                                <option value="card">Card on Delivery</option>
                            </select>
                            <small>Pay when your order arrives</small>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="place-order-btn"
                        disabled={loading}
                    >
                        {loading ? 'Placing Order...' : `Place Order • $${cartTotal.toFixed(2)}`}
                    </button>
                </form>

                <div className="order-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-items">
                        {cartItems.map(item => (
                            <div key={item.productId} className="summary-item">
                                <span>{item.quantity} × {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-row total">
                        <strong>Total</strong>
                        <strong>${cartTotal.toFixed(2)}</strong>
                    </div>

                    <div className="delivery-note">
                        📦 Estimated delivery: 2-3 business days
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;