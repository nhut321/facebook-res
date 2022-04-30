import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Profile from './Profile'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { socket } from '../../socket'


function OtherUser() {
	const location = useLocation()
	const userIdParams = new URLSearchParams(location.search).get('id')
	const [profileUser, setProfileUser] = useState({
		email: '',
		avatar: '',
		friends: '',
		fullName: '',
		verified: '',
		avatar: ''
	})

	useEffect(() => {
		axios.get(baseUrl + '/user/'+ userIdParams)
			.then(res => {
				if (res.data.success) {
					setProfileUser({
						email: res.data.user.email,
						fullName: res.data.user.fullName,
						avatar: res.data.user.avatar,
						friends: res.data.user.friends,
						fullName: res.data.user.fullName,
						verified: res.data.user.verified,
						avatar: res.data.user.avatar,
						fname: res.data.user.fname,
						lname: res.data.user.lname,
					})
				}
			})

	},[])

	return(
		// <h1>Other User</h1>

		<Profile 
			Auth={{
				state: {
					fullName: profileUser.fullName,
					fname: profileUser.fname,
					lname: profileUser.lname,
					verified: profileUser.verified,
					userId: userIdParams,
					avatar: profileUser.avatar,
				}
			}}
		/>
	)
}

export default OtherUser