import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const PhotoPicker = React.forwardRef(({}, ref) => {
  const options = [
    {
      name: 'Take from Camera',
      icon: <MaterialIcon name="photo-camera" size={30} onPress={() => {}} />,
    },
    {
      name: 'Choose from Gallery',
      icon: <MaterialIcon name="photo-library" size={30} onPress={() => {}} />,
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={300}
      openDuration={250}
      closeOnDragDown={true}
      customStyles={{
        container: {
            height: 200
        },
      }}>
      <View style={styles.wrapper}>
        {options.map(({name, onPress, icon}) => (
          <TouchableOpacity style={styles.pickerOptions} key={name}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default PhotoPicker;
