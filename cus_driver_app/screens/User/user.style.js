import {StyleSheet} from 'react-native';
import {impText, appFontSize, headerFontSize} from '../../contants';

const styles = StyleSheet.create({
  scrollView: {},
  signInWrapper: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  impText: {
    fontSize: impText,
    fontWeight: 'bold',
  },
  inputDetailWrapper: {
    marginTop: 20,
  },
  norText: {
    fontSize: appFontSize,
  },
  textInput: {
    borderWidth: 0.8,
    width: 250,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonLogin: {
    backgroundColor: '#ff7733',
    width: 250,
    height: 40,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 15,
  },
  container: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  userInformationText: {
    fontSize: headerFontSize,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingIcon: {
    height: 30,
    width: 30,
  },
  basicInformationWrapper: {
    height: 240,
    width: '92%',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  basicInforDetail: {
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  basicInforImage: {
    height: 30,
    width: 30,
  },
  basicInforText: {
    fontSize: 17,
    marginLeft: 10,
  },
  bankingInforWrapper: {
    height: 290,
    flexDirection: 'column',
    width: '92%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  locationInforWrapper: {
    height: 140,
    flexDirection: 'column',
    width: '92%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  avtWrapper: {
    marginTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  basicInforContainer: {
    backgroundColor: '#E0E0E0',
    height: 40,
    width: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  inforContainer: {
    backgroundColor: '#E0E0E0',
    height: 40,
    width: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
});

export default styles;
