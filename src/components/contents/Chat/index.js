import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import Conversation from './Conversation'
import './Chat.css'
import axios from 'axios'

export default function Chat() {
	const Auth = useContext(AuthContext)
	const homeContext = useContext(HomeContext)
	const [selectUser, setSelectUser] = useState(false)
	const [messData, setMessData] = useState([])
	const [conversation, setConversation] = useState([])
	const [friends, setFriends] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(baseUrl + '/conversations/' + Auth.state.userId)
			setConversation(result.data.conversation)
		}
		fetchData()
	},[])

	const selectUserFn = (conversationId) => {
		axios.get(baseUrl + '/chat/' + conversationId) 
				.then(res => {
					setMessData(res.data)
				})
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
							conversation.map((item,key) => {
								return (
									<Conversation 
										key={key} 
										item={item} 
										currentId={Auth.state.userId}
										homeContext={homeContext}
									/>
								)
							})
							// homeContext.friendList.map((v,i) => { 
							// 	return (
									// <div 
									// 	key={i} 
									// 	userid={v.id} 
									// 	className="messages-left__content-item d-flex justify-content-between align-items-center"
									// 	// onClick={() => selectUserFn(v.id)}
									// >
									// 	<img className='me-3' src="/img/avatar.png" alt=""/>
									// 	<div className="content-item__info text-start">
									// 		<div className="content-item__info-name">
									// 			{v.fname + ' ' + v.lname}
									// 		</div>
									// 		<div className="content-item__info-bottom">
									// 			{
									// 				homeContext.userOnline.some(item => item.username == v.id) 
									// 				?  
									// 					<>
									// 						<div className="content-item__info-signal online"></div>
									// 						<span>online</span>
									// 					</>
									// 				: 
									// 					<>
									// 						<div className="content-item__info-signal offline"></div>
									// 						<span>offline</span>
									// 					</>
									// 			}
									// 		</div>
									// 	</div>
									// </div>
							// 	)
							// })
						}

					</div>
				</div>
			</div>
			<div className="messages-right col-9" style={{backgroundColor: 'white'}}>
				{
					selectUser 
					?
					<>
					<div className="messages-right__header border-bottom d-flex justify-content-between align-items-center">
						<div className="messages-right__header-avatar" style={{backgroundImage: "url('/img/avatar.png')"}}></div>
						<div className="messages-right__header-info">
							<span className='fw-bold'>Hught Jackman</span>
						</div>
					</div>
					<div className="messages-right__content">
						<div className="chat-history">
		                    <ul className="m-b-0">
		                    	{
		                    		messData.map(item => {
		                    			return (
		                        <li className="clearfix">
		                            <div className="message my-message">{item.message}</div>
		                        </li>
		                    			)
		                    		})
		                    	}
		                        {/* <li className="clearfix"> */}
		                        {/*     <div className="message-data"> */}
		                        {/*         <span className="message-data-time">10:12 AM, Today</span> */}
		                        {/*     </div> */}
		                        {/*     <div className="message other-message float-left text-start">Are we meeting today?</div>                                     */}
		                        {/* </li>                                */}
		                        {/* <li className="clearfix"> */}
		                        {/*     <div className="message-data"> */}
		                        {/*         <span className="message-data-time">10:15 AM, Today</span> */}
		                        {/*     </div> */}
		                        {/*     <div className="message other-message float-left text-start">Project has been already finished and I have results to show you.</div> */}
		                        {/* </li> */}
		                    </ul>
		                </div>
		                <div className="messages-right__content-type d-flex align-items-center">
		                	<input placeholder='Chat đi nào...'/>
		                	<i class="fa-solid fa-paper-plane"></i>
		                </div>
					</div>
					</>
					:
					<h1 className='mt-4'>Chào mừng đến với Messenger</h1>
				}

			</div>
		</div>
	)
}