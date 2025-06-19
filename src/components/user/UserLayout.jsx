import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Lock body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: '📊', description: 'Overview & Analytics' },
    { name: 'Profile', path: '/user/profile', icon: '👤', description: 'Personal Information' },
    { name: 'Team', path: '/user/team', icon: '👥', description: 'Team Management' },
    { name: 'Income', path: '/user/income', icon: '💰', description: 'Earnings & Bonuses' },
    { name: 'Rank', path: '/user/rank', icon: '🏆', description: 'Rank Progress' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Sidebar and Overlay for Mobile */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar (match home sidebar theme) */}
          <div className={
            `fixed top-0 left-0 z-[9999] w-72 h-screen max-w-full bg-white/80 rounded-r-3xl shadow-2xl flex flex-col md:hidden border-none overflow-hidden backdrop-blur-xl` +
            ` transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-in-out md:translate-x-0`
          }
            style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)', border: 'none' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/60">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <h1 className="text-lg font-bold text-white">A</h1>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">Avasar</h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Close sidebar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Sidebar content and nav links */}
              <div className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-6 space-y-2 bg-white/80">
                <div>
                  {/* Navigation Links */}
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`group flex items-center px-4 py-3 rounded-2xl text-base font-bold transition-all duration-300 w-full ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/80'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="relative z-10 mr-4 text-xl">{item.icon}</span>
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  ))}
                </div>
                {/* Logout Button at bottom */}
                <div className="pb-2">
                  <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden w-full text-left px-4 py-3 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🚪</span>
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Main layout */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex w-full max-w-full overflow-x-hidden">
        {/* Main content */}
        <div className="flex-1 md:ml-80 min-h-screen w-full max-w-full overflow-x-hidden">
          {/* Top bar */}
          <div className="bg-white/90 shadow-lg border-b border-gray-100/50 rounded-bl-3xl">
            <div className="flex items-center justify-between h-20 px-8">
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                  <span>Welcome back,</span>
                  <span className="font-semibold text-gray-900">{user?.firstName}</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
              </div>
              {/* Hamburger icon on right, like home */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                style={{ marginLeft: 'auto' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Page content */}
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default UserLayout; 