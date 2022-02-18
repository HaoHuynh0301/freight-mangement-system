import {StyleSheet} from 'react-native';
import {headerFontSize, appFontSize, greyColor} from '../../../contants';

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
    left: 100,
    fontSize: 22,
    color: '#000',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  registerWrapper: {
    flexDirection: 'column',
  },
  appInforTitle: {
    fontSize: appFontSize,
    fontWeight: 'bold',
    paddingLeft: 25,
  },
  appInforTitleWapper: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textInput: {
    borderWidth: 0.8,
    borderRadius: 10,
    width: 350,
    height: 40,
    marginTop: 8,
    paddingLeft: 10,
    fontSize: appFontSize,
  },
  inputsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  paymentInforWrapper: {
    marginTop: 10,
    marginLeft: 10,
  },
  confirmationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonRegister: {
    backgroundColor: '#ff7733',
    width: 350,
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBakingDetailWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 10,
    width: 390,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: greyColor,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default styles;
