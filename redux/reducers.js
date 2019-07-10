import { combineReducers } from 'redux';
import auth from './AuthReducer';
import navigation from './NavReducer';

const reducers = combineReducers({
  auth,
  navigation
  // more reducers
});

export default reducers;
