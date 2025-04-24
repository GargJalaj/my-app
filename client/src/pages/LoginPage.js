import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
            console.error("Login page error:", err);
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
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
                        <h2 className="text-2xl font-bold">Welcome Back</h2>
                        <p className="text-indigo-100 mt-1">Log in to your account</p>
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
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
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                                        placeholder="you@example.com"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span>Logging in...</span>
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5" />
                                        <span>Log In</span>
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <div className="mt-8 pt-6 text-center border-t border-gray-200">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-800">
                                    Sign up
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

export default LoginPage;