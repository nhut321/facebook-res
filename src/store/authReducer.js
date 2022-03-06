function authReducer(state,action) {
	switch (action.type){
		case 'LOGIN':
			return {...state, 
				isLogin: true, 
				email: action.email,
				fullName: action.fullName,
				userId: action.userId,
				verified: action.verified
			}
		case 'LOGOUT':
			return {...state, isLogin: false, email: ''}
		default:
			return state
	}
}

export { authReducer }