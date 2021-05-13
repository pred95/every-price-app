import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logoImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',

  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 25,
    paddingVertical: 20,
    paddingLeft: 20,
  },

  welcomeText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 30
  },
});
