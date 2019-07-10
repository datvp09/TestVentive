import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import Constants from '../../Constants'

const tabBarProps = {
  HomeScreen: [Constants.iconTicket, 'Home'],
  DataScreen: [Constants.iconBus, 'Data'],
  StatisticScreen: [Constants.iconSearch, 'Statistic'],
  InfoScreen: [Constants.iconComboChart, 'Info']
}

export default class TabBar extends Component {
  handlePress = routeName => {
    this.props.navigation.navigate(routeName)
  }
  
  renderSingleButton = (route, i) => {
    const {index} = this.props.navigation.state
    const icon = tabBarProps[route.routeName][0]
    const label = tabBarProps[route.routeName][1]
    const isActive = index == i

    return (
      <TouchableOpacity key={i} onPress={() => this.handlePress(route.routeName)} style={styles.button}>
        <Image source={icon} style={{
          width: 19,
          height: 19,
          resizeMode: 'contain',
          marginBottom: isActive ? 5 : 0,
          tintColor: isActive ? Constants.white : Constants.lightBlue
        }}/>
        {isActive && 
          <Text style={styles.label}>
            {label}
          </Text>
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { routes } = this.props.navigation.state
    const tabBarButtons = routes.map(this.renderSingleButton)

    return (
      <View style={styles.container}>
        {tabBarButtons}
      </View>
    )
  }
}

const styles = {
  container: {
    height: Constants.isIPX ? 78 : 60,
    backgroundColor: Constants.intenseBlue,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Constants.black,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 3
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Constants.isIPX ? 20 : 0
  },
  label: {
    color: Constants.white,
    fontSize: 10
  }
}
