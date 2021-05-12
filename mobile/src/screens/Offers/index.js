import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../../components/common/Container';

const Offers = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <Text style={{padding: 10}}>Nav</Text>
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
