import { useContext, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Profile from './Profile'
import './Me.css'
import AvatarEdit from './AvatarEdit'
import { profileContext } from '../../../contexts/ProfileContext'

export default function Me() {
	const [selectFile, setSelectFile] = useState(false)
	const Auth = useContext(AuthContext)
	const avatarEdit = useContext(profileContext)
	return (
		<div className="profile">
			<Profile 
				Auth={Auth}
			/>
			{
				avatarEdit.avatarEdit
				?
				<>
					<AvatarEdit userId={Auth.state.userId} />
					<div className="mask" onClick={avatarEdit.avatarEditFn}></div>
				</>
				:
				<></>
			}
		</div>
	)
}