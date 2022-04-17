import { useState, useRef, useEffect,useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { HomeContext } from '../../../contexts/HomeContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { baseUrl } from '../../baseUrl'

export default function PostItem({
		description, 
		fullName,
		dataId, 
		userId,
		likePost,
		verifiedAccount,
		avatar,
		fname,
		lname,
		imageUrl
	}) {
	const Auth = useContext(AuthContext)
	const homeContext = useContext(HomeContext)

	const [comment, setComment] = useState('')
	const [commentItem, setCommentItem] = useState([])
	const [like, setLike] = useState(false)

	const input = useRef()

	const likePostLen = likePost.length
	
	useEffect(() => {
		const getComment = async () => {
			await axios.get('/comments/' + dataId)
				.then(res => {
					res.data.map(v => {
						
						setCommentItem(item => {
							return [...item, v]
						})
					})
				})
		}
		getComment()
	},[])

	const likeFn = () => {
		setLike(v => !v)
		// if(likePost.includes(Auth.state.userId)) {
		// 	setLike(true)
		// }


		// if(like) {
		// 	console.log(true)
		// 	console.log(likePost)
		// } else {
		// 	console.log(false)
		// 	// likePost.push(Auth.state.userId) 
		// 	console.log(likePost)
		// }

		// like
		// ? 
		// 	likePost.filter(item => item != Auth.state.userId)
		// : 
		// 	likePost.push(Auth.state.userId) 
	}

	const submitComment = (e) => {
		e.preventDefault()
		axios.post('/comments/create',{
			userId: Auth.state.userId,
			postId: dataId,
			comment
		}).then(result => {
			if(result.data.success) {
				setComment('')
				setCommentItem(v => {
					
					return [...v, {
						userId: {
							fname: Auth.state.fname,
							lname: Auth.state.lname,
							verified: Auth.state.verified,
							avatar: Auth.state.avatar
						},
						comment: result.data.commentItem.comment		
					}]
				})
			}
		})
	}
	const focusInput = () => {
		input.current.focus()
	}

	return (
		<div className="post-item shadow-sm mb-3" data-id={dataId}>
			<div className="post-item__header d-flex justify-content-between">
				<div className="post-item__header-avatar">
					<img src={avatar || '/img/avatar.png'} alt=""/>
				</div>
				<div className="post-item__header-info">
					<div
						className='text-dark text-decoration-none d-flex align-items-center'
						// onClick={() => homeContext.setToggleTabMenu(0)}
					>
						<span className='fw-bold'>
							<Link 
								to={`/user/user-id?id=${userId}`}
								className='text-dark text-decoration-none'
							>
								{fname + ' ' + lname}
							</Link>
						</span>
						<div className="post-item__header-verified">
							{
								verifiedAccount
								?
									<div 
										className="comment-item__info-verify ms-2"
										style={{backgroundImage: 'url("/img/active.png")'}}
									>
									</div>
								:
									<></>
							}
						</div>
					</div>
					<span>
						<Link 
							to={`/posts/detail/post?post-id=${dataId}`}
							className='text-dark text-decoration-none'
						>
							Vai phut truoc
						</Link>
					</span>
				</div>
				<div className="post-item__header-more">
					<img src="/img/more.png" alt=""/>
				</div>
			</div>
			<div className="post-item__body mt-2 mb">
				<div>
					{description}
				</div>

				{
					imageUrl ? <img src={imageUrl} style={{width: '100%', borderRadius: '12px'}} /> : <></>
				}
				
				<div className='post-item__body-count mt-2 mb-2 d-flex justify-content-between'>
					<div className="post-item__body-count-like">
						{likePostLen}
						{likePostLen > 1 ? ' likes' : ' like'}
					</div>
					<div className="post-item__body-count-comment">
						{commentItem.length}
						{commentItem.length > 1 ? ' comments' : ' comment'}
					</div>
				</div>
				<div className="post-item__body-btn d-flex align-items-center">
					<button 
						className={likePost.includes(Auth.state.userId) ? 'like-btn liked' : 'like-btn'}
						// like ? 'like-btn liked d-flex align-items-center justify-content-center' : 'like-btn d-flex align-items-center justify-content-center'
						onClick={likeFn}
					>
						<i className="liked-icon fa-solid fa-thumbs-up me-2"></i>
						<i className="like-icon fa-regular fa-thumbs-up me-2"></i>
						Like
					</button>
					<button onClick={focusInput}>
						<i className="fa-regular fa-message me-2"></i>
						Comment
					</button>
				</div>
			</div>
			<div className="post-item__footer">
				<div 
					className="comment-lists d-flex flex-column"
					style={ commentItem <=0 ? {} : {
						minHeight: '110px',
						maxHeight: '190px',
						overflow: 'auto'
					}} 
				>
					{
						commentItem.map((v,i) => {
							return (
								<div key={i} className="comment-item d-flex">
									<div 
										className="comment-item__avatar"
										style={{backgroundImage: `url(${v.userId.avatar == '' ? '/img/avatar.png' : v.userId.avatar})`}}
									>
										{/* <img src={v.userId.avatar == '' ? '/img/avatar.png' : v.userId.avatar} alt=""/> */}
									</div>
									<div className="comment-item__info text-start ms-2">
										<div className='comment-item__info-top'>
											<div className="comment-item__info-top-name pt-2 fw-bold d-flex align-items-center">
												{v.userId.fname + ' ' + v.userId.lname}
												{
													v.userId.verified
													?
														<div 
															className="comment-item__info-verify ms-2"
															style={{backgroundImage: 'url("/img/active.png")'}}
														>
														</div>
													:
														<></>
												}
											</div>
											<div className="comment-item__info-top-comment">
												{v.comment}
											</div>
										</div>
										<div className='comment-item__info-like'>
											<span className='me-3 text-muted'>Thích</span>
											<span className='text-muted'>Phản hồi</span>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className="comment-box d-flex">
					<div className="post-item__footer-avatar me-2">
						<img src={Auth.state.avatar == '' ? '/img/avatar.png' : Auth.state.avatar } alt="" style={{width: '32px', height: '32px', borderRadius: '50%'}}/>
					</div>
					<div className="post-item__footer-input" style={{width: '100%'}}>
						<form onSubmit={submitComment}>
							<input
								ref={input}
								value={comment}
								onChange={e => setComment(e.target.value)}
								placeholder='Viết bình luận...'
								style={{width: '100%'}}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}