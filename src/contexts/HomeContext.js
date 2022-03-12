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

export const HomeContext = createContext()

function HomeContextProvider({children}) {
	const Auth = useContext(AuthContext)
	const [friendList, setFriendList] = useState([])
	const [toggleTabMenu, setToggleTabMenu] = useState(1)
	const [comment, setComment] = useState('')
	const [state, dispatch] = useReducer(postReducer, postInit)
	const [postItem, setPostItem] = useState([])
	const [postModal, setPostModal] = useState(false)
	const [userOnline, setUserOnline] = useState([])
	
	const togglePostModal = () => {
		setPostModal(v => !v)
	}

	useEffect(() => {
		 axios.get(baseUrl + '/user/' + Auth.state.userId)
			.then(res => {
				res.data.friends.map(friend => {
					setFriendList(item => [...item,friend])
				})
			})
			.catch(err => console.log(err))
	},[])
	

	useEffect(() => {
		console.log(socket.id)
	    socket.emit('online', Auth.state.fname, socket.id)
	    socket.on('server-req-online', data => {
	      setUserOnline(v => {
	      	return	[...v,data.user]
	      })
	    })
	    // socket.on('user-disconect', data => {
	    // 	
	    // })
	    return () => {
	      setUserOnline([])
	    }
	},[])


	useEffect(() => {
		axios.get(baseUrl + '/posts/', {
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
	},[])

	const postFn = (e) => {
		e.preventDefault()
		if(state.description !== '') {

			axios.post(baseUrl + '/posts/create', {
				description: state.description,
				userId: Auth.state.userId,
			})
				.then(result => {
					if(result.data.success) {
						setPostItem(item => {
							const data = [...item,{
							 description: state.description,
							 userId: {
							 	_id: result.data.data.userId,
							 	fullName: Auth.state.fullName,
							 	email: Auth.state.email,
							 	verified: Auth.state.verified,
							 	avatar: Auth.state.avatar
							 },
							 _id: result.data.data._id,
							 like: result.data.data.like
							}]
							return data
						})
						setPostModal(false)
					}
				})
		}
	}

	const data = {
		postModal,
		postItem,
		setPostModal,
		togglePostModal,
		postFn,
		comment,
		setComment,
		state,
		dispatch,
		toggleTabMenu,
		setToggleTabMenu,
		friendList,
		setFriendList,
		userOnline
	}

	return (
		<HomeContext.Provider value={data}>
			{children}
		</HomeContext.Provider>
	)
}

export default memo(HomeContextProvider)