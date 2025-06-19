import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalIncome: 0,
    teamSize: 0,
    rank: 'Supervisor',
    investment: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [incomeRes, teamRes] = await Promise.all([
          axios.get('/users/income'),
          axios.get('/users/team'),
        ]);
        setStats({
          totalIncome: incomeRes.data.totalIncome || 0,
          teamSize: (teamRes.data.team && teamRes.data.team.length) || 0,
          rank: user?.rank || 'Supervisor',
          investment: incomeRes.data.investment?.amount || 0
        });
        setRecentActivity([]); // Replace with real activity if available
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'team':
        navigate('/user/team');
        break;
      case 'income':
        navigate('/user/income');
        break;
      case 'profile':
        navigate('/user/profile');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.firstName}! 👋</h1>
          <p className="text-primary-100 text-lg">Here's what's happening with your account today</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Income</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalIncome.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium mt-1">+12% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💰
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Team Size</p>
                <p className="text-3xl font-bold text-gray-900">{stats.teamSize}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">+3 new members</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                👥
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Current Rank</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rank}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">65% to next rank</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🏆
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Investment</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.investment.toLocaleString()}</p>
                <p className="text-xs text-yellow-600 font-medium mt-1">Active investment</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💎
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5"></div>
          <div className="relative p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">⚡</span>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button 
                onClick={() => handleQuickAction('team')}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-semibold py-4 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-xl">👥</span>
                  View My Team
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <button 
                onClick={() => handleQuickAction('income')}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-xl">💰</span>
                  Check Income Details
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <button 
                onClick={() => handleQuickAction('profile')}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-xl">👤</span>
                  Update Profile
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📊</span>
              Recent Activity
            </h3>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/50 hover:bg-white/70 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      activity.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  📊
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h4>
                <p className="text-gray-500 text-sm">Your activity will appear here as you use the platform</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 