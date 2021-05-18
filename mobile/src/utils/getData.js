import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (e) {
    // saving error
  }
};

export default getData;
