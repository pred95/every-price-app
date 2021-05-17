import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import {REGIONS} from '../../constants/regions';
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/themes/colors';
import CurrencyInput from 'react-native-currency-input';

const CreateOfferComponent = ({
  error,
  loading,
  onChangeText,
  form,
  onSubmit,
}) => {
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState(0.0);
  var regions = [];
  REGIONS.map(region => {
    regions.push({label: region, value: region});
  });

  return (
    <View style={styles.formContainer}>
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
                    onChangeText({name: 'region', value: value});
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
        <View style={styles.container}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.wrapper}>
            <View style={styles.inputContainer}>
              <CurrencyInput
                value={price}
                onChangeValue={value => {
                  setPrice(value);
                  onChangeText({name: 'price', value: value});
                }}
                prefix="€ "
                precision={2}
                separator="."
                style={{width: '100%'}}
              />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Image</Text>
          <View style={styles.imageWrapper}>
            <View style={styles.imageInputContainer}>
              <Text style={styles.label}>Take a picture</Text>
              <TouchableOpacity>
                <MaterialIcon
                  name="add-a-photo"
                  size={25}
                  style={{paddingHorizontal: 5}}
                />
              </TouchableOpacity>
              <Text style={styles.label}>or choose a file from library</Text>
              <TouchableOpacity>
                <MaterialIcon
                  name="photo-library"
                  size={25}
                  style={{paddingHorizontal: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <CustomButton primary title="Submit" onPress={onSubmit} />
      </Container>
    </View>
  );
};

export default CreateOfferComponent;
