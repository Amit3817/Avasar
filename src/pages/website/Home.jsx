import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaCar, FaHome, FaGlobe, FaTrophy, FaPlane, FaClock } from 'react-icons/fa';

const desires = [
  { icon: <FaMoneyBillWave />, label: 'Money' },
  { icon: <FaHome />, label: 'Dream Home' },
  { icon: <FaCar />, label: 'Car' },
  { icon: <FaGlobe />, label: 'Travel' },
  { icon: <FaClock />, label: 'Time Freedom' },
  { icon: <FaTrophy />, label: 'Success' },
  { icon: <FaPlane />, label: 'Explore the World' },
];

const howItWorks = [
  'Start with a small investment',
  'Build a network',
  'Earn passive income',
  'Grow with a structured career path',
  'Transparent, reward-driven system',
];

const incomeStreams = [
  'Referral Income',
  'Matching Income',
  'Generation Income',
  'Trading Income',
  'Reward Income',
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* Hero Section */}
    <section className="py-24 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Welcome to <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Avasar</span></h1>
        <p className="text-2xl md:text-3xl font-medium mb-6">Your Gateway to Financial Growth & Freedom</p>
        <p className="mb-10 text-lg md:text-xl font-light">Empowerment Marketing | Passive Income | Build Your Team | Earn Commissions | Achieve Ranks | Legacy Building</p>
        <Link to="/register" className="inline-block bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:scale-105 transition-transform text-lg animate-bounce">Join Now</Link>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
    </section>

    {/* Desires Section */}
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Everyone Has Desires</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {desires.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-5xl text-primary-600 mb-3 drop-shadow-lg">{d.icon}</div>
            <span className="font-semibold text-lg text-gray-700">{d.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">How Avasar Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {howItWorks.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-primary-600 mb-3">Step {i + 1}</div>
            <p className="text-gray-700 font-medium text-lg">{step}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Income Streams Section */}
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Blueprint of Wealth Creation</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {incomeStreams.map((inc, i) => (
          <div key={i} className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-lg px-12 py-8 text-2xl font-semibold text-primary-700 border border-primary-200">
            {inc}
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Home; 