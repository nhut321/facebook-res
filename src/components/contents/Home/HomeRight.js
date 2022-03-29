import { useContext,useState,useEffect } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'
import { AuthContext } from '../../../contexts/AuthContext'

export default function HomeRight() {
	const homeContext = useContext(HomeContext)

	return (
		<div className="home-right col-3">
			<div className="home-right__item follow shadow-sm mb-3">
				<div className="follow-header border-bottom">
					<h6>Người mà bạn đang theo dõi</h6>
				</div>
				<div className="follow-body">
					<div className="follow-body-lists text-start">
						
						{
							homeContext.friendList.map((v,i) => {
								return (
									<div key={i} className="follow-body-item p-2">
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
			<div className="home-right__item birthday">
				<div className="home-right__birthday-header d-flex align-items-center justify-content-start border-bottom p-3">
					<div className='me-2'>
						<i class="fa-solid fa-cake-candles fs-4"></i>
					</div>	
					<h5 className='m-0'>Sinh nhật bạn bè</h5>
				</div>
				<div className="home-right__birthday-content p-3">
					<h5 className='text-muted'>Hiện không có sinh nhật người nào sắp diễn ra</h5>
				</div>
			</div>
		</div>
	)
}