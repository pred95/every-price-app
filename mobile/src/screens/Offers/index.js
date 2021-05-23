import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OffersComponent from '../../components/OffersComponent';
import getOffers from '../../context/actions/offers/getOffers';
import {GlobalContext} from '../../context/Provider';

const Offers = () => {
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

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getOffers()(offersDispatch)
    setRefreshing(false)
  })

  return (
    <OffersComponent
      data={data.data}
      loading={loading}
      screen={'home'}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default Offers;
