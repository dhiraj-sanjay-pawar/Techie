// components/CustomNavigationBar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomNavigationBar = ({ state, descriptors, navigation }) => {
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
            case 'Home':
              return 'home';
            case 'Task':
              return 'tasks';
            case 'Profile':
              return 'user';
            default:
              return 'question';
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
              size={24}
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
    height: 60,
    backgroundColor: '#1f1f1f',
    borderTopColor: '#333',
    borderTopWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  activeTab: {
    backgroundColor: '#444',
    borderRadius: 15,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#673ab7',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
});

export default CustomNavigationBar;
