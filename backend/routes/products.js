const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
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

// Get all products
router.get('/', async (req, res) => {
    try {
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            return res.json(mockDB.products);
        }
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create product (Merchant Center)
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, price, category, origin, image, stock } = req.body;
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const newProduct = { _id: Date.now().toString(), name, description, price, category, origin, image, stock, seller: req.user.id };
            mockDB.products.push(newProduct);
            return res.json(newProduct);
        }
        const newProduct = new Product({
            name, description, price, category, origin, image, stock,
            seller: req.user.id
        });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Place order (Purchase)
router.post('/purchase', auth, async (req, res) => {
    try {
        const { productId, quantity, totalPrice, shippingAddress } = req.body;
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const newOrder = { _id: Date.now().toString(), buyer: req.user.id, product: productId, quantity, totalPrice, shippingAddress, status: 'Pending' };
            mockDB.orders.push(newOrder);
            return res.json(newOrder);
        }
        const newOrder = new Order({
            buyer: req.user.id,
            product: productId,
            quantity,
            totalPrice,
            shippingAddress
        });
        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get user orders (Buyer & Seller)
router.get('/orders', auth, async (req, res) => {
    try {
        if (global.isDemoMode) {
            const mockDB = require('../mockDB');
            const userOrders = mockDB.orders.filter(o => o.buyer === req.user.id || o.seller === req.user.id);
            return res.json(userOrders);
        }
        const orders = await Order.find({
            $or: [{ buyer: req.user.id }, { seller: req.user.id }]
        }).populate('product').populate('buyer', 'name');
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

