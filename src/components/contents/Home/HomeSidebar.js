export default function HomeSidebar() {
	return (
		<div className="home-sidebar">
			<div className="home-sidebar__lists">
				<div className="home-sidebar__item">
					<a href="#" className='text-dark text-decoration-none'>
						<img className='me-2' src="/img/avatar.png" alt=""/>
						<span>Hugh Jackman</span>
					</a>
				</div>
				<div className="home-sidebar__item">
					<a href="#" className='text-dark text-decoration-none'>
						<img className='me-2' src="/img/friend-sidebar.png" alt=""/>
						<span>Bạn bè</span>
					</a>
				</div>
				<div className="home-sidebar__item">
					<a href="#" className='text-dark text-decoration-none'>
						<img className='me-2' src="/img/group.png" alt=""/>
						<span>Nhóm</span>
					</a>
				</div>
				<div className="home-sidebar__item">
					<a href="#" className='text-dark text-decoration-none'>
						<img className='me-2' src="/img/market.png" alt=""/>
						<span>Marketplace</span>
					</a>
				</div>
				<div className="home-sidebar__item">
					<a href="#" className='text-dark text-decoration-none'>
						<img className='me-2' src="/img/watch.png" alt=""/>
						<span>Watch</span>
					</a>
				</div>
			</div>
		</div>
	)
}