import { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { baseUrl } from './baseUrl'
import axios from 'axios'

export default function Navbar({style, className, isMobile, navbarFn}) {
	const [searchValue, setSearchValue] = useState('')
	const [searchItem, setSearchItem] = useState([])

	const onChangeInput = async e => {
		setSearchValue(e.target.value)
		if(searchValue !== '') {
			try {
				await axios.get(baseUrl + '/search?name=' + searchValue)
				.then(res => {
					 setSearchItem(res.data)
				})
			} catch(err) {
				console.log(err)
			}
		}
	}



	return (
		<div className={`navbarr ${className} shadow`} style={style}>
			<div className="navbarr-lists">
				<div className="navbarr-item" onClick={navbarFn}>
					<Link to="/" className='text-dark text-decoration-none d-flex'>
						<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M12.7166 3.79541C12.2835 3.49716 11.7165 3.49716 11.2834 3.79541L4.14336 8.7121C3.81027 8.94146 3.60747 9.31108 3.59247 9.70797C3.54064 11.0799 3.4857 13.4824 3.63658 15.1877C3.7504 16.4742 4.05336 18.1747 4.29944 19.4256C4.41371 20.0066 4.91937 20.4284 5.52037 20.4284H8.84433C8.98594 20.4284 9.10074 20.3111 9.10074 20.1665V15.9754C9.10074 14.9627 9.90433 14.1417 10.8956 14.1417H13.4091C14.4004 14.1417 15.204 14.9627 15.204 15.9754V20.1665C15.204 20.3111 15.3188 20.4284 15.4604 20.4284H18.4796C19.0806 20.4284 19.5863 20.0066 19.7006 19.4256C19.9466 18.1747 20.2496 16.4742 20.3634 15.1877C20.5143 13.4824 20.4594 11.0799 20.4075 9.70797C20.3925 9.31108 20.1897 8.94146 19.8566 8.7121L12.7166 3.79541ZM10.4235 2.49217C11.3764 1.83602 12.6236 1.83602 13.5765 2.49217L20.7165 7.40886C21.4457 7.91098 21.9104 8.73651 21.9448 9.64736C21.9966 11.0178 22.0564 13.5119 21.8956 15.3292C21.7738 16.7067 21.4561 18.4786 21.2089 19.7353C20.9461 21.0711 19.7924 22.0001 18.4796 22.0001H15.4604C14.4691 22.0001 13.6655 21.1791 13.6655 20.1665V15.9754C13.6655 15.8307 13.5507 15.7134 13.4091 15.7134H10.8956C10.754 15.7134 10.6392 15.8307 10.6392 15.9754V20.1665C10.6392 21.1791 9.83561 22.0001 8.84433 22.0001H5.52037C4.20761 22.0001 3.05389 21.0711 2.79113 19.7353C2.54392 18.4786 2.22624 16.7067 2.10437 15.3292C1.94358 13.5119 2.00338 11.0178 2.05515 9.64736C2.08957 8.73652 2.55427 7.91098 3.28346 7.40886L10.4235 2.49217Z" fill="#030D45"/>
						</svg>
						<span>Home</span>
					</Link>
				</div>
				<div className="navbarr-item" onClick={navbarFn}>
					<Link to="#" className='text-dark text-decoration-none d-flex'>
						<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
						<span>Follow</span>
					</Link>
				</div>
				<div className="navbarr-item" onClick={navbarFn}>
					<Link to="#" className='text-dark text-decoration-none d-flex'>
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 5.25C3 4.00736 4.00736 3 5.25 3H18.75C19.9926 3 21 4.00736 21 5.25V18.75C21 19.9926 19.9926 21 18.75 21H5.25C4.00736 21 3 19.9926 3 18.75V5.25ZM5.25 4.5C4.83579 4.5 4.5 4.83579 4.5 5.25V11.25H11.25V4.5H5.25ZM12.75 4.5V11.25H19.5V5.25C19.5 4.83579 19.1642 4.5 18.75 4.5H12.75ZM19.5 12.75H12.75V19.5H18.75C19.1642 19.5 19.5 19.1642 19.5 18.75V12.75ZM11.25 19.5V12.75H4.5V18.75C4.5 19.1642 4.83579 19.5 5.25 19.5H11.25Z" fill="#212121"/>
						</svg>
						<span>Hình ảnh</span>
					</Link>
				</div>
				{
					isMobile 
					?
					<div className="navbarr-item">
						<form className='p-3 text-dark text-decoration-none d-flex'>
							<i className="fs-4 me-2 fa-solid fa-magnifying-glass"></i>
							<input 
								className='border-0' 
								placeholder='Tìm kiếm bạn bè...' 
								type="text"
								style={{outline: 'none'}}
								value={searchValue}
								onChange={onChangeInput}
							/>
						</form>
							{
								searchValue == '' 
								?
								<></>
								:
						<div className="friend-list p-3">
							{
								searchItem.map((v,i) => {
									return (
										<div key={i} className="friend-item mb-2">
											<Link to={`/user/user-id?id=${v._id}`} className='text-dark text-decoration-none d-flex justify-content-start align-items-center '>
												<div 
													className="friend-item__avatar me-2" 
													style={{
														backgroundImage: `url(${v.avatar == '' ? '/img/avatar.png' : v.avatar})`,
														width: '40px',
														height: '40px',
														borderRadius: '12px',
														backgroundSize: 'cover'
													}}
												></div>
												<span>{v.lname + ' ' + v.fname}</span>
											</Link>
										</div>
									)
								})
							}
						</div>
							}
					</div>
					:
					<></>
				}
				<div className="navbarr-item" onClick={navbarFn}>
					<Link to="#" className='text-dark text-decoration-none d-flex'>
						<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
						</svg>
						<span>Cài đặt</span>
					</Link>
				</div>
			</div>
		</div>
	)
}