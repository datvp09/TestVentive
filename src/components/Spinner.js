import React from 'react'
import {ActivityIndicator} from 'react-native'
import Modal from 'react-native-modal'

const Spinner = props => {
  const {
    isVisible,
    backdropColor = 'black',
    backdropOpacity = 0.5,
    spinnerSize = 'large',
    spinnerColor = 'white'
  } = props

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
    >
      <ActivityIndicator size={spinnerSize} color={spinnerColor}/>
    </Modal>
  )
}

export default Spinner