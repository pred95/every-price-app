import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  inputContainer: {
    paddingVertical: 10,
  },

  label: {
    fontSize: 16,
  },

  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    width: '100%',
  },

  error: {
    fontSize: 13,
    color: colors.danger,
    paddingTop: 3,
  },
});
