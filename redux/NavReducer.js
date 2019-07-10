import { createActions, handleActions } from 'redux-actions';

export const {
	setNavigator
} = createActions('SETNAVIGATOR');

const reducer = handleActions(
	{
		SETNAVIGATOR: (state, action) => ({
			...state,
			navigator: action.payload
		})
	},
	{
    navigator: null
  }
);

export default reducer;