import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const UserIncome = () => {
  const { user } = useAuth();
  const [incomeData, setIncomeData] = useState({
    totalEarnings: 0,
    availableBalance: 0,
    pendingAmount: 0,
    incomeBreakdown: {
      referral: 0,
      matching: 0,
      generation: 0,
      trading: 0,
      reward: 0
    },
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Fetch income data from API
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('/users/income');
        setIncomeData({
          totalEarnings: response.data.totalIncome || 0,
          availableBalance: response.data.income?.available || 0,
          pendingAmount: response.data.income?.pending || 0,
          incomeBreakdown: response.data.income || {},
          recentTransactions: response.data.recentTransactions || []
        });
      } catch (error) {
        console.error('Error fetching income data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncomeData();
  }, []);

  const getIncomeTypeIcon = (type) => {
    const icons = {
      referral: '👥',
      matching: '🤝',
      generation: '🌳',
      trading: '📈',
      reward: '🎁'
    };
    return icons[type] || icons.referral;
  };

  const getIncomeTypeColor = (type) => {
    const colors = {
      referral: 'from-blue-500 to-indigo-500',
      matching: 'from-green-500 to-emerald-500',
      generation: 'from-purple-500 to-pink-500',
      trading: 'from-yellow-500 to-orange-500',
      reward: 'from-pink-500 to-rose-500'
    };
    return colors[type] || colors.referral;
  };

  if (loading) {
    return <LoadingSpinner text="Loading income data..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Income & Earnings</h1>
          <p className="text-green-100 text-lg">Track your earnings, bonuses, and manage your funds</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Income Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{incomeData.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium mt-1">+15% this month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💰
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-gray-900">₹{incomeData.availableBalance.toLocaleString()}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Ready to withdraw</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💳
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹{incomeData.pendingAmount.toLocaleString()}</p>
                <p className="text-xs text-yellow-600 font-medium mt-1">Processing</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                ⏳
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income Breakdown */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 w-full min-w-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            Income Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(incomeData.incomeBreakdown).map(([type, amount]) => (
              <div key={type} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 w-full min-w-0">
                <div className={`w-16 h-16 bg-gradient-to-r ${getIncomeTypeColor(type)} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg`}>
                  {getIncomeTypeIcon(type)}
                </div>
                <p className="text-sm font-semibold text-gray-600 capitalize mb-2">{type} Income</p>
                <p className="text-xl font-bold text-gray-900">₹{amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 w-full min-w-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">💸</span>
            Withdraw Funds
          </h2>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available for withdrawal</p>
                <p className="text-4xl font-bold text-gray-900">₹{incomeData.availableBalance.toLocaleString()}</p>
              </div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center">
                  <span className="mr-2">💳</span>
                  Request Withdrawal
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">💰</span>
                <span>Minimum: ₹1,000</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏱️</span>
                <span>Processing: 3-5 days</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✅</span>
                <span>No withdrawal fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 w-full min-w-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
        <div className="relative p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">📋</span>
              Recent Transactions
            </h2>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
          
          {incomeData.recentTransactions.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {incomeData.recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">#{transaction.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'credit' ? '🟢 Credit' : '🔴 Debit'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status === 'completed' ? '✅ Completed' : 
                             transaction.status === 'pending' ? '⏳ Pending' : '❌ Failed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                📋
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">No Transactions Yet</h4>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your transaction history will appear here as you earn income and make withdrawals
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserIncome; 