import { useState } from 'react'
import { Link } from 'react-router-dom'

function HeaderMobile({
	logOut,
	Auth
}) {
	const [menuMobile, setMenuMobile] = useState({
		height: 0,
		overflow: 'hidden'
	})
	const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
	const toggleMenuFn = () => {
		setToggleMobileMenu(v => !v)
		if (toggleMobileMenu) {
			setMenuMobile(item => {
				return {...item, height: 0}
			})
		} else {
			setMenuMobile(item => {
				return {...item, height: 'inherit'}
			})
		}
	}
	
	return (
		<div className="header-mobile">
			<div 
				className="header-mobile__lists d-flex justify-content-between mt-2 shadow-sm"
			>
				<div className="header-mobile__item">
					<Link to='/' className='text-dark text-decoration-none'>
						<i className="fs-3 fa-solid fa-house-chimney"></i>
					</Link>
				</div>
				<div className="header-mobile__item" onClick={toggleMenuFn}>
					<i className="fs-3 fa-solid fa-bars"></i>
				</div>
			</div>
			<div className="header-mobile__menu">
				<div 
					className="header-mobile__menu-lists shadow"
					style={menuMobile}
				>
					<div className="header-mobile__menu-item">
						<Link to='/me' className='text-dark text-decoration-none'>
							<img src="/img/avatar.png" alt=""/>
							<span>{Auth.state.lname + ' ' + Auth.state.fname}</span>
						</Link>
					</div>
					<div className="header-mobile__menu-item">
						<Link to='#' className='text-dark text-decoration-none'>
							<img src="/img/friends.png" alt=""/>
							<span>Người bạn theo dõi</span>
						</Link>
					</div>
					<div 
						className="header-mobile__menu-item"
						onClick={logOut}
					>
						<i className="fa-solid fa-right-from-bracket"></i>
						<span>Đăng xuất</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderMobile