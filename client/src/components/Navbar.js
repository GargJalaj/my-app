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
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <Link to="/" style={styles.brand}>
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
                                <Link to="/" style={styles.navLink}>Home</Link>
                            </li>
                            <li style={styles.navItem}>
                                <div style={styles.burgerMenuContainer}>
                                    <button 
                                        onClick={toggleMenu} 
                                        style={styles.burgerButton}
                                        aria-label="Menu"
                                    >
                                        <div style={styles.burgerIcon}>
                                            <span style={styles.burgerLine}></span>
                                            <span style={styles.burgerLine}></span>
                                            <span style={styles.burgerLine}></span>
                                        </div>
                                    </button>
                                    
                                    {menuOpen && (
                                        <div style={styles.dropdownMenu}>
                                            <Link 
                                                to="/dashboard" 
                                                style={styles.dropdownItem}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link 
                                                to="/flashcards" 
                                                style={styles.dropdownItem}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                View Flashcards
                                            </Link>
                                            <Link 
                                                to="/questions" 
                                                style={styles.dropdownItem}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                View Questions
                                            </Link>
                                            <button 
                                                onClick={handleLogout} 
                                                style={styles.dropdownItem}
                                            >
                                                Logout
                                            </button>
                                            <Link 
                                                to="/delete-account" 
                                                style={{...styles.dropdownItem, color: '#ff4d4d'}}
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
                            <li style={styles.navItem}>
                                <Link to="/" style={styles.navLink}>Home</Link>
                            </li>
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

// Updated styles with burger menu and dropdown
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
        alignItems: 'center',
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
    welcome: {
        marginRight: '15px',
        fontStyle: 'italic',
    },
    burgerMenuContainer: {
        position: 'relative',
    },
    burgerButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    burgerIcon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '24px',
        height: '18px',
    },
    burgerLine: {
        display: 'block',
        height: '2px',
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: '4px',
    },
    dropdownMenu: {
        position: 'absolute',
        right: 0,
        top: '100%',
        marginTop: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        width: '200px',
        zIndex: 1000,
    },
    dropdownItem: {
        display: 'block',
        padding: '12px 16px',
        color: '#333',
        textDecoration: 'none',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        font: 'inherit',
        transition: 'background-color 0.2s ease',
    },
};

// Add hover effect for dropdown items
Object.assign(styles.dropdownItem, {
    ':hover': {
        backgroundColor: '#f5f5f5',
    }
});

export default Navbar;