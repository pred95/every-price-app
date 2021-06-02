import React, {useState} from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import {REGIONS} from '../../constants/regions';
import Container from '../common/Container';
import Input from '../common/Input';
import styles from './styles';
import CustomButton from '../common/CustomButton';
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/themes/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const FilterComponent = ({onChange, onSubmit, form}) => {
  const [region, setRegion] = useState('');
  const [showDateBeforePicker, setShowDateBeforePicker] = useState(false);
  const [dateBeforeText, setDateBeforeText] = useState('Select a date');
  const [showDateAfterPicker, setShowDateAfterPicker] = useState(false);
  const [dateAfterText, setDateAfterText] = useState('Select a date');

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
          <View style={styles.container}>
            <Text style={styles.label}>Offers before this date</Text>
            <View style={styles.wrapper}>
              <View style={styles.inputContainer}>
                <Text
                  style={
                    dateBeforeText === 'Select a date'
                      ? styles.dateTextPlaceholder
                      : styles.dateText
                  }>
                  {dateBeforeText}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDateBeforePicker(true);
                  }}>
                  <MaterialCommunityIcon
                    name="calendar-month-outline"
                    size={30}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
                {showDateBeforePicker && (
                  <DateTimePicker
                    value={new Date()}
                    maximumDate={new Date()}
                    mode="date"
                    onChange={(event, value) => {
                      if (value !== undefined) {
                        const dateBefore =
                          value.getFullYear() +
                          '-' +
                          ('0' + (value.getMonth() + 1)).slice(-2) +
                          '-' +
                          ('0' + value.getDate()).slice(-2);
                        onChange({name: 'dateBefore', value: dateBefore});
                        setShowDateBeforePicker(false);
                        setDateBeforeText(dateBefore);
                      }
                      setShowDateBeforePicker(false);
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Offers after this date</Text>
            <View style={styles.wrapper}>
              <View style={styles.inputContainer}>
                <Text
                  style={
                    dateAfterText === 'Select a date'
                      ? styles.dateTextPlaceholder
                      : styles.dateText
                  }>
                  {dateAfterText}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDateAfterPicker(true);
                  }}>
                  <MaterialCommunityIcon
                    name="calendar-month-outline"
                    size={30}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
                {showDateAfterPicker && (
                  <DateTimePicker
                    value={new Date()}
                    maximumDate={new Date()}
                    mode="date"
                    onChange={(event, value) => {
                      if (value !== undefined) {
                        const dateAfter =
                          value.getFullYear() +
                          '-' +
                          ('0' + (value.getMonth() + 1)).slice(-2) +
                          '-' +
                          ('0' + value.getDate()).slice(-2);
                        onChange({name: 'dateAfter', value: dateAfter});
                        setShowDateAfterPicker(false);
                        setDateAfterText(dateAfter);
                      }
                      setShowDateAfterPicker(false);
                    }}
                  />
                )}
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
