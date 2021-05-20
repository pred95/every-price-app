import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  inputContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 20,
  },

  wrapper: {
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    width: 200,
    backgroundColor: '#f5f5f5',
    marginRight: 20,
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
  },

  usernameWrapper: {
    height: 30,
    marginTop: 5,
    width: 200,
    marginRight: 20,
  },

  usernameText: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
  },
});
