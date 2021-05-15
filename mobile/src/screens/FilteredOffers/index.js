import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import CustomButtom from '../../components/common/CustomButton';
import OffersComponent from '../../components/OffersComponent';
import {GlobalContext} from '../../context/Provider';

const FilteredOffers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    offersState: {
      filterOffers: {data},
    },
  } = useContext(GlobalContext);

  return (
      <OffersComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        loading={false}
        screen={'filtered'}
      />
  );
};

export default FilteredOffers;
