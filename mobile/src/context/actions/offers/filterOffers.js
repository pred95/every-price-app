import {CLEAR_FILTER, FILTER_OFFERS} from '../../../constants/actionTypes';

export default (form, data) => dispatch => {
  dispatch({type: CLEAR_FILTER});

  const filteredData = data.data.filter(offer => {
    return (
      offer.product.toLowerCase().startsWith(form.product.toLowerCase()) ===
        true &&
      offer.city.toLowerCase().startsWith(form.city.toLowerCase()) === true &&
      offer.region.startsWith(form.region) === true &&
      offer.date >= form.dateAfter &&
      offer.date <= form.dateBefore
    );
  });

  dispatch({type: FILTER_OFFERS, payload: filteredData});
};
