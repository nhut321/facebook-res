import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from './baseUrl'
import { validatorFn } from './validatorFn'

export default function Register() {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		email: '',
		password: '',
		fname: '',
		lname: '',
		confirmPassword: ''
	})
	const [validator, setValidator] = useState({
		success: true,
		message: ''
	})

	const onSubmitForm = async e => {
		e.preventDefault()
		if(validatorFn(user.email, user.password, user.fname, user.lname)) {
			setValidator({
				success: false,
				message: 'Vui long nhap day du'
			})
		} else if (user.password !== user.confirmPassword) {
			setValidator({
				success: false,
				message: 'Mật khẩu nhập lại không trùng khớp'
			})
		} else {
			await axios.post(baseUrl+'/user/register',{
				email: user.email,
				password: user.password,
				fname: user.fname,
				lname: user.lname
			})
				.then(() => {
					navigate('/login')
				})
		}
		// if(user.password !== user.confirmPassword) {
		// 	setValidator(false)
		// } else {
		// 	await axios.post(baseUrl+'/user/register',{
		// 		email: user.email,
		// 		password: user.password,
		// 		fname: user.fname,
		// 		lname: user.lname
		// 	})
		// 		.then(res => console.log(res.data))
		// }
	}

	return (
		<div className="login d-flex align-items-center justify-content-center flex-wrap">
			<div className="login-slogan">
				<img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt=""/>
				<h2>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h2>
			</div>
			<div className="login-form">
				<div className="login-form-box p-3 shadow">
					<form onSubmit={onSubmitForm} className='d-flex flex-column pb-4'>
						<input
							value={user.email}
							type='text'
							// className='form-input mb-3'
							className={validator ? 'form-input mb-3 mb-3' : 'form-input wrong mb-3'}
							placeholder='Email'
							onChange={e => {
								 setUser({...user, email: e.target.value})
								 setValidator(true)
							}}
						/>
						<div className='d-flex'>
							<input
								value={user.fname}
								type='text'
								// className='form-input mb-3'
								className={validator ? 'form-input mb-3 col-4' : 'form-input wrong mb-3 col-4'}
								placeholder='Tên'
								onChange={e => {
									 setUser({...user, fname: e.target.value})
									 setValidator(true)
								}}
							/>
							<input
								value={user.lname}
								type='text'
								// className='form-input mb-3'
								className={validator ? 'form-input mb-3 col-8' : 'form-input wrong mb-3 col-8'}
								placeholder='Họ đệm'
								onChange={e => {
									 setUser({...user, lname: e.target.value})
									 setValidator(true)
								}}
							/>
						</div>
						<input
							value={user.password}
							type='password'
							// className='form-input mb-3'
							className={validator ? 'form-input mb-3' : 'form-input wrong mb-3'}
							placeholder='Mật khẩu'
							onChange={e => {
								 setUser({...user, password: e.target.value.trim()})
								 setValidator(true)
							}}
						/>
						<input
							value={user.confirmPassword}
							type='password'
							// className='form-input mb-3'
							className={validator ? 'form-input mb-3' : 'form-input wrong mb-3'}
							placeholder='Nhập lại mật khẩu'
							onChange={e => {
								 setUser({...user, confirmPassword: e.target.value.trim()})
								 setValidator(true)
							}}
						/>
						{ 
							validator.success 
							?
						 	<div className='mt-2 mb-2'></div> 
						 	:
							<div className="message mt-2 mb-2 text-danger">{validator.message}</div>
						 }
						<button type='submit' className="btn btn-primary btn-lg mb-4">Đăng ký</button>
					</form>
					<div className="register-btn pt-4">
						<Link to='/login'>
						<button className="btn btn-success">Đăng nhập</button>
							
						</Link>
					</div>
				</div>	
			</div>
		</div>
	)
}