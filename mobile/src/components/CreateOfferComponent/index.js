import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import {REGIONS} from '../../constants/regions';
import RNPickerSelect from 'react-native-picker-select';

const CreateOfferComponent = ({onChangeText, form}) => {
  const [region, setRegion] = useState('');
  var regions = [];
  REGIONS.map(region => {
    regions.push({label: region, value: region});
  });
  console.log(`regions`, regions);
  return (
    <View style={styles.container}>
      <Container>
        <Input
          label="Product"
          placeholder="Enter name of the product"
          onChangeText={value => {
            onChangeText({name: 'product', value: value});
          }}
        />
        <Input
          label="Shop"
          placeholder="Enter name of the shop"
          onChangeText={value => {
            onChangeText({name: 'shop', value: value});
          }}
        />
        <Input
          label="City"
          placeholder="Enter city of the shop"
          onChangeText={value => {
            onChangeText({name: 'city', value: value});
          }}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Region</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                style={{inputAndroid: {color: 'black'}}}
                useNativeAndroidPickerStyle={true}
                placeholder={{label: 'Select a region', value: null}}
                onValueChange={value => {
                  setRegion(value);
                  onChangeText({name: 'region', value: value});
                }}
                items={regions}
                value={region}
              />
            </View>
          </View>
        </View>
        <Input
          label="Price"
          placeholder="Enter price of the product"
          onChangeText={value => {
            onChangeText({name: 'price', value: value});
          }}
        />
        <Input label="Image" placeholder="Upload image of the product" />

        <CustomButton primary title="Submit" />
      </Container>
    </View>
  );
};

export default CreateOfferComponent;
