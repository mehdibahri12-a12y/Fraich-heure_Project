import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/orders/my-orders',
                { headers: { 'x-auth-token': token } }
            );
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#ff9800',
            confirmed: '#2196f3',
            preparing: '#9c27b0',
            ready: '#2e7d32',
            delivered: '#4caf50',
            cancelled: '#f44336'
        };
        return colors[status] || '#666';
    };

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="spinner"></div>
                <p>Loading your orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-empty">
                <h2>No Orders Yet</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/products" className="shop-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h1>My Orders</h1>

            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div>
                                <span className="order-id">Order #{order._id.slice(-8)}</span>
                                <span className="order-date">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </span>
                            </div>
                            <span
                                className="order-status"
                                style={{ background: getStatusColor(order.status) }}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="order-item-summary">
                                    <span>{item.quantity} × {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            {order.items.length > 3 && (
                                <div className="more-items">+{order.items.length - 3} more items</div>
                            )}
                        </div>

                        <div className="order-footer">
                            <div className="order-total-summary">
                                <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                            </div>
                            <Link to={`/order-confirmation/${order._id}`} className="view-order-btn">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;