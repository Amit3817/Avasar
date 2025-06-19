import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const RESEND_COOLDOWN = 30; // seconds

const OTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'verify'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  // Prefill email from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) setEmail(emailParam);
  }, [location.search]);

  // Automatically send OTP when email is present and not already sent
  useEffect(() => {
    if (email && !otpSent) {
      sendOtp();
    }
    // eslint-disable-next-line
  }, [email, otpSent]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const sendOtp = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/auth/send-otp', { email });
      setStep('verify');
      setOtpSent(true);
      setResendCooldown(RESEND_COOLDOWN);
      setMessage('OTP sent to your email.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setOtp('');
    await sendOtp();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/auth/verify-otp', { email, otp });
      setMessage('OTP verified successfully! Creating your account...');
      localStorage.setItem('otpVerifiedEmail', email);
      // Retrieve registration data
      const regData = localStorage.getItem('pendingRegistration');
      if (!regData) {
        setMessage('Registration data not found. Please register again.');
        setLoading(false);
        return;
      }
      const userData = JSON.parse(regData);
      // Register the user
      const result = await register(userData);
      if (result.success) {
        // Clean up localStorage
        localStorage.removeItem('pendingRegistration');
        setMessage('Account created! Redirecting...');
        setTimeout(() => {
          window.location.href = '/user';
        }, 1000);
      } else {
        setMessage(result.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner fullScreen text="Processing..." />}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-2 sm:px-0">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">OTP <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Verification</span></h1>
            <p className="text-2xl md:text-3xl font-medium mb-6">Secure your registration</p>
            <p className="mb-10 text-lg md:text-xl font-light">Enter the OTP sent to your email to complete your registration.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </section>

        {/* OTP Form Section */}
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto px-2 sm:px-0">
            {message && (
              <div className={`mb-4 p-3 rounded-xl text-center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>
            )}
            {step === 'verify' && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the 6-digit OTP"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setStep('request'); setOtp(''); setMessage(''); }}
                  className="w-full mt-2 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className="w-full mt-2 bg-blue-100 text-blue-700 font-semibold py-3 px-6 rounded-xl hover:bg-blue-200 disabled:opacity-50"
                >
                  {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'}
                </button>
              </form>
            )}
            <div className="mt-6 text-center">
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => navigate('/register')}
              >
                Back to Registration
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OTP; 