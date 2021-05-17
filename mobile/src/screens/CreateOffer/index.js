import React, {useContext, useEffect, useState} from 'react';
import CreateOfferComponent from '../../components/CreateOfferComponent';
import createOffer, {
  clearCreateOfferState,
} from '../../context/actions/offers/createOffer';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/core';
import {OFFER_LIST} from '../../constants/routeNames';
import {Alert} from 'react-native';
import getOffers from '../../context/actions/offers/getOffers';

const CreateOffer = () => {
  const {
    offersDispatch,
    offersState: {
      createOffer: {loading, error, data},
    },
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const {navigate} = useNavigation();

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  useEffect(() => {
    if (error && !loading) {
      Alert.alert(
        'Error',
        error.error,
        [
          {
            text: 'Close',
            style: 'cancel',
            onPress: () => {
              clearCreateOfferState()(offersDispatch);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            clearCreateOfferState()(offersDispatch);
          },
        },
      );
    }
  }, [error]);

  useEffect(() => {
    if (data.data && Object.keys(data.data).length === 9) {
      clearCreateOfferState()(offersDispatch);
      getOffers()(offersDispatch);
      navigate(OFFER_LIST);
    }
  }, [data]);

  const onSubmit = () => {
    createOffer(form, isLoggedIn)(offersDispatch);
 
  };
  return (
    <CreateOfferComponent
      onChangeText={onChangeText}
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      offersDispatch={offersDispatch}
    />
  );
};

export default CreateOffer;
