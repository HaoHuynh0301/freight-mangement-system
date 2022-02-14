import {headerFontSize, appFontSize, greyColor} from '../../contants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
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
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 65,
  },
  nameWrapper: {
    fontSize: 22,
    color: '#000',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  dieuKhoanWrapper: {
    flexDirection: 'column',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInformation: {
    fontSize: appFontSize,
  },
  newsDetailWrapper: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
    width: '92%',
    borderRadius: 10,
  },
  newTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newIcon: {
    width: 40,
    height: 40,
  },
  newTitle: {
    fontSize: appFontSize,
    color: '#ff7733',
  },
  questionsWrapper: {
    flexDirection: 'column',
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  questionTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: greyColor,
    height: 50,
    width: '100%',
  },
  questionTitleText: {
    fontSize: appFontSize,
  },
  dieuKhoanDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: greyColor,
  },
  newsWrapper: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center',
  },
});

export default styles;
