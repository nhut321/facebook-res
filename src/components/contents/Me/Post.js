import { useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PostBox from '../Home/PostBox'
import PostItem from '../Home/PostItem'
import PostModal from '../Home/PostModal'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'

export default function Post() {
	const location = useLocation()
	const userIdParams = new URLSearchParams(location.search).get('id')


	const Auth = useContext(AuthContext)
	const modal = useContext(HomeContext)
	const [postItem, setPostItem] = useState([])


	useEffect(() => {
		axios.get(baseUrl + '/posts/user/'+ (userIdParams || Auth.state.userId))
			.then(res => {
				res.data.data.map(v => {
					setPostItem(item => {
						return [...item, v]
					})
				})
			})
	},[])





	return (
		<div className="profile-contents-post d-flex justify-content-between mt-3">
			<div className="profile-contents-post__left me-3">
				<div className="profile-contents-post__left-item info shadow-sm">
					<div className="user-info border-bottom pb-3 text-start">
						<h5>Thông tin</h5>
					</div>
					<div className="user-info__content text-start mt-3">
						<span>Hi! Lorem ipsum dolor sit amet consectetur adipisicing, elit.
						 </span>
						 <p>Tham gia: 01/01/2009</p>
						 <p>Email: {Auth.state.email}</p>
					</div>
				</div>
			</div>
			<div className="profile-contents-post__right">
				<PostBox />
				<div className='d-flex flex-column-reverse'>
					{
						postItem.map((v,i) => {
								return (<PostItem 
											key={i}
											description={v.description}
											fullName={v.userId.fullName}
											fname={v.userId.fname}
											lname={v.userId.lname}
											dataId={v._id}
											verifiedAccount={v.userId.verified}
											likePost={v.like}
											imageUrl={v.imageUrl}
								/>)
						})
					}
					{
						modal.postModal 
						? 
						<div className="post-modal-mask" onClick={modal.togglePostModal}></div>
						:
						<></>
					}
				</div>
				<PostModal />
			</div>
		</div>
	)
}