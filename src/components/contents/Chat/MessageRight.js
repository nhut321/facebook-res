import { useState, useEffect, useRef, useContext } from 'react'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { socket } from '../../socket'
import { useMediaQuery } from 'react-responsive'
import { chatContext } from '../../../contexts/ChatContext'

export default function MessageRight({
	selectUser, 
	messData, 
	Auth, 
	user, 
	setMessData,
	conversationId,
	scroll
}) {
	const Chat = useContext(chatContext)
	const isMobile = useMediaQuery({
		query: '(max-width: 46.25em)' 
	})
	const [message, setMessage] = useState('')
	const [typing, setTyping] = useState({
		display: 'none'
	})

	let messageBox = useRef(null)

	const onSubmitMessage = e => {
		e.preventDefault()
		setMessage('')
		const sendMessage = async function() {
			const result = await axios.post(baseUrl + '/chat/' + conversationId + '/create',{
				message,
				senderId: Auth.state.userId
			})
			setMessData(v => {
				return [...v, result.data.message]
			})
		}
		sendMessage() 
		socket.emit('send-message', {
			message,
			userGetMessage: user._id
		})
		socket.emit('blur-typing', {receiverId: user._id})
	}

	const onChangeInput = (e) => {
		setMessage(e.target.value)
		socket.emit('on-typing', {typingUser: Auth.state.userId, receiverId: user._id})
	}

	useEffect(() => {
	 	socket.on('message-res', data => {
	 		console.log(data.message)
	 		setMessData(v => [...v, {
	 			message: data.message
	 		}])
	 	})
	 	socket.on('server-sending-on-typing', () => setTyping({display: 'block'}))
	 	socket.on('server-sending-on-typing', () => setTyping({display: 'block'}))
	 	socket.on('server-sending-on-blur-typing', () => setTyping({display: 'none'}))
	},[])

	const scrollBottom = () => {
		messageBox.current?.scrollIntoView(true)
	}
	useEffect(() => {
		scrollBottom()
	},[messData, Chat.conversationId])

	// console.log(scroll)


	const onBlurInput = () => {
		socket.emit('blur-typing', {receiverId: user._id})
		setTyping({display: 'none'})
	}

	return (
		<div className={isMobile ? "messages-right mobile col-9" : "messages-right col-9"} style={{backgroundColor: 'white'}}>
			{
				selectUser 
				?
				<>
				<div className="messages-right__header border-bottom d-flex justify-content-between align-items-center">
					<div className="messages-right__header-avatar" style={{backgroundImage: user.avatar == '' ? "url('/img/avatar.png')" : user.avatar}}></div>
					<div className="messages-right__header-info">
						<span className='fw-bold'>{user.fullName}</span>
					</div>
				</div>
				<div className="messages-right__content">
					<div className="chat-history">
	                    <div className="m-b-0 chat-history__list">
								{
									messData.map((v,i) => {
										return (
											<div ref={messageBox}>
											
											<div className='clearfix chat-history__item'>
												<div className={v.senderId == Auth.state.userId ? 'message my-message' : 'message other-message float-left'}>{v.message}</div>
											</div>


									</div>
										)
									})
								}
	                    </div>
	                </div>
				</div>
                <form 
                	className="messages-right__content-type d-flex align-items-center"
                	onSubmit={onSubmitMessage}
                >
                	<div 
                		className="messages-right__content-type-typing"
                		style={typing}
                	>
                		<span>{user.fname + ' đang soạn tin...'}</span>
                	</div>
                	<input
                		placeholder='Chat đi nào...'
                		value={message}
                		onChange={e => onChangeInput(e)}
                		onBlur={onBlurInput}
                	/>
                	<button className='btn'>
                		<i className="fa-solid fa-paper-plane"></i>
                	</button>
                </form>
				</>
				:
				<h1 className='mt-4'>Chào mừng đến với Messenger</h1>
			}

		</div>
	)
}