import { useEffect,useState } from 'react'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'


export default function Conversation({value, currentId, homeContext, selectConversation}) {
	const [user, setUser] = useState({})

	useEffect(() => {
		const friendId = value.member.find(user => user !== currentId)
		const getFriendId = async () => {
			try {
				const res = await axios.get(baseUrl + '/user/' + friendId)
				console.log(res.data)
				setUser(res.data.user)
			} catch(err) {
				console.log(err)
			}
		}
		getFriendId()
	},[])

	// const getChatFn = async (id) => {
	// 	const result = await axios.get(baseUrl + '/chat/' + id)
	// 	console.log(result.data.message)
	// }

	return (
			<div 
				conversation-id={value._id} 
				className="messages-left__content-item d-flex justify-content-between align-items-center"
				onClick={() => selectConversation(value._id,user)}
			>
				<img className='me-3' src="/img/avatar.png" alt=""/>
				<div className="content-item__info text-start">
					<div className="content-item__info-name">
						{user.fullName}
					</div>
					<div className="content-item__info-bottom">
						{
							homeContext.userOnline.some(item => item.username == user._id) 
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