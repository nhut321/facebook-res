import { useEffect, useContext, useState } from 'react'
import PostBox from '../Home/PostBox'
import PostItem from '../Home/PostItem'
import PostModal from '../Home/PostModal'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'

export default function Post() {
	const Auth = useContext(AuthContext)
	const modal = useContext(HomeContext)
	const [postItem, setPostItem] = useState([])


	useEffect(() => {
		axios.get(baseUrl + '/posts/user/'+ Auth.state.userId)
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
				<div className="profile-contents-post__left-intro shadow-sm">
					<div className="intro-header">
						<span>Intro</span>
					</div>
					<div className="intro-body">
						<div className="intro-body__box bio">
							<div className="intro-body__box-lists">
								
							</div>
							<button className='btn col-12'>Add bio</button>
						</div>
						<div className="intro-body__box details">
							<div className="intro-body__box-lists">
								
							</div>
							<button className='btn col-12'>Edit details</button>
						</div>
						<div className="intro-body__box hobbies">
							<div className="intro-body__box-lists">
								
							</div>
							<button className='btn col-12'>Edit hobbies</button>
						</div>
						<div className="intro-body__box featured">
							<div className="intro-body__box-lists">
								
							</div>
							<button className='btn col-12'>Edit featured</button>
						</div>
					</div>
				</div>
			</div>
			<div className="profile-contents-post__post-right">
				<PostBox />
				<div className='d-flex flex-column-reverse'>
					{
						postItem.map((v,i) => {
							// if(v.userId._id === Auth.state.userId) {
								return (<PostItem 
											key={i}
											description={v.description}
											fullName={v.userId.fullName}
											dataId={v._id}
											verifiedAccount={v.userId.verified}
											likePost={v.like}
								/>)
							// }
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