import React, {useContext, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import CustomButtom from '../common/CustomButton';
import Input from '../common/Input';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import {clearAuthState} from '../../context/actions/auth/login';

const LoginComponent = ({error, onChange, onSubmit, loading}) => {
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
  console.log(`error`, error);
  useFocusEffect(() => {
    if (error && !error.error && !loading) {
      Alert.alert(
        'Error',
        'Invalid credential, try again',
        [
          {
            text: 'Close',
            style: 'cancel',
            onPress: () => clearAuthState()(authDispatch),
          },
        ],
        {cancelable: true, onDismiss: () => clearAuthState()(authDispatch)},
      );
    }
  });

  if (error?.error && !loading) {
    const err = error.error;
    Alert.alert(
      'Error',
      err,
      [
        {
          text: 'Close',
          style: 'cancel',
          onPress: () => clearAuthState()(authDispatch),
        },
      ],
      {cancelable: true, onDismiss: () => clearAuthState()(authDispatch)},
    );
  }
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
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
