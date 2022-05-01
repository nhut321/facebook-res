import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Profile from './Profile'
import './Me.css'

export default function Me() {
	const Auth = useContext(AuthContext)
	return (
		<div className="profile">
			<Profile 
				Auth={Auth}
			/>
		</div>
	)
}