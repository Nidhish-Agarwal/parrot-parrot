'use client'

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const ParrotSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  type ErrorType = {
    email?: string;
    password?: string;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
const [redirectMessage, setRedirectMessage] = useState("");


  const router = useRouter();
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'

    useEffect(() => {
    if (searchParams.get('from')) {
      setRedirectMessage("You need to log in to access this feature.");
    }
  }, [searchParams.get('from')]);



  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ErrorType]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  type FormErrors = {
    email?: string;
    password?: string;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try{
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            if(errorData.status === 401) {
                setErrorMessage("Invalid email or password");
            }
        }
        setErrorMessage("");

        // Send people to the dashboard
        router.replace(from);
    
    } catch (error) {
        console.error('Signup error:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message );
        } else {
            setErrors({ email: 'An unexpected error occurred' });
        }
    } finally{
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Parrot */}
      <div className="absolute top-20 right-20 text-6xl opacity-20 animate-bounce hidden lg:block">
        🦜
      </div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce delay-1000 hidden lg:block">
        🦜
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse shadow-lg">
              🦜
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-white/80">Login to your account and start the chaos</p>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">

            {redirectMessage && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                    <p className="text-amber-200 text-center animate-pulse">
                       {redirectMessage}
                    </p>
                  </div>
                )}
           

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-400 focus:ring-red-400/50' 
                    : 'border-white/30 focus:border-white/50 focus:ring-white/20'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-white/30 focus:border-white/50 focus:ring-white/20'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {errors.password && (
                <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                isSubmitting
                  ? 'bg-white/30 text-white/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-red-500 text-white hover:from-yellow-500 hover:to-red-600 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login to your Account 🦜'
              )}
            </button>
          </div>
          {errorMessage && (
                  <div className="mt-6 p-4 rounded-2xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                    <p className="text-red-300 text-center animate-pulse flex items-center justify-center">
                      {errorMessage}
                    </p>
                  </div>
                )}

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-white/80">
              Don't have an account?{' '}
              <Link href="/signup" className="text-yellow-300 hover:text-yellow-200 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default ParrotSignup;