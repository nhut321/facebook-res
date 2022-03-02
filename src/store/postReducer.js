function postReducer(state,action) {
	switch (action.type) {
		case 'POST':
			return {...state, description: action.payload}
		default: 
			return state
	}
}

export { postReducer }