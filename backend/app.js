const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const path = require('path');
// Serve static files from the 'uploads' directory

// Enable CORS for all routes
app.use(cors(
  {
    origin: ['http://localhost:5173', 'http://localhost:5000'], // Allow requests from these origins
    credentials: true, // Allow cookies to be sent with requests
  }
));
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load environment variables from .env file
dotenv.config();


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Blogger', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
// Middleware to parse JSON and URL-encoded data


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});