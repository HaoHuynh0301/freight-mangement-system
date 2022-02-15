import {headerFontSize, appFontSize, greyColor} from '../../contants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ff7733',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userInformationText: {
    fontSize: headerFontSize,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  appFontSize: {
    fontSize: appFontSize,
  },
  mainViewWrapper: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flowMoneyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: greyColor,
  },
  textHighlight: {
    fontSize: appFontSize,
    fontWeight: 'bold',
  },
  textAppFontSize: {
    fontSize: appFontSize,
  },
  totalMoney: {
    marginTop: 20,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  btnVAT: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: greyColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

export default styles;
