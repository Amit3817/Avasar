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

    {/* Desires Section - Text left, icons right */}
    <section className="py-16 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Your Dreams, Our Mission</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Financial Freedom</li>
            <li>Dream Home & Car</li>
            <li>Travel & Explore</li>
            <li>Time for What Matters</li>
          </ul>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6">
          {desires.map((d, i) => (
            <div key={i} className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6">
              <div className="text-4xl text-primary-600 mb-2 drop-shadow-lg">{d.icon}</div>
              <span className="font-semibold text-lg text-gray-700">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works Section - Icon left, steps right */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg mb-6">
            <span>🔄</span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">How It Works</h2>
          <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
            <li>Start with a small investment</li>
            <li>Grow your network</li>
            <li>Earn passive income</li>
            <li>Unlock rewards & ranks</li>
          </ol>
        </div>
      </div>
    </section>

    {/* Income Streams Section - 3-column grid, center last row if only 2 cards */}
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-700">Wealth Creation Blueprint</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {incomeStreams.map((inc, i) => (
          <div key={i} className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-lg flex items-center justify-center h-36 text-2xl font-semibold text-primary-700 border border-primary-200 text-center min-h-[9rem] min-w-[9rem]">
            {inc}
          </div>
        ))}
        {incomeStreams.length % 3 === 2 && (
          <div className="hidden md:block"></div>
        )}
      </div>
    </section>

    {/* Testimonials Section - Only four cards */}
    <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg mb-6">
            <span>💬</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500">
              <p className="text-lg text-gray-700 mb-4">“Avasar changed my life! The passive income and support are amazing.”</p>
              <div className="font-bold text-primary-700">- Priya S.</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500">
              <p className="text-lg text-gray-700 mb-4">“The team-building system is transparent and rewarding. Highly recommended!”</p>
              <div className="font-bold text-primary-700">- Rahul M.</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500">
              <p className="text-lg text-gray-700 mb-4">“I achieved financial freedom with Avasar's unique plan.”</p>
              <div className="font-bold text-primary-700">- Sneha K.</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500">
              <p className="text-lg text-gray-700 mb-4">“Avasar's community is so supportive and inspiring. I feel truly valued!”</p>
              <div className="font-bold text-primary-700">- Diya Mourya</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section - Text left, cards right */}
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-700">FAQs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary-700 mb-2">How do I join?</h3>
          <p className="text-gray-700">Register and invest to activate your account.</p>
        </div>
        <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary-700 mb-2">Is my investment safe?</h3>
          <p className="text-gray-700">We use a live trading pool and transparent systems for security and growth.</p>
        </div>
        <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary-700 mb-2">How can I earn more?</h3>
          <p className="text-gray-700">Grow your network and achieve higher ranks for more income streams.</p>
        </div>
      </div>
    </section>

    {/* Call-to-Action Section */}
    <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
      <p className="text-lg mb-8">Join thousands of members who are building wealth and freedom with Avasar.</p>
      <Link to="/register" className="inline-block bg-white text-primary-700 font-bold py-4 px-12 rounded-full shadow-xl hover:scale-105 transition-transform text-lg">Get Started Now</Link>
    </section>
  </div>
);

export default Home; 