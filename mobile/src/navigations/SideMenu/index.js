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
        setUsername('')
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
      ],
      {cancelable: true, onDismiss: () => {}},
    );
  };
  var menuItems = [];
  if (isAuthenticated) {
    menuItems = [
      {
        icon: <Text>T</Text>,
        name: 'Filter',
        onPress: () => {
          navigation.navigate(FILTER);
        },
      },
      {
        icon: <Text>T</Text>,
        name: 'Logout',
        onPress: () => {
          handleLogout();
        },
      },
    ];
  } else {
    menuItems = [
      {
        icon: <Text>T</Text>,
        name: 'Filter',
        onPress: () => {
          navigation.navigate(FILTER);
        },
      },
      {
        icon: <Text>T</Text>,
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
            {isAuthenticated ? (
              <Text style={styles.welcomeText}>
                Welcome, <Text style={{fontStyle: 'italic'}}>{username}</Text>
              </Text>
            ) : (
              <Text style={styles.welcomeText}>
                Welcome, <Text style={{fontStyle: 'italic'}}>guest</Text>!
              </Text>
            )}
            <View style={{paddingHorizontal: 70}}>
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
