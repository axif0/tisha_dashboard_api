const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

const allowedOrigins = [
    'https://tisha-dashboard.vercel.app',
    'http://localhost:5000',
    'http://localhost:3000',
    'https://tisha-dashboard-api.onrender.com'
];

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin); // For debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Tisha Dashboard' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

// Connect to database with better error handling
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 