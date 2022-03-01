import { useContext } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'

export default function PostModal() {
	const modal = useContext(HomeContext)
	return (
		<>
			{ modal.postModal
				? 
				<div className="post-modal shadow-sm">
					<form className='post-modal__form'>
						<div className="post-modal__form-header border-bottom">
							<span className='fs-5 fw-bold'>Tạo bài viết</span>
							<i className="fa-solid fa-circle-xmark" onClick={modal.togglePostModal}></i>
						</div>
						<div className="post-modal__form-body">
							<div className="post-modal__form-body-top d-flex align-items-center">
								<div className="form-body-top__img">
									<img src="/img/avatar.png" alt=""/>
								</div>
								<div className="form-body-top__info ms-2">
									<span className='fw-bold'>Doan Minh Nhut</span>
								</div>
							</div>
							<div className="post-modal__form-body-bottom mt-4">
								<textarea placeholder='Bạn đang nghĩ gì thế?' name="" id="" cols="30" rows="10" />
							</div>
							<button className='btn btn-primary col-12'>Đăng</button>
						</div>
					</form>
				</div>
				:
				<></>
			}
		</>
	)
}