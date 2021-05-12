import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default form => dispatch => {
  dispatch({type: LOGIN_LOADING});
  const password = form.password;
  const email = form.email;
  axiosInstance
    .post('auth/login/', {
      password,
      email,
    })
    .then(res => {
      console.log(`res.data`, res.data)
      AsyncStorage.setItem("access_token", res.data.tokens.access)
      AsyncStorage.setItem("refresh_token", res.data.tokens.refresh)
      AsyncStorage.setItem("username", res.data.username)
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
