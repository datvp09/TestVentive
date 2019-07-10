import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation'
import {TabBar} from './components'
import HomeScreen from './screens/HomeScreen'
import DataScreen from './screens/DataScreen'
import StatisticScreen from './screens/StatisticScreen'
import InfoScreen from './screens/InfoScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Constants from '../Constants'
import {store} from '../redux/configureStore'

const mainTabNavigator = TabNavigator(
  {
    HomeScreen,
    DataScreen,
    StatisticScreen,
    InfoScreen
  },
  {
    lazy: false, // load all tabs when start
    tabBarPosition: 'bottom',
    tabBarComponent: TabBar
  }
)

const getRootNavigator = (loggedIn = false) => SwitchNavigator(
  {
    LoginScreen,
    RegisterScreen,
    LoggedIn: {
      screen: StackNavigator(
        {
          TabStack: mainTabNavigator
        },
        {
          headerMode: 'none',
          swipeEnabled: false,
          animationEnabled: false,
          navigationOptions: {
            gesturesEnabled: false
          }
        }
      )
    }
  },
  {
    initialRouteName: loggedIn ? 'LoggedIn' : 'LoginScreen'
  }
)

class Navigator extends Component {
  constructor() {
    super();

    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }

  componentDidMount() {
    this.checkUserLogin()
  }

  checkUserLogin = () => {
    const {auth} = store.getState()

    if (auth.isLoggedIn) {
      this.setState({signedIn: true, checkedSignIn: true})
    } else {
      this.setState({checkedSignIn: true})
    }
  }

  render() {
    const { checkedSignIn, signedIn } = this.state
    if (!checkedSignIn) {
      return <View style={styles.notSignedIn}/>
    }

    const RootNavigator = getRootNavigator(signedIn)

    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  notSignedIn: {
    flex: 1,
    backgroundColor: Constants.intenseBlue
  },
  container: {
    flex: 1
  }
});

export default Navigator