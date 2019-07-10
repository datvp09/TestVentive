import AsyncStorage from '@react-native-community/async-storage'
import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)