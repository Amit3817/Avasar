import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const UserRank = () => {
  const { user } = useAuth();
  const [rankData, setRankData] = useState({
    currentRank: 'Supervisor',
    nextRank: 'Senior Supervisor',
    progress: 65,
    requirements: {
      directReferrals: 2,
      teamSize: 5,
      personalInvestment: 5000,
      teamInvestment: 15000,
      monthlyIncome: 1000
    },
    achievements: {
      directReferrals: 2,
      teamSize: 3,
      personalInvestment: 5000,
      teamInvestment: 12500,
      monthlyIncome: 875
    },
    rankBenefits: []
  });
  const [loading, setLoading] = useState(true);

  const ranks = [
    'Supervisor',
    'Senior Supervisor', 
    'Manager',
    'Executive Manager',
    'Eagle',
    'Eagle Executive',
    'Silver',
    'Gold',
    'Pearl',
    'Diamond',
    'Ambassador',
    'King',
    'Universal King'
  ];

  const rankBenefits = {
    'Supervisor': [
      '10% referral bonus',
      'Basic support access',
      'Monthly newsletter'
    ],
    'Senior Supervisor': [
      '12% referral bonus',
      '5% matching bonus',
      'Priority support access',
      'Weekly training sessions'
    ],
    'Manager': [
      '15% referral bonus',
      '8% matching bonus',
      'Generation bonus level 1',
      'Dedicated support manager',
      'Exclusive events access'
    ],
    'Executive Manager': [
      '18% referral bonus',
      '10% matching bonus',
      'Generation bonus level 2',
      'Trading profit share',
      'Luxury rewards program'
    ],
    'Eagle': [
      '20% referral bonus',
      '12% matching bonus',
      'Generation bonus level 3',
      'Higher trading profit share',
      'International conference access'
    ]
  };

  // Fetch rank data from API
  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await axios.get('/users/rank');
        setRankData({
          currentRank: response.data.currentRank,
          nextRank: response.data.nextRank?.name || '',
          progress: 0, // Calculate if backend provides progress
          requirements: response.data.nextRank?.requirements || {},
          achievements: {}, // Fill if backend provides
          rankBenefits: [] // Fill if backend provides
        });
      } catch (error) {
        console.error('Error fetching rank data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRankData();
  }, [user]);

  const getProgressColor = (achieved, required) => {
    const percentage = (achieved / required) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRankIcon = (rank) => {
    const icons = {
      'Supervisor': '⭐',
      'Senior Supervisor': '⭐⭐',
      'Manager': '⭐⭐⭐',
      'Executive Manager': '⭐⭐⭐⭐',
      'Eagle': '🦅',
      'Eagle Executive': '🦅⭐',
      'Silver': '🥈',
      'Gold': '🥇',
      'Pearl': '💎',
      'Diamond': '💎💎',
      'Ambassador': '👑',
      'King': '👑👑',
      'Universal King': '👑👑👑'
    };
    return icons[rank] || '⭐';
  };

  if (loading) {
    return <LoadingSpinner text="Loading rank data..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Rank Progress</h1>
          <p className="text-purple-100 text-lg">Track your advancement and unlock exclusive benefits</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Current Rank Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative p-8">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-pulse">{getRankIcon(rankData.currentRank)}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{rankData.currentRank}</h2>
            <p className="text-gray-600 mb-8 text-lg">Your current rank in the Avasar network</p>
            
            {/* Progress to Next Rank */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-gray-700">Progress to {rankData.nextRank}</span>
                <span className="text-lg font-bold text-purple-600">{rankData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${rankData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Requirements */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            Requirements for Next Rank
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(rankData.requirements).map(([requirement, required]) => {
              const achieved = rankData.achievements[requirement] || 0;
              const percentage = Math.min((achieved / required) * 100, 100);
              const isCompleted = achieved >= required;
              
              return (
                <div key={requirement} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-700 capitalize">
                      {requirement.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {achieved}/{required}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(achieved, required)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {isCompleted ? '✅ Requirement met!' : `${required - achieved} more needed`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Rank Benefits */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🎁</span>
            Current Rank Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankData.rankBenefits.map((benefit, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-green-800">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rank Hierarchy */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🏆</span>
            Rank Hierarchy
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {ranks.map((rank, index) => {
              const isCurrentRank = rank === rankData.currentRank;
              const isAchieved = ranks.indexOf(rank) <= ranks.indexOf(rankData.currentRank);
              
              return (
                <div 
                  key={rank} 
                  className={`group relative overflow-hidden rounded-xl p-4 border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                    isCurrentRank 
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
                      : isAchieved 
                        ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md' 
                        : 'border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'
                  }`}
                >
                  <div className={`text-2xl mb-2 text-center transition-transform duration-300 group-hover:scale-110 ${
                    isCurrentRank ? 'text-purple-600' : isAchieved ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {getRankIcon(rank)}
                  </div>
                  <h3 className={`text-xs font-semibold text-center leading-tight ${
                    isCurrentRank ? 'text-purple-900' : isAchieved ? 'text-green-800' : 'text-gray-500'
                  }`}>
                    {rank}
                  </h3>
                  {isCurrentRank && (
                    <span className="text-xs text-purple-600 font-bold mt-1 text-center block">Current</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Rank Preview */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🚀</span>
            Next Rank: {rankData.nextRank}
          </h2>
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-indigo-200/50">
            <div className="flex items-center mb-6">
              <div className="text-5xl mr-6 animate-pulse">{getRankIcon(rankData.nextRank)}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{rankData.nextRank}</h3>
                <p className="text-gray-600">Unlock these exclusive benefits when you reach this rank</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(rankBenefits[rankData.nextRank] || []).map((benefit, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl bg-white p-4 border border-indigo-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRank; 