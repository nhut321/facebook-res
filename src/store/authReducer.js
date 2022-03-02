function authReducer(state,action) {
	switch (action.type){
		case 'LOGIN':
			return {...state, isLogin: true, email: action.email, userId: action.userId}
		case 'LOGOUT':
			return {...state, isLogin: false, email: ''}
		default:
			return state
	}
}

export { authReducer }