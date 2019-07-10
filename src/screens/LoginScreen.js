import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
  Animated,
} from 'react-native'
import Modal from 'react-native-modal'
import {InputField, CustomButton, Spinner} from '../components'
import Constants from '../../Constants'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  }

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      extraHeight: new Animated.Value(0),
      showLoginFailMessage: false
    }

    const show = Constants.isiOS ? 'keyboardWillShow' : 'keyboardDidShow'
    const hide = Constants.isiOS ? 'keyboardWillHide' : 'keyboardDidHide'
    this.keyboardDidShowListener = Keyboard.addListener(show, this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener(hide, this._keyboardDidHide)
  }
  
  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    Keyboard.dismiss()
  }

  onLogin = () => {
    Keyboard.dismiss()
    const { username, password } = this.state
    const {user} = this.props

    // login validation
    if (this.includeSpecialCharacters(username)) {
      this.setState({showLoginFailMessage: true})
      return
    }

    this.setState({ isLoading: true }, () => {
      let profileCorrect = false
      for (let i = 0; i < user.length; i++) {
        if (user[i].username == username && user[i].password == password) {
          profileCorrect = true
          break
        }
      }

      if (profileCorrect) {
        this.props.login()

        // push to app
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null, // important
          actions: [
            NavigationActions.navigate({ routeName: 'TabStack' })
          ]
        })
        this.props.navigation.dispatch(resetAction)
      } else {
        this.setState({ isLoading: false, showLoginFailMessage: true })
      }
    })
  }

  _runExtraHeight(toValue) {
    Animated.timing(
      this.state.extraHeight,
      {
        toValue: -toValue, // Animate to final value of 1
        duration: 200,
        useNativeDriver: true
      }
    ).start()
  }

  _keyboardDidShow = e => {
    // remaining screen height: e.endCoordinates.screenY
    // keyboard height: e.endCoordinates.height

    this._runExtraHeight(Constants.isiOS ? 80 : 150)
  }

  _keyboardDidHide = e => {
    this._runExtraHeight(0)
  }

  includeSpecialCharacters = text => {
    return /[^a-zA-Z0-9.]+/.test([text])
  }

  focusPassword = () => this.passwordInput.focus()

  goToRegister = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  render() {
    const {
      username,
      password,
      showLoginFailMessage, isLoading
    } = this.state
    const hideLoginButton = !username || !password
      
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Constants.intenseBlue} />
          <Animated.View style={[{alignItems: 'center'},
            {
              transform: [
                { translateY: this.state.extraHeight }
              ]
            }
          ]}>
            <Image
              resizeMode='contain'
              style={styles.logo}
              source={Constants.logoApp}
            />
            <Animated.View style={{ width: Constants.width - 80 }}>
              <InputField
                containerStyle={{marginBottom: Constants.isiOS ? 18 : 12}}
                rowStyle={Constants.isiOS && {marginBottom: 5}}
                iconStyle={{width: 16, height: 16}}
                imageSource={Constants.iconUser}
                value={username}
                hint={'Username'}
                placeholderTextColor={Constants.borderColor}
                onChangeText={username => this.setState({username})}
                onSubmit={this.focusPassword}
                returnKeyLabel={'Next'}
                selectionColor={'rgba(255,255,255,0.5)'}
              />
              <InputField
                _ref={ref => this.passwordInput = ref}
                containerStyle={{marginBottom: 30}}
                rowStyle={Constants.isiOS && {marginBottom: 5}}
                iconStyle={{width: 16, height: 16}}
                imageSource={Constants.iconLock}
                showPassword={true}
                showPasswordImageStyle={{width: 17, height: 17}}
                value={password}
                hint={'Password'}
                placeholderTextColor={Constants.borderColor}
                onChangeText={password => this.setState({password})}
                onSubmit={this.onLogin}
                selectionColor={'rgba(255,255,255,0.5)'}
              />
              <CustomButton
                onPress={this.onLogin}
                style={[styles.buttonField, {opacity: hideLoginButton ? 0.6 : 1, marginBottom: 15}]}
                disabled={hideLoginButton}
                content={'Login'}
                textStyle={styles.buttonTitle}
              />
              <CustomButton
                onPress={this.goToRegister}
                style={styles.buttonField}
                content={'Register'}
                textStyle={styles.buttonTitle}
              />
            </Animated.View>
          </Animated.View>
          
          <Modal 
            isVisible={showLoginFailMessage}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>
                {'Login Failed'}
              </Text>
              <Text style={styles.alertMessage}>
                {'Username or password incorrect.'}
              </Text>
              <CustomButton
                style={styles.alertConfirmButton}
                textStyle={styles.alertConfirmButtonText}
                content={'OK'}
                onPress={() => this.setState({showLoginFailMessage: false})}
              />
            </View>
          </Modal>
          <Spinner isVisible={isLoading}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Constants.intenseBlue
  },
  logo: {
    width: Constants.width - 140,
    marginBottom: Constants.isiOS ? 40 : 20,
    marginTop: Constants.isiOS ? Constants.isIPX ? 90 : 10 : 0
  },
  buttonTitle: {
    color: Constants.white,
    fontSize: 16,
    paddingBottom: 3
  },
  buttonField: {
    backgroundColor: Constants.intenseYellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 3
  },
  alertContainer: {
    height: 150,
    justifyContent: 'space-between',
    backgroundColor: Constants.white,
    borderRadius: 4
  },
  alertTitle: {
    margin: 18,
    marginBottom: 0,
    color: Constants.red,
    fontSize: 16
  },
  alertMessage: {
    margin: 18,
    color: Constants.blackText,
    fontSize: 15
  },
  alertConfirmButton: {
    height: 42,
    backgroundColor: Constants.white,
    borderTopWidth: 1,
    borderTopColor: Constants.borderColor
  },
  alertConfirmButtonText: { 
    color: Constants.blackText
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  const {login} = require('../../redux/AuthReducer');

  return {
    login: () => dispatch(login())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);