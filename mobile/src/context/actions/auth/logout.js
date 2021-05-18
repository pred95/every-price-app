import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER, CLEAR_AUTH_STATE} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import storeData from '../../../utils/storeData';
import removeData from '../../../utils/removeData';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default () => dispatch => {
  var refresh = ''
  AsyncStorage.getItem('refresh_token').then(value => {
    refresh = value
    axiosInstance
      .post('auth/logout/', {
        refresh: refresh,
      })
      .then(() => {
        removeData('access_token');
        removeData('refresh_token');
        removeData('username');
        dispatch({type: LOGOUT_USER});
      })
      .catch(err => {
        console.log(`refresh`, refresh)
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: refresh,
          })
          .then(res => {
            removeData('access_token');
            storeData('access_token', res.data.access);
            axiosInstance
              .post('auth/logout/', {
                refresh: refresh,
              })
              .then(() => {
                removeData('access_token');
                removeData('refresh_token');
                removeData('username');
                dispatch({type: LOGOUT_USER});
              });
          });
      });
  });
};
