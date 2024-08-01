// components/CustomToast.js
import Toast from 'react-native-toast-message';

// Function to show toast messages
const ShowCustomToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

// Export the function
export { ShowCustomToast };
