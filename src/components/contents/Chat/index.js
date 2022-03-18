import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import Conversation from './Conversation'
import MessageRight from './MessageRight'
import './Chat.css'
import axios from 'axios'
import { socket } from '../../socket'

export default function Chat() {
	const Auth = useContext(AuthContext)
	const homeContext = useContext(HomeContext)
	const [selectUser, setSelectUser] = useState(false)
	const [messData, setMessData] = useState([])
	const [conversation, setConversation] = useState([])
	const [conversationId, setConversationId] = useState('')
	const [friends, setFriends] = useState([])
	const [user, setUser] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(baseUrl + '/conversations/' + Auth.state.userId)
			setConversation(value => {
				const res = result.data.conversation
				return res
			})
		}
		fetchData()
	},[])


	// useEffect(() => {
	// 	console.log(conversation)
	// 	// const friendId = conversation.member.find(user => user !== Auth.state.userId)
	// 	// const getFriendId = async () => {
	// 	// 	try {
	// 	// 		const res = await axios.get(baseUrl + '/user/' + friendId)
	// 	// 		setUser(res.data.user)
	// 	// 	} catch(err) {
	// 	// 		console.log(err)
	// 	// 	}
	// 	// }
	// 	// getFriendId()
	// },[])

	const selectConversation = async (conversationId,friend) => {
		const message = await axios.get(baseUrl + '/chat/' + conversationId)
		setUser(friend)
		setConversationId(conversationId)
		setMessData(message.data.message)
		setSelectUser(true)
	}

	return (
		<div className="messages row">
			<div 
				className="messages-left col-3 border-end" 
				style={{backgroundColor: 'white'}}
			>
				<div className="messages-left__header">
					<div className="messages-left__header-title text-start pt-2 pb-2">
						<h2>Chat</h2>
					</div>
					<div className="messages-left__header-search">
						<i className="fa-solid fa-magnifying-glass"></i>
						<input 
							type="text"
							placeholder='Tìm kiếm trên messager'
						/>
					</div>
				</div>
				<div className="messages-left__content mt-4">
					<div className="messages-left__content-lists">

						{
							conversation.map((value,key) => { 
								return (
									<Conversation 
										key={key} 
										value={value} 
										currentId={Auth.state.userId}
										homeContext={homeContext}
										selectConversation={selectConversation}
									/>
								)
							})
						}

					</div>
				</div>
			</div>
			<MessageRight 
				selectUser={selectUser} 
				messData={messData}
				setMessData={setMessData}
				Auth={Auth}
				user={user}
				conversationId={conversationId}
			/>
		</div>
	)
}