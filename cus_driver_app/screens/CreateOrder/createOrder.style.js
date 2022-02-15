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
    backgroundColor: '#FFF',
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
    paddingLeft: 90,
  },
  createOrderMainView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
  },
  titleFontSize: {
    fontSize: appFontSize,
    fontWeight: 'bold',
    overflow: 'hidden',
    width: 200,
  },
  appFontSize: {
    fontSize: appFontSize,
  },
  shippingLocationInforWrapper: {
    flexDirection: 'column',
    marginTop: 5,
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconLocationInfor: {
    height: 20,
    width: 20,
  },
  locationInforDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
    width: '100%',
    paddingLeft: 10,
    fontSize: appFontSize,
  },
  locationPickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  chooseSizeWrapper: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
  },
  productInformationDetail: {
    marginTop: 20,
  },
  productTitleInformationDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAddProduct: {
    borderWidth: 0.5,
    padding: 5,
    borderColor: orangeColor,
    borderRadius: 10,
  },
  productInputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
    width: '100%',
    fontSize: appFontSize,
  },
  buttonCreateOrder: {
    width: '100%',
    marginTop: 10,
    borderWidth: 0.5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: orangeColor,
  },
  banksPicker: {
    borderWidth: 0.3,
    borderColor: greyColor,
  },
  shippingFeeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: appFontSize,
    marginTop: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: greyColor,
    paddingBottom: 10,
  },
});

export default styles;
