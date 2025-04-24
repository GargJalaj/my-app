const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config(); // Load .env variables immediately
const connectDB = require('./config/db');
const path = require('path');

// Connect to Database
connectDB();

const app = express();

// --- Middleware ---
// CORS Configuration (Allow requests from React dev server)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'YOUR_PROD_FRONTEND_URL' : 'http://localhost:3000', // Replace with your frontend URL in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // If you need to handle cookies or authorization headers
};
app.use(cors(corsOptions));

// Body Parsers
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flashcards', require('./routes/flashcardRoutes'));

// --- Simple Root Route ---
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the AI Flashcard Generator API' });
});


// --- Serve Frontend Static Files in Production ---
if (process.env.NODE_ENV === 'production') {
    // Define the path to the static build directory of the client
    const clientBuildPath = path.join(__dirname, '..', 'client', 'build');

    // Serve static files (CSS, JS, images) from the build directory
    app.use(express.static(clientBuildPath));

    // For any other GET request (that wasn't handled by API routes),
    // send back the main index.html file from the client build.
    // This allows React Router to handle client-side routing.
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(clientBuildPath, 'index.html'));
    });
} else {
     // In development, provide a fallback message for the root path
     app.get('/', (req, res) => {
        res.send('API is running in development mode... Connect via React client on port 3000.');
    });
}


// --- Port Configuration ---
const PORT = process.env.PORT || 5001;

// --- Start Server ---
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));

// --- Optional: Global Error Handler (Basic Example) ---
// app.use((err, req, res, next) => {
//     console.error("Unhandled Error:", err.stack);
//     res.status(500).send('Something broke!');
// });