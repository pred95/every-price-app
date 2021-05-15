import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CreateOfferComponent from '../../components/CreateOfferComponent';

const CreateOffer = () => {
  const [form, setForm] = useState({});

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return <CreateOfferComponent onChangeText={onChangeText} form={form} />;
};

export default CreateOffer;
