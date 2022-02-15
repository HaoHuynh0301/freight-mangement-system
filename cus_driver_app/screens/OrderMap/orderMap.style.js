import {StyleSheet} from 'react-native';
import {greyColor, headerFontSize} from '../../contants';

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: greyColor,
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
    paddingLeft: 120,
  },
  carIcon: {
    height: 50,
    width: 50,
  },
  flex: {
    flex: 1,
  },
});

export default styles;
