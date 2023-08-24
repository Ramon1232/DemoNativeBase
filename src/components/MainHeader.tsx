import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface ResponsiveHeaderProps {
    navigation: any; // Ajusta el tipo de "navigation" según tus necesidades
    title: string;
    onRefresh: () => void;
}

const MainHeader: React.FC<ResponsiveHeaderProps> = ({ navigation, title, onRefresh }) => {
    const handleRefresh = () => {
        onRefresh(); // Llamamos a la función pasada como prop
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.openDrawer()}
            >
                <EvilIcons name='navicon' size={32} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightSection}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleRefresh}
                >
                    <EvilIcons name='refresh' size={32} color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#193250',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    backButton: {
        padding: 5,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '300',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    back: {
        color: '#FFFF',
        fontWeight: '300'
    }
    // Agrega más estilos según necesites
});

export default MainHeader;
