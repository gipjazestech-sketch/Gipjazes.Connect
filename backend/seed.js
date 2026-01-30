const mongoose = require('mongoose');
const Product = require('./models/Product');
const Group = require('./models/Group');

const MONGODB_URI = 'mongodb://localhost:27017/globalconnect';

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing
        await Product.deleteMany({});
        await Group.deleteMany({});

        // Seed Products
        const products = [
            { name: 'Handcrafted Vase', price: '$45', origin: 'Mexico', image: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e38c?w=400' },
            { name: 'Silk Scarf', price: '$30', origin: 'India', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400' },
            { name: 'Ethiopian Coffee', price: '$25', origin: 'Ethiopia', image: 'https://images.unsplash.com/photo-1559056191-7440026e952d?w=400' },
            { name: 'African Mask', price: '$120', origin: 'Mali', image: 'https://images.unsplash.com/photo-1590424753951-40c26880da0f?w=400' }
        ];
        await Product.insertMany(products);

        // Seed Groups
        const groups = [
            { name: 'Gourmet World', description: 'Exploring global cuisines', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600' },
            { name: 'Travel Pioneers', description: 'Find your next adventure', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600' },
            { name: 'EcoConnect', description: 'Sustainable living globally', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600' }
        ];
        await Group.insertMany(groups);

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
