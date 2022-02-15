import {StyleSheet} from 'react-native';
import {
  greyColor,
  headerFontSize,
  appFontSize,
  orangeColor,
} from '../../contants';

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: orangeColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
  },
  userInformationText: {
    fontSize: headerFontSize,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  xIconStyle: {
    height: 20,
    width: 25,
    marginLeft: 10,
  },
  titleWrapper: {
    paddingLeft: 70,
  },
  mainViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicInforWrapper: {
    width: '90%',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
    paddingBottom: 10,
  },
  fontSize: {
    fontSize: appFontSize,
  },
  // eslint-disable-next-line no-dupe-keys
  titleWrapper: {},
  statusDetailWrapper: {
    width: '90%',
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
    paddingBottom: 10,
  },
  mapIcon: {
    marginLeft: 120,
    height: 25,
    width: 25,
  },
});

export default styles;
