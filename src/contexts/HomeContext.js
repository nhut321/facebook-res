import { 
	createContext,
	useState,
	useEffect,
	useReducer,
	useContext 
} from 'react'
import { AuthContext } from './AuthContext'
import { baseUrl } from '../components/baseUrl'
import { postReducer } from '../store/postReducer'
import { postInit } from '../store/initState'
import axios from 'axios'

export const HomeContext = createContext()

export default function HomeContextProvider({children}) {
	const Auth = useContext(AuthContext)
	const [comment, setComment] = useState('')
	const [state, dispatch] = useReducer(postReducer, postInit)
	const [postItem, setPostItem] = useState([])
	const [postModal, setPostModal] = useState(false)
	
	const togglePostModal = () => {
		setPostModal(v => !v)
	}

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
	},[])


	const postFn = (e) => {
		e.preventDefault()
		if(state.description !== '') {

			axios.post(baseUrl + '/posts/create', {
				description: state.description,
				userId: Auth.state.userId
			})
				.then(result => {
					// console.log(result.data)
					if(result.data.success) {
						setPostItem(item => {
							const data = [...item,{
							 description: state.description,
							 userId: {email: Auth.state.email},
							 postId: result.data.data._id
							}]
							console.log(data)
							return data
						})
						// console.log(result.data.data._id, postItem)
						setPostModal(false)
					}
				})
		}
	}

	console.log(Auth)

	const data = {
		postModal,
		postItem,
		setPostModal,
		togglePostModal,
		postFn,
		comment,
		setComment,
		state,
		dispatch
	}

	return (
		<HomeContext.Provider value={data}>
			{children}
		</HomeContext.Provider>
	)
}