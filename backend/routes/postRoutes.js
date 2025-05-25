const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}= require ('../controllers/postControllers');

const { protect } = require('../middlewares/authMiddlewares');

const upload = require('../middlewares/uploadMiddleware');

// This code defines the routes for managing posts in the application.

const router = express.Router();

console.log(typeof upload);

router.post('/', upload.single('image') , protect, createPost); // Create a new post
router.get('/', protect, getPosts); // Get all posts
router.get('/:id', protect, getPostById); // Get a post by id
router.put('/:id', protect, updatePost); // Update a post by id
router.delete('/:id', protect, deletePost); // Delete a post by id

module.exports = router;
// This code defines the routes for managing posts in the application.