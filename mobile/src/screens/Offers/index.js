import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../../components/common/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Offers = () => {
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
    <Container>
      <Text>Hi from offers</Text>
    </Container>
  );
};

export default Offers;
