import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        {/* Simple navigation */}
        <nav className="main-nav">
          <div className="nav-brand">Organic Store</div>
          <div className="nav-links">
            <a href="/">Home</a>
            {user ? (
              <>
                <span>Welcome, {user.name}!</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <div className="home-content">
                <h1>Welcome to Organic Store</h1>
                <p>Your trusted source for organic products</p>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;