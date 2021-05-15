import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import colors from '../../assets/themes/colors';
import AppModal from '../common/AppModal';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CREATE_OFFER, OFFER_LIST} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/core';
import CustomButtom from '../common/CustomButton';

const OffersComponent = ({
  data,
  loading,
  modalVisible,
  setModalVisible,
  screen,
}) => {
  const {navigate} = useNavigation();
  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={styles.listEmptyComponent}>Ops, no offers here yet!</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          {item.image ? (
            <Image
              height={70}
              width={70}
              source={{uri: item.image}}
              style={styles.image}
            />
          ) : (
            <View style={styles.imageThumbnail}>
              <Text style={[styles.product, {color: colors.white}]}>
                {item.product[0]}
              </Text>
            </View>
          )}
          <View style={{paddingLeft: 10, paddingRight: 50}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.product}>{item.product}</Text>
            </View>
            <Text style={styles.city}>{item.city}</Text>
          </View>
          <Text style={{fontSize: 19}}>€ {item.price}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity>
            <IonIcon name="search-circle-sharp" size={35} color={colors.grey} />
          </TouchableOpacity>
          {screen === 'myOffers' && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Delete',
                  'Do you really want to delete this offer?',
                  [
                    {
                      text: 'Yes',
                      style: 'cancel',
                      onPress: () => {Alert.alert('Success', 'Delete offer')},
                    },
                    {
                      text: 'Cancel',
                      style: 'cancel',
                      onPress: () => {},
                    },
                  ],
                  {cancelable: true, onDismiss: () => {}},
                )
              }>
              <MaterialCommunityIcon
                name="delete-circle"
                size={32}
                color={colors.danger}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
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
          <View style={styles.activityIndicator}>
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
              ListFooterComponent={
                <View style={{height: 50, backgroundColor: colors.grey}} />
              }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigate(CREATE_OFFER);
        }}>
        <MaterialIcon name="add" color={colors.white} size={30} />
      </TouchableOpacity>
      {screen !== 'home' && (
        <CustomButtom
          primary
          title="Back to offer list "
          onPress={() => {
            navigate(OFFER_LIST);
          }}
        />
      )}
    </>
  );
};

export default OffersComponent;
