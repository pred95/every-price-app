import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../../assets/themes/colors';
import AppModal from '../common/AppModal';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';

const OffersComponent = ({data, loading, modalVisible, setModalVisible}) => {
  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={styles.ListEmptyComponent}>Ops, no offers here yet!</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.textItem}>
          <Text>{item.product}</Text>
          <Text>{item.price}</Text>
          <Text>{item.city}</Text>
          <Text>{item.date}</Text>
        </View>
        <TouchableOpacity>
          <IonIcon name="search-circle-sharp" size={30} />
        </TouchableOpacity>
      </View>
    );
  };
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
      {loading && (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
      {!loading && (
        <View style={{paddingVertical: 10}}>
          <FlatList
            data={data}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        </View>
      )}
    </View>
  );
};

export default OffersComponent;
