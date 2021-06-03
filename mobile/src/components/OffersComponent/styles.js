import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  listEmptyComponent: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 100,
  },

  activityIndicator: {
    marginTop: 100,
  },

  image: {
    width: 45,
    height: 45,
  },

  imageThumbnail: {
    width: 45,
    height: 45,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 74,
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 40
  },

  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  product: {
    fontSize: 19,
  },

  city: {
    opacity: 0.6,
    fontSize: 15,
  },

  separator: {
    height: 0.5,
    backgroundColor: colors.grey,
    opacity: 0.5,
  },

  fab: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 35,
    right: 25,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
