import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_ENDPOINTS } from '../api_config';
import styles from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [loginID, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setImageSize({ width: 200, height: 200 });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setImageSize({ width: 400, height: 400 });
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: loginID,
          password: password,
        }).toString(),
      });
      const data = await response.json();

      if (data.status === 'success') {
        const user = data.user;
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
          text2: `Role: ${user.Role}`,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: user.Role === 'PM' ? 'PMTabs' : 'PHTabs' }],
        });
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../assets/loginimage.jpg')}
          style={[styles.image, { width: imageSize.width, height: imageSize.height }]}
        />
        <Text style={styles.title}>Teamwork Drives Success</Text>
        <TextInput
          style={styles.input}
          placeholder="Login ID"
          value={loginID}
          onChangeText={setLoginID}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
