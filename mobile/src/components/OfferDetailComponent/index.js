import React, { useState } from 'react';
import styles from './styles';
import {ScrollView, Text, View} from 'react-native';
import ImageComponent from './ImageComponent';
import Detail from '../common/Detail'
import axiosInstance from '../../helpers/axiosInstance'

const OfferDetailComponent = ({offer}) => {

  const [username, setUsername] = useState('')

  axiosInstance.get(`auth/get-user/` + offer.user).then(res => {
    setUsername(res.data.username)
  })

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {offer.image && <ImageComponent src={offer.image} />}
        <Text style={styles.name}>{offer.product}</Text>
        <View style={styles.content}>
          <Detail label="Shop:" value={offer.shop} />
          <Detail label="City:" value={offer.city} />
          <Detail label="Region:" value={offer.region} />
          <Detail label="Price:" value={'€ ' + offer.price} />
          <Detail label="Date:" value={offer.date} />
          <Detail label="Posted by:" value={username} username={true}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default OfferDetailComponent;
