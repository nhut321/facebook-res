import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'

export default function PostItem({description, email, dataId, userId}) {
	const input = useRef()
	const [comment, setComment] = useState('')
	const [commentItem, setCommentItem] = useState([])
	// const [dataId, setDataId] = useState()

	const submitComment = (e) => {
		e.preventDefault()
		axios.post(baseUrl + '/comments/create',{
			userId,
			postId: dataId,
			comment
		}).then(result => {
			if(result.data.success) {
				setComment('')
			}
		})
	}
	const focusInput = () => {
		input.current.focus()
	}

	useEffect(() => {
		axios.get(baseUrl + '/comments/' + dataId)
			.then(data => {
				console.log(data.data)
				data.data.map(v => {
					setCommentItem(item => {
						return [...item, {comment: v.comment}]
					})
				})
			})
	},[])
	
	return (
		<div className="post-item shadow-sm mb-3" data-id={dataId}>
			<div className="post-item__header d-flex justify-content-between">
				<div className="post-item__header-avatar">
					<img src="/img/avatar.png" alt=""/>
				</div>
				<div className="post-item__header-info">
					<a href="#" className='text-dark text-decoration-none'><span>{email}</span></a>
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

					{
						commentItem.map(v => {
							return(
								<div className="comment-item d-flex mt-2 mb-2">
									<div className="comment-item__avatar">
										<img src="/img/avatar.png" alt=""/>
									</div>
									<div className="comment-item__info text-start ms-2">
										<div className="comment-item__info-name fw-bold">
											Nhut Doan
										</div>
										<div className="comment-item__info-comment">
											{v.comment}
										</div>
									</div>
								</div>			
							)
						})
					}
					{/* <div className="comment-item d-flex mt-2 mb-2"> */}
					{/* 	<div className="comment-item__avatar"> */}
					{/* 		<img src="/img/avatar.png" alt=""/> */}
					{/* 	</div> */}
					{/* 	<div className="comment-item__info text-start ms-2"> */}
					{/* 		<div className="comment-item__info-name fw-bold"> */}
					{/* 			Nhut Doan */}
					{/* 		</div> */}
					{/* 		<div className="comment-item__info-comment"> */}
					{/* 			Lorem isum absatrao case */}
					{/* 		</div> */}
					{/* 	</div> */}
					{/* </div> */}

					

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
	)
}