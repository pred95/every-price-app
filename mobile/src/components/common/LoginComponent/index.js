import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Container from '../Container';
import styles from './styles';
import CustomButtom from '../CustomButton';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../../constants/routeNames';
import Message from '../Message';
import {GlobalContext} from '../../../context/Provider';
import {clearAuthState} from '../../../context/actions/auth/register';

const LoginComponent = () => {
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  const goToRegister = () => {
    clearAuthState()(authDispatch);
    navigate(REGISTER);
  };

  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to EveryPrice</Text>
        <Text style={styles.subTitle}>Please log in here</Text>
        <View style={styles.form}>
          <Message
            retry
            retryFunction={() => {
              console.log(`222`, 222);
            }}
            onDismiss={() => {}}
            primary
            message="Invalid credentials"
          />
          <Input
            label="Username"
            placeholder="Enter username"
            // error={"This field is required"}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            icon={<Text>Show</Text>}
            iconPosition="right"
          />
          <CustomButtom primary title="Submit" />
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
