import React, {useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import colors from '../../assets/themes/colors';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CREATE_OFFER,
  MY_OFFERS,
  OFFER_DETAIL,
  OFFER_LIST,
} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/core';
import CustomButtom from '../common/CustomButton';
import {GlobalContext} from '../../context/Provider';
import {clearCreateOfferState} from '../../context/actions/offers/createOffer';
import deleteOffer from '../../context/actions/offers/deleteOffer';

const OffersComponent = ({data, loading, screen, refreshing, onRefresh}) => {
  const {navigate} = useNavigation();
  const {
    authState: {isLoggedIn},
    offersDispatch,
  } = useContext(GlobalContext);
  const goToCreateOffer = () => {
    if (isLoggedIn) {
      clearCreateOfferState()(offersDispatch);
      navigate(CREATE_OFFER);
    } else {
      Alert.alert(
        'Error',
        'You have to login to create an offer',
        [
          {
            text: 'Ok',
            style: 'cancel',
            onPress: () => {},
          },
        ],
        {cancelable: true, onDismiss: () => {}},
      );
    }
  };

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
          <View style={styles.info}>
            <View style={{paddingLeft: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.product}>{item.product}</Text>
              </View>
              <Text style={styles.city}>{item.city}</Text>
            </View>
            <Text style={{fontSize: 19}}>??? {item.price}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              navigate(OFFER_DETAIL, {item});
            }}>
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
                      onPress: () => {
                        deleteOffer(item.id)(offersDispatch)(() => {
                          navigate(MY_OFFERS);
                        });
                      },
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
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
            <View style={styles.separator}></View>
            <View style={{height: 30, backgroundColor: colors.white}}></View>
          </View>
        )}
      </View>

      {screen === 'home' ? (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            goToCreateOffer();
          }}>
          <MaterialIcon name="add" color={colors.white} size={30} />
        </TouchableOpacity>
      ) : (
        <View style={{paddingHorizontal: 30}}>
          <CustomButtom
            primary
            title="Back to offer list "
            onPress={() => {
              navigate(OFFER_LIST);
            }}
          />
        </View>
      )}
    </>
  );
};

export default OffersComponent;
