import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native'
import PropTypes from 'prop-types'
import Constants from '../../Constants'
import CustomButton from './CustomButton'

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginHorizontal: 8
  },
  textInput: {
    fontSize: 14,
    color: Constants.white,
    flex: 1,
    padding: 5,
  },
  borderLine: {
    borderColor: Constants.borderColor,
    borderWidth: 0.5
  }
})

export default class InputField extends Component {
  static propTypes = {
    imageSource: PropTypes.number,
    hint: PropTypes.string,
    secure: PropTypes.bool,
    style: PropTypes.object,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    maxLength: PropTypes.number
  }

  static defaultProps = {
    imageSource: null,
    hint: false,
    secure: false,
    style: {},
    value: null,
    onChangeText: null,
    maxLength: null
  }

  state = {
    passwordIsHidden: true
  }

  render() {
    const {
      imageSource,
      hint,
      containerStyle = {},
      rowStyle = {},
      iconStyle = {},
      onBlur = () => { },
      value,
      onChangeText = () => { },
      onSubmit = () => { },
      maxLength,
      placeholderTextColor = Constants.white,
      selectionColor = Constants.white,
      showPassword = false,
      showPasswordImageStyle = {},
      returnKeyLabel,
      _ref
    } = this.props
    const {passwordIsHidden} = this.state

    return (
      <View style={containerStyle}>
        <View style={[styles.inputContainer, rowStyle]}>
          <Image
            style={[styles.icon, iconStyle]}
            source={imageSource}
          />
          <TextInput
            ref={_ref}
            selectionColor={selectionColor}
            autoCapitalize='none'
            value={value}
            maxLength={maxLength}
            onChangeText={text => onChangeText(text)}
            secureTextEntry={showPassword && passwordIsHidden}
            style={styles.textInput}
            placeholder={hint}
            placeholderTextColor={placeholderTextColor}
            onBlur={onBlur}
            underlineColorAndroid='rgba(0,0,0,0)'
            onSubmitEditing={onSubmit}
            returnKeyLabel={returnKeyLabel}
          />
          {showPassword &&
            <CustomButton
              imageButton={true}
              imageSource={passwordIsHidden ? Constants.iconHidePassword : Constants.iconShowPassword}
              imageStyle={showPasswordImageStyle}
              onPress={() => this.setState(prevState => ({passwordIsHidden: !prevState.passwordIsHidden}))}
            />
          }
        </View>
        <View style={styles.borderLine} />
      </View>
    )
  }
}
