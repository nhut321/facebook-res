import { 
	createContext,
	useState,
	useEffect,
	useReducer,
	useContext,
	memo
} from 'react'
import { AuthContext } from './AuthContext'
import { baseUrl } from '../components/baseUrl'
import { postReducer } from '../store/postReducer'
import { postInit } from '../store/initState'
import axios from 'axios'
import { socket } from '../components/socket'
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../firebase'

export const HomeContext = createContext()

function HomeContextProvider({children}) {
	const Auth = useContext(AuthContext)
	const [friendList, setFriendList] = useState([])
	const [toggleTabMenu, setToggleTabMenu] = useState(1)
	const [comment, setComment] = useState('')
	const [state, dispatch] = useReducer(postReducer, postInit)
	const [postItem, setPostItem] = useState([])
	const [userOnline, setUserOnline] = useState([])
	const [notification, setNotification] = useState([])
	const [viewNoti, setViewNoti] = useState(() => {
		return localStorage.getItem('noti-view') ?? false
	})
	const [urlImagePost, setUrlImagePost] = useState('')

	useEffect(() => {
		const getUser = async () => {
			const result = await axios.get(baseUrl + '/user/' + Auth.state.userId)
			.then(res => {
				res.data.user.notification.map(noti => {
					setNotification(item => [...item, noti])
					if(notification.length !== res.data.user.notification.length) {
						setViewNoti(false)
					}
					// setViewNoti(false)
				})
				res.data.friends.map(friend => {
					setFriendList(item => [...item,friend])
				})
			})
			.catch(err => console.log(err)) 

		}
		getUser()
	},[setNotification])

	useEffect(() => {
	    socket.emit('online', Auth.state.userId, Auth.state.fullName)
	    socket.on('server-req-online', (username) => {
	    	username.map(item => {
		 		setUserOnline(v => {
		 			return  [...v, item]
		 		})
	    	})
	 	})
	 	socket.on('follow-res', data => setViewNoti(false))
	    return () => {
	      setUserOnline([])
	    }
	    socket.on('disconnect', socket.id)
	 	socket.on('message-res', data => console.log(data))
	},[setUserOnline])


	useEffect(() => {
		const getPostFn = async () => {
			await axios.get(baseUrl + '/posts/friend-posts/' + Auth.state.userId, {
				headers: {
					Authorization: 'Beaer ' + localStorage.getItem('token')
				}
			})
				.then(result => {
					result.data.data.map(v => {
						setPostItem(post => [...post, v])
					})
				})
				.catch((err) => {
					throw err
				})
		}
		getPostFn()
	},[])

	const postFn = async (url) => {
		if(state.description !== '' || state.img !=='') {
			try {
				await axios.post(baseUrl + '/posts/create', {
					description: state.description,
					userId: Auth.state.userId,
					imageUrl: url
				})
					.then(result => {
						if(result.data.success) {

							setPostItem(item => {
								const data = [...item,{
								 description: state.description,
								 userId: {
								 	_id: result.data.data.userId,
								 	fullName: Auth.state.fullName,
								 	fname: Auth.state.fname,
								 	lname: Auth.state.lname,
								 	email: Auth.state.email,
								 	verified: Auth.state.verified,
								 	avatar: Auth.state.avatar
								 },
								 _id: result.data.data._id,
								 like: result.data.data.like,
								 imageUrl: url
								}]
								return data
							})

							dispatch({type: 'POST', description: ''})
						}
					})
			} catch(err) {
				console.log(err)
			}
		}
	}

	// useEffect(() => {
	// 	socket.disconnect()
	// },[])

	const data = {
		postItem,
		postFn,
		comment,
		setComment,
		state,
		dispatch,
		toggleTabMenu,
		setToggleTabMenu,
		friendList,
		setFriendList,
		userOnline,
		notification,
		viewNoti,
		setViewNoti
	}

	return (
		<HomeContext.Provider value={data}>
			{children}
		</HomeContext.Provider>
	)
}

export default memo(HomeContextProvider)