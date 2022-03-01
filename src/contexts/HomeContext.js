import { createContext,useState } from 'react'

export const HomeContext = createContext()

export default function HomeContextProvider({children}) {
	const [postModal, setPostModal] = useState(false)
	
	const togglePostModal = () => {
		setPostModal(v => !v)
	}


	const data = {
		postModal,
		setPostModal,
		togglePostModal
	}

	return (
		<HomeContext.Provider value={data}>
			{children}
		</HomeContext.Provider>
	)
}