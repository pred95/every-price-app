import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import {REGIONS} from '../../constants/regions';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../assets/themes/colors';

const CreateOfferComponent = () => {
  return (
    <View style={styles.container}>
      <Container>
        <Input label="Product" placeholder="Enter name of the product" />
        <Input label="Shop" placeholder="Enter name of the shop" />
        <Input label="City" placeholder="Enter city of the shop" />
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Region</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={true}
                placeholder={{label: 'Select a region', value: null}}
                onValueChange={value => console.log(`region: `, value)}
                items={[
                  {label: 'Abruzzo', value: 'Abruzzo'},
                  {label: 'Basilicata', value: 'Basilicata'},
                  {label: 'Calabria', value: 'Calabria'},
                ]}
              />
            </View>
          </View>
        </View>
        <Input label="Price" placeholder="Enter price of the product" />
        <Input label="Image" placeholder="Upload image of the product" />

        <CustomButton primary title="Submit" />
      </Container>
    </View>
  );
};

export default CreateOfferComponent;
