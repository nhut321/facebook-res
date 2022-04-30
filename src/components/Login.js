import { useState,useContext,useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import './Login.css'
import { baseUrl } from './baseUrl'
import axios from 'axios'
import { validatorFn } from './validatorFn'

export default function Login() {
	const [spinner, setSpinner] = useState(false)
	const navigate = useNavigate()
	const Auth = useContext(AuthContext)
	const [user, setUser] = useState({
		email: '',
		password: ''
	})
	const [validator, setValidator] = useState({
		success: true,
		message: ''
	})

	// console.log(validatorFn(user.email, user.password)) 

	const onSubmitForm = (e) => {

		e.preventDefault()
		setTimeout(() => {
			if(validatorFn(user.email, user.password)) {
				setValidator(item => {
					return {...item, success: false, message: 'Vui lòng nhập đầy đủ đê kk!'}
				})
			} else {
				axios.post(baseUrl + '/user/login', {
					email: user.email,
					password: user.password 
				})
				.then(res => {
					if(res.data.success) {
						Auth.dispatch({
								type: 'LOGIN', 
								email: res.data.user.email,
								userId: res.data.user._id
								})
						localStorage.setItem('token', res.data.token)
						return navigate('/')
					} else {
						setValidator(item => {
							return {...item, success: false, message: 'Email hoặc mật khẩu sai'}
						})
					}
				})
			}

			setSpinner(false)

		},400)
			setSpinner(true)

		
		// if(user.email == '' || user.password == '') {
		// 	setValidator(item => {
		// 		return {...item, success: false, message: 'Vui long nhap day du'}
		// 	})
		// } else {
		// 	axios.post(baseUrl + '/user/login', {
		// 		email: user.email,
		// 		password: user.password 
		// 	})
		// 	.then(res => {
		// 		if(res.data.success) {
		// 			console.log(res.data)
		// 			Auth.dispatch({
		// 					type: 'LOGIN', 
		// 					email: res.data.user.email,
		// 					userId: res.data.user._id
		// 					})
		// 			localStorage.setItem('token', res.data.token)
		// 			return navigate('/')
		// 		} else {
		// 			setValidator(item => {
		// 				return {...item, success: false, message: 'Email hoặc mật khẩu sai'}
		// 			})
		// 		}
		// 	})
		// }
	}
	return (
		<div className="login d-flex justify-content-center flex-wrap">
			<div className="login-slogan">
				<img src="/img/fakebook.png" alt=""/>
				<h2>Nơi lạnh nhất không phải ở Bắc cực, nơi lạnh nhất đó là tim cậu.</h2>
			</div>
			<div className="login-form">
				<div className="login-form-box p-3 shadow">
					<form onSubmit={onSubmitForm} className='d-flex flex-column pb-4'>
						<input
							value={user.email}
							type='email'
							className={validator.success || user.email !== '' ? 'form-input mb-3' : 'form-input wrong mb-3'}
							placeholder='Email'
							onChange={e => {
								 setUser({...user, email: e.target.value})
								 setValidator({...validator, success: true})
							}}
						/>
						<input
							value={user.password}
							type='password'
							className={validator.success || user.password !== '' ? 'form-input' : 'form-input wrong'}
							placeholder='Password'
							onChange={e => {
								 setUser({...user, password: e.target.value})
								 setValidator({...validator, success: true})
							}}
						/>
						{ validator.success
							?
						 	<div className='mt-2 mb-2'></div> 
						 	:
							<div className="message mt-2 mb-2 text-danger">{validator.message}</div>
						 }
						<button className="btn-form btn btn-lg mb-4">
							{
								spinner 
								?
									<div className="spinner-border text-light" role="status">
									  <span className="visually-hidden">Loading...</span>
									</div>
								:
									<span>Đăng nhập</span>
							}
						</button>
						<a href="#" className='text-decoration-none'>Quên mật khẩu</a>
					</form>
					<div className="register-btn pt-4">
						<Link 
							to='/register' 
							className="btn btn-success"
						>
							Đăng ký
						</Link>
					</div>
				</div>	
			</div>
		</div>
	)
}