import {
    GET_OFFERS_FAIL,
    GET_OFFERS_LOADING,
    GET_OFFERS_SUCCESS,
  } from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';


export default () => (dispatch) => {
    dispatch({
        type: GET_OFFERS_LOADING,
    });

    axiosInstance.get(`offers/`).then(res => {
        dispatch({
            type: GET_OFFERS_SUCCESS,
            payload: res.data,
        })
    })
    .catch(err => {
        console.log(`err`, err)
        dispatch({
            type: GET_OFFERS_FAIL,
            payload: err.response ? err.response.data : {error: "Something went wrong, try again"}
        })
    })
};