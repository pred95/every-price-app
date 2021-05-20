import {
  CLEAR_OFFERS_STATE,
  GET_OFFERS_FAIL,
  GET_OFFERS_LOADING,
  GET_OFFERS_SUCCESS,
  FILTER_OFFERS,
  CLEAR_FILTER,
  CREATE_OFFER_LOADING,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
  CLEAR_CREATE_OFFER_STATE,
  DELETE_OFFER_LOADING,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
} from '../../constants/actionTypes';

const offers = (state, {type, payload}) => {
  switch (type) {
    case CLEAR_OFFERS_STATE:
      return {
        ...state,
        getOffers: {
          ...state.getOffers,
          loading: false,
          error: null,
          data: {},
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
          error: null,
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
    case CREATE_OFFER_LOADING:
      return {
        ...state,
        createOffer: {
          ...state.createOffer,
          loading: true,
          error: null,
          data: {},
        },
      };
    case CLEAR_CREATE_OFFER_STATE:
      return {
        ...state,
        createOffer: {
          ...state.createOffer,
          loading: false,
          error: null,
          data: {},
        },
      };
    case CREATE_OFFER_SUCCESS:
      return {
        ...state,
        createOffer: {
          ...state.createOffer,
          loading: false,
          data: payload,
          error: null,
        },

        getOffers: {
          ...state.getOffers,
          loading: false,
          data: [payload, state.getOffers.data],
          error: null,
        },
      };
    case CREATE_OFFER_FAIL:
      return {
        ...state,
        createOffer: {
          ...state.createOffer,
          loading: false,
          error: payload,
        },
      };
    case DELETE_OFFER_LOADING:
      return {
        ...state,
        deleteOffer: {
          ...state.deleteOffer,
          loading: true,
          error: null,
          data: {},
        },
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        deleteOffer: {
          ...state.deleteOffer,
          loading: false,
          error: null,
        },
        getOffers: {
          ...state.getOffers,
          loading: false,
          data: state.getOffers.data.data.filter((item) => item.id !== payload),
          error: null
        }
      };
    case DELETE_OFFER_FAIL:
      return {
        ...state,
        deleteOffer: {
          ...state.deleteOffer,
          loading: false,
          error: null,
          data: {},
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
