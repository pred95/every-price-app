import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import colors from '../../../assets/themes/colors';
import styles from './styles';

const Message = ({
  message,
  retry,
  retryFunction,
  onDismiss,
  info,
  primary,
  danger,
  success,
}) => {
  const [userDismissed, setDismissed] = useState(false);
  const getBgColor = () => {
    if (primary) {
      return colors.primary;
    }
    if (info) {
      return colors.secondary;
    }
    if (danger) {
      return colors.danger;
    }
    if (success) {
      return colors.success;
    }
  };

  return (
    <>
      {userDismissed ? null : (
        <TouchableOpacity
          disabled
          style={[styles.wrapper, {backgroundColor: getBgColor()}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.white}}>{message}</Text>
            {retry && !typeof onDismiss === 'function' && (
              <TouchableOpacity onPress={retryFunction}>
                <Text style={{color: colors.white}}>Retry</Text>
              </TouchableOpacity>
            )}
            {typeof onDismiss === 'function' && (
              <TouchableOpacity
                onPress={() => {
                  setDismissed(true);
                  onDismiss();
                }}>
                <Text style={{color: colors.white}}>Dismiss</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Message;
