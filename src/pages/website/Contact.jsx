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

      {/* Contact Form Section - Card style */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-2xl shadow-xl p-10">
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
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-indigo-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-700">Our Location</h2>
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Avasar Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8178888888886!2d75.8577!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjciTiA3NcKwNTEnMjcuOCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Support Hours Section */}
      <section className="py-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary-700">Support Hours</h2>
        <p className="text-center text-gray-700 mb-2">Monday - Saturday: 9:00 AM - 7:00 PM</p>
        <p className="text-center text-gray-700">Sunday: Closed</p>
      </section>

      {/* Team Contact Section - Improved card styling, three centered cards */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700 text-center">Contact Our Team</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
            <div className="flex-1 max-w-xs bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500 flex flex-col items-center min-h-[260px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                <span>S</span>
              </div>
              <div className="font-bold text-lg text-primary-700 mb-1">Sneha Kapoor</div>
              <div className="text-gray-600 mb-2">COO</div>
              <div className="text-gray-700 text-sm">sneha@avasardeveloper.in</div>
            </div>
            <div className="flex-1 max-w-xs bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500 flex flex-col items-center min-h-[260px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                <span>R</span>
              </div>
              <div className="font-bold text-lg text-primary-700 mb-1">Rahul Mehra</div>
              <div className="text-gray-600 mb-2">CTO</div>
              <div className="text-gray-700 text-sm">rahul@avasardeveloper.in</div>
            </div>
            <div className="flex-1 max-w-xs bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-primary-500 flex flex-col items-center min-h-[260px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                <span>D</span>
              </div>
              <div className="font-bold text-lg text-primary-700 mb-1">Diya Mourya</div>
              <div className="text-gray-600 mb-2">COO & Founder</div>
              <div className="text-gray-700 text-sm">diya@avasardeveloper.in</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Use single-column grid */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-700">FAQs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg text-primary-700 mb-2">How can I reach support?</h3>
            <p className="text-gray-700">Contact us via the form or email. We respond within 24 hours on business days.</p>
          </div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg text-primary-700 mb-2">What are your support hours?</h3>
            <p className="text-gray-700">Monday to Saturday, 9:00 AM to 7:00 PM. Closed on Sundays.</p>
          </div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg text-primary-700 mb-2">Can I visit your office?</h3>
            <p className="text-gray-700">Yes, please schedule an appointment in advance.</p>
          </div>
          <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg text-primary-700 mb-2">How do I join Avasar?</h3>
            <p className="text-gray-700">Register on our website and our team will guide you through onboarding.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 