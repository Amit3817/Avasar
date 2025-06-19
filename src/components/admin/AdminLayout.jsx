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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 w-full px-0">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 shadow-2xl`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700/50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <h1 className="text-lg font-bold text-white">A</h1>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-6 mb-8">
            <div className="text-sm text-gray-400 mb-2">Welcome back,</div>
            <div className="font-bold text-white text-lg">{user?.firstName} {user?.lastName}</div>
            <div className="text-sm text-primary-400 font-medium">Administrator</div>
          </div>
          
          <div className="space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative overflow-hidden flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white/20'
                    : `bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-100`
                }`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <span className="font-semibold">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="group relative overflow-hidden w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white rounded-2xl transition-all duration-300 hover:bg-red-500/20"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-lg">🚪</span>
            </div>
            <span className="font-semibold">Logout</span>
          </button>
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
      <div className="md:ml-64">
        {/* Top bar */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5"></div>
          <div className="relative z-10 flex items-center justify-between h-20 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-3 rounded-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-sm text-gray-600 font-medium">
                  {user?.email}
                </span>
                <div className="w-px h-6 bg-gray-300"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 