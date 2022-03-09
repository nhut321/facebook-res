import { useState,useContext,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { HomeContext } from '../contexts/HomeContext'
import './Header.css'
import { baseUrl } from './baseUrl'
import axios from 'axios'

export default function Header() {
	const navigate = useNavigate()
	const Auth = useContext(AuthContext)
	const toggle = useContext(HomeContext)
	const [searchValue, setSearchValue] = useState('')
	const [searchItem, setSearchItem] = useState([])
	// const [toggleState, setToggleState] = useState(1)
	const [userMenu, setUserMenu] = useState(true)

	const searchInput = useRef()

	const searchFn = () => {
		// const input = document.createElement('input')
		// search.current.appendChild(input)
	}

	const toggleFn = function(index) {
		toggle.setToggleTabMenu(index)
	}

	const logOut = () => {
		localStorage.removeItem('token')
		Auth.dispatch({type: 'LOGOUT'})
		navigate('/login')
	}

	const toggleUserMenu = () => {
		setUserMenu(v => !v)
	}

	let name = Auth.state.fname

	const onSubmitSearch = e => {
		// e.preventDefault()
		// axios.get(baseUrl + '/search?name=' + searchValue)
		// 	.then(res => console.log(res))
	}

	const onChangeSearch = (e) => {
		setSearchValue(e.target.value)
		if(searchValue !== '') {
			axios.get(baseUrl + '/search?name=' + searchValue)
			.then(res => {
				 setSearchItem(res.data)
				 console.log(searchItem)
			})
		}
	}

	return (
		<div className="header d-flex justify-content-between shadow-sm">
			<div className="header-left d-flex align-items-center">
				<div className='header-left__logo'>
					<Link to='/'>
						<i className="fa-brands fa-facebook"></i>
					</Link>
				</div>
				<div
					className='header-left__search'
					onClick={searchFn}
				>
					<img src='/img/search-interface-symbol.png' />
					<form onSubmit={onSubmitSearch}>
						<input
							value={searchValue} 
							ref={searchInput} 
							name='search'
							type="text"
							placeholder='Search...'
							onChange={onChangeSearch}
						/>
					</form>
					<div className="header-left__search-lists text-start">
						{
							searchValue === ''
							?
								<></>
							:
							searchItem.map((v,i) => {
								// console.log(v.fullName)
								return (
									<div key={i} className="header-left__search-item">
										<a href={`/user/user-id?id=${v._id}`}>
											<img 
												src="/img/avatar.png" 
												alt="" 
												className='m-2'
											/>
											{v.fullName}
										</a>
									</div>
								)
							})
						}

						{/* <div className="header-left__search-item"> */}
						{/* 	<img  */}
						{/* 		src="/img/avatar.png"  */}
						{/* 		alt=""  */}
						{/* 		className='m-2' */}
						{/* 	/> */}
						{/* 	Nhut Cumen */}
						{/* </div> */}

					</div>
				</div>
			</div>
			<div className="header-center">
				<ul className="header-center__tab-ui d-flex align-items-center">
					<li 
						className={toggle.toggleTabMenu === 1 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(1)}
					>
						<Link to='/'>
							<img src="/img/home.png" alt="" />
						</Link>
					</li>
					<li 
						className={toggle.toggleTabMenu === 2 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(2)}
					>
						<a href='#'>
							<img src="/img/friends(1).png" alt="" />
						</a>
					</li>
					<li 
						className={toggle.toggleTabMenu === 3 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(3)}
					>
						<a href='#'>
							<img src="/img/play.png" alt="" />
						</a>
					</li>
					<li 
						className={toggle.toggleTabMenu === 4 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(4)}
					>
						<a href='#'>
							<img src="/img/online-shopping.png" alt="" />
						</a>
					</li>
					<li 
						className={toggle.toggleTabMenu === 5 ? 'tab-ui__item active' : 'tab-ui__item'}
						onClick={() => toggleFn(5)}
					>
						<a href='#' >
							<img src={toggle.toggleTabMenu === 5 ? '/img/multiple-users-silhouette.png' : '/img/people.png'} alt="" />
						</a>
					</li>
				</ul>
			</div>
			<div className="header-right d-flex align-items-center">
				<div 
					className="header-right__user me-2 d-flex"
				>
					<Link className='text-dark text-decoration-none' to="/me">
						<img src={Auth.state.avatar || '/img/avatar.png'} alt=""/>
						<span className='p-1'>
							<strong>
								{
									name
								}
							</strong>
						</span>
					</Link>
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
									<img src={Auth.state.avatar || '/img/avatar.png'} alt=""/>
								</div>
								<div className="dropdown-item-right d-flex flex-column">
									<Link to='/me'>
										<span className='fs-5 fw-bold'>{Auth.state.fullName}</span>
										<span className='text-muted'>Xem trang cá nhân của bạn</span>
									</Link>
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