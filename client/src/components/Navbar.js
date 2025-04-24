import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Use the custom hook

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout from context
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <Link to={user ? "/dashboard" : "/login"} style={styles.brand}>
                    AI Flashcards
                </Link>
                <ul style={styles.navLinks}>
                    {user ? (
                        // Links shown when user is logged in
                        <>
                            <li style={styles.navItem}>
                                <span style={styles.welcome}>Welcome, {user.name}!</span>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
                            </li>
                            <li style={styles.navItem}>
                                <button onClick={handleLogout} style={styles.buttonLink}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        // Links shown when user is logged out
                        <>
                            <li style={styles.navItem}>
                                <Link to="/login" style={styles.navLink}>Login</Link>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/signup" style={styles.navLink}>Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

// Basic inline styles (consider moving to a CSS file)
const styles = {
    navbar: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 0',
        marginBottom: '20px',
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
    },
    brand: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        padding: '5px 10px',
        transition: 'background-color 0.3s ease',
    },
     buttonLink: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        font: 'inherit',
        padding: '5px 10px',
         textDecoration: 'none',
          transition: 'background-color 0.3s ease',
    },
    welcome: {
        marginRight: '15px',
        fontStyle: 'italic',
    }
};

// Add hover effect simulation for inline styles (use CSS for real hover)
styles.navLink[':hover'] = { backgroundColor: '#555' }; // Example, won't work directly inline
styles.buttonLink[':hover'] = { backgroundColor: '#555' };

export default Navbar;