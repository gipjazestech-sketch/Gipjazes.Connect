const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
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

// Get all events
router.get('/', async (req, res) => {
    try {
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            return res.json(mockDB.events || []);
        }
        const events = await Event.find().populate('userId', 'name').sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create event
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, date, location, image } = req.body;
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            if (!mockDB.events) mockDB.events = [];
            const newEvent = { _id: Date.now().toString(), title, description, date, location, image, userId: { name: 'Felix' }, attendees: [] };
            mockDB.events.push(newEvent);
            return res.json(newEvent);
        }
        const newEvent = new Event({
            title, description, date, location, image,
            userId: req.user.id
        });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Join event
router.put('/join/:id', auth, async (req, res) => {
    try {
        if (global.isDemoMode) {
            return res.json({ message: 'Joined event' });
        }
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.attendees.some(id => id.toString() === req.user.id)) {
            return res.status(400).json({ message: 'Already attending' });
        }

        event.attendees.push(req.user.id);
        await event.save();
        res.json(event.attendees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
