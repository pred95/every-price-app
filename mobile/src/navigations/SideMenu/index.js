import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../../components/common/Container';
import {FILTER, LOGIN} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import logout from '../../context/actions/auth/logout';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SideMenu = ({navigation, authDispatch}) => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [username, setUsername] = useState('');

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('username');

      if (user) {
        await AsyncStorage.getItem('username').then(value =>
          setUsername(value),
        );
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
        setUsername('');
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  const handleLogout = () => {
    navigation.toggleDrawer();
    Alert.alert(
      'Logout',
      'Do you really want to logout?',
      [
        {
          text: 'Yes',
          style: 'cancel',
          onPress: () => {
            logout()(authDispatch);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
      ],
      {cancelable: true, onDismiss: () => {}},
    );
  };
  var menuItems = [];
  if (isAuthenticated) {
    menuItems = [
      {
        icon: <AwesomeIcon size={20} name="filter" />,
        name: 'Filter',
        onPress: () => {
          navigation.navigate(FILTER);
        },
      },
      {
        icon: <MaterialIcon name="logout" size={20} />,
        name: 'Logout',
        onPress: () => {
          handleLogout();
        },
      },
    ];
  } else {
    menuItems = [
      {
        icon: <AwesomeIcon style={{paddingLeft: 5}} size={20} name="filter" />,
        name: 'Filter',
        onPress: () => {
          navigation.navigate(FILTER);
        },
      },
      {
        icon: <EntypoIcon size={20} name="login" />,
        name: 'Login',
        onPress: () => {
          navigation.navigate(LOGIN);
        },
      },
    ];
  }

  return (
    <>
      {authLoaded ? (
        <SafeAreaView>
          <Container>
            <Image
              height={70}
              width={70}
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.title}>EveryPrice</Text>
            {isAuthenticated ? (
              <Text style={styles.welcomeText}>
                Welcome, <Text style={{fontStyle: 'italic'}}>{username}</Text>
              </Text>
            ) : (
              <Text style={styles.welcomeText}>
                Welcome, <Text style={{fontStyle: 'italic'}}>guest</Text>!
              </Text>
            )}
            <View style={{paddingHorizontal: 60}}>
              {menuItems.map(({name, icon, onPress}) => (
                <TouchableOpacity
                  onPress={onPress}
                  key={name}
                  style={styles.item}>
                  {icon}
                  <Text style={styles.itemText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Container>
        </SafeAreaView>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default SideMenu;
