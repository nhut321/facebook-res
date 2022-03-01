import { useContext } from 'react'
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
				<PostModal />
				<PostItem />
			</div>
			{modal.postModal 
				? 
				<div className="post-modal-mask" onClick={modal.togglePostModal}></div>
				:
				<></>
			}
			<HomeLeft />
		</div>
	)
}