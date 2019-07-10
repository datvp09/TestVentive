import React, {Component} from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/configureStore'
import MainStack from './src/Navigator'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Remote debugger'])

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    )
  }
}