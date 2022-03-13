import { useEffect, useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import Post from './Post'
import About from './About'
import Friends from './Friends'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { socket } from '../../socket'

export default function Profile({Auth}) {
	const authContext = useContext(AuthContext)
	const homeContext = useContext(HomeContext)
	const [follow, setFollow] = useState(false)
	const [follower, setFollower] = useState([])
	const [following, setFollowing] = useState([])
	const [followState, setFollowState] = useState({
		follower: [],
		following: []
	})
	const [friends, setFriends] = useState([])

	useEffect(() => {
		axios.get(baseUrl + '/user/' + (Auth.userId || Auth.state.userId ))
			.then(res => {
				if (res.data.user.follower.includes(authContext.state.userId)) {
					setFollow(true)
				}
				setFollower(res.data.user.follower)
				setFollowing(res.data.user.following)
			})
		return () => {
            	setFriends([])
        	}
	},[])

	const followFn = () => {
		setFollow(v => !v)
		axios.put(baseUrl + '/user/' + Auth.state.userId + '/follow', {
			currentId: authContext.state.userId
		}).then(res => {
		})
		console.log(authContext.state.userId)
		socket.emit('follow-user', Auth.state.userId)
		setFollower(v => {
			return [...v, authContext.state.userId]
		})
	}

	const unFollowFn = () => {
		setFollow(v => !v)
		axios.put(baseUrl + '/user/' + Auth.state.userId + '/unfollow', {
			currentId: authContext.state.userId
		}).then(res => console.log(res.data))
		setFollower(v => {
			const result = v.filter(item => item !== authContext.state.userId)
			return result
		})
	}
	
	
	return (
		<>
			<div className="profile-header shadow-sm">
				<div className="profile-cover">
					<img src="/img/cover.png" alt=""/>
				</div>
				<div className="profile-info pb-4">
					<div className="profile-info__left">
						<div className="profile-info__left-avatar">
							<img src={Auth.state.avatar == '' ? '/img/avatar.png' : Auth.state.avatar} alt=""/>
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
						<div className="profile-info__center-follow d-flex">
							<div className="follower me-2">
								{follower.length +' '}
								follower
							</div>
							<div className="following">
								{following.length +' '}
								following
							</div>
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
								follow 
								?
									<button 
										className='btn btn-primary me-2'
										onClick={unFollowFn}
									>
										<i className="fa-solid fa-check me-2"></i>
										Unfollow
									</button>
								:
									<button 
										className='btn btn-primary me-2'
										onClick={followFn}
									>
										<i className="fa-solid fa-plus me-2"></i>
										Follow
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
