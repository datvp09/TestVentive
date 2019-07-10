import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar
} from 'react-native'
import Constants from '../../Constants'
import {CustomButton} from '../components'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      headerMode: 'none'
    }
  }

  onLogout = () => {
    if (this.props.logout) {
      this.props.logout()
    }
    this.props.navigation.navigate('LoginScreen')
  }

  showAlertForLogOut = () => {
    Alert.alert(
      'Confirm message',
      'Are you sure want to logout?',
      [
        {
          text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
        },
        {
          text: 'OK',
          onPress: this.onLogout
        }
      ],
      {
        cancelable: false
      }
    )
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='light-content' backgroundColor={Constants.intenseBlue} />
        <View style={styles.navigationHeader}>
          <View style={styles.imageContainerStyle}/>
          <Text style={styles.navigationHeaderText}>{'HOME SCREEN'}</Text>
          <CustomButton
            imageButton={true}
            imageSource={Constants.iconLogout}
            imageContainerStyle={styles.imageContainerStyle}
            onPress={this.showAlertForLogOut}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigationHeader: {
    height: Constants.isiOS ? Constants.isIPX ? 90 : 65 : 55,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Constants.intenseBlue,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  navigationHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12
  },
  imageContainerStyle: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7
  }
})

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  const {logout} = require('../../redux/AuthReducer');

  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);