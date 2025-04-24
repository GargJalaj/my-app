import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            const success = await register(name, email, password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error("Signup page error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute left-0 top-0 w-full h-64 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 -z-10"></div>
            <div className="absolute left-1/2 top-0 w-96 h-96 -translate-x-1/2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tr from-pink-400 to-amber-400 rounded-full blur-3xl opacity-20 -z-10"></div>
            
            <div className="w-full max-w-md">
                {/* Logo/branding element */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Sparkles className="h-6 w-6 text-indigo-600" />
                        <span>AI Flashcards</span>
                    </div>
                </div>
                
                {/* Card container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
                        <h2 className="text-2xl font-bold">Create an Account</h2>
                        <p className="text-purple-100 mt-1">Join thousands of students</p>
                    </div>
                    
                    {/* Form */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                                        placeholder="John Doe"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-5">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                                        placeholder="you@example.com"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                                        placeholder="••••••••"
                                        required
                                        minLength="6"
                                        disabled={isLoading}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                                        placeholder="••••••••"
                                        required
                                        minLength="6"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6 flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to the <a href="#" className="text-purple-600 hover:text-purple-800">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-800">Privacy Policy</a>
                                    </label>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span>Creating account...</span>
                                ) : (
                                    <>
                                        <UserPlus className="h-5 w-5" />
                                        <span>Create Account</span>
                                    </>
                                )}
                            </button>
                        </form>
                        
                        {/* Features highlight */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-3">Sign up today and get:</p>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    <span>Unlimited flashcard creation</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    <span>AI-powered learning suggestions</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    <span>Progress tracking & analytics</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-800">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <p className="mt-8 text-center text-gray-500 text-sm">
                    © 2025 AI Flashcards. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default SignupPage;