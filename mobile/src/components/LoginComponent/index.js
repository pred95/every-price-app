import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import CustomButtom from '../common/CustomButton';
import Input from '../common/Input';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import {clearAuthState} from '../../context/actions/auth/login';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginComponent = ({error, onChange, onSubmit, loading, loginWithGoogle}) => {
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {data},
  } = useContext(GlobalContext);
  const [hidePassword, setHidePassword] = useState(true);

  const goToRegister = () => {
    clearAuthState()(authDispatch);
    navigate(REGISTER);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '885483439166-n40na3het3hrg8q6mm64ilehc4eeht9k.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to EveryPrice</Text>
        <Text style={styles.subTitle}>Please log in here</Text>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            secureTextEntry={hidePassword}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setHidePassword(prev => !prev);
                }}>
                <Text>{hidePassword ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />
          <CustomButtom
            primary
            title="Submit"
            onPress={onSubmit}
            disabled={loading}
            loading={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                goToRegister();
              }}>
              <Text style={styles.linkBtn}>Register here!</Text>
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center', paddingVertical: 8, fontSize: 16}}>
            or
          </Text>
          <GoogleSigninButton
            style={{width: '100%', height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {loginWithGoogle()(authDispatch)}}
            disabled={loading}
          />
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
