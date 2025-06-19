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
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">What You Get</h2>
      <ul className="list-disc list-inside text-gray-700 max-w-2xl mx-auto text-lg space-y-2 mb-8">
        <li>Activation of your Avasar account</li>
        <li>Investment in live trading pool</li>
        <li>Eligibility to earn referral commissions</li>
        <li>Access to a 10-level income system</li>
      </ul>
    </section>

    {/* Commission Section */}
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Team Commission from ₹3600</h2>
      <div className="max-w-2xl mx-auto">
        <ul className="list-disc list-inside text-gray-700 text-lg mb-8">
          <li>Level 1 (Direct): 10%</li>
          <li>Level 2: 3%</li>
          <li>Level 3 to 10: 2% each</li>
        </ul>
      </div>
    </section>

    {/* ROI Example Section */}
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Monthly ROI Example</h2>
      <div className="max-w-2xl mx-auto">
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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Team Commission on Investment (One-Time)</h2>
      <div className="max-w-2xl mx-auto">
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Level 1: 3% of investment amount</li>
          <li>Level 2: 2%</li>
          <li>Level 3 to 10: 1% per level</li>
        </ul>
      </div>
    </section>
  </div>
);

export default Plan; 