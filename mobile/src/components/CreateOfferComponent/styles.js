import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    paddingVertical: 10,
  },

  label: {
    fontSize: 16,
  },

  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    borderColor: colors.grey,
  },

  inputContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  photoWrapper: {
    height: 25,
    marginTop: 5,
  },

  photoInputContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },

  photoUploadText: {
    color: 'black',
    paddingLeft: 20,
    paddingRight: 5,
    fontSize: 15,
  },
});
