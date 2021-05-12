import React, {useContext} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../../components/common/Container';
import {FILTER, LOGIN} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';

const SideMenu = ({navigation}) => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  var menuItems = [];
  if (isLoggedIn) {
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
    <SafeAreaView>
      <Container>
        <Image
          height={70}
          width={70}
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
        <View style={{paddingHorizontal: 75}}>
          {menuItems.map(({name, icon, onPress}) => (
            <TouchableOpacity onPress={onPress} key={name} style={styles.item}>
              {icon}
              <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default SideMenu;
