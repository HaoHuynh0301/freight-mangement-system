import {appFontSize} from '../../contants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appInforWapper: {
    flexDirection: 'column',
    height: 190,
  },
  appInforTitle: {
    fontSize: appFontSize,
  },
  appInforDetail: {
    fontSize: appFontSize,
  },
  appInforTitleWapper: {
    backgroundColor: '#E8E8E8',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  appInforDetailWrapper: {
    height: 50,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#E8E8E8',
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  rightIcon: {
    width: 20,
    height: 25,
  },
  orderInformationWrapper: {
    flex: 1,
    flexDirection: 'column',
    height: 600,
    marginTop: 20,
  },
  orderInforTitleWapper: {
    backgroundColor: '#E8E8E8',
    height: 40,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  numberOfOrderText: {
    color: '#ff7733',
  },
});
