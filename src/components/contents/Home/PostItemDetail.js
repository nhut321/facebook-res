import { useEffect, useContext, useState, useRef} from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { useLocation } from 'react-router-dom'
import { HomeContext } from '../../../contexts/HomeContext'
import { baseUrl } from '../../baseUrl'
import PostItem from './PostItem'
import axios from 'axios'

export default function PostItemDetail() {
	const Auth = useContext(AuthContext)
	const input = useRef()
	const [comment, setComment] = useState('')
	const [postItem, setPostItem] = useState({})
	const [commentItem, setCommentItem] = useState([])
	const post = useContext(HomeContext)
	const search = useLocation().search
	const postId = new URLSearchParams(search).get('post-id');

	useEffect(() => {
		axios.get(baseUrl+'/posts/'+postId)
			.then(res => {
				setPostItem({
					email: res.data.data.userId.email,
					description: res.data.data.description
				})
			})
	},[])

	useEffect(() => {
		axios.get(baseUrl+'/comments/'+postId)
			.then(result => {
				console.log(result.data)
				result.data.map(v => {
					setCommentItem(item => {
						const data = [...item, {
							comment: v.comment,
							user: v.userId.email
						}]
						console.log(v)
						return data
					})
				})
			})
	},[])

	const submitComment = (e) => {
		e.preventDefault()
		axios.post(baseUrl + '/comments/create',{
			userId: Auth.state.userId,
			postId: postId,
			comment: comment
		}).then(result => {
			if(result.data.success) {
				console.log(result.data)
				setComment('')
				setCommentItem([...commentItem, {
					comment,
					user: Auth.state.email
				}])
			}
		})
	}
	const focusInput = () => {
		input.current.focus()
	}

	return (
		<div className="post-detail" style={{marginTop: '70px'}}>
			<div className="post-item shadow-sm mb-3">
				<div className="post-item__header d-flex justify-content-between">
					<div className="post-item__header-avatar">
						<img src="/img/avatar.png" alt=""/>
					</div>
					<div className="post-item__header-info">
						<div><span>{postItem.email}</span></div>
						<span>Vai phut truoc</span>
					</div>
					<div className="post-item__header-more">
						<img src="/img/more.png" alt=""/>
					</div>
				</div>
				<div className="post-item__body mt-2 mb">
					<div>
						{postItem.description}
					</div>
					<div className="post-item__body-btn mt-4">
						<button>
							<i className="fa-regular fa-thumbs-up me-2"></i>
							Like
						</button>
						<button onClick={focusInput}>
							<i className="fa-regular fa-message me-2"></i>
							Comment
						</button>
					</div>
					{/* <img src="https://drive.google.com/uc?export=view&id=1Urr3WgBY7aAc0fN9Rfc5lIaeDaPfGJCQ" alt=""/> */}
				</div>
				<div className="post-item__footer">
					<div className="comment-lists">

		

					</div>
					<div className="comment-box d-flex">
						<div className="post-item__footer-avatar me-2">
							<img src="/img/avatar.png" alt="" style={{width: '32px', height: '32px', borderRadius: '50%'}}/>
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
			<div className="post-item-detail__comments">

				{
					// console.log(commentItem)
					commentItem.map((v,i) => {
					 	return	(<div key={i} className="comment-item d-flex mt-2 mb-2">
									<div className="comment-item__avatar">
										<img src="/img/avatar.png" alt=""/>
									</div>
									<div className="comment-item__info text-start ms-2">
										<div className="comment-item__info-name fw-bold">
											{v.user}
										</div>
										<div className="comment-item__info-comment">
											{v.comment}
										</div>
									</div>
								</div>)
					})
				}

			</div>
		</div>
	)
}