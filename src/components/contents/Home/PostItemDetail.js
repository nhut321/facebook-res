import { useEffect, useContext, useState, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { baseUrl } from '../../baseUrl'
import PostItem from './PostItem'
import axios from 'axios'

export default function PostItemDetail({postData}) {
	const location = useLocation()
	const postId = new URLSearchParams(location.search).get('post-id')
	const [checkPost, setCheckPost] = useState(true)
	const [postDetail, setPostDetail] = useState({})
	useEffect(() => {
		const fetchData = async () => {
			await axios.get(baseUrl + `/posts/${postId}`)
				.then(res => {
					if (res.data.data) {
						setPostDetail(res.data.data)
						setCheckPost(true)
					} else {
						setCheckPost(false)
					}

				})
		}
		fetchData()
	},[])
	console.log(postDetail.userId?._id)
	return (
		// <h1>Details</h1>
		<>
		{
			checkPost
			?
			<PostItem
				description={postDetail.description}
				dataId={postId}
				userId={postDetail.userId?._id}
				likePost={postDetail.like}
				verifiedAccount={postDetail.userId?.verified}
				avatar={postDetail.userId?.avatar}
				fname={postDetail.userId?.fname}
				lname={postDetail.userId?.lname}
				imageUrl={postDetail.imageUrl}
			/>
			:
			<h1>Post không tồn tại</h1>
		}
		</>
	)
// 	const Auth = useContext(AuthContext)
// 	const input = useRef()
// 	const [comment, setComment] = useState('')
// 	const [postItem, setPostItem] = useState({})
// 	const [commentItem, setCommentItem] = useState([])
// 	const search = useLocation().search
// 	const postId = new URLSearchParams(search).get('post-id');
// 
// 	useEffect(() => {
// 		axios.get(baseUrl + '/posts/'+postId)
// 			.then(res => {
// 				setPostItem({
// 					fname: res.data.data.userId.fname,
// 					fname: res.data.data.userId.lname,
// 					fullName: res.data.data.userId.fullName,
// 					description: res.data.data.description,
// 					like: res.data.data.like.length,
// 					verified: res.data.data.userId.verified
// 				})
// 			})
// 	},[])
// 
// 	useEffect(() => {
// 		axios.get(baseUrl + '/comments/'+postId)
// 			.then(result => {
// 				result.data.map(v => {
// 					setCommentItem(item => {
// 						const data = [...item, {
// 							comment: v.comment,
// 							user: v.userId.email,
// 							verified: v.userId.verified
// 						}]
// 						
// 						return data
// 					})
// 				})
// 			})
// 	},[])
// 
// 	console.log(postItem)
// 
// 	const submitComment = (e) => {
// 		e.preventDefault()
// 		axios.post(baseUrl + '/comments/create',{
// 			userId: Auth.state.userId,
// 			postId: postId,
// 			comment: comment
// 		}).then(result => {
// 			if(result.data.success) {
// 				setComment('')
// 				setCommentItem([...commentItem, {
// 					comment,
// 					user: Auth.state.email
// 				}])
// 			}
// 		})
// 	}
// 	const focusInput = () => {
// 		input.current.focus()
// 	}
// 
// 	return (
// 		<div className="post-detail" style={{marginTop: '70px'}}>
// 			<div className="post-item shadow-sm mb-3">
// 				<div className="post-item__header d-flex justify-content-between">
// 					<div className="post-item__header-avatar">
// 						<img src="/img/avatar.png" alt=""/>
// 					</div>
// 					<div className="post-item__header-info">
// 						<Link to='/me' className='text-dark text-decoration-none d-flex align-items-center'>
// 							<div className='fw-bold'>
// 								<span>
// 									{postItem.fname + postItem.lname }
// 								</span>
// 							</div>
// 							<div className="post-item__header-verified">
// 								{
// 									postItem.verified
// 									?
// 										<div 
// 											className="comment-item__info-verify ms-2"
// 											style={{backgroundImage: 'url("/img/active.png")'}}
// 										>
// 										</div>
// 									:
// 										<></>
// 								}
// 							</div>
// 						</Link>
// 						<span>Vai phut truoc</span>
// 					</div>
// 					<div className="post-item__header-more">
// 						<img src="/img/more.png" alt=""/>
// 					</div>
// 				</div>
// 				<div className="post-item__body mt-2 mb">
// 					<div>
// 						{postItem.description}
// 					</div>
// 					<div className='post-item__body-count mt-2 mb-2 d-flex justify-content-between'>
// 						<div className="post-item__body-count-like">
// 							{postItem.like}
// 							{postItem.like > 1 ? ' likes' : ' like'}
// 						</div>
// 						<div className="post-item__body-count-comment">
// 							{commentItem.length}
// 							{commentItem.length > 1 ? ' comments' : ' comment'}
// 						</div>
// 					</div>
// 					<div className="post-item__body-btn">
// 						<button>
// 							<i className="fa-regular fa-thumbs-up me-2"></i>
// 							Like
// 						</button>
// 						<button onClick={focusInput}>
// 							<i className="fa-regular fa-message me-2"></i>
// 							Comment
// 						</button>
// 					</div>
// 				</div>
// 				<div className="post-item__footer">
// 					<div className="comment-lists">
// 
// 		
// 
// 					</div>
// 					<div className="comment-box d-flex">
// 						<div className="post-item__footer-avatar me-2">
// 							<img src="/img/avatar.png" alt="" style={{width: '32px', height: '32px', borderRadius: '50%'}}/>
// 						</div>
// 						<div className="post-item__footer-input" style={{width: '100%'}}>
// 							<form onSubmit={submitComment}>
// 								<input
// 									ref={input}
// 									value={comment}
// 									onChange={e => setComment(e.target.value)}
// 									placeholder='Viết bình luận...'
// 									style={{width: '100%'}}
// 								/>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="post-item-detail__comments rounded-4">
// 				{
// 					commentItem.map((v,i) => {
// 					 	return	(
// 					 		<div key={i} className="comment-item d-flex">
// 								<div className="comment-item__avatar">
// 									<img src="/img/avatar.png" alt=""/>
// 								</div>
// 								<div className="comment-item__info text-start ms-2">
// 									<div className='comment-item__info-top'>
// 										<div className="comment-item__info-top-name pt-2 fw-bold d-flex align-items-center">
// 											{v.user}
// 											{
// 												v.verified
// 												?
// 													<div 
// 														className="comment-item__info-verify ms-2"
// 														style={{backgroundImage: 'url("/img/active.png")'}}
// 													>
// 													</div>
// 												:
// 													<></>
// 											}
// 										</div>
// 										<div className="comment-item__info-top-comment">
// 											{v.comment}
// 										</div>
// 									</div>
// 									<div className='comment-item__info-like'>
// 										<span className='me-3 text-muted'>Thích</span>
// 										<span className='text-muted'>Phản hồi</span>
// 									</div>
// 								</div>
// 							</div>
// 						)
// 					})
// 				}
// 			</div>
// 		</div>
// 	)
}