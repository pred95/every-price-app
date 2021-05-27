import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default form => dispatch => {
  AsyncStorage.clear()
  dispatch({type: REGISTER_LOADING});
  const email = form.email;
  const password = form.password;
  const username = form.username;
  const first_name = form.first_name;
  const last_name = form.last_name;

  axiosInstance
    .post('auth/register/', {
      email,
      password,
      username,
      first_name,
      last_name,
    })
    .then(res => {
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
    })
    .catch(err => {
      
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong'},
      });
    });
};
