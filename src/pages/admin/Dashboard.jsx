const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: '👥', gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Active Users', value: '892', change: '+8%', icon: '✅', gradient: 'from-green-500 to-emerald-500' },
    { title: 'Total Contacts', value: '456', change: '+15%', icon: '📧', gradient: 'from-purple-500 to-pink-500' },
    { title: 'Revenue', value: '₹2.5M', change: '+23%', icon: '💰', gradient: 'from-yellow-500 to-orange-500' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Registered', time: '2 minutes ago', type: 'success' },
    { user: 'Jane Smith', action: 'Updated Profile', time: '5 minutes ago', type: 'info' },
    { user: 'Mike Johnson', action: 'Contacted Support', time: '10 minutes ago', type: 'warning' },
    { user: 'Sarah Wilson', action: 'Completed Investment', time: '15 minutes ago', type: 'success' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-4">🎛️</span>
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back! Here's an overview of your platform's performance and recent activities.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📈</span>
              User Growth
            </h2>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-600 font-medium">Chart visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">💰</span>
              Revenue Analytics
            </h2>
            <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-600 font-medium">Chart visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🕒</span>
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors duration-300">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-lg ${
                  activity.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  activity.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}>
                  <span className="text-white text-lg">
                    {activity.type === 'success' ? '✅' : activity.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">View Contacts</h3>
            <p className="text-sm text-gray-600">Check contact form submissions</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">View detailed analytics</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
          <div className="relative p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600">Configure system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 