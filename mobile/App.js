import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Globe, Heart, MessageSquare, Bell, ShoppingBag, Calendar, Plus, User } from 'lucide-react-native';

export default function App() {
    const [posts, setPosts] = useState([]);
    const [products, setProducts] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('feed');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [postsRes, productsRes, eventsRes] = await Promise.all([
                fetch('http://localhost:5000/api/posts'),
                fetch('http://localhost:5000/api/products'),
                fetch('http://localhost:5000/api/events')
            ]);

            const postsData = await postsRes.json();
            const productsData = await productsRes.json();
            const eventsData = await eventsRes.json();

            setPosts(postsData);
            setProducts(productsData);
            setEvents(eventsData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallbacks for demo
            setPosts([{ _id: '1', userId: { name: 'Global Traveler' }, content: 'Exploring the beautiful Alps today! 🏔️', location: 'Switzerland' }]);
            setProducts([{ _id: '1', name: 'Silk Scarf', price: '$45', origin: 'India' }]);
            setEvents([{ _id: '1', title: 'Coffee Tasting', description: 'Experience authentic Ethiopian coffee.', location: 'Addis Ababa', date: new Date() }]);
        } finally {
            setLoading(false);
        }
    };

    const renderFeed = () => (
        <ScrollView style={styles.feed}>
            {posts.map((post) => (
                <View key={post._id} style={styles.postCard}>
                    <View style={styles.postHeader}>
                        <View style={styles.avatar} />
                        <View>
                            <Text style={styles.author}>{post.userId?.name || 'Global Citizen'}</Text>
                            <Text style={styles.time}>Just now • {post.location || 'Global'}</Text>
                        </View>
                    </View>
                    <Text style={styles.postContent}>{post.content}</Text>
                    {post.media && <View style={styles.imagePlaceholder} />}
                    <View style={styles.postFooter}>
                        <TouchableOpacity style={styles.footerAction}>
                            <Heart color="#94A3B8" size={20} />
                            <Text style={styles.footerText}>{post.likes?.length || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerAction}>
                            <MessageSquare color="#94A3B8" size={20} />
                            <Text style={styles.footerText}>{post.comments?.length || 0}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    const renderMarketplace = () => (
        <ScrollView style={styles.feed}>
            <Text style={styles.sectionTitle}>Global Marketplace</Text>
            <View style={styles.grid}>
                {products.map((item) => (
                    <View key={item._id} style={styles.productCard}>
                        <View style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            <Text style={styles.productOrigin}>{item.origin}</Text>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderEvents = () => (
        <ScrollView style={styles.feed}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {events.map((event) => (
                <View key={event._id} style={styles.eventCard}>
                    <View style={styles.eventImage} />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>
                        <Text style={styles.eventDesc}>{event.description}</Text>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Reserve Spot</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Globe color="#FF9900" size={32} />
                    <Text style={styles.logoText}>Gipjazes Connect</Text>
                </View>
                <TouchableOpacity onPress={fetchData}>
                    <Bell color={loading ? '#FF9900' : '#CBD5E1'} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#FF9900" style={{ marginTop: 50 }} />
                ) : (
                    <>
                        {activeTab === 'feed' && renderFeed()}
                        {activeTab === 'market' && renderMarketplace()}
                        {activeTab === 'events' && renderEvents()}
                    </>
                )}
            </View>

            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => setActiveTab('feed')}>
                    <Globe color={activeTab === 'feed' ? '#FF9900' : '#94A3B8'} size={28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('market')}>
                    <ShoppingBag color={activeTab === 'market' ? '#FF9900' : '#94A3B8'} size={28} />
                </TouchableOpacity>
                <View style={styles.plusButton}>
                    <Plus color="white" size={24} />
                </View>
                <TouchableOpacity onPress={() => setActiveTab('events')}>
                    <Calendar color={activeTab === 'events' ? '#FF9900' : '#94A3B8'} size={28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('profile')}>
                    <User color={activeTab === 'profile' ? '#FF9900' : '#94A3B8'} size={28} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    feed: {
        padding: 15,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    postCard: {
        backgroundColor: '#1E293B',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF9900',
    },
    author: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    time: {
        color: '#64748B',
        fontSize: 12,
    },
    postContent: {
        color: '#CBD5E1',
        lineHeight: 20,
        marginBottom: 12,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: '#334155',
        borderRadius: 12,
        marginBottom: 12,
    },
    postFooter: {
        flexDirection: 'row',
        gap: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 12,
    },
    footerAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: '#1E293B',
        borderRadius: 15,
        width: '48%',
        marginBottom: 15,
        overflow: 'hidden',
    },
    productImage: {
        height: 120,
        backgroundColor: '#334155',
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    productPrice: {
        color: '#FF9900',
        fontWeight: '700',
        marginTop: 2,
    },
    productOrigin: {
        color: '#64748B',
        fontSize: 10,
        marginTop: 2,
    },
    buyButton: {
        backgroundColor: '#3CB371',
        borderRadius: 5,
        padding: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buyButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    eventCard: {
        backgroundColor: '#1E293B',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    eventImage: {
        height: 150,
        backgroundColor: '#334155',
    },
    eventInfo: {
        padding: 15,
    },
    eventTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventDate: {
        color: '#FF9900',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
    eventDesc: {
        color: '#CBD5E1',
        fontSize: 13,
        marginTop: 10,
        lineHeight: 18,
    },
    joinButton: {
        backgroundColor: '#FF9900',
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        alignItems: 'center',
    },
    joinButtonText: {
        color: 'white',
        fontWeight: '700',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1E293B',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    plusButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        shadowColor: '#FF9900',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});
