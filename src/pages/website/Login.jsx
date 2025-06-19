import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation rules
  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 1
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

      if (rules.pattern && !rules.pattern.test(value)) {
        switch (name) {
          case 'email':
            return 'Please enter a valid email address';
          default:
            return 'Invalid format';
        }
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

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear general error when user starts typing
    if (error) {
      setError('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mark all fields as touched
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/user');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  // Check if form is valid for submission
  const isFormValid = () => {
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
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <h1 className="text-2xl font-bold text-white">A</h1>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">Welcome Back</h1>
            <p className="text-2xl md:text-3xl font-medium mb-6">Sign in to your Avasar account</p>
            <p className="mb-10 text-lg md:text-xl font-light">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-yellow-300 hover:text-pink-300 transition-colors">Create one now</Link>
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </section>

        {/* Login Form Section */}
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-4">
                  <div className="flex items-center">
                    <span className="mr-3">❌</span>
                    {error}
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white ${touched.email && errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email address"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-bold mb-2">Password *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white ${touched.password && errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <div className="text-center mt-4">
                <Link to="/forgot-password" className="text-primary-600 hover:underline font-semibold">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login; 