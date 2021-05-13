import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OffersComponent from '../../components/common/OffersComponent';

const Offers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {setOptions, toggleDrawer} = useNavigation();
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
  return (
    <OffersComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default Offers;
