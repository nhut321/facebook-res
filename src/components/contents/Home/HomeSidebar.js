import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function HomeSidebar() {
	return (
		<div className="home-sidebar">
			<div className="home-sidebar__lists">
				<div className="home-sidebar__item me shadow-sm mb-3">
					<Link to="/me" className='text-dark text-decoration-none'>
						<img src="/img/avatar.png" alt=""/>
						<span>Hugh Jackman</span>
					</Link>
				</div>
				<h6>INVITATIONS</h6>
				<div className="home-sidebar__item invitations shadow-sm">
					<img className='col-12' src="/img/invitations.jpg" alt=""/>
					<div className="invitations-btn d-flex align-items-center mt-3">
						<Button className='me-2 rounded'>Accept invitation</Button>
						<Button className='btn-light shadow-sm rounded btn-outline-secondary'>X</Button>
					</div>
				</div>
			</div>
		</div>
	)
}