import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white w-full">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 w-full px-0 py-12 sm:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-6 lg:px-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <h3 className="text-xl font-bold text-white">A</h3>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                Avasar
              </h3>
            </div>
            <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
              A revolutionary platform that blends the power of the empowering market with smart trading-based investment opportunities.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              To help people turn a small opportunity into a lifetime of financial independence through trust, teamwork, and technology.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-8">
              <a href="#" className="group relative overflow-hidden w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">📘</span>
              </a>
              <a href="#" className="group relative overflow-hidden w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">📱</span>
              </a>
              <a href="#" className="group relative overflow-hidden w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">🐦</span>
              </a>
              <a href="#" className="group relative overflow-hidden w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <span className="text-white text-lg">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-3">🔗</span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/plan" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Plan
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Rewards
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="group flex items-center text-gray-300 hover:text-primary-400 transition-all duration-300 text-base">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-3">📞</span>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Website</p>
                  <a href="https://www.avasardeveloper.in" className="text-primary-400 hover:text-primary-300 transition-colors break-all text-sm">
                    www.avasardeveloper.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-sm">✉️</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Email</p>
                  <a href="mailto:info@avasardeveloper.in" className="text-primary-400 hover:text-primary-300 transition-colors break-all text-sm">
                    info@avasardeveloper.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Phone</p>
                  <a href="tel:+919876543210" className="text-primary-400 hover:text-primary-300 transition-colors text-sm">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                We're here to support you every step of the way. Whether you have questions, need guidance, or want to join our team — we're just a call away!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-0">
              © {new Date().getFullYear()} Avasar. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
    </footer>
  );
};

export default Footer; 