import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState } from 'react';
import FilterComponent from '../../components/FilterComponent';
import { FILTERED_OFFERS } from '../../constants/routeNames';
import filterOffers from '../../context/actions/offers/filterOffers'
import getOffers from '../../context/actions/offers/getOffers';
import { GlobalContext } from '../../context/Provider';
const Filter = () => {
  const [form, setForm] = useState({'product': '', 'city': '', 'region': ''});
  const {navigate} = useNavigation();
  const {
    offersDispatch,
    offersState: {
      getOffers: {data},
    },
  } = useContext(GlobalContext);

  const onSubmit = () => {
      filterOffers(form, data)(offersDispatch)
      getOffers()(offersDispatch)
      navigate(FILTERED_OFFERS);
    
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return <FilterComponent onSubmit={onSubmit} onChange={onChange}/>;
};

export default Filter;
