import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function DeleteAccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (confirmText !== 'DELETE') {
            setError("Please type DELETE to confirm account deletion");
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            
            // Get the token from local storage
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error("You are not logged in. Please log in and try again.");
            }
            
            // Replace with your actual delete account API endpoint
            const response = await fetch('/api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    password,
                    userId: user?.id // Include user ID if available
                })
            });
            
            // Log response status for debugging
            console.log('Delete response status:', response.status);
            
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    console.log('Error data:', errorData);
                    throw new Error(errorData.message || 'Failed to delete account');
                } else {
                    // For HTML responses or other non-JSON responses
                    const responseText = await response.text();
                    console.log('Non-JSON response:', responseText.substring(0, 100) + '...');
                    throw new Error(`Server error (${response.status}): Please try again later`);
                }
            }
            
            // Try to parse successful response
            let responseData;
            try {
                responseData = await response.json();
                console.log('Success response:', responseData);
            } catch (e) {
                // Response might not contain JSON
                console.log('Success response is not JSON');
            }
            
            // If successful, log the user out
            logout();
            navigate('/', { 
                state: { message: 'Your account has been successfully deleted.' } 
            });
            
        } catch (err) {
            console.error('Error deleting account:', err);
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };

    // If no user is logged in, redirect to login
    React.useEffect(() => {
        if (!user) {
            navigate('/login', { 
                state: { message: 'Please log in to delete your account.' } 
            });
        }
    }, [user, navigate]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Delete Account</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700 font-bold">Warning: This action cannot be undone</p>
                <p className="text-red-700 mt-2">
                    Deleting your account will permanently remove all your flashcards, 
                    progress data, and personal information from our system.
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Enter your password to confirm:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="confirm" className="block text-gray-700 mb-2">
                            Type DELETE to confirm:
                        </label>
                        <input
                            type="text"
                            id="confirm"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                            {error}
                        </div>
                    )}
                    
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || confirmText !== 'DELETE'}
                            className={`px-4 py-2 bg-red-600 text-white rounded ${
                                loading || confirmText !== 'DELETE' 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-red-700'
                            }`}
                        >
                            {loading ? 'Processing...' : 'Delete My Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteAccountPage;