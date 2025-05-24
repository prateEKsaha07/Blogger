const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postControllers';
import { Protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', Protect, createPost); // Create a new post
router.get('/', Protect, getPosts); // Get all posts
router.get('/:id', Protect, getPostById); // Get a post by id
router.put('/:id', Protect, updatePost); // Update a post by id
router.delete('/:id', Protect, deletePost); // Delete a post by id

module.exports = router;
// This code defines the routes for managing posts in the application.