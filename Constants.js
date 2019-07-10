import { Dimensions, Platform } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
const { height, width } = Dimensions.get('window');

export default {
  width,
  height,
  isiOS: Platform.OS == 'ios',
  isIPX: isIphoneX(), // X, XR, XS
  intenseBlue: '#1365AF',
  intenseYellow: '#F8BA17',
  white: '#FFFFFF',
  red: 'red',
  black: '#000',
  blackText: '#333333',
  borderColor: '#C8C7CC',
  lightBlue: '#A5CAF2',
  logoApp: require('./src/assets/images/LogoApp.png'),
  iconShowPassword: require('./src/assets/images/iconShowPassword.png'),
  iconHidePassword: require('./src/assets/images/iconHidePassword.png'),
  iconBus: require('./src/assets/images/ic_bus.png'),
  iconTicket: require('./src/assets/images/ic_ticket.png'),
  iconComboChart: require('./src/assets/images/ic_combo-chart.png'),
  iconSearch: require('./src/assets/images/ic_search.png'),
  iconUser: require('./src/assets/images/iconUser.png'),
  iconLock: require('./src/assets/images/iconLock.png'),
  iconBack: require('./src/assets/images/ic_backButtonWhite.png'),
  iconLogout: require('./src/assets/images/iconLogOut.png')
}