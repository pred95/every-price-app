import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import { Alert } from 'react-native';
import RequestResetPasswordComponent from '../../components/RequestResetPasswordComponent';
import {LOGIN} from '../../constants/routeNames';
import requestResetPassword from '../../context/actions/auth/requestResetPassword';

const RequestResetPassword = () => {
  const [form, setForm] = useState({});
  const {navigate} = useNavigation();

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (form.email) {
      requestResetPassword(form)(navigate);
    } else {
      Alert.alert(
        'Error',
        'Please enter an email',
        [
          {
            text: 'Close',
            style: 'cancel',
            onPress: () => {},
          },
        ],
        {cancelable: true, onDismiss: () => {}},
      );
    }
  };

  return (
    <RequestResetPasswordComponent onChange={onChange} onSubmit={onSubmit} />
  );
};

export default RequestResetPassword;
