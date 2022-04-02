import { useContext, useState, useRef } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '../../../firebase'

export default function PostBox() {
	const Auth = useContext(AuthContext)
	const post = useContext(HomeContext)
	const [reviewImg, setReviewImg] = useState('')
	const [imageItem, setImageItem] = useState(null)
	const [url, setUrl] = useState('')
	const [progressState, setProgressState] = useState({
		width: 0
	})
	const inputFile = useRef()

	const selectImgFn = (e) => {
		inputFile.current.click()
	}

	const onChangeFile = e => {
		const file = e.target.files[0]
		setImageItem(file)
		const reader = new FileReader()

		reader.readAsDataURL(file)
		reader.addEventListener('load', () => {
			setReviewImg(reader.result)
		})

		const imageRef = ref(storage, 'images/' + 1 + file.name)
		const uploadTask = uploadBytesResumable(imageRef, file)
		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setProgressState({
					width: progress + '%'
				})
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then(url => setUrl(url))
			}
		)
		

		// post.dispatch({type: 'POST', img: file})
		// const reader = new FileReader()
		// // setImageItem(v => {
		// // 	const result = [...v, file]
		// // 	return result
		// // })
		// reader.readAsDataURL(file);
		// reader.addEventListener('load', () => {
		// 	setReviewImg(reader.result)
		// })
	}

	// const fireStorage = ref(storage, '/images/img123')
	// 
	// // useEffect(() => {
	// // 	uploadBytes(fireStorage, 'nhutcute1', 'base64url')
	// // },[])
	// useEffect(() => {
	// 	console.log(reviewImg)
	// },[reviewImg])

	const removeReviewImg = () => {
		inputFile.current.value = ''
		const desertRef = ref(storage, 'images/' + imageItem.name);
		deleteObject(desertRef)
			.then( () => console.log('delete successfully!!!'))
		setUrl('')
		setReviewImg('')
	}

	const onPostFn = () => {
		setReviewImg('')
		setUrl('')
		setProgressState(item => {
			return {...item, width: '0'}
		})
		post.postFn(url)
	}

	return (
		<div className='post-box shadow-sm mb-3'>
			<div className="post-box-top d-flex">
				<div 
					className="post-box-top__avatar m-2"
					style={{
						backgroundImage: `url(${Auth.state.avatar !== '' ? Auth.state.avatar : '/img/avatar.png'})`
					}}
				>
					{/* <img src={Auth.state.avatar !== '' ? Auth.state.avatar : '/img/avatar.png'} alt=""/> */}
				</div>
				<div className="post-box-top__type m-2">
					<textarea 
						type='text'
						value={post.state.description}
						onChange={
							(e) => post.dispatch({
								type: 'POST', 
								description: e.target.value,
							})
						}
					/>
					{
					post.state.description == ''
					?
					<button 
						className='ms-2 btn-disabled' 
						onClick={onPostFn}
						disabled
					>Đăng</button>
					:
					<button 
						className='ms-2 btn-post' 
						onClick={onPostFn}
					>Đăng</button>
					}
					
				</div>
				<input 
					ref={inputFile} 
					className='select-img' 
					type="file"
					onChange={onChangeFile}
				/>
			</div>
			<div className="post-box-image">
				{
					reviewImg !== '' 
					?
					<div
						className="post-box-image__item"
						style={{backgroundImage: `url(${reviewImg})`}}
					>
						<div className="post-box-image__item-remove" onClick={removeReviewImg}>
							<i className="fa-solid fa-circle-minus"></i>
						</div>
						<div className="post-box-image__item-progress">
							<span style={progressState}></span>
						</div>
					</div>
					:
					<></>
					
				}
			</div>
			<div className="post-box-bottom d-flex justify-content-between">
				<div className="post-box-bottom__item">
					<div className="post-box-bottom__item-img">
						<img src="/img/live.png" alt=""/>
					</div>
					<div className="post-box-bottom__item-desc">
						<span>Video trực tiếp</span>
					</div>
				</div>
				<div className="post-box-bottom__item" onClick={selectImgFn}>
					<div className="post-box-bottom__item-img">
					<img src="/img/picture.png" alt=""/>
					</div>
					<div className="post-box-bottom__item-desc">
						<span>Ảnh/video</span>
					</div>
				</div>
				<div className="post-box-bottom__item">
					<div className="post-box-bottom__item-img">
					<img src="/img/smiling.png" alt=""/>
					</div>
					<div className="post-box-bottom__item-desc">
						<span>Cảm xúc/Hoạt động</span>
					</div>
				</div>
				{
					<div className='test' style={{backgroundImage: `url("${reviewImg}")`}}></div>
				}
			</div>
		</div>
	)
}