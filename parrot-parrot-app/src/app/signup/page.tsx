'use client'

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { error } from 'console';

const ParrotSignup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  type ErrorType = {
    name?: string;
    email?: string;
    password?: string;
    verifyPassword?: string;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

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
    name?: string;
    email?: string;
    password?: string;
    verifyPassword?: string;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.verifyPassword) {
      newErrors.verifyPassword = 'Please confirm your password';
    } else if (formData.password !== formData.verifyPassword) {
      newErrors.verifyPassword = 'Passwords do not match';
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
        const response = await fetch("/api/auth/signup", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            if(errorData.status === 409) {
                setErrorMessage("Email is already taken. Try a different one.");
            }
        }
        setErrorMessage("");
        
        // Send people to the dashboard
        router.push('/dashboard');
    
        console.log('Form submitted:', formData);
        // Handle successful signup (e.g., redirect or show success message)
    } catch (error) {
       if(error instanceof Error) {
            setErrorMessage(error.message);
        }else{
            setErrorMessage("An unexpected error occurred. Please try again later.");
        }
    } finally{
        setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password : string) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    const levels = [
      { text: 'Very Weak', color: 'bg-red-500' },
      { text: 'Weak', color: 'bg-orange-500' },
      { text: 'Fair', color: 'bg-yellow-500' },
      { text: 'Good', color: 'bg-green-500' },
      { text: 'Strong', color: 'bg-emerald-500' }
    ];

    return { strength, ...levels[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.verifyPassword && formData.password === formData.verifyPassword;

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
            <h1 className="text-3xl font-bold text-white mb-2">Join the Flock!</h1>
            <p className="text-white/80">Create your account and start the chaos</p>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.name 
                    ? 'border-red-400 focus:ring-red-400/50' 
                    : 'border-white/30 focus:border-white/50 focus:ring-white/20'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          i < passwordStrength.strength ? passwordStrength.color : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${passwordStrength.strength > 2 ? 'text-green-300' : 'text-yellow-300'}`}>
                    {passwordStrength.text}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Verify Password Field */}
            <div>
              <label htmlFor="verifyPassword" className="block text-white font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showVerifyPassword ? 'text' : 'password'}
                  id="verifyPassword"
                  name="verifyPassword"
                  value={formData.verifyPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.verifyPassword 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : passwordsMatch
                      ? 'border-green-400 focus:ring-green-400/50'
                      : 'border-white/30 focus:border-white/50 focus:ring-white/20'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showVerifyPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {passwordsMatch && formData.verifyPassword && (
                <p className="text-green-300 text-sm mt-1 flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Passwords match!</span>
                </p>
              )}
              
              {errors.verifyPassword && (
                <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.verifyPassword}</span>
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account 🦜'
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
              Already have an account?{' '}
              <Link href="/login" className="text-yellow-300 hover:text-yellow-200 font-medium transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-white/60 text-sm mt-6">
          By creating an account, you agree to our{' '}
          <button className="text-white/80 hover:text-white transition-colors underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-white/80 hover:text-white transition-colors underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default ParrotSignup;