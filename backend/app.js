const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
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

app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});