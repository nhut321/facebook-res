import { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../../contexts/AuthContext'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import './Settings.css'

function Settings() {
	const Auth = useContext(AuthContext)
	const [user, setUser] = useState({
		email: '',
		fname: '',
		lname: '',
		password: ''
	})

	const onChangeFn = (name,event) => {
		setUser(value => {
			return {
				...value,
				[name]: event
			}
		})
	}

	const changeProfileFn = async (e) => {
		e.preventDefault()
		try {
			await axios.put(baseUrl + `/user/profile/${Auth.state.userId}/profile-edit`, {
				fname: user.fname,
				email: user.email,
				lname: user.lname,
				newPassword: user.password
			}).then(res => console.log(res))
		} catch(err) {
			console.log(err)
		}
	}

	return(
		<div className="settings-main container">
			<div className="settings-main__header">
				<h3>Cài đặt tài khoản</h3>
			</div>
			<div className="settings-main__content text-start">
				<div className="row">
					<div className="col col-sm d-flex justify-content-center align-items-center">
						<div className="settings-main__content-image">
							<img className='shadow' src={Auth.state.avatar} alt="" />
							<div className="settings-main__content-image-edit">
								<i className="fa-solid fa-camera-retro"></i>
							</div>
							<input type="file" style={{display: 'none'}}/>
						</div>
					</div>
					<div className="col col-sm">
						<Form onSubmit={changeProfileFn}>
							<Form.Group className='mb-3'>
								<Form.Label>Họ: </Form.Label>
								<Form.Control 
									type='text'
									placeholder={Auth.state.lname}
									value={user.fname}
									name='fname'
									onChange={e => onChangeFn(e.target.name,e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Tên: </Form.Label>
								<Form.Control 
									type='text' 
									placeholder={Auth.state.fname}
									value={user.lname}
									name='lname'
									onChange={e => onChangeFn(e.target.name,e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Email: </Form.Label>
								<Form.Control 
									type='email' 
									placeholder={Auth.state.email}
									value={user.email}
									name='email'
									onChange={e => onChangeFn(e.target.name,e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Mật khẩu mới: </Form.Label>
								<Form.Control 
									type='password'
									value={user.password}
									name='password'
									onChange={e => onChangeFn(e.target.name,e.target.value)}
								></Form.Control>
							</Form.Group>
							<Button type='submit'>Lưu</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings