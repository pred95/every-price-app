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

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export default form => dispatch => {
  AsyncStorage.clear()
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
      storeData('id', String(res.data.id));
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
