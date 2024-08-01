// components/CustomNavigationBar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PMNavigationBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        const iconName = (() => {
          switch (route.name) {
            case 'PMDashboard':
              return 'home'; // Home icon
            case 'TaskScreen':
              return 'tasks'; // Task icon
            case 'ProfileScreen':
              return 'user'; // Profile icon
            default:
              return 'question'; // Fallback icon
          }
        })();

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Icon
              name={iconName}
              size={20} // Smaller icon size
              color={isFocused ? '#fff' : '#b0b0b0'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50, // Smaller height
    backgroundColor: '#1f1f1f',
    borderTopColor: '#333',
    borderTopWidth: 1,
    elevation: 3, // Smaller elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Smaller shadow offset
    shadowOpacity: 0.15, // Smaller shadow opacity
    shadowRadius: 4, // Smaller shadow radius
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Smaller padding
  },
  activeTab: {
    backgroundColor: '#444',
    borderRadius: 10, // Smaller border radius
    paddingVertical: 2, // Smaller vertical padding
    borderWidth: 1,
    borderColor: '#673ab7',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
});

export default PMNavigationBar;
