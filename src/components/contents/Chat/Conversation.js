import { useContext, useEffect,useState } from 'react'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { chatContext } from '../../../contexts/ChatContext'


export default function Conversation({value, currentId, userOnline, selectConversation}) {
	const Chat = useContext(chatContext)
	const [user, setUser] = useState({
		user: {
			avatar: '',
			lname: '',
		}
	})
	const friendId = value.member.find(user => user !== currentId)

	useEffect(() => {
		const getFriendId = async () => {
			try {
				const res = await axios.get(baseUrl + '/user/' + friendId)
				setUser(res.data) 
			} catch(err) {
				console.log(err)
			}
		}
		getFriendId()
		return () => {
			
		}
	},[])

	// const getChatFn = async (id) => {
	// 	const result = await axios.get(baseUrl + '/chat/' + id)
	// 	console.log(result.data.message)
	// }

	// console.log('img/avatar.png')

	return (
			<div 
				conversation-id={value._id} 
				className="messages-left__content-item d-flex justify-content-between align-items-center"
				onClick={() => {
					selectConversation(value._id,user)
					Chat.selectConversation(value._id)
				}}
			>
				
				<img className='me-3' src={user.user == '' ? "img/avatar.png" : user.user.avatar} alt=""/>
				{/* <img className='me-3' src='img/avatar.png' alt=""/> */}
				<div className="content-item__info text-start">
					<div className="content-item__info-name">
						{user.user.fname}
					</div>
					<div className="content-item__info-bottom">
						{
							userOnline.some(item =>	item.username == user.user._id) 
							?  
								<>
									<div className="content-item__info-signal online"></div>
									<span>online</span>
								</>
							: 
								<>
									<div className="content-item__info-signal offline"></div>
									<span>offline</span>
								</>
						}
					</div>
				</div>
			</div>
	)
}