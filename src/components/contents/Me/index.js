import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Post from './Post'
import About from './About'
import Friends from './Friends'
import './Me.css'

export default function Me() {
	const Auth = useContext(AuthContext)
	return (
		<div className="me">
			<div className="me-header shadow-sm">
				<div className="me-cover">
					<img src="/img/cover.png" alt=""/>
				</div>
				<div className="me-info pb-4">
					<div className="me-info__left">
						<div className="me-info__left-avatar">
							<img src="/img/avatar.png" alt=""/>
						</div>
					</div>
					<div className="me-info__center ms-4">
						<div className="me-info__center-name d-flex align-items-center">
							<h1>{Auth.state.email.split('@')[0]}</h1>
							{
								Auth.state.verified
								?
									<div 
										className="me-info__center-active ms-2"
										style={{backgroundImage: 'url("/img/active.png")'}}
									>
									</div>
								:
									<></>

							}
						</div>
						<div className="me-info__center-friends">
							10 Friends
						</div>
					</div>
					<div className="me-info__right">
						<button className='btn btn-primary me-2'>
							<i className="fa-solid fa-plus"></i>
							Thêm vào tin
						</button>
						<button className='btn text-dark' style={{backgroundColor: 'var(--background-color)'}}>
							<i className="fa-solid fa-pen"></i>
							Chỉnh sửa trang cá nhân
						</button>
					</div>
				</div>
				<div className="me-bottom d-flex justify-content-between align-items-center">
					<div className="me-bottom__link">
						<Link className='text-decoration-none fw-bold active' to="/me/">Post</Link>
						<Link className='text-decoration-none fw-bold' to="/me/about">About</Link>
						<Link className='text-decoration-none fw-bold' to="/me/friends">Friend</Link>
					</div>
					<div className="me-bottom__menu">
						<i className="fa-solid fa-ellipsis fs-4"></i>
					</div>
				</div>
			</div>
			<div className="me-contents">
				<Routes>
					<Route path='/' element={<Post />}/>
					<Route path='/about/' element={<About />}/>
					<Route path='/friends/' element={<Friends />}/>
				</Routes>
			</div>
		</div>
	)
}