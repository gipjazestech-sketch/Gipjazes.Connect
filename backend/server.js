require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(helmet({
    contentSecurityPolicy: false,
}));

// Status Route for connectivity checks
app.get('/api/status', (req, res) => {
    res.json({ status: 'online', timestamp: new Date() });
});

// Create uploads folder if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (err) {
    console.warn('Warning: Could not create uploads directory. If on Vercel, this is expected for local storage.');
}
app.use('/uploads', express.static(uploadDir));

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('send_message', (data) => {
        // data: { room, message, author, time }
        io.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../web/dist')));
} else {
    app.get('/', (req, res) => {
        res.send('Gipjazes Connect API is running...');
    });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/products', require('./routes/products'));
app.use('/api/groups', require('./routes/groups'));
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

// Serve index.html for any remaining non-API routes in production
if (process.env.NODE_ENV === 'production') {
    // Regex to match any path
    app.get(/.*/, (req, res) => {
        if (!req.url.startsWith('/api')) {
            res.sendFile(path.resolve(__dirname, '../web', 'dist', 'index.html'));
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
