import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        if (!user) {
          Alert.alert('Error', 'No logged-in user found.');
          return;
        }

        setUserDetails(JSON.parse(user));
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while fetching user details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading user details...</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text>No user details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{userDetails.Username}</Text>
      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.value}>{userDetails.Name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userDetails.Email}</Text>
      <Text style={styles.label}>Mobile Number:</Text>
      <Text style={styles.value}>{userDetails.MobileNumber}</Text>
      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{userDetails.Role}</Text>
      <Text style={styles.label}>Registration Date:</Text>
      <Text style={styles.value}>{userDetails.RegistrationDate}</Text>
      {/* Add other user details as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
