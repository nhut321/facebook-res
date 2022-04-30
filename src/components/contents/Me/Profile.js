import { useEffect, useState, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import Post from './Post'
import About from './About'
import Friends from './Friends'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { socket } from '../../socket'

export default function Profile({Auth}) {
	const navigate = useNavigate()
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

	const createConversation = async (receiverId) => {
		await axios.post(baseUrl + '/conversations/create', {
			senderId: authContext.state.userId,
			receiverId: Auth.state.userId
		}).then(res => {
			res.data.success ? navigate('/messages') : navigate('/messages')
		})
	}

	const fullName = Auth.state.fname + ' ' + Auth.state.lname || Auth.state.fname + ' ' + Auth.state.lname
	
	return (
		<>
			<div className="profile-header shadow-sm" style={{backgroundImage: 'url("/img/cover.jpg")'}}>
				{/* <div className="profile-cover"> */}
				{/* 	<img src="/img/cover.png" alt=""/> */}
				{/* </div> */}
				<div className="profile-info pb-4">
					<div className="profile-info__left">
						<div 
							className="profile-info__left-avatar"
							style={{
								backgroundImage: `url("${Auth.state.avatar == '' ? '/img/avatar.png' : Auth.state.avatar}")`
							}}
						>
							<i className="fa-solid fa-camera"></i>
							{/* <img src={Auth.state.avatar == '' ? '/img/avatar.png' : Auth.state.avatar} alt=""/> */}
						</div>
					</div>
					<div className="profile-info__center">
						<div className="profile-info__center-name d-flex align-items-center">
							<h1>{fullName}</h1>
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
						<div className="profile-info__center-follow d-flex text-light">
							<div className="follower me-2">
								Người theo dõi:
								{' ' + follower.length}
							</div>
							<div className="following">
								Đang theo dõi: 
								{' ' + follower.length}
							</div>
						</div>
					</div>
					<div className="profile-info__right">
						{
							Auth.state.userId === authContext.state.userId
							?
								<>
								<button className='btn btn-primary me-2'>
									<i className="fa-solid fa-plus"></i>
									Add stories
								</button>
								<button className='btn text-dark' style={{backgroundColor: 'var(--background-color)'}}>
									<i className="fa-solid fa-pen"></i>
									Edit profile
								</button>
								</>
							:
								follow 
								?
									<>
									<button 
										className='btn btn-primary me-2'
										onClick={unFollowFn}
									>
										<i className="fa-solid fa-check me-2"></i>
										Unfollow
									</button>
									<button 
										className='btn text-dark' 
										style={{backgroundColor: 'var(--background-color)'}}
										onClick={createConversation}
									>
										<i className="fa-solid fa-pen"></i>
										Chat
									</button>
									</>
								:
									<>
									<button 
										className='btn btn-primary me-2'
										onClick={followFn}
									>
										<i className="fa-solid fa-plus me-2"></i>
										Follow
									</button>
									<button 
										className='btn text-dark' 
										style={{backgroundColor: 'var(--background-color)'}}
										onClick={createConversation}
									>
										<i className="fa-solid fa-pen"></i>
										Chat
									</button>
									</>
						}
					</div>
				</div>
				{/* <div className="profile-bottom d-flex justify-content-between align-items-center"> */}
				{/* 	<div className="profile-bottom__link"> */}
				{/* 		<Link className='text-decoration-none fw-bold active' to="/me/">Post</Link> */}
				{/* 		<Link className='text-decoration-none fw-bold' to="/me/about">About</Link> */}
				{/* 		<Link className='text-decoration-none fw-bold' to="/me/friends">Friend</Link> */}
				{/* 	</div> */}
				{/* 	<div className="profile-bottom__menu"> */}
				{/* 		<i className="fa-solid fa-ellipsis fs-4"></i> */}
				{/* 	</div> */}
				{/* </div> */}
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
