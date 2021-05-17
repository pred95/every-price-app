import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import OffersComponent from '../../components/OffersComponent';
import getOffers from '../../context/actions/offers/getOffers';
import {GlobalContext} from '../../context/Provider';

const Offers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const {
    offersDispatch,
    offersState: {
      getOffers: {data, loading},
    },
  } = useContext(GlobalContext);
  useEffect(() => {
    getOffers()(offersDispatch);
  }, []);

  const ret = AsyncStorage.getItem('id').then(value => {
    setUserId(value);
  });
  
  const myData = data.data.filter(offer => {
    return String(offer.user) === userId;
  });

  return (
    <OffersComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={myData}
      loading={loading}
      screen={'myOffers'}
    />
  );
};

export default Offers;
