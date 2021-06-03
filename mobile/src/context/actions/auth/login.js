import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import storeData from '../../../utils/storeData';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default form => dispatch => {
  AsyncStorage.clear();
  dispatch({type: LOGIN_LOADING});
  const password = form.password;
  const email = form.email;
  axiosInstance
    .post('auth/login/', {
      password,
      email,
    })
    .then(res => {
      storeData('access_token', res.data.tokens.access);
      storeData('refresh_token', res.data.tokens.refresh);
      storeData('username', res.data.username);
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong'},
      });
    });
};
