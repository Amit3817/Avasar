import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Website Components
import Navbar from './components/website/Navbar';
import Footer from './components/website/Footer';
import Home from './pages/website/Home';
import About from './pages/website/About';
import Contact from './pages/website/Contact';
import Login from './pages/website/Login';
import Register from './pages/website/Register';
import OTP from './pages/website/OTP';
import ForgotPassword from './pages/website/ForgotPassword';
import Plan from './pages/website/Plan';
import Rewards from './pages/website/Rewards';

// User Panel Components
import UserLayout from './components/user/UserLayout';
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import UserTeam from './pages/user/Team';
import UserIncome from './pages/user/Income';
import UserRank from './pages/user/Rank';

// Admin Panel Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminContacts from './pages/admin/Contacts';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Loading Component
import LoadingSpinner from './components/LoadingSpinner';

// API Configuration
axios.defaults.baseURL = 'http://localhost:5000/api';

function AuthRedirect({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner fullScreen text="Checking authentication..." />;
  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/user" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            {/* Website Routes */}
            <Route path="/" element={<WebsiteLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="plan" element={<Plan />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<AuthRedirect><Login /></AuthRedirect>} />
              <Route path="register" element={<AuthRedirect><Register /></AuthRedirect>} />
              <Route path="otp" element={<OTP />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* User Panel Routes */}
            <Route path="/user" element={<ProtectedRoute role="user" />}>
              <Route element={<UserLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="team" element={<UserTeam />} />
                <Route path="income" element={<UserIncome />} />
                <Route path="rank" element={<UserRank />} />
              </Route>
            </Route>

            {/* Admin Panel Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>
            </Route>

            {/* Redirect to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Website Layout Component
function WebsiteLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading your dashboard..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin' && user.role !== 'admin') {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}

export default App;
