import { useState, useRef, useEffect,useContext } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'

export default function PostItem({description, email, dataId, userId}) {
	const input = useRef()
	const comment = useContext(HomeContext)
	// const [commentItem, setCommentItem] = useState([])
	// const [dataId, setDataId] = useState()

	const submitComment = (e) => {
		e.preventDefault()
		axios.post(baseUrl + '/comments/create',{
			userId,
			postId: dataId,
			comment: comment.comment
		}).then(result => {
			if(result.data.success) {
				comment.setComment('')
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
					<img src="/img/avatar.png" alt=""/>
				</div>
				<div className="post-item__header-info">
					<Link to={`/posts/detail/post?post-id=${dataId}`} className='text-dark text-decoration-none'><span>{email}</span></Link>
					<span>Vai phut truoc</span>
				</div>
				<div className="post-item__header-more">
					<img src="/img/more.png" alt=""/>
				</div>
			</div>
			<div className="post-item__body mt-2 mb">
				<div>
					{description}
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
								value={comment.comment}
								onChange={e => comment.setComment(e.target.value)}
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