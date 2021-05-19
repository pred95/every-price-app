import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateOfferComponent from '../../components/CreateOfferComponent';
import createOffer, {
  clearCreateOfferState,
} from '../../context/actions/offers/createOffer';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/core';
import {OFFER_LIST} from '../../constants/routeNames';
import {Alert} from 'react-native';
import getOffers from '../../context/actions/offers/getOffers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateOffer = () => {
  const {
    offersDispatch,
    offersState: {
      createOffer: {loading, error, data},
    },
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);

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

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = async (image) => {
    await setForm({...form, ["image"]: image});
    closeSheet();
  }

  return (
    <CreateOfferComponent
      onChangeText={onChangeText}
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      offersDispatch={offersDispatch}
      sheetRef={sheetRef}
      openSheet={openSheet}
      closeSheet={closeSheet}
      onFileSelected={onFileSelected}
    />
  );
};

export default CreateOffer;
