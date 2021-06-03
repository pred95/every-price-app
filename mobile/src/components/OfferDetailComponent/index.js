import React from 'react';
import styles from './styles';
import {ScrollView, Text, View} from 'react-native';
import ImageComponent from './ImageComponent';
import Detail from '../common/Detail';

const OfferDetailComponent = ({offer}) => {
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
          <Detail label="Posted by:" value={offer.user} username/>
        </View>
      </View>
    </ScrollView>
  );
};

export default OfferDetailComponent;
