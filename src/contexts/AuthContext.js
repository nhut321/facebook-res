import { createContext, useReducer, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authInit } from '../store/initState'
import { authReducer } from '../store/authReducer'
import { baseUrl } from '../components/baseUrl'
import axios from 'axios'

export const AuthContext = createContext()

function AuthContextProvider({children}) {
	const navigate = useNavigate()
	const [state,dispatch] = useReducer(authReducer, authInit)
	const [spinner, setSpinner] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios.get(baseUrl, {
					headers: {
						Authorization: 'Beaer ' + localStorage.getItem('token')
					}
				}).then(res => {
					setSpinner(false)
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
						// export const baseUrl = 'http://localhost:8080'
						// export const baseUrl = 'https://assbook-app.herokuapp.com'
					} else {
						axios.defaults.headers.common['Authorization'] = ''
						navigate('/login')
					}
				})
			} catch(err) {
				console.log('Server connect error')
			}
		}
		fetchData()
	},[state.isLogin])

	


	const data = {
		state,
		dispatch,
		spinner
	}
	return (
		<AuthContext.Provider value={data}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider