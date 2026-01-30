const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

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

// Get all groups
router.get('/', async (req, res) => {
    try {
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            return res.json(mockDB.groups);
        }
        const groups = await Group.find().populate('admin', 'name').sort({ createdAt: -1 });
        res.json(groups);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create group
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, isPrivate } = req.body;
        const newGroup = new Group({
            name, description, isPrivate,
            admin: req.user.id,
            members: [req.user.id]
        });
        const group = await newGroup.save();
        res.json(group);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Join group
router.put('/join/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (group.members.some(id => id.toString() === req.user.id)) {
            return res.status(400).json({ message: 'Already a member' });
        }

        group.members.push(req.user.id);
        await group.save();
        res.json(group.members);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
