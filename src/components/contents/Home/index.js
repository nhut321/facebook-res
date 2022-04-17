import { useContext, useEffect, useState, memo } from 'react'
import PostBox from './PostBox'
import PostItem from './PostItem'
import HomeSidebar from './HomeSidebar'
import HomeRight from './HomeRight'
import { HomeContext } from '../../../contexts/HomeContext'
import './Home.css'

function Home() {
	const modal = useContext(HomeContext)
	return (
		<div className="home d-flex justify-content-between container-fluid">
			{/* <HomeSidebar /> */}
			<div className="home-main d-flex align-items-center flex-column col-9">
				<PostBox />
				<div className="post-lists d-flex flex-column-reverse">
					{
						modal.postItem.length <= 0 
						?
						<h4 className='text-muted mt-4'>Hiện đã hết bài đăng, hãy theo dõi thêm mọi người để xem nhiều hơn</h4>
						:
						modal.postItem.map((v,i) => {
							return	<PostItem 
										key={i} 
										userId={v.userId._id} 
										dataId={v._id} 
										description={v.description} 
										fullName={v.userId.fullName}
										fname={v.userId.fname}
										lname={v.userId.lname}
										commentProps={[]}
										likePost={v.like}
										verifiedAccount={v.userId.verified}
										avatar={v.userId.avatar}
										imageUrl={v.imageUrl}
									/>
						})
					}
				</div>
			</div>
			<HomeRight />
		</div>
	)
}

export default memo(Home)