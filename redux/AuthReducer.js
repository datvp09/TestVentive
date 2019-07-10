import { createActions, handleActions } from 'redux-actions';

export const {
	login,
  logout,
  register
} = createActions('LOGIN', 'LOGOUT', 'REGISTER');

const initialState = {
  user: [
    {username: 'admin', password: 'admin'}
  ],
  isLoggedIn: false
}
const reducer = handleActions(
	{
		LOGIN: state => ({
			...state,
      isLoggedIn: true
		}),
		LOGOUT: state => ({
			...state,
			isLoggedIn: false
    }),
    REGISTER: (state, action) => ({
      ...state,
      user: [...state.user, action.payload]
    })
	},
	initialState
);

export default reducer;