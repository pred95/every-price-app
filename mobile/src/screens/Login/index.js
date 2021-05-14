import React, {useContext, useState} from 'react';
import LoginComponent from '../../components/LoginComponent';
import {GlobalContext} from '../../context/Provider';
import login from '../../context/actions/auth/login';
import {useNavigation} from '@react-navigation/core';
import {OFFER_LIST} from '../../constants/routeNames';

const Login = () => {
  const [form, setForm] = useState({});
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  const {navigate} = useNavigation();

  const onSubmit = () => {
    if (form.email && form.password) {
      login(form)(authDispatch);
      navigate(OFFER_LIST);
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
