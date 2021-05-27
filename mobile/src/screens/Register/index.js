import React, {useState, useContext, useEffect} from 'react';
import RegisterComponent from '../../components/RegisterComponent';
import isalnum from '../../utils/isalnum';
import validateEmail from '../../utils/validateEmail';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {LOGIN} from '../../constants/routeNames';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);
  const {navigate} = useNavigation();

  useEffect(() => {
    if (data && !error) {
      Alert.alert(
        'Your account has been registrated successfully!',
        'We have sent a link to your email. Click it to activate your account!',
        [
          {
            text: 'Ok',
            onPress: () => navigate(LOGIN),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => navigate(LOGIN),
        },
      );
      clearAuthState()(authDispatch);
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      if (data) {
        clearAuthState()(authDispatch);
      }
    }, [data]),
  );

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'username') {
        if (!isalnum(value)) {
          setErrors(prev => {
            return {...prev, [name]: 'Username must be alphanumeric'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'Password must be at least 6 characters long',
            };
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      if (name !== 'first_name' && name !== 'last_name') {
        setErrors(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    }
  };

  const onSubmit = () => {
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: 'This field is required'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'This field is required'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'This field is required'};
      });
    }
    if (!validateEmail(form.email)) {
      setErrors(prev => {
        return {...prev, email: 'This field must be a valid email'};
      });
    }
    if (
      Object.values(form).length > 2 &&
      Object.values(errors).every(item => !item)
    ) {
      register(form)(authDispatch);
    }
  };

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};

export default Register;
