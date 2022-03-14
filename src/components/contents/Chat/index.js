
import './Chat.css'

export default function Chat() {
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
						<i class="fa-solid fa-magnifying-glass"></i>
						<input 
							type="text"
							placeholder='Tìm kiếm trên messager'
						/>
					</div>
				</div>
			</div>
			<div className="messages-right col-9" style={{backgroundColor: 'white'}}>
				messages-right
			</div>
		</div>
	)
}