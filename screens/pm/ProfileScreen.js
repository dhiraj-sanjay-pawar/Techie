import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
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
      <View style={styles.header}>
        <Image source={require('../../assets/techspark.png')} style={styles.profileImage} />
        <Text style={styles.username}>{userDetails.Name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userDetails.Username}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50, // Increased padding to increase height of black area
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 20, // Increased top margin for the image
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
