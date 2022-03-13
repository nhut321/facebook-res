import { createContext, useReducer, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authInit } from '../store/initState'
import { authReducer } from '../store/authReducer'
import { baseUrl } from '../components/baseUrl'
import axios from 'axios'

export const AuthContext = createContext()

function AuthContextProvider({children}) {
	const navigate = useNavigate()
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
			if (res.data.success) {
				dispatch({
					type: 'LOGIN',
					fullName: res.data.user.fullName,
					email: res.data.user.email, 
					userId: res.data.user.userId,
					verified: res.data.user.verified,
					avatar: res.data.user.avatar,
					fname: res.data.user.fname,
					lname: res.data.user.lname,
				})
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
			} else {
				axios.defaults.headers.common['Authorization'] = ''
				navigate('/login')
			}
		}).catch(() => {

		})
	},[state.isLogin])

	console.log(state.fname)


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