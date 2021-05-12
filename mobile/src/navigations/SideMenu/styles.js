import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },

  item:{
      flexDirection: 'row',
    //   justifyContent: 'center',
      alignItems: 'center'
  },

  itemText:{
    fontSize: 25,
    paddingVertical: 7,
    paddingLeft: 20
  }
});
