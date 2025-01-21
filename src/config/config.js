// Use HTTPS for production API
export const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://tisha-dashboard-api.onrender.com'  // Removed /api since it's added in routes
    : 'http://localhost:10000';  // Updated to match your backend port

// Additional configuration constants can go here
export const FRONTEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://tisha-dashboard.vercel.app'
    : 'http://localhost:5000';  // Updated to match your current frontend port 