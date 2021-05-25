import {Alert} from 'react-native';
import { LOGIN, REGISTER } from '../../../constants/routeNames';
import axiosInstance from '../../../helpers/axiosInstance';

export default form => navigate => {
  const email = form.email;
  axiosInstance
    .post('auth/request-reset-email/', {
      email,
    })
    .then(() => {
      Alert.alert(
        'Success',
        'We have sent a link to your email. Click it to reset your password.',
        [
          {
            text: 'Ok',
            style: 'cancel',
            onPress: () => {navigate(LOGIN)},
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {navigate(LOGIN)},
        },
      );
    })
    .catch(() => {
        Alert.alert(
            'Error',
            'This account does not exist. Please register.',
            [
              {
                text: 'Ok',
                style: 'cancel',
                onPress: () => {navigate(REGISTER)},
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {navigate(REGISTER)},
            },
          );
    });
};
