import {StyleSheet} from 'react-native';
import {
  headerFontSize,
  orangeColor,
  greyColor,
  appFontSize,
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
  },
  addNewOrderWrapper: {
    flexDirection: 'row',
  },
  sizeChooseWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: 100,
  },
  chooseDetail: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    backgroundColor: orangeColor,
    marginLeft: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSize: {
    fontSize: appFontSize,
  },
  highlightText: {
    fontSize: appFontSize,
    fontWeight: 'bold',
  },
  buttonAddNewOrder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    color: orangeColor,
  },
  plusIcon: {
    height: 40,
    width: 40,
  },
  emptyViewWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 130,
  },
  butonEmptyRefreshWrapper: {
    borderWidth: 1,
    borderColor: greyColor,
    height: 40,
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productInformationDetailWrapper: {
    width: '95%',
    backgroundColor: '#FFF',
    marginTop: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 8,
  },
  productInformationDetailTitle: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  appFontSize: {
    fontSize: appFontSize,
  },
  rightArrowIconStyle: {
    height: 20,
    width: 20,
  },
  productInformationDetail: {
    borderBottomWidth: 0.5,
    borderBottomColor: greyColor,
    paddingBottom: 5,
    marginBottom: 5,
  },
  orderStatusWrapper: {
    flexDirection: 'column',
    borderBottomColor: greyColor,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  orderStatusTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonAddRequest: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: orangeColor,
    borderRadius: 10,
  },
  xIconStyle: {
    height: 20,
    width: 20,
  },
  statusDetailWrapper: {
    borderBottomColor: greyColor,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default styles;
