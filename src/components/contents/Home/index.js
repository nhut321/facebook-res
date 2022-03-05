import { useContext, useEffect } from 'react'
import PostBox from './PostBox'
import PostItem from './PostItem'
import PostModal from './PostModal'
import HomeSidebar from './HomeSidebar'
import HomeLeft from './HomeLeft'
import { HomeContext } from '../../../contexts/HomeContext'
import './Home.css'

export default function Home() {
	const modal = useContext(HomeContext)
	return (
		<div className="home d-flex">
			<HomeSidebar />
			<div className="home-main d-flex align-items-center flex-column">
				<PostBox />
				<div className="post-lists d-flex flex-column-reverse">
					{
						modal.postItem.length <= 0 
						?
						<h4 className='text-muted mt-4'>Hiện đã hết bài đăng, hãy kết bạn để xem nhiều hơn</h4>
						:
						modal.postItem.map((v,i) => {
							// console.log(v.like)
							return	<PostItem 
										key={i} 
										userId={v.userId._id} 
										dataId={v._id} 
										description={v.description} 
										email={v.userId.email}
										commentProps={[]}
										likePost={v.like}
										verifiedAccount={v.userId.verified}
									/>
						})
					}
				</div>
				<PostModal />
			</div>
			{
				modal.postModal 
				? 
				<div className="post-modal-mask" onClick={modal.togglePostModal}></div>
				:
				<></>
			}
			<HomeLeft />
		</div>
	)
}