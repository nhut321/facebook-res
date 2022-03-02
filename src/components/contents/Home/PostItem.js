import { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'

export default function PostItem({description, email, dataId, userId}) {
	const [comment, setComment] = useState('')
	const submitComment = (e) => {
		e.preventDefault()
		axios.post(baseUrl + '/comments/create',{
			userId,
			postId: dataId,
			comment

		})
	}
	return (
		<div className="post-item shadow-sm mb-3" data-id={dataId}>
			<div className="post-item__header d-flex justify-content-between">
				<div className="post-item__header-avatar">
					<img src="/img/avatar.png" alt=""/>
				</div>
				<div className="post-item__header-info">
					<a href="#" className='text-dark text-decoration-none'><span>{userId}</span></a>
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
					<button>
						<i className="fa-regular fa-message me-2"></i>
						Comment
					</button>
				</div>
				{/* <img src="https://drive.google.com/uc?export=view&id=1Urr3WgBY7aAc0fN9Rfc5lIaeDaPfGJCQ" alt=""/> */}
			</div>
			<div className="post-item__footer d-flex">
				<div className="post-item__footer-avatar me-2">
					<img src="/img/avatar.png" alt="" style={{width: '32px', height: '32px', borderRadius: '50%'}}/>
				</div>
				<div className="post-item__footer-input" style={{width: '100%'}}>
					<form onSubmit={submitComment}>
						<input
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder='Viết bình luận...'
							style={{width: '100%'}}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}