import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface BreadcrumbItem {
  label: string;
  onPress: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <Text style={styles.txtLabel}> / </Text>}
          <TouchableOpacity onPress={item.onPress}>
            <Text style={styles.txtLabel}>{item.label}</Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  txtLabel: {
    color: 'grey'
  }
})
export default Breadcrumb;
