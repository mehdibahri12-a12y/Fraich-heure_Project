import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Nav from './components/Nav';
import WeeklyMarket from './pages/WeeklyMarket';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';




// Protected route component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <Nav />


        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
              <div className="home-content">
                <h1>Welcome to Organic Store</h1>
                <p>Your trusted source for organic products</p>
              </div>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/weekly-market" element={
            <ProtectedRoute>
              <WeeklyMarket />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation/:id" element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;