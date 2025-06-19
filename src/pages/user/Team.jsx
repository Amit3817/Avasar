import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const UserTeam = () => {
  const { user } = useAuth();
  const [teamData, setTeamData] = useState({
    team: [],
    totalTeam: [],
    teamStats: {
      totalMembers: 0,
      activeMembers: 0,
      totalInvestment: 0,
      teamIncome: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Fetch team data from API
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('/users/team');
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        toast.error('Failed to load team data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      await axios.post('/users/invite', inviteData);
      setInviteSuccess(true);
      setInviteData({ email: '', name: '', phone: '' });
      setTimeout(() => {
        setInviteSuccess(false);
        setShowInviteModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending invite:', error);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInviteData({
      ...inviteData,
      [e.target.name]: e.target.value
    });
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${user?.referralCode || user?.id}`;
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
    alert('Referral link copied to clipboard!');
  };

  if (loading) {
    return <LoadingSpinner text="Loading team data..." />;
  }

  // Fallback for teamStats
  const stats = teamData.teamStats || { totalMembers: 0, activeMembers: 0, totalInvestment: 0, teamIncome: 0 };
  // Fallback for direct referrals
  const directReferrals = teamData.team || [];

  return (
    <div className="space-y-8 overflow-x-hidden">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-6 md:p-8 text-white w-full min-w-0 max-w-full">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">My Team</h1>
          <p className="text-blue-100 text-lg">Manage and track your team members and their performance</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full min-w-0 max-w-full">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0 max-w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Across all levels</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                👥
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0 max-w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeMembers}</p>
                <p className="text-xs text-green-600 font-medium mt-1">Currently active</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                ✅
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0 max-w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Investment</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalInvestment.toLocaleString()}</p>
                <p className="text-xs text-yellow-600 font-medium mt-1">Team investments</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💰
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 w-full min-w-0 max-w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Team Income</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.teamIncome.toLocaleString()}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">From team bonuses</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                📈
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Referrals */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 w-full min-w-0 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            Direct Referrals
          </h2>
          
          {directReferrals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                👥
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No team members yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start referring people to build your team and earn more income through our referral program!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center">
                    <span className="mr-2">📤</span>
                    Invite Friends
                  </span>
                </button>
                <button 
                  onClick={copyReferralLink}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center">
                    <span className="mr-2">🔗</span>
                    Copy Referral Link
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto w-full max-w-full">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {directReferrals.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-sm font-semibold text-white">
                                {member.firstName[0]}{member.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {member.firstName} {member.lastName}
                            </div>
                            <div className="text-sm text-gray-500">@{member.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {member.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ₹{member.investment.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          member.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.isActive ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Team Structure */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 w-full min-w-0 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🌳</span>
            Team Structure
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-xl font-bold text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-gray-600">{user?.rank || 'Supervisor'}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">Your team structure will be displayed here</p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <p className="text-sm text-gray-500">Level 1</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <p className="text-sm text-gray-500">Level 2</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <p className="text-sm text-gray-500">Level 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {inviteSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Invitation Sent!</h3>
                <p className="text-gray-600">Your friend will receive an invitation email shortly.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Invite Friends</h3>
                  <p className="text-gray-600">Send invitations to grow your team</p>
                </div>

                <form onSubmit={handleInviteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={inviteData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter friend's name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={inviteData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter friend's email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={inviteData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter friend's phone number"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {inviteLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Invitation...
                      </span>
                    ) : (
                      'Send Invitation'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTeam; 