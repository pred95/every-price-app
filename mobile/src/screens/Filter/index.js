import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import FilterComponent from '../../components/FilterComponent';
import {FILTERED_OFFERS} from '../../constants/routeNames';
import filterOffers from '../../context/actions/offers/filterOffers';
import getOffers from '../../context/actions/offers/getOffers';
import {GlobalContext} from '../../context/Provider';
const Filter = () => {
  const today = new Date();
  const [form, setForm] = useState({
    product: '',
    city: '',
    region: '',
    dateBefore:
      today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2),
    dateAfter: '1900-01-01',
  });
  const {navigate} = useNavigation();
  const {
    offersDispatch,
    offersState: {
      getOffers: {data},
    },
  } = useContext(GlobalContext);

  const onSubmit = () => {
    filterOffers(form, data)(offersDispatch);
    getOffers()(offersDispatch);
    navigate(FILTERED_OFFERS);
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  return <FilterComponent onSubmit={onSubmit} onChange={onChange} form={form}/>;
};

export default Filter;
