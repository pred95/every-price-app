import React from 'react';
import {Image, Text, View} from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import CustomButtom from '../common/CustomButton';
import Input from '../common/Input';

const RequestResetPasswordComponent = ({
  onChange,
  onSubmit,
}) => {
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
        <Text style={styles.subTitle}>Reset your password here</Text>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
          />
          <CustomButtom
            primary
            title="Submit"
            onPress={onSubmit}
          />
        </View>
      </View>
    </Container>
  );
};

export default RequestResetPasswordComponent;
