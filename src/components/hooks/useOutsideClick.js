import React, { useEffect } from 'react'

function useOutsideClick(ref) {
	useEffect(() => {
		function handleClickOutside(e) {
			if(ref.current && !ref.current.contains(e.target)) {
				console.log('ra ngoai')
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	},[ref])
}

export {useOutsideClick}