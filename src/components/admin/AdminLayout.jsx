import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊', gradient: 'from-blue-500 to-indigo-500' },
    { name: 'Users', path: '/admin/users', icon: '👥', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Contacts', path: '/admin/contacts', icon: '📧', gradient: 'from-purple-500 to-pink-500' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 w-full px-0 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl shadow-2xl rounded-tr-3xl rounded-br-3xl border-r border-white/20 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-in-out md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-8 border-b border-gray-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* User Info */}
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-rose-500 text-white">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-700 hover:bg-white/60 hover:text-primary-600 hover:shadow-md'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={`text-xl mr-4 transition-transform duration-300 ${
                    location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                  </div>
                  {location.pathname === item.path && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
          {/* Logout */}
          <div className="p-6 border-t border-gray-100/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group"
            >
              <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-300">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
      <div className="flex-1 md:ml-80 min-h-screen">
        {/* Top bar */}
        <div className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50 rounded-bl-3xl">
          <div className="flex items-center justify-between h-20 px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Welcome back,</span>
                <span className="font-semibold text-gray-900">{user?.firstName}</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 