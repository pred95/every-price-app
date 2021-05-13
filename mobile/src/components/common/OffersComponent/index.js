import React from 'react';
import {Text, View} from 'react-native';
import AppModal from '../AppModal';
import CustomButton from '../CustomButton';

const OffersComponent = ({modalVisible, setModalVisible}) => {
  return (
    <View>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Zucchine"
        modalBody={
          <View>
            <Text>Zucchine detail</Text>
          </View>
        }
      />
      <CustomButton
        primary
        title="Open modal"
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
};

export default OffersComponent;
