
export default function Register() {
	return (
		<div className="login d-flex align-items-center justify-content-center flex-wrap">
			<div className="login-slogan">
				<img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt=""/>
				<h2>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h2>
			</div>
			<div className="login-form">
				<div className="login-form-box p-3 shadow">
					<form className='d-flex flex-column pb-4'>
						<input
							// value={user.email}
							type='text'
							// className={validator ? 'form-input mb-3' : 'form-input wrong mb-3'}
							placeholder='Email'
							// onChange={e => {
							// 	 setUser({...user, email: e.target.value})
							// 	 setValidator(true)
							// }}
						/>
						<input
							// value={user.password}
							type='password'
							// className={validator ? 'form-input' : 'form-input wrong'}
							placeholder='Password'
							// onChange={e => {
							// 	 setUser({...user, password: e.target.value})
							// 	 setValidator(true)
							// }}
						/>
						{ 
							// validator 
							// ?
						 // 	<div className='mt-2 mb-2'></div> 
						 // 	:
							// <div className="message mt-2 mb-2 text-danger">Email or password is incorrect!</div>
						 }
						<button className="btn btn-primary btn-lg mb-4">Register</button>
						<a href="#" className='text-decoration-none'>Forget password</a>
					</form>
					<div className="register-btn pt-4">
						<button className="btn btn-success">Login</button>
					</div>
				</div>	
			</div>
		</div>
	)
}