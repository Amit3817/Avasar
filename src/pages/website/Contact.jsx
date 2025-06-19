import React, { useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-4 rounded-full shadow-lg inline-block">
              <FaEnvelopeOpenText className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Contact <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Avasar</span></h1>
          <p className="text-2xl md:text-3xl font-medium mb-6">We're here to support you every step of the way.</p>
          <p className="mb-10 text-lg md:text-xl font-light">Whether you have questions, need guidance, or want to join our team — we're just a call away!</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-green-600 text-center font-bold text-xl">Thank you for contacting us!</div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-left">
                <label className="block text-sm font-bold mb-2">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Name" />
              </div>
              <div className="text-left">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Email" />
              </div>
              <div className="text-left">
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="How can we help you?" rows={4} />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105">Send Message</button>
            </form>
          )}
          <div className="mt-10 text-center text-gray-600">
            <div>info@avasardeveloper.in</div>
            <div>www.avasardeveloper.in</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 