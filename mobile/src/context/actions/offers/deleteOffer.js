import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  CLEAR_OFFERS_STATE,
  DELETE_OFFER_FAIL,
  DELETE_OFFER_LOADING,
  DELETE_OFFER_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import removeData from '../../../utils/removeData';
import storeData from '../../../utils/storeData';

export default id => dispatch => onSuccess => {
  dispatch({
    type: DELETE_OFFER_LOADING,
  });

  axiosInstance.delete(`offers/delete/${id}`).catch(err => {
    if (!err.response) {
      dispatch({
        type: DELETE_OFFER_SUCCESS,
        payload: id,
      })
      onSuccess();
    } else {
      AsyncStorage.getItem('refresh_token').then(value => {
        const refresh = value;
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: refresh,
          })
          .then(res => {
            removeData('access_token');
            storeData('access_token', res.data.access);
            axiosInstance.delete(`offers/delete/${id}`).catch(err => {
              if (!err.response) {
                dispatch({type: DELETE_OFFER_SUCCESS, payload: id});
                onSuccess();
              } else {
                dispatch({
                  type: DELETE_OFFER_FAIL,
                  payload: err.response
                    ? err.response.data
                    : {error: 'Something went wrong, try again'},
                });
              }
            });
          });
      });
    }
  });
};
