import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
  },

  imageContainer : {
    height: 300,
    width: '100%',

  },

  loading: {
    paddingLeft: "35%",
    paddingTop: '5%'
  },

  detailPhoto: {
    height: 300,
    width: '100%',
    resizeMode: "cover"
  },

  name:{
    fontSize: 27,
    textAlign: 'center',
  },

  content: {
    padding: 10,
    paddingLeft: 30
  },

});
