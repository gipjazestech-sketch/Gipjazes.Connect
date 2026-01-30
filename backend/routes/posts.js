const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Middleware to verify JWT
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Create Post
router.post('/', auth, async (req, res) => {
    try {
        const { content, media, mediaType } = req.body;
        const newPost = new Post({
            userId: req.user.id,
            content,
            media,
            mediaType
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Feed
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name profilePic');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Like Post
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.likes.includes(req.user.id)) {
            post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        } else {
            post.likes.push(req.user.id);
        }
        await post.save();
        res.json(post.likes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
