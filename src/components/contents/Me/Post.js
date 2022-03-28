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
		<div className="profile-contents-post d-flex justify-content-center mt-3">
			<div className="profile-contents-post__left me-3">
				<div className="profile-contents-post__left-follow shadow-sm">
					<div className="left-follow-heading border-bottom">
						<span>Người mà bạn theo dõi</span>
					</div>
					<div className="left-follow-content mt-4">
						<div className="left-follow-content__lists d-flex flex-wrap">
							<div className="left-follow-content__item" style={{backgroundImage: 'url("/img/avatar.png")'}}>
							</div>
							<div className="left-follow-content__item" style={{backgroundImage: 'url("/img/avatar.png")'}}>
							</div>
							<div className="left-follow-content__item" style={{backgroundImage: 'url("/img/avatar.png")'}}>
							</div>
							<div className="left-follow-content__item" style={{backgroundImage: 'url("/img/avatar.png")'}}>
							</div>
							<div className="left-follow-content__item" style={{backgroundImage: 'url("/img/avatar.png")'}}>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="profile-contents-post__post-right">
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