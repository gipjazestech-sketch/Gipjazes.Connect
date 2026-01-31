const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

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

// Upload Route
router.post('/upload', auth, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `http://127.0.0.1:5000/uploads/${req.file.filename}`;
    res.json({ url });
});

// Create Post
router.post('/', auth, async (req, res) => {
    try {
        const { content, media, mediaType, location } = req.body;
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const newPost = {
                _id: Date.now().toString(),
                userId: { _id: req.user.id, name: 'Demo User' },
                content,
                media,
                mediaType,
                location: location || 'Global',
                likes: [],
                comments: [],
                createdAt: new Date()
            };
            mockDB.posts.unshift(newPost);
            return res.json(newPost);
        }
        const newPost = new Post({
            userId: req.user.id,
            content,
            media,
            mediaType,
            location
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
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            return res.json(mockDB.posts);
        }
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name profilePic');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Like Post
router.put('/like/:id', auth, async (req, res) => {
    try {
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const post = mockDB.posts.find(p => p._id === req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            if (post.likes.includes(req.user.id)) {
                post.likes = post.likes.filter(id => id !== req.user.id);
            } else {
                post.likes.push(req.user.id);
            }
            return res.json(post.likes);
        }
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

// Add Comment
router.post('/comment/:id', auth, async (req, res) => {
    try {
        const { text } = req.body;
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const post = mockDB.posts.find(p => p._id === req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            const newComment = { _id: Date.now().toString(), userId: req.user.id, text, createdAt: new Date() };
            post.comments.push(newComment);
            return res.json(post.comments);
        }
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newComment = {
            userId: req.user.id,
            text
        };

        post.comments.push(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
