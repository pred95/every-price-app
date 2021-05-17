import React, { useState } from 'react';
import {View, Text} from 'react-native';
import {REGIONS} from '../../constants/regions';
import Container from '../common/Container';
import Input from '../common/Input';
import styles from './styles';
import CustomButton from '../common/CustomButton';
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/themes/colors';

const FilterComponent = ({onChange, onSubmit}) => {
  const [region, setRegion] = useState('');
  var regions = [];
  REGIONS.map(region => {
    regions.push({label: region, value: region});
  });

  return (
    <View style={styles.formContainer}>
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
        <View style={styles.container}>
          <Text style={styles.label}>Region</Text>
          <View style={styles.wrapper}>
            <View style={styles.inputContainer}>
              <View style={{width: '100%'}}>
                <RNPickerSelect
                  style={{
                    inputAndroid: {
                      color: 'black',
                      fontSize: 16,
                    },
                    alignItems: 'center',
                  }}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: 'Select a region', value: null}}
                  onValueChange={value => {
                    setRegion(value);
                    onChange({name: 'region', value: value});
                  }}
                  items={regions}
                  value={region}
                  Icon={() => {
                    return (
                      <AntIcon
                        name="caretdown"
                        color={colors.grey}
                        style={{paddingTop: 12, marginRight: 10}}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <CustomButton primary title="Filter" onPress={onSubmit} />
      </Container>
    </View>
  );
};

export default FilterComponent;
