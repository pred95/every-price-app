import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import storeData from '../../../utils/storeData';

export default () => dispatch => {
  AsyncStorage.clear();
  try {
    dispatch({type: LOGIN_LOADING});
    GoogleSignin.hasPlayServices();
    GoogleSignin.signIn().then(userInfo => {
      axiosInstance
        .post(`social_auth/google/`, {
          auth_token: userInfo.idToken,
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
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
