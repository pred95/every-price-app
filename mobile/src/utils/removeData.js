import AsyncStorage from '@react-native-async-storage/async-storage';

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
  }
};

export default removeData;
