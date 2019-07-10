import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native'
import Constants from '../../Constants'

export default class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      headerMode: 'none'
    }
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='light-content' backgroundColor={Constants.intenseBlue} />
        <View style={styles.navigationHeader}>
          <Text style={styles.navigationHeaderText}>{'INFO SCREEN'}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigationHeader: {
    height: Constants.isiOS ? Constants.isIPX ? 90 : 65 : 55,
    width: '100%',
    backgroundColor: Constants.intenseBlue,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  navigationHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12
  },
})
