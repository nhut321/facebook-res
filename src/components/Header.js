import { 
	useState,
	useContext,
	useRef,
	memo,
	useEffect
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { AuthContext } from '../contexts/AuthContext'
import { HomeContext } from '../contexts/HomeContext'
import HeaderMobile from './HeaderMobile'
import Navbar from './Navbar'
import './Header.css'
import { baseUrl } from './baseUrl'
import axios from 'axios'
import { socket } from './socket'

function Header() {
	const isMobile = useMediaQuery({
		query: '(max-width: 46.25em)' 
	})
	const navigate = useNavigate()
	const Auth = useContext(AuthContext)
	const toggle = useContext(HomeContext)
	const [searchValue, setSearchValue] = useState('')
	const [searchItem, setSearchItem] = useState([])
	// const [toggleState, setToggleState] = useState(1)
	const [userMenu, setUserMenu] = useState(true)
	const [toggleNoti, setToggleNoti] = useState(false)
	const [noti, setNoti] = useState([])
	// const [navbar, setNavbar] = useState({
	// 	
	// })
	const [navbarStyle, setNavbarStyle] = useState({
		transform: 'translateX(-150%)'
	})

	const [navbar, setNavbar] = useState(false)

	const toggleNav = () => {
		setNavbar(v => !v)
		if (navbar) {
			setNavbarStyle({
				transform: 'translateX(-150%)'
			})
		} else {
			setNavbarStyle({
				transform: 'translateX(0)'
			})
		}
	}

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

	const toggleNotiFn = () => {
		setToggleNoti(v => !v)
		toggle.setViewNoti(value => {
			const result = true
			localStorage.setItem('noti-view', result)
			return result
		})
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
				console.log(res.data)
				 setSearchItem(res.data)
			})
		}
	}

	return (
		<div className="header d-flex justify-content-between shadow-sm container-fluid">
			<Navbar style={navbarStyle}/>
			<div className="header-left d-flex align-items-center">
				<div 
					className="header-left__Nav d-flex align-items-center justify-content-center"
					onClick={toggleNav}
				>
					<svg width="25px" height="25px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg"><title>menu</title><g id="menu-Filled"><path id="menu-Filled-2" data-name="menu-Filled" className="cls-1" d="M2,5A1,1,0,0,1,3,4H16a1,1,0,0,1,0,2H3A1,1,0,0,1,2,5Zm19,6H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-9,7H3a1,1,0,0,0,0,2h9a1,1,0,0,0,0-2Z"/></g></svg>
				</div>
				<div className='header-left__logo'>
					<Link to='/'>
						<i className="fa-brands fa-facebook" style={{color: 'white'}}></i>
					</Link>
				</div>
				<div
					className='header-left__search'
					onClick={searchFn}
				>
					<div className="header-left__search-icon">
						<i className="fa-solid fa-magnifying-glass"></i>
					</div>
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
								return (
									<div key={i} className="header-left__search-item">
										<Link to={`/user/user-id?id=${v._id}`} className='text-dark text-decoration-none'>
											<img 
												src="/img/avatar.png" 
												alt="" 
												className='m-2'
											/>
											{v.lname + ' ' + v.fname}
										</Link>
									</div>
								)
							})
						}

					</div>
				</div>

			</div>
			{isMobile ? <HeaderMobile logOut={logOut} Auth={Auth}/> : <></>}
			{/* <div className="header-center"> */}
			{/* 	<ul className="header-center__tab-ui d-flex align-items-center"> */}
			{/* 		<li  */}
			{/* 			className={toggle.toggleTabMenu === 1 ? 'tab-ui__item active' : 'tab-ui__item'} */}
			{/* 			onClick={() => toggleFn(1)} */}
			{/* 		> */}
			{/* 			<Link to='/'> */}
			{/* 				<i className="fa-solid fa-house-chimney fs-4"></i> */}
			{/* 			</Link> */}
			{/* 		</li> */}
			{/* 		<li  */}
			{/* 			className={toggle.toggleTabMenu === 2 ? 'tab-ui__item active' : 'tab-ui__item'} */}
			{/* 			onClick={() => toggleFn(2)} */}
			{/* 		> */}
			{/* 			<Link to='#'> */}
			{/* 				<i className="fa-solid fa-user-group fs-4"></i> */}
			{/* 			</Link> */}
			{/* 		</li> */}
			{/* 	</ul> */}
			{/* </div> */}
			<div className="header-right">
				<div 
					className="header-right__user me-2 d-flex"
				>
					<Link className='text-dark text-decoration-none' to="/me">
						<img src={Auth.state.avatar || '/img/avatar.png'} alt=""/>
						<span className='p-1'>
							<strong className='text-light'>
								{
									name
								}
							</strong>
						</span>
					</Link>
				</div>
				<div className="header-right__options d-flex align-items-center">
					<div className="header-right__options-item messenger">
						<Link to="/messages">
							<i className="fa-solid fa-envelope fs-5"></i>
						</Link>
					</div>
					<div 
						className="header-right__options-item notifi"
						onClick={toggleNotiFn}
					>
						{
							toggle.viewNoti 
							?
							<></> 
							:
							<div className="notifi_count">
								!
							</div>
						}
						<i className="fa-solid fa-bell fs-5"></i>
						{
							toggleNoti 
							?
							<div className="notifi-lists d-flex flex-column-reverse shadow">
								{
									toggle.notification.map((v,i) => {
										console.log(v)
										 return (
										 	<div key={i} className="notifi-item">
										 		<img src="/img/avatar.png" alt=""/>
										 		<span>{`${v.username}: `}</span><span>{v.message}</span>
										 	</div>
										 )
									})
								}
							</div>
							:
							<></> 
						}
					</div>
					<div 
						className="header-right__options-item down-btn"
						onClick={toggleUserMenu}
					>
						<i class="fa-solid fa-caret-down"></i>
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



export default memo(Header)