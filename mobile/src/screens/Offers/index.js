import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OffersComponent from '../../components/OffersComponent';
import getOffers from '../../context/actions/offers/getOffers';
import {GlobalContext} from '../../context/Provider';

const Offers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {setOptions, toggleDrawer} = useNavigation();
  const {
    offersDispatch,
    offersState: {
      getOffers: {data, loading},
    },
  } = useContext(GlobalContext);
  useEffect(() => {
    getOffers()(offersDispatch)
  }, [])
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <Icon style={{paddingLeft: 10}} size={30} name="menu" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <OffersComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data.data}
      loading={loading}
      home={true}
    />
  );
};

export default Offers;
