import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Animated
} from 'react-native'
import Modal from 'react-native-modal'
import {InputField, CustomButton, Spinner} from '../components'
import Constants from '../../Constants'
import { connect } from 'react-redux'

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  }

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      extraHeight: new Animated.Value(0),
      showFailMessage: false,
      showSuccessMessage: false,
      errorMessage: ''
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

  onRegister = () => {
    Keyboard.dismiss()
    const { username, password, passwordConfirm } = this.state
    const {user} = this.props

    // login validation
    if (this.includeSpecialCharacters(username)) {
      this.setState({
        showFailMessage: true,
        errorMessage: 'Username cannot includes special characters.'
      })
      return
    }
    if (passwordConfirm != password) {
      this.setState({
        showFailMessage: true,
        errorMessage: 'Password confirm does not match.'
      })
      return
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].username == username && user[i].password == password) {
        this.setState({
          showFailMessage: true,
          errorMessage: `User '${user[i].username}' already exists.`
        })
        return
      }
    }

    this.setState({ isLoading: true }, () => {
      console.log('call-register-0',user)

      this.props.register({username, password})
      setTimeout(() => {
        console.log('after-register-0',user)
        this.setState({isLoading: false}, () => setTimeout(() => this.setState({showSuccessMessage: true}), 600))
      }, 800)
      
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

    this._runExtraHeight(Constants.isiOS ? 80 : 80)
  }

  _keyboardDidHide = e => {
    this._runExtraHeight(0)
  }

  includeSpecialCharacters = text => {
    return /[^a-zA-Z0-9.]+/.test([text])
  }

  focusPassword = () => this.passwordInput.focus()

  focusPasswordConfirm = () => this.passwordConfirmInput.focus()

  render() {
    const {
      username,
      password,
      passwordConfirm,
      errorMessage,
      showFailMessage, isLoading,
      showSuccessMessage
    } = this.state
    const hideLoginButton = !username || !password || !passwordConfirm
      
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Constants.intenseBlue} />
          <Animated.View style={[{alignItems: 'center', justifyContent: 'center'},
            {
              transform: [
                { translateY: this.state.extraHeight }
              ]
            }
          ]}>
            <Animated.View style={styles.navigationHeader}>
              <CustomButton
                onPress={() => this.props.navigation.navigate('LoginScreen')}
                imageButton={true}
                imageContainerStyle={styles.backButtonContainer}
                imageSource={Constants.iconBack}
                imageStyle={styles.backButtonImage}
              />
              <Text style={{fontSize: 22, color: 'white'}}>{'Register Screen'}</Text>
              <View style={{width: 38, height: 38}}/>
            </Animated.View>
            <Animated.View style={{ width: Constants.width - 80 }}>
              <InputField
                containerStyle={{marginBottom: 20}}
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
                containerStyle={{marginBottom: 20}}
                rowStyle={Constants.isiOS && {marginBottom: 5}}
                iconStyle={{width: 16, height: 16}}
                imageSource={Constants.iconLock}
                showPassword={true}
                showPasswordImageStyle={{width: 17, height: 17}}
                value={password}
                hint={'Password'}
                placeholderTextColor={Constants.borderColor}
                onChangeText={password => this.setState({password})}
                onSubmit={this.focusPasswordConfirm}
                returnKeyLabel={'Next'}
                selectionColor={'rgba(255,255,255,0.5)'}
              />
              <InputField
                _ref={ref => this.passwordConfirmInput = ref}
                containerStyle={{marginBottom: 60}}
                rowStyle={Constants.isiOS && {marginBottom: 5}}
                iconStyle={{width: 16, height: 16}}
                imageSource={Constants.iconLock}
                showPassword={true}
                showPasswordImageStyle={{width: 17, height: 17}}
                value={passwordConfirm}
                hint={'Confirm password'}
                placeholderTextColor={Constants.borderColor}
                onChangeText={passwordConfirm => this.setState({passwordConfirm})}
                onSubmit={this.onRegister}
                selectionColor={'rgba(255,255,255,0.5)'}
              />
              <CustomButton
                onPress={this.onRegister}
                style={[styles.buttonField, {opacity: hideLoginButton ? 0.6 : 1}]}
                disabled={hideLoginButton}
                content={'Register'}
                textStyle={styles.buttonTitle}
              />
            </Animated.View>
          </Animated.View>
          
          <Modal 
            isVisible={showFailMessage}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>
                {'Register Failed'}
              </Text>
              <Text style={styles.alertMessage}>
                {errorMessage}
              </Text>
              <CustomButton
                style={styles.alertConfirmButton}
                textStyle={styles.alertConfirmButtonText}
                content={'OK'}
                onPress={() => this.setState({showFailMessage: false})}
              />
            </View>
          </Modal>
          <Modal 
            isVisible={showSuccessMessage}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.alertContainer}>
              <Text style={[styles.alertTitle, {color: 'black'}]}>
                {'Register Success'}
              </Text>
              <Text style={styles.alertMessage}>
                {'Press OK to login.'}
              </Text>
              <CustomButton
                style={styles.alertConfirmButton}
                textStyle={styles.alertConfirmButtonText}
                content={'OK'}
                onPress={() => this.props.navigation.navigate('LoginScreen')}
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
  navigationHeader: {
    width: Constants.width,
    height: 40,
    marginTop: Constants.isiOS ? Constants.isIPX ? 44 : 20 : 0,
    marginBottom: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButtonContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonImage: {
    width: 22,
    height: 22
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
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  const {register} = require('../../redux/AuthReducer');
  
  return {
    register: user => dispatch(register(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
