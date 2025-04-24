import axios from 'axios';

// Base URL for backend API (uses proxy in development)
const API_URL = '/api/';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the token to requests if available
api.interceptors.request.use(
    (config) => {
        // Get user info from local storage (or context/state management)
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            // Add the Authorization header for protected routes
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Auth Service ---
const register = async (userData) => {
    const response = await api.post('auth/register', userData);
    if (response.data && response.data.success) {
        // Store user data (including token) in local storage upon successful registration
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data; // Return the whole response data object
};

const login = async (userData) => {
    const response = await api.post('auth/login', userData);
    if (response.data && response.data.success) {
        // Store user data (including token) in local storage upon successful login
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const deleteAccount = async () => {
    const response = await api.delete('auth/delete'); // adjust the route if your backend uses something else
    return response.data; // Expects { success: true, msg: 'User deleted' }
};


const logout = () => {
    // Remove user from local storage to log out
    localStorage.removeItem('user');
    // You might want to also clear any related state in your context/state management
};

const getMe = async () => {
     // No need to pass data, token is handled by interceptor
    const response = await api.get('auth/me');
    return response.data; // Expects { success: true, data: user }
};


// --- Flashcard Service ---
const uploadPdfAndGenerate = async (formData, onProgress) => {
    // formData should contain the file appended with the key 'pdfFile'
    const response = await api.post('flashcards/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(percentCompleted); // Call the progress callback
            }
        },
    });
    return response.data; // Expects { success: true, msg: '...', data: newSet }
};

const getMyFlashcardSets = async () => {
    const response = await api.get('flashcards');
    return response.data; // Expects { success: true, count: N, data: [sets...] }
};

const getFlashcardSet = async (id) => {
     const response = await api.get(`flashcards/${id}`);
    return response.data; // Expects { success: true, data: set }
};

const deleteFlashcardSet = async (id) => {
     const response = await api.delete(`flashcards/${id}`);
     return response.data; // Expects { success: true, msg: '...', data: {} }
};


// Export functions grouped by service
const authService = {
    register,
    login,
    logout,
    getMe,
    deleteAccount,
};

const flashcardService = {
    uploadPdfAndGenerate,
    getMyFlashcardSets,
    getFlashcardSet,
    deleteFlashcardSet,
};

export { authService, flashcardService };