import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Plan', path: '/plan' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Sidebar Overlay and Drawer for Mobile */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar Drawer (light glassmorphism, blue-accented) */}
          <div
            className="fixed top-0 left-0 z-[9999] w-72 h-screen max-w-full bg-white/80 rounded-r-3xl shadow-2xl flex flex-col md:hidden border-none overflow-hidden backdrop-blur-xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)', border: 'none' }}
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/60">
              <div className="flex items-center">
                <img src="/logo.png" alt="Avasar Logo" className="w-24 h-10 mr-3 shadow-lg" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">Avasar</h1>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-6 space-y-2 bg-yellow-50/30">
              <div>
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`group flex items-center px-4 py-3 rounded-2xl text-base font-bold transition-all duration-300 w-full ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/80'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                ))}
                <div className="border-t border-gray-200/60 my-4"></div>
                {/* Welcome user button styled like nav links */}
                {user && (
                  <Link
                    to="/user/dashboard"
                    className="group flex items-center px-4 py-3 rounded-2xl text-base font-bold transition-all duration-300 w-full bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10 mr-4 text-xl">👋</span>
                    <span className="relative z-10">Welcome, {user.firstName}</span>
                  </Link>
                )}
              </div>
              {/* Logout Button at bottom */}
              {user && (
                <div className="pb-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="group relative overflow-hidden w-full text-left px-4 py-3 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🚪</span>
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* Main Navbar */}
      <nav className="relative overflow-hidden bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <img src="/logo.png" alt="Avasar Logo" className="w-24 h-10 mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  Avasar
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative overflow-hidden px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/80'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {user ? (
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <Link
                    to="/user/dashboard"
                    className="text-sm text-gray-700 font-medium hidden lg:block bg-gradient-to-r from-primary-600 to-blue-600 text-white px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    Welcome, {user.firstName}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden bg-transparent border-2 border-red-500 text-red-600 font-bold py-2 px-4 rounded-2xl transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🚪</span>
                      Logout
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <Link 
                    to="/login" 
                    className="group relative overflow-hidden bg-transparent border-2 border-primary-600 text-primary-600 font-bold py-2 px-4 rounded-2xl transition-all duration-300 hover:bg-primary-600 hover:text-white hover:shadow-lg"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🔑</span>
                      Login
                    </span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-2 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">✨</span>
                      Register
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative overflow-hidden p-3 rounded-2xl text-gray-700 hover:text-primary-600 hover:bg-gray-100/80 transition-all duration-300"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 