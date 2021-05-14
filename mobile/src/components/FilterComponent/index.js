import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text} from 'react-native';
import {REGIONS} from '../../constants/regions';
import Container from '../common/Container';
import Input from '../common/Input';
import styles from './styles';
import CustomButton from '../common/CustomButton';

const FilterComponent = ({onChange, onSubmit}) => {
  return (
    <View style={styles.container}>
      <Container>
        <Input
          label="Product name"
          placeholder="Enter a product"
          onChangeText={value => {
            onChange({name: 'product', value});
          }}
        />
        <Input
          label="City"
          placeholder="Enter a city"
          onChangeText={value => {
            onChange({name: 'city', value});
          }}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Region</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.picker}>
              <Picker
                onValueChange={value => {
                  onChange({name: 'region', value});
                }}>
                    <Picker.Item key="nullValue" label="" value="" />
                {REGIONS.map((value, index) => {
                  return (
                    <Picker.Item key={index} label={value} value={value} />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
        <CustomButton primary title="Filter" onPress={onSubmit}/>
      </Container>
    </View>
  );
};

export default FilterComponent;
