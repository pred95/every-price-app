import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Container from '../Container';
import styles from './styles';
import CustomButtom from '../CustomButton';
import Input from '../Input';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../../constants/routeNames';

const RegisterComponent = ({
  onSubmit,
  onChange,
  form,
  errors,
  loading,
  error,
}) => {
  const {navigate} = useNavigation();
  if (error?.error && !loading){
    const err = error.error
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
        source={require('../../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to EveryPrice</Text>
        <Text style={styles.subTitle}>Create your account here</Text>
        <View style={styles.form}>
          <Input
            label="First name"
            placeholder="Enter first name"
            onChangeText={value => {
              onChange({name: 'first_name', value});
            }}
            error={errors.first_name}
          />
          <Input
            label="Last name"
            placeholder="Enter last name"
            onChangeText={value => {
              onChange({name: 'last_name', value});
            }}
            error={errors.last_name}
          />
          <Input
            label="Email"
            placeholder="Enter email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
            error={
              errors.email ||
              (error?.email ? capitalizeFirstLetter(error.email[0]) : false)
            }
          />
          <Input
            label="Username"
            placeholder="Enter username"
            onChangeText={value => {
              onChange({name: 'username', value});
            }}
            error={
              errors.username ||
              (error?.username
                ? capitalizeFirstLetter(error.username[0])
                : false)
            }
          />
          <Input
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            icon={<Text>Show</Text>}
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
            error={
              errors.password ||
              (error?.password
                ? capitalizeFirstLetter(error.password[0])
                : false)
            }
          />
          <CustomButtom
            onPress={onSubmit}
            primary
            title="Submit"
            loading={loading}
            disabled={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.linkBtn}>Login here!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default RegisterComponent;
