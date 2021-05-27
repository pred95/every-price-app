import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CLEAR_OFFERS_STATE,
  GET_OFFERS_FAIL,
  GET_OFFERS_LOADING,
  GET_OFFERS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import removeData from '../../../utils/removeData';
import storeData from '../../../utils/storeData';

export const clearOffersState = () => dispatch => {
  dispatch({
    type: CLEAR_OFFERS_STATE,
  });
};

export default () => dispatch => {
  dispatch({
    type: GET_OFFERS_LOADING,
  });

  axiosInstance
    .get(`offers/`)
    .then(res => {
      dispatch({
        type: GET_OFFERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      AsyncStorage.getItem('refresh_token').then(value => {
        const refresh = value;
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: refresh,
          })
          .then(res => {
            removeData('access_token');
            storeData('access_token', res.data.access);
            axiosInstance
              .get(`offers/`)
              .then(res => {
                dispatch({type: GET_OFFERS_SUCCESS, payload: res.data});
              })
              .catch(err => {
                dispatch({
                  type: GET_OFFERS_FAIL,
                  payload: err.response
                    ? err.response.data
                    : {error: 'Something went wrong, try again'},
                });
              });
          });
      });
    });
};
