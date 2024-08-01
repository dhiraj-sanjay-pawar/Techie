import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaperPlaneButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon name="paper-plane" size={15} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, // Rounded corners
    backgroundColor: '#000', // Black background
    width: 60, // Width of the button
    height: 30, // Height of the button
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaperPlaneButton;
