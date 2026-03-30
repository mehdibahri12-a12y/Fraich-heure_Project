import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './OrderConfirmation.css';

console.log('OrderConfirmation component file loaded');

const OrderConfirmation = () => {
    console.log('OrderConfirmation component rendering'); // ADD THIS
    const { id } = useParams();
    console.log('Order ID from params:', id); // ADD THIS
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id, fetchOrder]);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5000/api/orders/${id}`,
                { headers: { 'x-auth-token': token } }
            );
            setOrder(response.data);
        } catch (error) {
            console.error('Failed to fetch order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="confirmation-loading">
                <div className="spinner"></div>
                <p>Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="confirmation-error">
                <h2>Order Not Found</h2>
                <Link to="/products">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="success-icon">✓</div>
                <h1>Order Confirmed!</h1>
                <p className="order-number">Order #{order._id.slice(-8)}</p>
                <p>Thank you for your order. We'll notify you when it's ready.</p>

                <div className="order-details">
                    <div className="detail-section">
                        <h3>Order Summary</h3>
                        {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                                <span>{item.quantity} × {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="order-total">
                            <strong>Total</strong>
                            <strong>${order.totalAmount.toFixed(2)}</strong>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Delivery Address</h3>
                        <p>{order.deliveryAddress.street}</p>
                        <p>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</p>
                        <p>📞 {order.phone}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Estimated Delivery</h3>
                        <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
                        <p className="status-badge">{order.status}</p>
                    </div>

                    {order.specialInstructions && (
                        <div className="detail-section">
                            <h3>Special Instructions</h3>
                            <p>{order.specialInstructions}</p>
                        </div>
                    )}
                </div>

                <div className="confirmation-actions">
                    <Link to="/products" className="continue-btn">
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className="orders-btn">
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;