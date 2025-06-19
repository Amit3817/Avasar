import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto ? user.profilePhoto : null);
  const [photoFile, setPhotoFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('photo', photoFile);
      const response = await axios.post('/users/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      updateUser(response.data.user);
      setPhotoPreview(response.data.photoUrl);
      toast.success('Photo updated successfully!');
      setPhotoFile(null);
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put('/users/profile', formData);
      updateUser(response.data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${user?.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-primary-100 text-lg">Manage your personal information and settings</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Referral Code Section */}
      <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🎯</span>
          My Referral Code
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-purple-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full">
                <div className="flex-1 bg-white p-3 sm:p-4 rounded-xl border-2 border-purple-300 shadow-sm break-all w-full">
                  <p className="text-lg sm:text-2xl font-bold text-purple-600 text-center tracking-wider">
                    {user.referralCode || 'Loading...'}
                  </p>
                </div>
                <button
                  onClick={copyReferralCode}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 sm:py-4 px-3 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg"
                >
                  {copied ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">✅</span>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">📋</span>
                      Copy
                    </span>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Share this code with friends to earn referral bonuses when they join!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Link</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full">
                <div className="flex-1 bg-white p-3 sm:p-4 rounded-xl border-2 border-blue-300 shadow-sm break-all w-full">
                  <p className="text-xs sm:text-sm text-blue-600 break-all">
                    {user.referralCode ? `${window.location.origin}/register?ref=${user.referralCode}` : 'Loading...'}
                  </p>
                </div>
                <button
                  onClick={copyReferralLink}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 sm:py-4 px-3 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg"
                >
                  {copied ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">✅</span>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🔗</span>
                      Copy Link
                    </span>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Share this link directly with friends for easy registration!
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              How to Use Your Referral Code
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Share your referral code or link with friends and family</li>
              <li>• When they register using your code, you'll earn referral bonuses</li>
              <li>• Track your referrals and earnings in the Team section</li>
              <li>• Build your network and increase your income potential</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo Card */}
        <div className="lg:col-span-1">
          <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <span className="mr-2">📸</span>
                Profile Photo
              </h2>
              
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mx-auto shadow-lg border-4 border-white">
                  {photoPreview ? (
                    <img 
                      src={photoPreview.startsWith('/uploads/') ? photoPreview : (user.profilePhoto || photoPreview)} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl text-gray-400">👤</div>
                    </div>
                  )}
                </div>
                
                {photoFile && (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">📁</span>
                    Choose Photo
                  </span>
                </button>
                
                {photoFile && (
                  <button
                    onClick={handlePhotoUpload}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" text="" />
                        <span className="ml-2">Uploading...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">⬆️</span>
                        Upload Photo
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="lg:col-span-2">
          <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">👤</span>
              Personal Information
            </h2>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" text="" />
                        <span className="ml-2">Saving...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">💾</span>
                        Save Changes
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">❌</span>
                      Cancel
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-blue-700 mb-1">First Name</p>
                    <p className="text-lg font-medium text-blue-900">{user.firstName}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-green-700 mb-1">Last Name</p>
                    <p className="text-lg font-medium text-green-900">{user.lastName}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-purple-700 mb-1">Email Address</p>
                  <p className="text-lg font-medium text-purple-900">{user.email}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-orange-700 mb-1">Phone Number</p>
                  <p className="text-lg font-medium text-orange-900">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚙️</span>
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-indigo-700 mb-1">Username</p>
            <p className="text-lg font-medium text-indigo-900">{user.username}</p>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-pink-700 mb-1">Role</p>
            <p className="text-lg font-medium text-pink-900 capitalize">{user.role}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-yellow-700 mb-1">Current Rank</p>
            <p className="text-lg font-medium text-yellow-900">{user.rank || 'Supervisor'}</p>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-teal-700 mb-1">Member Since</p>
            <p className="text-lg font-medium text-teal-900">
              {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-red-700 mb-1">Account Status</p>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              user.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {user.isActive ? '🟢 Active' : '🔴 Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 