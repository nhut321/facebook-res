import { useContext,useEffect,useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import Conversation from './Conversation'
import MessageRight from './MessageRight'
import MobileBar from './MobileBar'
import './Chat.css'
import axios from 'axios'
import { socket } from '../../socket'

export default function Chat() {
	const isMobile = useMediaQuery({
		query: '(max-width: 46.25em)' 
	})
	const Auth = useContext(AuthContext)
	const homeContext = useContext(HomeContext)
	const [selectUser, setSelectUser] = useState(false)
	const [messData, setMessData] = useState([])
	const [conversation, setConversation] = useState([])
	const [conversationId, setConversationId] = useState('')
	const [friends, setFriends] = useState([])
	const [user, setUser] = useState({})
	const [scroll, setScroll] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(baseUrl + '/conversations/' + Auth.state.userId)
			await setConversation(value => {
				const res = result.data.conversation
				return res
			})
		}
		fetchData()
	},[])

	const selectConversation = async (conversationId,friend) => {
		const message = await axios.get(baseUrl + '/chat/' + conversationId)
		setUser(friend)
		setConversationId(conversationId)
		setMessData(message.data.message)
		setSelectUser(true)
		setScroll(true)
	}

	return (
		<div className="messages row">
			{
				isMobile 
				? 
					<div className="messages-mobile-bar border-bottom">
						{conversation.map((v,i) => {
							return (
								<MobileBar
									key={i}
									item={v}
									id={v._id}
									userOnline={homeContext.userOnline}
									currentId={Auth.state.userId}
									conversationId={v._id}
									selectConversation={selectConversation}
								/>
							)
						})}
					</div>
				: 
					<></>
			}
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
										userOnline={homeContext.userOnline}
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
				scroll={scroll}
			/>
		</div>
	)
}