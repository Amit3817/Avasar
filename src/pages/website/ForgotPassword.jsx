import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpMessage('');
    try {
      await axios.post('/auth/send-otp', { email });
      setOtpSent(true);
      setOtpMessage('OTP sent to your email.');
    } catch (error) {
      setOtpMessage(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpMessage('');
    try {
      await axios.post('/auth/verify-otp', { email, otp });
      setOtpVerified(true);
      setOtpMessage('OTP verified successfully!');
    } catch (error) {
      setOtpMessage(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage('');
    if (newPassword !== confirmPassword) {
      setResetMessage('Passwords do not match');
      setResetLoading(false);
      return;
    }
    try {
      await axios.post('/auth/reset-password', { email, newPassword });
      setResetMessage('Password reset successfully! You can now log in.');
    } catch (error) {
      setResetMessage(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {resetMessage && (
          <div className={`mb-4 p-3 rounded-xl text-center ${resetMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{resetMessage}</div>
        )}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={otpLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            {otpMessage && (
              <div className={`mt-2 text-sm ${otpMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{otpMessage}</div>
            )}
          </form>
        ) : !otpVerified ? (
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
              disabled={otpLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {otpMessage && (
              <div className={`mt-2 text-sm ${otpMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{otpMessage}</div>
            )}
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {resetLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 