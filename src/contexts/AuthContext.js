import { createContext, useReducer, useEffect, useState } from 'react'
import { authInit } from '../store/initState'
import { authReducer } from '../store/authReducer'
import { baseUrl } from '../components/baseUrl'
import axios from 'axios'

export const AuthContext = createContext()

function AuthContextProvider({children}) {
	// const [isLogin, setIsLogin] = useState(() => {
	// 	
	// })
	const [state,dispatch] = useReducer(authReducer, authInit)


	useEffect(() => {
		axios.get(baseUrl, {
			headers: {
				Authorization: 'Beaer ' + localStorage.getItem('token')
			}
		}).then(res => {
			// console.log(res.data.user.email)
			// console.log(res.data.success)
			if (res.data.success) {
				console.log(res.data)
				dispatch({type: 'LOGIN', payload: res.data.user.email})

				axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
			}
		})
	},[state.isLogin])
	
	const data = {
		state,
		dispatch
	}
	return (
		<AuthContext.Provider value={data}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider