import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Globe, Heart, MessageSquare, Bell, ShoppingBag, Calendar, Plus, User, Search, MapPin, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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
            // In a real environment, we'd use the correct IP address instead of localhost for mobile
            const baseUrl = 'http://127.0.0.1:5000/api';
            const [postsRes, productsRes, eventsRes] = await Promise.all([
                fetch(`${baseUrl}/posts`),
                fetch(`${baseUrl}/products`),
                fetch(`${baseUrl}/events`)
            ]);

            const postsData = await postsRes.json();
            const productsData = await productsRes.json();
            const eventsData = await eventsRes.json();

            setPosts(postsData);
            setProducts(productsData);
            setEvents(eventsData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallbacks for demo if server is unreachable from mobile emulator
            setPosts([
                { _id: '1', userId: { name: 'Elena' }, content: 'Enjoying the vibrant streets of Barcelona today! 🎨🇪🇸 #Travel #Culture', location: 'Spain', media: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80', likes: [1, 2, 3], comments: [1] },
                { _id: '2', userId: { name: 'Kenji' }, content: 'Just finished a new piece of digital art inspired by cyberpunk aesthetics. 🤖✨', location: 'Tokyo', media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', likes: [1], comments: [] }
            ]);
            setProducts([
                { _id: '1', name: 'Handcrafted Vase', price: '$45', origin: 'Mexico', image: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e38c?w=400' },
                { _id: '2', name: 'Silk Scarf', price: '$30', origin: 'India', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400' }
            ]);
            setEvents([
                { _id: '1', title: 'Paris Fashion Week Buzz', description: 'Experience the latest from the runways of Paris.', location: 'Paris, France', date: new Date(), image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const renderFeed = () => (
        <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
            {posts.map((post) => (
                <View key={post._id} style={styles.postCard}>
                    <View style={styles.postHeader}>
                        <Image source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId?.name || 'User'}` }} style={styles.avatar} />
                        <View>
                            <Text style={styles.author}>{post.userId?.name || 'Global Citizen'}</Text>
                            <Text style={styles.time}>Just now • {post.location || 'Global'}</Text>
                        </View>
                    </View>
                    <Text style={styles.postContent}>{post.content}</Text>
                    {post.media && (
                        <Image source={{ uri: post.media }} style={styles.postImage} />
                    )}
                    <View style={styles.postFooter}>
                        <TouchableOpacity style={styles.footerAction}>
                            <Heart color="#FF9900" size={20} />
                            <Text style={styles.footerText}>{post.likes?.length || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerAction}>
                            <MessageSquare color="#94A3B8" size={20} />
                            <Text style={styles.footerText}>{post.comments?.length || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.footerAction, { marginLeft: 'auto' }]}>
                            <Text style={styles.tipText}>Tip $5</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    const renderMarketplace = () => (
        <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
            <View style={styles.searchBar}>
                <Search color="#94A3B8" size={18} />
                <Text style={styles.searchPlaceholder}>Search unique crafts...</Text>
            </View>
            <Text style={styles.sectionTitle}>Global Marketplace</Text>
            <View style={styles.grid}>
                {products.map((item) => (
                    <View key={item._id} style={styles.productCard}>
                        <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            <View style={styles.originContainer}>
                                <MapPin color="#64748B" size={10} />
                                <Text style={styles.productOrigin}>{item.origin}</Text>
                            </View>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderEvents = () => (
        <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {events.map((event) => (
                <View key={event._id} style={styles.eventCard}>
                    <Image source={{ uri: event.image || 'https://via.placeholder.com/300' }} style={styles.eventImage} />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.eventMeta}>
                            <Calendar color="#FF9900" size={14} />
                            <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>
                            <MapPin color="#FF9900" size={14} style={{ marginLeft: 10 }} />
                            <Text style={styles.eventDate}>{event.location || 'Global'}</Text>
                        </View>
                        <Text style={styles.eventDesc} numberOfLines={2}>{event.description}</Text>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Reserve Spot</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    const renderProfile = () => (
        <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
            <View style={styles.profileHeader}>
                <Image source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }} style={styles.profileAvatar} />
                <Text style={styles.profileName}>Felix Gipjazes</Text>
                <View style={styles.proBadge}>
                    <Star color="#FF9900" size={12} fill="#FF9900" />
                    <Text style={styles.proText}>PRO MEMBER</Text>
                </View>
                <Text style={styles.profileBio}>Building the future of global connection. traveler & tech lover. 🌍</Text>
            </View>
            <View style={styles.statsRow}>
                <View style={styles.statItem}><Text style={styles.statVal}>128</Text><Text style={styles.statLabel}>Posts</Text></View>
                <View style={styles.statItem}><Text style={styles.statVal}>4.2k</Text><Text style={styles.statLabel}>Followers</Text></View>
                <View style={styles.statItem}><Text style={styles.statVal}>856</Text><Text style={styles.statLabel}>Following</Text></View>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Globe color="#FF9900" size={28} />
                    <Text style={styles.logoText}>Gipjazes<Text style={{ color: '#FF9900' }}> Connect</Text></Text>
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
                        {activeTab === 'profile' && renderProfile()}
                    </>
                )}
            </View>

            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => setActiveTab('feed')} style={styles.navItem}>
                    <Globe color={activeTab === 'feed' ? '#FF9900' : '#94A3B8'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('market')} style={styles.navItem}>
                    <ShoppingBag color={activeTab === 'market' ? '#FF9900' : '#94A3B8'} size={26} />
                </TouchableOpacity>
                <View style={styles.plusButton}>
                    <Plus color="white" size={24} />
                </View>
                <TouchableOpacity onPress={() => setActiveTab('events')} style={styles.navItem}>
                    <Calendar color={activeTab === 'events' ? '#FF9900' : '#94A3B8'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.navItem}>
                    <User color={activeTab === 'profile' ? '#FF9900' : '#94A3B8'} size={26} />
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#1E293B',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
    content: {
        flex: 1,
    },
    feed: {
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
    },
    searchPlaceholder: {
        color: '#64748B',
        fontSize: 14,
    },
    postCard: {
        backgroundColor: '#1E293B',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#334155',
    },
    author: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    time: {
        color: '#64748B',
        fontSize: 12,
    },
    postContent: {
        color: '#CBD5E1',
        lineHeight: 22,
        fontSize: 14,
        marginBottom: 12,
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 15,
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 15,
    },
    footerAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '600',
    },
    tipText: {
        color: '#FF9900',
        fontWeight: 'bold',
        fontSize: 13,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255, 153, 0, 0.1)',
        borderRadius: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: '#1E293B',
        borderRadius: 18,
        width: '48%',
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
    },
    productImage: {
        height: 140,
        width: '100%',
        backgroundColor: '#334155',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    productPrice: {
        color: '#3CB371',
        fontWeight: '800',
        fontSize: 15,
        marginTop: 4,
    },
    originContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    productOrigin: {
        color: '#64748B',
        fontSize: 11,
    },
    buyButton: {
        backgroundColor: '#334155',
        borderRadius: 8,
        padding: 10,
        marginTop: 12,
        alignItems: 'center',
    },
    buyButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    eventCard: {
        backgroundColor: '#1E293B',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
    },
    eventImage: {
        height: 180,
        width: '100%',
        backgroundColor: '#334155',
    },
    eventInfo: {
        padding: 18,
    },
    eventTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    eventDate: {
        color: '#FF9900',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 6,
    },
    eventDesc: {
        color: '#94A3B8',
        fontSize: 13,
        marginTop: 12,
        lineHeight: 18,
    },
    joinButton: {
        backgroundColor: '#FF9900',
        borderRadius: 12,
        padding: 14,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#FF9900',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    joinButtonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FF9900',
        marginBottom: 15,
    },
    profileName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    proBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,153,0,0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
        gap: 6,
    },
    proText: {
        color: '#FF9900',
        fontSize: 10,
        fontWeight: 'bold',
    },
    profileBio: {
        color: '#94A3B8',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginVertical: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statVal: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#64748B',
        fontSize: 11,
        marginTop: 4,
        textTransform: 'uppercase',
    },
    editButton: {
        backgroundColor: '#1E293B',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1E293B',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingBottom: 25,
    },
    navItem: {
        padding: 10,
    },
    plusButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40,
        shadowColor: '#FF9900',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
});
