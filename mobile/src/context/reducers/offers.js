import {
  CLEAR_OFFERS_STATE,
  GET_OFFERS_FAIL,
  GET_OFFERS_LOADING,
  GET_OFFERS_SUCCESS,
  FILTER_OFFERS,
  CLEAR_FILTER
} from '../../constants/actionTypes';

const offers = (state, {type, payload}) => {
  switch (type) {
    case CLEAR_OFFERS_STATE:
      return {
        ...state,
        getOffers: {
          ...state.getOffers,
          loading: true,
          error: null,
          data: [],
        },
      };
    case GET_OFFERS_LOADING:
      return {
        ...state,
        getOffers: {
          ...state.getOffers,
          loading: true,
          error: null,
        },
      };
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        getOffers: {
          ...state.getOffers,
          loading: false,
          data: payload,
        },
      };
    case GET_OFFERS_FAIL:
      return {
        ...state,
        getOffers: {
          ...state.getOffers,
          loading: false,
          error: payload,
        },
      };
    case FILTER_OFFERS:
      return {
        ...state,
        filterOffers: {
          ...state.filterOffers,
          data: payload,
        },
      };
      case CLEAR_FILTER:
        return {
          ...state,
          filterOffers: {
            ...state.filterOffers,
            data: [],
          },
        };
    default:
      return state;
  }
};

export default offers;
