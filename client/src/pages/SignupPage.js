import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Use the custom hook

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth(); // Get register function from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

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
        // Basic email format check (more robust needed for production)
        if (!/\S+@\S+\.\S+/.test(email)) {
             setError('Please enter a valid email address.');
             return;
        }

        setIsLoading(true);

        try {
             const success = await register(name, email, password); // Call register from context
             if (success) {
                 // Redirect to dashboard upon successful registration
                 navigate('/dashboard');
             } else {
                  // Should not happen if context throws error
                  setError('Registration failed. Please try again.');
             }
        } catch (err) {
             // Error message should come from the context/API call
             setError(err.message || 'Registration failed. Please try again.');
             console.error("Signup page error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
             <div style={styles.formContainer}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p style={styles.errorMessage}>{error}</p>}
                     <div style={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                            style={styles.input}
                        />
                    </div>
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
                            minLength="6"
                            disabled={isLoading}
                            style={styles.input}
                        />
                    </div>
                     <div style={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                            disabled={isLoading}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                 <p style={styles.switchText}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
             </div>
        </div>
    );
}

// Reusing styles from LoginPage for consistency (Ideally use shared CSS/components)
const styles = {
     pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '50px',
        minHeight: 'calc(100vh - 150px)',
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
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745', // Green for signup
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


export default SignupPage;