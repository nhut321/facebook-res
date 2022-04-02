function postReducer(state,action) {
	switch (action.type) {
		case 'POST':
			return {
				...state,
				description: action.description, 
				postId: action.payload,
				imgLink: action.imgName,
				img: action.img,
				url: action.url
			}
		default: 
			return state
	}
}

export { postReducer }  