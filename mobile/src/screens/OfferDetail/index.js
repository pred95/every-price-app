import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import OfferDetailComponent from '../../components/OfferDetailComponent';
import axiosInstance from '../../helpers/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import removeData from '../../utils/removeData';
import storeData from '../../utils/storeData';

const OfferDetail = () => {
  const {params: {item = {}} = {}} = useRoute();
  const [username, setUsername] = useState('');

  const {setOptions} = useNavigation();

  useEffect(() => {
    if (item) {
      setOptions({
        title: item.product,
      });
      axiosInstance
        .get(`auth/get-user/` + item.user)
        .then(res => {
          setUsername(res.data.username);
        })
        .catch(err => {
          if (err.response.status === 404) {
            console.log('in');
            setUsername('Anonymous');
          } else {
            AsyncStorage.getItem('refresh_token').then(value => {
              const refresh = value;
              axiosInstance
                .post(`auth/token/refresh`, {
                  refresh: refresh,
                })
                .then(res => {
                  removeData('access_token');
                  storeData('access_token', res.data.access);
                  axiosInstance.get(`auth/get-user/` + item.user).then(res => {
                    setUsername(res.data.username);
                  });
                });
            });
          }
        });
    }
  }, [item]);

  return <OfferDetailComponent offer={item} username={username} />;
};

export default OfferDetail;
