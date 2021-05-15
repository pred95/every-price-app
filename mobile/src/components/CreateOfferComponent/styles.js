import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  pickerContainer: {
    paddingVertical: 10,
  },

  pickerLabel: {
    fontSize: 16,
  },

  pickerWrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    borderColor: colors.grey,
  },

  inputContainer: {
    height: "100%",
    justifyContent: 'center'
  }

});
