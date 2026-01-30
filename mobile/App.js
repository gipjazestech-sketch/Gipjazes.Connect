import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Globe, Heart, MessageSquare, Bell } from 'lucide-react-native';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Globe color="#FF9900" size={32} />
                    <Text style={styles.logoText}>Gipjazes Connect</Text>
                </View>
                <TouchableOpacity>
                    <Bell color="#CBD5E1" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.feed}>
                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.postCard}>
                        <View style={styles.postHeader}>
                            <View style={styles.avatar} />
                            <View>
                                <Text style={styles.author}>Global Traveler</Text>
                                <Text style={styles.time}>3h ago • Switzerland</Text>
                            </View>
                        </View>
                        <Text style={styles.postContent}>
                            Exploring the beautiful Alps today. The air is so fresh here! 🏔️✨
                        </Text>
                        <View style={styles.imagePlaceholder} />
                        <View style={styles.postFooter}>
                            <TouchableOpacity style={styles.footerAction}>
                                <Heart color="#94A3B8" size={20} />
                                <Text style={styles.footerText}>1.2k</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerAction}>
                                <MessageSquare color="#94A3B8" size={20} />
                                <Text style={styles.footerText}>48</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.navBar}>
                <Globe color="#FF9900" size={28} />
                <MessageSquare color="#94A3B8" size={28} />
                <View style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                </View>
                <Heart color="#94A3B8" size={28} />
                <View style={styles.smallAvatar} />
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
    feed: {
        padding: 15,
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
    plusText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    smallAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#334155',
        borderWidth: 1,
        borderColor: '#FF9900',
    }
});
