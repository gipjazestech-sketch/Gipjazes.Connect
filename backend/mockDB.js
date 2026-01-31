// In-memory mock database for Demo Mode
const mockDB = {
    users: [],
    posts: [],
    products: [
        { _id: 'pr1', name: 'Handcrafted Vase', price: '$45', origin: 'Mexico', image: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e38c?w=400', stock: 10 },
        { _id: 'pr2', name: 'Silk Scarf', price: '$30', origin: 'India', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400', stock: 5 }
    ],
    groups: [
        { _id: 'g1', name: 'Gourmet World', description: 'Exploring global cuisines', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', members: [], admin: { name: 'Admin' } }
    ],
    events: [
        { _id: 'e1', title: 'Paris Fashion Week Buzz', description: 'Live session from Paris', date: new Date(Date.now() + 86400000), location: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', userId: { name: 'Elena' }, attendees: [] },
        { _id: 'e2', title: 'Tokyo Tech Summit', description: 'Future of global connectivity', date: new Date(Date.now() + 172800000), location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', userId: { name: 'Kenji' }, attendees: [] }
    ],
    orders: []
};

module.exports = mockDB;
