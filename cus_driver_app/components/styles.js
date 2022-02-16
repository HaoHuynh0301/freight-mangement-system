import {StyleSheet} from 'react-native';
import {headerFontSize} from '../contants';

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
    left: 140,
    fontSize: 22,
    color: '#000',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
});

export default styles;
