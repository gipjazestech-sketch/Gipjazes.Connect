// In-memory mock database for Demo Mode
const mockDB = {
    users: [],
    posts: [
        {
            _id: 'p1',
            userId: { _id: 'u1', name: 'Elena', profilePic: '' },
            content: 'Enjoying the vibrant streets of Barcelona today! 🎨🇪🇸',
            media: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
            mediaType: 'image',
            location: 'Spain',
            likes: [],
            comments: [],
            createdAt: new Date()
        }
    ],
    products: [
        { _id: 'pr1', name: 'Handcrafted Vase', price: '$45', origin: 'Mexico', image: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e38c?w=400', stock: 10 },
        { _id: 'pr2', name: 'Silk Scarf', price: '$30', origin: 'India', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400', stock: 5 }
    ],
    groups: [
        { _id: 'g1', name: 'Gourmet World', description: 'Exploring global cuisines', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', members: [], admin: { name: 'Admin' } }
    ],
    orders: []
};

module.exports = mockDB;
