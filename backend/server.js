require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../web/dist')));

    app.get('*', (req, res) => {
        // Only serve index.html if it's not an API route
        if (!req.url.startsWith('/api')) {
            res.sendFile(path.resolve(__dirname, '../web', 'dist', 'index.html'));
        }
    });
} else {
    // Routes
    app.get('/', (req, res) => {
        res.send('Gipjazes Connect API is running...');
    });
}

// Auth Routes
app.use('/api/auth', require('./routes/auth'));
// Post Routes
app.use('/api/posts', require('./routes/posts'));
// Product Routes
app.use('/api/products', require('./routes/products'));
// Group Routes
app.use('/api/groups', require('./routes/groups'));
// Event Routes
app.use('/api/events', require('./routes/events'));


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/globalconnect';
global.isDemoMode = false;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB. Switching to Demo Mode (In-Memory).');
        global.isDemoMode = true;
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
