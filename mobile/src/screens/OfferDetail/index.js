import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import OfferDetailComponent from '../../components/OfferDetailComponent';

const OfferDetail = () => {
  const {params: {item = {}} = {}} = useRoute();

  const {setOptions} = useNavigation();

  useEffect(() => {
    if (item) {
      setOptions({
        title: item.product,
      });
    }
  }, [item]);

  return <OfferDetailComponent offer={item} />;
};

export default OfferDetail;
