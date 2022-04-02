import { useState,useEffect } from 'react'
import './MobileBar.css'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'
export default function MobileBar({item,
	id, 
	userOnline, 
	currentId, 
	conversationId,
	selectConversation
}) {
	// userOnline.some(item => item == v._id)
	const [user, setUser] = useState({})
	useEffect(() => {
		const friendId = item.member.find(user => user !== currentId)
		const getFriendId = async () => {
			try {
				const res = await axios.get(baseUrl + '/user/' + friendId)
				setUser(res.data.user) 
			} catch(err) {
				console.log(err)
			}
		}
		getFriendId()
	},[])
	return (
			<div 
				className={userOnline.some(item => item.username == user._id)
					?"messages-mobile-bar__item online"
					:"messages-mobile-bar__item"
				}
				conversation-id={conversationId}
				onClick={() => selectConversation(conversationId, user)}
			>
				<div className="messages-mobile-bar__item-sign"></div>
				<img src={user.avatar !== '' ? user.avatar :"/img/avatar.png"} alt=""/>
				<span className='shadow-sm'>{user.fname}</span>
			</div>
	)
}