import { useContext } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'

export default function PostBox() {
	const modal = useContext(HomeContext)

	return (
		<div className='post-box shadow-sm mb-3'>
			<div className="post-box-top d-flex">
				<div className="post-box-top__avatar m-2">
					<img src="/img/avatar.png" alt=""/>
				</div>
				<div className="post-box-top__type m-2"  onClick={modal.togglePostModal}>
					<span className='text-muted'>Nhựt ơi, bạn đang nghĩ gì thế?</span>
				</div>
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
				<div className="post-box-bottom__item">
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
			</div>
		</div>
	)
}