import { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import './Header.css'

export default function Header() {
	const Auth = useContext(AuthContext)
	const [toggleState, setToggleState] = useState(1)
	const [userMenu, setUserMenu] = useState(true)

	const toggleFn = function(index) {
		setToggleState(index)
	}

	const logOut = () => {
		localStorage.removeItem('token')
		Auth.dispatch({type: 'LOGOUT'})
	}

	const toggleUserMenu = () => {
		setUserMenu(v => !v)
	}

	return (
		<div className="header d-flex justify-content-between shadow-sm">
			<div className="header-left d-flex align-items-center">
				<div className='header-left__logo'>
					{/* <img src='/img/facebook.png'/> */}
					<Link to='/'>
						<i className="fa-brands fa-facebook"></i>
					</Link>
				</div>
				<div className='header-left__search'>
					<img src='/img/search-interface-symbol.png' />
				</div>
			</div>
			<div className="header-center">
				<ul className="header-center__tab-ui d-flex align-items-center">
					<li 
						className={toggleState === 1 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(1)}
					>
						<img src="/img/home1.png" alt="" />
					</li>
					<li 
						className={toggleState === 2 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(2)}
					>
						<img src="/img/friends(1).png" alt="" />
					</li>
					<li 
						className={toggleState === 3 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(3)}
					>
						<img src="/img/play.png" alt="" />
					</li>
					<li 
						className={toggleState === 4 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(4)}
					>
						<img src="/img/online-shopping.png" alt="" />
					</li>
					<li 
						className={toggleState === 5 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(5)}
					>
						<img src={toggleState === 5 ? '/img/multiple-users-silhouette.png' : '/img/people.png'} alt="" />
					</li>
				</ul>
			</div>
			<div className="header-right d-flex align-items-center">
				<div className="header-right__user me-2 d-flex">
					<a className='text-dark text-decoration-none' href="#">
						<img src="https://drive.google.com/uc?export=view&id=1tv1nrovkDxdV1d7HM7BF6BzEJj89SDtv" alt=""/>
						<span className='p-1'><strong>{Auth.state.email.split('@')[0]}</strong></span>
					</a>
				</div>
				<div className="header-right__options d-flex align-items-center">
					<div className="header-right__options-item menu">
						<img src='/img/dots-menu.png' />
					</div>
					<div className="header-right__options-item messenger">
						<img src='/img/messenger.png' />
					</div>
					<div className="header-right__options-item notifi">
						<img src='/img/notification.png' />
					</div>
					<div 
						className="header-right__options-item down-btn"
						onClick={toggleUserMenu}
					>
						<img src='/img/down-filled-triangular-arrow.png' />
						<ul 
							className={userMenu ? 'down-btn__dropdown-lists shadow rounded-3' : 'down-btn__dropdown-lists open shadow rounded-3'}
						>
							<li className="down-btn__dropdown-item d-flex align-items-center">
								
								<div className="dropdown-item-left avatar">
									<img src="https://drive.google.com/uc?export=view&id=1tv1nrovkDxdV1d7HM7BF6BzEJj89SDtv" alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<span className='fs-5'>{Auth.state.email}</span>
									<span className='text-muted'>Xem trang cá nhân của bạn</span>
								</div>
							</li>
							<li className="down-btn__dropdown-item border-top border-bottom d-flex align-items-center">
								<div className="dropdown-item-left">
									<img src="/img/feedback-svgrepo-com.svg" alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<span className='fs-6'>Đóng góp ý kiến</span>
									<span className='text-muted'>Hãy chung tay cải thiện Facebook.</span>
								</div>
							</li>
							<li className="down-btn__dropdown-item d-flex align-items-center">
								<div className="dropdown-item-left">
									<img src="/img/setting-svgrepo-com.svg" alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<span>Cài đặt & quyền riêng tư</span>
								</div>
							</li>
							<li className="down-btn__dropdown-item d-flex align-items-center">
								<div className="dropdown-item-left">
									<img src="/img/help-svgrepo-com.svg" alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<span>Trợ giúp & hỗ trợ</span>
								</div>
							</li>
							<li 
								className="down-btn__dropdown-item d-flex align-items-center mb-3"
								onClick={logOut}
							>
								<div className="dropdown-item-left">
									<img src="/img/log-out-svgrepo-com.svg" alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<span>Đăng xuất</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}