import React, {useContext} from 'react';
import OffersComponent from '../../components/OffersComponent';
import {GlobalContext} from '../../context/Provider';

const FilteredOffers = () => {
  const {
    offersState: {
      filterOffers: {data},
    },
  } = useContext(GlobalContext);

  return (
      <OffersComponent
        data={data}
        loading={false}
        screen={'filtered'}
      />
  );
};

export default FilteredOffers;
