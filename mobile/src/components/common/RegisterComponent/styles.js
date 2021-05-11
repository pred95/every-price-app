import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    paddingVertical: 20,
  },

  createSection: {
    flexDirection: 'row',
  },

  infoText: {
    paddingTop: 5,
    fontSize: 14,
  },

  linkBtn: {
    paddingTop: 5,
    paddingLeft: 3,
    color: colors.primary,
    fontSize: 14,
  },
});
