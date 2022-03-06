import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Profile from './Profile'
import './Me.css'

export default function Me() {
	const Auth = useContext(AuthContext)
	return (
		<div className="profile">
			<Profile 
				Auth={Auth}
			/>
{/* 			<div className="profile-header shadow-sm"> */}
{/* 				<div className="profile-cover"> */}
{/* 					<img src="/img/cover.png" alt=""/> */}
{/* 				</div> */}
{/* 				<div className="profile-info pb-4"> */}
{/* 					<div className="profile-info__left"> */}
{/* 						<div className="profile-info__left-avatar"> */}
{/* 							<img src="/img/avatar.png" alt=""/> */}
{/* 						</div> */}
{/* 					</div> */}
{/* 					<div className="profile-info__center ms-4"> */}
{/* 						<div className="profile-info__center-name d-flex align-items-center"> */}
{/* 							<h1>{Auth.state.email.split('@')[0]}</h1> */}
{/* 							{ */}
{/* 								Auth.state.verified */}
{/* 								? */}
{/* 									<div  */}
{/* 										className="profile-info__center-active ms-2" */}
{/* 										style={{backgroundImage: 'url("/img/active.png")'}} */}
{/* 									> */}
{/* 									</div> */}
{/* 								: */}
{/* 									<></> */}
{/*  */}
{/* 							} */}
{/* 						</div> */}
{/* 						<div className="profile-info__center-friends"> */}
{/* 							10 Friends */}
{/* 						</div> */}
{/* 					</div> */}
{/* 					<div className="profile-info__right"> */}
{/* 						<button className='btn btn-primary profile-2'> */}
{/* 							<i className="fa-solid fa-plus"></i> */}
{/* 							Thêm vào tin */}
{/* 						</button> */}
{/* 						<button className='btn text-dark' style={{backgroundColor: 'var(--background-color)'}}> */}
{/* 							<i className="fa-solid fa-pen"></i> */}
{/* 							Chỉnh sửa trang cá nhân */}
{/* 						</button> */}
{/* 					</div> */}
{/* 				</div> */}
{/* 				<div className="profile-bottom d-flex justify-content-between align-items-center"> */}
{/* 					<div className="profile-bottom__link"> */}
{/* 						<Link className='text-decoration-none fw-bold active' to="/me/">Post</Link> */}
{/* 						<Link className='text-decoration-none fw-bold' to="/me/about">About</Link> */}
{/* 						<Link className='text-decoration-none fw-bold' to="/me/friends">Friend</Link> */}
{/* 					</div> */}
{/* 					<div className="profile-bottom__menu"> */}
{/* 						<i className="fa-solid fa-ellipsis fs-4"></i> */}
{/* 					</div> */}
{/* 				</div> */}
{/* 			</div> */}

			{/* <div className="profile-contents"> */}
			{/* 	<Routes> */}
			{/* 		<Route path='/' element={<Post />}/> */}
			{/* 		<Route path='/about/' element={<About />}/> */}
			{/* 		<Route path='/friends/' element={<Friends />}/> */}
			{/* 	</Routes> */}
			{/* </div> */}
		</div>
	)
}