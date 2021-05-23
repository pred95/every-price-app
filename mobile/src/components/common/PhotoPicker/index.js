import React from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';

const PhotoPicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from Camera',
      icon: <MaterialIcon name="photo-camera" size={30} />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(() => {});
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <MaterialIcon name="photo-library" size={30} />,

      onPress: () => {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(() => {});
      },
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
          height: 200,
        },
      }}>
      <View style={styles.wrapper}>
        {options.map(({name, onPress, icon}) => (
          <TouchableOpacity
            style={styles.pickerOptions}
            key={name}
            onPress={onPress}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default PhotoPicker;
