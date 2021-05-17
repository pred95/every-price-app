import React, {useContext, useEffect, useState} from 'react';
import LoginComponent from '../../components/LoginComponent';
import {GlobalContext} from '../../context/Provider';
import login, {clearAuthState} from '../../context/actions/auth/login';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {OFFER_LIST} from '../../constants/routeNames';
import {Alert} from 'react-native';

const Login = () => {
  const [form, setForm] = useState({});
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  const {navigate} = useNavigation();

  useEffect(() => {
    if (error && !error.error && !loading) {
      Alert.alert(
        'Error',
        'Invalid credential, try again',
        [
          {
            text: 'Close',
            style: 'cancel',
            onPress: () => clearAuthState()(authDispatch),
          },
        ],
        {cancelable: true, onDismiss: () => clearAuthState()(authDispatch)},
      );
    }
  }, [error]);

  if (error?.error && !loading) {
    const err = error.error;
    Alert.alert(
      'Error',
      err,
      [
        {
          text: 'Close',
          style: 'cancel',
          onPress: () => clearAuthState()(authDispatch),
        },
      ],
      {cancelable: true, onDismiss: () => clearAuthState()(authDispatch)},
    );
  }

  useEffect(() => {
    if (data && Object.keys(data).length === 4) {
      navigate(OFFER_LIST);
    }
  }, [data]);

  const onSubmit = () => {
    if (form.email && form.password) {
      login(form)(authDispatch);
    } else {
      Alert.alert(
        'Error',
        'Please fill in all the fields',
        [
          {
            text: 'Close',
            style: 'cancel',
            onPress: () => clearAuthState()(authDispatch),
          },
        ],
        {cancelable: true, onDismiss: () => clearAuthState()(authDispatch)},
      );
    }
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}
    />
  );
};

export default Login;
