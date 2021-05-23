import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../config/env';

let headers = {};
const axiosInstance = axios.create({
  baseURL: envs.BACKEND_URL,
  headers,
});
axiosInstance.interceptors.request.use(
  async config => {
    const access = await AsyncStorage.getItem('access_token');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
