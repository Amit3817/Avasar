import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* Hero Section */}
    <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-4 rounded-full shadow-lg inline-block">
            <FaLightbulb className="text-4xl text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">About <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Avasar</span></h1>
        <p className="text-2xl md:text-3xl font-medium mb-6">Empowering Financial Freedom</p>
        <p className="mb-10 text-lg md:text-xl font-light">Avasar is a revolutionary platform that blends the power of empowerment marketing with smart trading-based investment opportunities.</p>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
    </section>

    {/* Mission Section */}
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Our Mission</h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto text-center mb-6">
        To empower individuals to achieve financial freedom and live life on their own terms by providing transparent, reward-driven opportunities for growth.
      </p>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">How It Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          'Start with a small investment',
          'Build a network',
          'Earn passive income',
          'Grow with a structured career path through our ranking system',
          'Enjoy a transparent, reward-driven system',
        ].map((step, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500">
            <div className="text-3xl font-bold text-primary-600 mb-3">Step {i + 1}</div>
            <p className="text-gray-700 font-medium text-lg">{step}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Vision Section - Zig-zag (text left, icon right) */}
    <section className="py-16 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-2 sm:px-4">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Our Vision</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Empower individuals for financial freedom</li>
            <li>Build a trusted, transparent community</li>
            <li>Grow through innovation and teamwork</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg">
            <span>🌟</span>
          </div>
        </div>
      </div>
    </section>

    {/* Team Section - Zig-zag (icon left, text right) */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10 px-2 sm:px-4">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Meet Our Team</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
            <li>Passionate leadership</li>
            <li>Dedicated to your success</li>
            <li>Always here to support you</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-2">S</div>
              <div className="font-bold text-lg text-primary-700 mb-1">Sneha Kapoor</div>
              <div className="text-gray-600 text-sm">COO</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-2">R</div>
              <div className="font-bold text-lg text-primary-700 mb-1">Rahul Mehra</div>
              <div className="text-gray-600 text-sm">CTO</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-2">D</div>
              <div className="font-bold text-lg text-primary-700 mb-1">Diya Mourya</div>
              <div className="text-gray-600 text-sm">COO & Founder</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg">
            <span>🤝</span>
          </div>
        </div>
      </div>
    </section>

    {/* Values Section - Zig-zag (text left, icon right) */}
    <section className="py-16 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-2 sm:px-4">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Our Values</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li><span className="font-bold text-primary-700">Trust:</span> Integrity & transparency</li>
            <li><span className="font-bold text-primary-700">Teamwork:</span> Growing together</li>
            <li><span className="font-bold text-primary-700">Innovation:</span> Embracing new ideas</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg">
            <span>💡</span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About; 