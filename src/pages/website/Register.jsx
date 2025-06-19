import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    sponsorId: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sponsorInfo, setSponsorInfo] = useState(null);
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [usernameStatus, setUsernameStatus] = useState('');
  const usernameCheckTimeout = useRef(null);

  // Check for referral code in URL on component mount
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      setFormData(prev => ({ ...prev, sponsorId: refCode }));
      fetchSponsorInfo(refCode);
    }
  }, [searchParams]);

  // Fetch sponsor information
  const fetchSponsorInfo = async (referralCode) => {
    setSponsorLoading(true);
    try {
      const response = await axios.get(`/auth/referral/${referralCode}`);
      setSponsorInfo(response.data.sponsor);
    } catch (error) {
      console.error('Error fetching sponsor info:', error);
      setError('Invalid referral code');
    } finally {
      setSponsorLoading(false);
    }
  };

  // Validation rules
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    },
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: true,
      pattern: /^\d{10}$/
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    },
    confirmPassword: {
      required: true,
      match: 'password'
    }
  };

  // Validate single field
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        switch (name) {
          case 'firstName':
          case 'lastName':
            return 'Only letters and spaces are allowed';
          case 'username':
            return 'Username can only contain letters, numbers, and underscores';
          case 'email':
            return 'Please enter a valid email address';
          case 'phone':
            return 'Phone number must be exactly 10 digits';
          case 'password':
            return 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
          default:
            return 'Invalid format';
        }
      }

      if (rules.match && value !== formData[rules.match]) {
        return 'Passwords do not match';
      }
    }

    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched as soon as user types
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field and set error in real-time
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // If sponsorId is changed, fetch new sponsor info
    if (name === 'sponsorId' && value) {
      fetchSponsorInfo(value);
    } else if (name === 'sponsorId' && !value) {
      setSponsorInfo(null);
    }
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Get password strength
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-orange-500' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-emerald-500' }
    };

    return { score, ...strengthMap[score] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Real-time username availability check
  useEffect(() => {
    if (!formData.username || errors.username) {
      setUsernameStatus('');
      return;
    }
    if (usernameCheckTimeout.current) clearTimeout(usernameCheckTimeout.current);
    usernameCheckTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(`/auth/check-username?username=${formData.username}`);
        setUsernameStatus(res.data.available ? 'available' : 'taken');
      } catch {
        setUsernameStatus('');
      }
    }, 500);
    return () => clearTimeout(usernameCheckTimeout.current);
  }, [formData.username, errors.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mark only required fields as touched
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Store registration data in localStorage and redirect to OTP page
    localStorage.setItem('pendingRegistration', JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      sponsorId: formData.sponsorId || null
    }));
    navigate(`/otp?email=${encodeURIComponent(formData.email)}`);
    setLoading(false);
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    // Only validate fields that are in validationRules (required fields)
    return Object.keys(validationRules).every(field => 
      formData[field] && !validateField(field, formData[field])
    );
  };

  return (
    <>
      {loading && <LoadingSpinner fullScreen text="Processing..." />}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-r from-primary-700 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/60 to-blue-600/60 opacity-80 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Create Your <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Avasar</span> Account</h1>
            <p className="text-2xl md:text-3xl font-medium mb-6">Join and start your journey to financial freedom</p>
            <p className="mb-10 text-lg md:text-xl font-light">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-yellow-300 hover:text-pink-300 transition-colors">Sign in here</Link>
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </section>

        {/* Register Form Section */}
        <section className="py-20 bg-white">
          <div className="max-w-xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-4">
                  <div className="flex items-center">
                    <span className="mr-3">❌</span>
                    {error}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                        touched.firstName && errors.firstName 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="First name"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">👤</span>
                    </div>
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                        touched.lastName && errors.lastName 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Last name"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">👤</span>
                    </div>
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                      touched.username && errors.username 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Choose a username"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🎯</span>
                  </div>
                </div>
                {touched.username && errors.username && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.username}
                  </p>
                )}
                {formData.username && !errors.username && usernameStatus === 'available' && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <span className="mr-1">✅</span>
                    Username available
                  </p>
                )}
                {formData.username && !errors.username && usernameStatus === 'taken' && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">❌</span>
                    Username already taken
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative flex items-center space-x-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                      touched.email && errors.email 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                      touched.phone && errors.phone 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">📞</span>
                  </div>
                </div>
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="sponsorId" className="block text-sm font-bold text-gray-700 mb-2">
                  Sponsor ID (Optional)
                </label>
                <div className="relative">
                  <input
                    id="sponsorId"
                    name="sponsorId"
                    type="text"
                    value={formData.sponsorId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl"
                    placeholder="Enter sponsor ID if you have one"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🤝</span>
                  </div>
                </div>
                {sponsorLoading && (
                  <p className="mt-1 text-sm text-blue-600 flex items-center">
                    <span className="mr-1">⏳</span>
                    Verifying sponsor...
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                      touched.password && errors.password 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Password strength:</span>
                      <span className={`text-sm font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside space-y-1 mt-1">
                        <li className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}>
                          At least 8 characters
                        </li>
                        <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                          One lowercase letter
                        </li>
                        <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                          One uppercase letter
                        </li>
                        <li className={/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                          One number
                        </li>
                        <li className={/[@$!%*?&]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                          One special character (@$!%*?&)
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-xl ${
                      touched.confirmPassword && errors.confirmPassword 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔐</span>
                  </div>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <span className="mr-2">✨</span>
                        Create Account
                      </span>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register; 