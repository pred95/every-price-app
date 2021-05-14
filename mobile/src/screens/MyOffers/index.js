import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  console.log(`data`, data.data);
  const myData = data.data.filter(offer => {
    return String(offer.user) === userId;
  });

  return (
    <OffersComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={myData}
      loading={loading}
    />
  );
};

export default Offers;
