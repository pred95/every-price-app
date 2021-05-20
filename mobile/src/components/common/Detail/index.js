import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const Detail = ({label, value, username = false}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {username ? (
          <View
            style={styles.usernameWrapper}>
            <Text
              style={styles.usernameText}>
              {value}
            </Text>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <Text style={styles.text}>{value}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Detail;
