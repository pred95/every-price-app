import React from 'react';
import {useRoute} from '@react-navigation/native';
import OfferDetailComponent from '../../components/OfferDetailComponent';

const OfferDetail = () => {
  const {params: {item = {}} = {}} = useRoute();

  return <OfferDetailComponent offer={item} />;
};

export default OfferDetail;
