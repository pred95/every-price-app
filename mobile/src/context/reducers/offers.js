import { GET_OFFERS_FAIL, GET_OFFERS_LOADING, GET_OFFERS_SUCCESS } from "../../constants/actionTypes";

const offers = (state, {type, payload}) => {
    switch (type) {
      case GET_OFFERS_LOADING:
        return {
          ...state,
          getOffers: {
            ...state.getOffers,
            loading: true,
            error: null,
          }
        };
        case GET_OFFERS_SUCCESS:
          return {
            ...state,
            getOffers: {
              ...state.getOffers,
              loading: false,
              data: payload,
            }
          };
          case GET_OFFERS_FAIL:
            return {
              ...state,
              getOffers: {
                ...state.getOffers,
                loading: false,
                error: payload,
              }
            };
      default:
        return state;
    }
  };
  
  export default offers;