import { createContext, useState } from 'react'

export const profileContext = createContext()

function ProfileContextProvider({children}) {
    const [avatar, setAvatar] = useState(null)
    const [avatarEdit, setAvatarEdit] = useState(false)
    const [avatarCrop, setAvatarCrop] = useState(null)

    const avatarEditFn = () => {
        setAvatarEdit(!avatarEdit)
    }

    const data = {
        avatar,
        setAvatar,
        avatarEdit,
        avatarEditFn,
        avatarCrop,
        setAvatarCrop,
    }
    return (
        <profileContext.Provider value={data}>
            {children}
        </profileContext.Provider>
    )
}

export default ProfileContextProvider