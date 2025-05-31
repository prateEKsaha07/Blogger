// import Post from '../models/Post.js';
const Post = require('../models/Post.js');

// Create a new post
const createPost = async (req, res) => {
    try {

        const { title, body, image, tags, category } = req.body;

        const imagePath = req.file ? req.file.path : null; // Assuming you're using multer for file uploads
        if (!title || !body || !imagePath || !tags || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }  

        console.log('req.user:', req.user);

        const post = new Post({
            title,
            body,
            image:imagePath,
            tags,
            category,
            author: req.user._id, // Assuming req.user is set by the auth middleware
        });
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { title, body, image, tags, category } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.author.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: 'Not authorized' });
        }

        post.title = title || post.title;
        post.body = body || post.body;
        post.image = req.file ? req.file.path : post.image; // Update image if a new one is uploaded
        post.tags = tags || post.tags;
        post.category = category || post.category;

        await post.save();
        console.log('(backend)Post updated:', post);
        res.status(200).json('updated successfully',post);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (
            post.author.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await post.deleteOne();
        console.log('(backend)Post deleted:', post);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
    };