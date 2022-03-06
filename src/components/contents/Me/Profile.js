import { useEffect, useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Post from './Post'
import About from './About'
import Friends from './Friends'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'

export default function Profile({Auth}) {
	const authContext = useContext(AuthContext)
	const [friends, setFriends] = useState([])
	useEffect(() => {
		axios.get(baseUrl + '/user/' + (Auth.userId || Auth.state.userId ))
			.then(res => setFriends(res.data.user.friends))
		return () => {
            	setFriends([])
        	}
	},[])

	
	
	return (
		<>
			<div className="profile-header shadow-sm">
				<div className="profile-cover">
					<img src="/img/cover.png" alt=""/>
				</div>
				<div className="profile-info pb-4">
					<div className="profile-info__left">
						<div className="profile-info__left-avatar">
							<img src="/img/avatar.png" alt=""/>
						</div>
					</div>
					<div className="profile-info__center ms-4">
						<div className="profile-info__center-name d-flex align-items-center">
							<h1>{ Auth.fullName ?? Auth.state.fullName}</h1>
							{
								 Auth.verified ?? Auth.state.verified
								?
									<div 
										className="profile-info__center-active ms-2"
										style={{backgroundImage: 'url("/img/active.png")'}}
									>
									</div>
								:
									<></>

							}
						</div>
						<div className="profile-info__center-friends">
							{friends.length}
							{friends.length < 2 ? ' Friend' : ' Friends'}
						</div>
					</div>
					<div className="profile-info__right">
						{
							Auth.state.userId === authContext.state.userId
							?
							<button className='btn btn-primary me-2'>
								<i className="fa-solid fa-plus"></i>
								Add stories
							</button>
							:
							<button className='btn btn-primary me-2'>
								<i className="fa-solid fa-plus"></i>
								Add friend
							</button>
						}
						<button className='btn text-dark' style={{backgroundColor: 'var(--background-color)'}}>
							<i className="fa-solid fa-pen"></i>
							Edit profile
						</button>
					</div>
				</div>
				<div className="profile-bottom d-flex justify-content-between align-items-center">
					<div className="profile-bottom__link">
						<Link className='text-decoration-none fw-bold active' to="/me/">Post</Link>
						<Link className='text-decoration-none fw-bold' to="/me/about">About</Link>
						<Link className='text-decoration-none fw-bold' to="/me/friends">Friend</Link>
					</div>
					<div className="profile-bottom__menu">
						<i className="fa-solid fa-ellipsis fs-4"></i>
					</div>
				</div>
			</div>

			<div className="profile-contents">
				<Routes>
					<Route path='/' element={<Post />}/>
					<Route path='/about/' element={<About />}/>
					<Route path='/friends/' element={<Friends />}/>
				</Routes>
			</div>
		</>
	)
}
