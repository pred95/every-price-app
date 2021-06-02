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

  dateTextPlaceholder: {
    fontSize: 16,
    paddingLeft: 10,
    color: colors.grey,
    opacity: 0.7
  },

  dateText: {
    fontSize: 16,
    paddingLeft: 10,
    color: "black"
  },

  calendarIcon: {
    paddingRight: 15,
    paddingBottom: 3,
    color: colors.grey
  }
});
