function authReducer(state,action) {
	switch (action.type){
		case 'LOGIN':
			return {...state, 
				isLogin: true, 
				email: action.email,
				fullName: action.fullName,
				userId: action.userId,
				verified: action.verified,
				avatar: action.avatar,
				fname: action.fname,
				lname: action.lname
			}
		case 'LOGOUT':
			return {...state, isLogin: false, email: ''}
		case 'USER_ONLINE':
			return {...state, socketId: action.socketId}
		case 'CHANGE_AVATAR':
			return {
				...state, avatar: action.avatar
			}
		default:
			return state
	}
}

export { authReducer }