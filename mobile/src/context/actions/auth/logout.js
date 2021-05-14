import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER, CLEAR_AUTH_STATE} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default () => dispatch => {
  AsyncStorage.getItem('refresh_token').then(value => {
    axiosInstance
      .post('auth/logout/', {
        refresh: value,
      })
      .then(() => {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('refresh_token');
        AsyncStorage.removeItem('username');
        dispatch({type: LOGOUT_USER});
      })
      .catch(err => {
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: value,
          })
          .then(res => {
            AsyncStorage.removeItem('access_token');
            AsyncStorage.setItem('access_token', res.data.access);
            axiosInstance
              .post('auth/logout/', {
                refresh: value,
              })
              .then(() => {
                AsyncStorage.removeItem('access_token');
                AsyncStorage.removeItem('refresh_token');
                AsyncStorage.removeItem('username');
                dispatch({type: LOGOUT_USER});
              });
          });
      });
  });
};
