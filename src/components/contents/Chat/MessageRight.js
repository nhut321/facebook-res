import { useState, useEffect } from 'react'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { socket } from '../../socket'

export default function MessageRight({
	selectUser, 
	messData, 
	Auth, 
	user, 
	setMessData,
	conversationId
}) {
	const [message, setMessage] = useState('')

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
	}

	useEffect(() => {
	 	socket.on('message-res', data => {
	 		console.log(data.message)
	 		setMessData(v => [...v, {
	 			message: data.message
	 		}])
	 	})
	},[])

	return (
		<div className="messages-right col-9" style={{backgroundColor: 'white'}}>
			{
				selectUser 
				?
				<>
				<div className="messages-right__header border-bottom d-flex justify-content-between align-items-center">
					<div className="messages-right__header-avatar" style={{backgroundImage: "url('/img/avatar.png')"}}></div>
					<div className="messages-right__header-info">
						<span className='fw-bold'>{user.fullName}</span>
					</div>
				</div>
				<div className="messages-right__content">
					<div className="chat-history">
	                    <ul className="m-b-0">
	                    	{
	                    		messData.map((v,i) => {
	                    				if(v.senderId == Auth.state.userId) {
					                        return (<li key={i} className="clearfix">
							                            <div className="message my-message">{v.message}</div>
							                        </li>)
	                    				} else {
	                    					return (<li key={i} className="clearfix">
							                            <div className="message other-message float-left">{v.message}</div>
							                        </li>)
	                    				}
	                    		})
	                    	}
	                    </ul>
	                </div>
				</div>
                <form 
                	className="messages-right__content-type d-flex align-items-center"
                	onSubmit={onSubmitMessage}
                >
                	<input 
                		placeholder='Chat đi nào...'
                		value={message}
                		onChange={e => setMessage(e.target.value)}
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