import React from 'react';
import {Text, Modal, TouchableOpacity, ScrollView, View} from 'react-native';
import styles from './styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AppModal = ({modalVisible, setModalVisible, title, modalBody}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
      disabled
        style={styles.wrapper}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <MaterialIcon name="close" size={25} />
              </TouchableOpacity>

              <Text style={styles.title}>{title || 'EveryPrice'}</Text>
              <View />
            </View>
            <View style={styles.separator} />
            <View style={styles.body}>{modalBody}</View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;
