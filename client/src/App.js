import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/Flashcards';
import QuestionsPage from './pages/QuestionsPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import Navbar from './components/Navbar'; // Import Navbar
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { useAuth } from './hooks/useAuth'; // Import useAuth hook

function App() {
    const { isLoading } = useAuth(); // Get loading state from auth hook

    // Optional: Show a global loading indicator while checking auth status
    if (isLoading) {
        return <div>Loading Application...</div>; // Or a proper spinner component
    }

    return (
        <Router>
            <Navbar /> {/* Render Navbar on all pages */}
            <div className="container" style={{marginTop: '20px', padding: '0 20px'}}> {/* Basic container */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<HomePage />} />

                    {/* Private Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                     <Route path="/flashcards" element={
                <PrivateRoute>
                    <FlashcardsPage />
                </PrivateRoute>
            } />
            
            <Route path="/questions" element={
                <PrivateRoute>
                    <QuestionsPage />
                </PrivateRoute>
            } />
            
            <Route path="/delete-account" element={
                <PrivateRoute>
                    <DeleteAccountPage />
                </PrivateRoute>
            } />

                    {/* Redirect root path */}
                    {/* If logged in, redirect to dashboard, else to login */}
                     <Route
                        path="/"
                        element={
                             <Navigate to="/dashboard" replace />
                         }
                    />

                    {/* Optional: Add a 404 Not Found route */}
                    <Route path="*" element={<div><h2>404 Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;