import { useContext,useState,useEffect } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'
import { AuthContext } from '../../../contexts/AuthContext'

export default function HomeRight() {
	const homeContext = useContext(HomeContext)

	return (
		<div className="home-right">
			<div className="home-right__header border-bottom">
				<h6>Người mà bạn đang theo dõi</h6>
			</div>
			<div className="home-right__body">
				<div className="home-right__body-lists text-start">
					
					{
						homeContext.friendList.map((v,i) => {
							return (
								<div key={i} className="home-right__body-item p-2">
									{

										homeContext.userOnline.some(item => item.username == v.id) ? <div className="online"></div> : <div className="offline"></div>
									}
									<img src="/img/avatar.png" alt=""/>
									<span className='fw-bold'>{v.fname + ' '}</span>
									<span className='fw-bold'>{v.lname}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}