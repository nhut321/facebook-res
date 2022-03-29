import { useContext } from 'react'
import { HomeContext } from '../contexts/HomeContext'
import './OnlineMobile.css'

export default function OnlineMobile({
	style
}) {
	const homeContext = useContext(HomeContext)

	return (
		<div className="online-bar shadow-sm" style={style}>
			{
				homeContext.friendList.map(v => {
					return (
						<div className="online-bar__item">
							<div className="online-bar__item-sign"></div>
							<img src="/img/avatar.png" alt=""/>
							<span className='shadow-sm'>{v.fname}</span>
						</div>
					)
				})
			}
		</div>
	)
}