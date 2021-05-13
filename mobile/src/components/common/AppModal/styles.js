import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },

  modalView: {
    backgroundColor: colors.white,
    minHeight: 300,
    marginHorizontal: 20,
    borderRadius: 6,
  },

  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 25,
    paddingRight: 20,
  },

  separator: {
      height: 0.5,
      backgroundColor: colors.grey
  },

  body: {
      minHeight: 300,
      paddingVertical: 10,
      paddingHorizontal: 20
  }
});
