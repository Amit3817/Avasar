import React from 'react';

const ranks = [
  { rank: 'Supervisor', pairs: 25, reward: 'Nil' },
  { rank: 'Senior Supervisor', pairs: 50, reward: 'Goa Tour' },
  { rank: 'Manager', pairs: 100, reward: '₹40,000' },
  { rank: 'Executive Manager', pairs: 250, reward: 'Thailand Tour' },
  { rank: 'Eagle', pairs: 500, reward: '₹1.8 Lakh' },
  { rank: 'Eagle Executive', pairs: 1000, reward: '₹4 Lakh' },
  { rank: 'Silver', pairs: 2500, reward: '₹8 Lakh' },
  { rank: 'Gold', pairs: 5000, reward: '₹15 Lakh' },
  { rank: 'Pearl', pairs: 10000, reward: '₹30 Lakh' },
  { rank: 'Diamond', pairs: 25000, reward: '₹50 Lakh' },
  { rank: 'Ambassador', pairs: 50000, reward: '₹75 Lakh' },
  { rank: 'King', pairs: 100000, reward: '₹1.25 Cr' },
  { rank: 'Universal King', pairs: 250000, reward: '₹2.25 Cr' },
];

const Rewards = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* Hero Section */}
    <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Ranks & <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Rewards</span></h1>
        <p className="text-2xl md:text-3xl font-medium mb-6">Achieve more as you grow</p>
        <p className="mb-10 text-lg md:text-xl font-light">Climb the ranks and unlock amazing rewards and bonuses with Avasar.</p>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
    </section>

    {/* Ranks Table Section */}
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Rank & Rewards Table</h2>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-primary-100 to-blue-100">
              <th className="py-3 px-4 text-left font-bold text-primary-700">Rank</th>
              <th className="py-3 px-4 text-left font-bold text-primary-700">Pairs</th>
              <th className="py-3 px-4 text-left font-bold text-primary-700">Reward</th>
            </tr>
          </thead>
          <tbody>
            {ranks.map((r, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-2 px-4 font-semibold text-gray-700">{r.rank}</td>
                <td className="py-2 px-4 text-gray-600">{r.pairs}</td>
                <td className="py-2 px-4 text-primary-600">{r.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Matching Bonus Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Matching Bonus</h2>
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md px-8 py-6">
        <p className="text-gray-700 text-lg">Get <span className="font-bold text-primary-700">10%</span> on each matching. Earn up to <span className="font-bold text-primary-700">₹43,200 per day</span> as Matching Bonus!</p>
      </div>
    </section>
  </div>
);

export default Rewards; 