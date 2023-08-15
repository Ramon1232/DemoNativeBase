import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface ResponsiveHeaderProps {
  navigation: any; // Ajusta el tipo de "navigation" según tus necesidades
  title: string;
  rightContent?: ReactNode;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ navigation, title, rightContent }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name='arrowleft' size={20} color={'white'}></AntDesign>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.backButton}
        >
          <EvilIcons name='question' size={20} color={'white'} />
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

export default ResponsiveHeader;
