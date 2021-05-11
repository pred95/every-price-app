import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import colors from '../../../assets/themes/colors';
import styles from './styles';

const CustomButtom = ({
  title,
  secondary,
  primary,
  danger,
  disabled,
  loading,
  onPress,
}) => {
  const getBgColor = () => {
    if (disabled) {
      return '#c0c0c0';
    }
    if (primary) {
      return colors.primary;
    }
    if (secondary) {
      return colors.secondary;
    }
    if (danger) {
      return colors.danger;
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: getBgColor()}]}>
      <View style={[styles.loaderSection]}>
        {loading && <ActivityIndicator color={colors.white} />}
        {title && (
          <Text
            style={[
              styles.textButton,
              {
                color: disabled ? colors.grey : colors.white,
                paddingLeft: loading ? 5 : 0,
              },
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtom;
