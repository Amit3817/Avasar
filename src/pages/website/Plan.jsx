import React from 'react';

const Plan = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* Hero Section */}
    <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Joining Plan & <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Income Streams</span></h1>
        <p className="text-2xl md:text-3xl font-medium mb-6">Start your journey with a one-time investment</p>
        <p className="mb-10 text-lg md:text-xl font-light">Join Avasar with a one-time <span className="font-bold text-yellow-300">₹3600</span> trading investment and unlock the door to financial growth and network-based income.</p>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
    </section>

    {/* Plan Details Section */}
    <section className="py-16 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-2 sm:px-4">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">What You Get</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Account activation</li>
            <li>Live trading pool access</li>
            <li>Referral commissions</li>
            <li>10-level income system</li>
          </ul>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Secure Account</div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Live Trading Pool</div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Referral Commissions</div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">10-Level Income</div>
        </div>
      </div>
    </section>

    {/* Commission Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Team Commission from ₹3600</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-8">
          <li>Level 1 (Direct): 10%</li>
          <li>Level 2: 3%</li>
          <li>Level 3 to 10: 2% each</li>
        </ul>
      </div>
    </section>

    {/* ROI Example Section */}
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Monthly ROI Example</h2>
        <p className="text-gray-700 text-lg mb-2">Invest <span className="font-bold">₹1,00,000</span> and earn <span className="font-bold">₹4,000/month</span> for 24 months (4% monthly ROI).</p>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Level 1: 10% of investor's monthly return</li>
          <li>Level 2: 3%</li>
          <li>Level 3 to 10: 2% each</li>
        </ul>
      </div>
    </section>

    {/* One-Time Commission Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Team Commission on Investment (One-Time)</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Level 1: 3% of investment amount</li>
          <li>Level 2: 2%</li>
          <li>Level 3 to 10: 1% per level</li>
        </ul>
      </div>
    </section>

    {/* Comparison Table Section */}
    <section className="py-20 bg-gradient-to-r from-white to-blue-50">
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 text-center mb-8 max-w-2xl mx-auto px-2 sm:px-4">
        <li>Transparent income</li>
        <li>Live trading pool</li>
        <li>Multiple income streams</li>
        <li>Reward system</li>
      </ul>
      <div className="overflow-x-auto max-w-4xl mx-auto px-2 sm:px-0">
        <table className="min-w-full bg-white rounded-2xl shadow-xl text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-primary-100 to-blue-100">
              <th className="py-3 px-4 text-left font-bold text-primary-700">Feature</th>
              <th className="py-3 px-4 text-left font-bold text-primary-700">Avasar</th>
              <th className="py-3 px-4 text-left font-bold text-primary-700">Others</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-b-0">
              <td className="py-2 px-4 font-semibold text-gray-700">Transparent Income</td>
              <td className="py-2 px-4 text-primary-600">✔️</td>
              <td className="py-2 px-4 text-gray-600">❌</td>
            </tr>
            <tr className="border-b last:border-b-0">
              <td className="py-2 px-4 font-semibold text-gray-700">Live Trading Pool</td>
              <td className="py-2 px-4 text-primary-600">✔️</td>
              <td className="py-2 px-4 text-gray-600">❌</td>
            </tr>
            <tr className="border-b last:border-b-0">
              <td className="py-2 px-4 font-semibold text-gray-700">Multiple Income Streams</td>
              <td className="py-2 px-4 text-primary-600">✔️</td>
              <td className="py-2 px-4 text-gray-600">❌</td>
            </tr>
            <tr className="border-b last:border-b-0">
              <td className="py-2 px-4 font-semibold text-gray-700">Reward System</td>
              <td className="py-2 px-4 text-primary-600">✔️</td>
              <td className="py-2 px-4 text-gray-600">❌</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* Plan Benefits Section */}
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10 px-2 sm:px-4">
        <div className="flex-1 grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Low entry barrier</div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Lifetime access</div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Dedicated support</div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Training & webinars</div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center font-semibold text-primary-700">Exclusive rewards</div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Plan Benefits</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Low entry barrier for everyone</li>
            <li>Lifetime access to platform features</li>
            <li>Dedicated support team</li>
            <li>Regular training and webinars</li>
            <li>Exclusive rewards and bonuses</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Call-to-Action Section */}
    <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-center px-2 sm:px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Best Plan?</h2>
      <p className="text-lg mb-8">Take the first step towards financial freedom with Avasar.</p>
      <a href="/register" className="inline-block bg-white text-primary-700 font-bold py-4 px-8 sm:px-12 rounded-full shadow-xl hover:scale-105 transition-transform text-lg">Register Now</a>
    </section>
  </div>
);

export default Plan; 