import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white py-3 mb-5">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white no-underline">
                    AI Flashcards
                </Link>
                <ul className="flex items-center list-none m-0 p-0">
                    {user ? (
                        // Links shown when user is logged in
                        <>
                            <li className="ml-5 flex items-center">
                                <span className="mr-4 italic">Welcome, {user.name}!</span>
                            </li>
                            <li className="ml-5 flex items-center">
                                <Link to="/" className="text-white no-underline px-3 py-1 hover:bg-gray-700 rounded transition-colors duration-300">Home</Link>
                            </li>
                            <li className="ml-5 flex items-center">
                                <div className="relative">
                                    <button 
                                        onClick={toggleMenu} 
                                        className="bg-transparent border-0 text-white cursor-pointer p-1 flex items-center justify-center"
                                        aria-label="Menu"
                                    >
                                        <div className="flex flex-col justify-between w-6 h-5">
                                            <span className="block h-0.5 w-full bg-white mb-1"></span>
                                            <span className="block h-0.5 w-full bg-white mb-1"></span>
                                            <span className="block h-0.5 w-full bg-white"></span>
                                        </div>
                                    </button>
                                    
                                    {menuOpen && (
                                        <div className="absolute right-0 top-full mt-2 bg-white rounded shadow-lg w-48 z-10">
                                            <Link 
                                                to="/dashboard" 
                                                className="block py-3 px-4 text-gray-800 no-underline border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link 
                                                to="/flashcards" 
                                                className="block py-3 px-4 text-gray-800 no-underline border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                View Flashcards
                                            </Link>
                                            <Link 
                                                to="/questions" 
                                                className="block py-3 px-4 text-gray-800 no-underline border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                View Questions
                                            </Link>
                                            <button 
                                                onClick={handleLogout} 
                                                className="block py-3 px-4 text-gray-800 w-full text-left bg-transparent border-0 font-inherit border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                Logout
                                            </button>
                                            <Link 
                                                to="/delete-account" 
                                                className="block py-3 px-4 text-red-500 no-underline hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Delete Account
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </>
                    ) : (
                        // Links shown when user is logged out
                        <>
                            <li className="ml-5 flex items-center">
                                <Link to="/" className="text-white no-underline px-3 py-1 hover:bg-gray-700 rounded transition-colors duration-300">Home</Link>
                            </li>
                            <li className="ml-5 flex items-center">
                                <Link to="/login" className="text-white no-underline px-3 py-1 hover:bg-gray-700 rounded transition-colors duration-300">Login</Link>
                            </li>
                            <li className="ml-5 flex items-center">
                                <Link to="/signup" className="text-white no-underline px-3 py-1 hover:bg-gray-700 rounded transition-colors duration-300">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;