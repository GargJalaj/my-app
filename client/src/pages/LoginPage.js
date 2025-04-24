import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Use the custom hook

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth(); // Get login function from context
    const navigate = useNavigate();
    const location = useLocation(); // Get location to redirect back if needed

    // Determine where to redirect after login
    const from = location.state?.from?.pathname || '/dashboard'; // Default to dashboard

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setIsLoading(true);

        try {
            const success = await login(email, password); // Call login from context
            if (success) {
                // Redirect to the intended page or dashboard
                navigate(from, { replace: true });
            } else {
                 // Should not happen if context throws error, but as fallback
                 setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            // Error message should come from the context/API call
             setError(err.message || 'Login failed. Please check your credentials.');
             console.error("Login page error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p style={styles.errorMessage}>{error}</p>}
                    <div style={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={styles.switchText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

// Basic inline styles (move to CSS for better management)
const styles = {
     pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Align form to top
        paddingTop: '50px', // Add some top padding
        minHeight: 'calc(100vh - 150px)', // Adjust based on navbar/footer height
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box', // Include padding in width
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
     switchText: {
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '0.9em',
    }
};

export default LoginPage;