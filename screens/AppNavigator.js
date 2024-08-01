import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import PMDashboard from './pm/PMDashboard';
import TaskScreen from './pm/TaskScreen';
import ProfileScreen from './pm/ProfileScreen';
import PHDashboard from './ph/PHDashboard'; // Import for PH role
import TaskScreenPH from './ph/TaskScreen'; // Import for PH role
import ProfileScreenPH from './ph/ProfileScreen'; // Import for PH role
import PMNavigationBar from '../components/PMNavigationBar';
import PHNavigationBar from '../components/PHNavigationBar'; // Import for PH role

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PMTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <PMNavigationBar {...props} />}>
      <Tab.Screen 
        name="PMDashboard" 
        component={PMDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function PHTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <PHNavigationBar {...props} />}>
      <Tab.Screen 
        name="PHDashboard" 
        component={PHDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="ProfileScreenPH" 
        component={ProfileScreenPH}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const loggedInUsername = await AsyncStorage.getItem('loggedInUsername');
      if (loggedInUsername) {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
      }
      setIsLoading(false);
    };
    checkUserRole();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        {userRole === 'PM' && (
          <Stack.Screen 
            name="PM Task Board" 
            component={PMTabNavigator}
            options={{ 
              headerShown: true,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24, // Adjust the size as needed
              },
            }} 
          />
        )}
        {userRole === 'PH' && (
          <Stack.Screen 
            name="PHTabs" 
            component={PHTabNavigator}
            options={{ headerShown: false }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
