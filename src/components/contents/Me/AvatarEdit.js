import { useState, useCallback, useContext, useRef } from 'react'
import axios from 'axios'
import Cropper from 'react-easy-crop'
import { profileContext } from '../../../contexts/ProfileContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { baseUrl } from '../../baseUrl'

export default function AvatarEdit({userId}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [selectImg, setSelectImg] = useState(false)
    const [inputStyle, setInputStyle] = useState({
        display: 'none'
    })
    const [avatar, setAvatar] = useState(null)
    const [cropComplete, setCropComplete] = useState(null)
    const avatarEdit = useContext(profileContext)
    const inputImg = useRef()
    
    function selectImgFn() {
        inputImg.current.click()
    }

    const [newAvatar, setNewAvatar] = useState()
    const auth = useContext(AuthContext)

    const onChangeFile = img => {
        const reader = new FileReader()
        
        reader.readAsDataURL(img)

        reader.addEventListener('load', () => {
            setAvatar(reader.result)
            setSelectImg(true)
        })
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCropComplete(croppedAreaPixels)
    }, [])

    const generateImg = (img, px) => {
        const originImg = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        originImg.onload = () => {
            ctx.drawImage(originImg, px.x, px.y, px.width, px.height, 0,0,px.width, px.height)
        }
        originImg.src = img
        
        canvas.width = px.width
        canvas.height = px.height

        const promise = new Promise((resolve, reject) => {
            canvas.toBlob((file) => {
                // resolve(avatarEdit.setAvatar(canvas.toDataURL('image/jpeg')))
                // resolve(auth.dispatch({
                //     type: 'CHANGE_AVATAR',
                //     avatar: canvas.toDataURL('image/jpeg')
                // }))
                resolve(canvas.toDataURL('image/jpeg'))
            }, 'image/jpeg')
        })

        promise.then(v => {
            auth.dispatch({
                type: 'CHANGE_AVATAR',
                avatar: v
            })
            return v
        })

        promise.then(v => {
            console.log(v)
        })
    }

    console.log(auth.state.userId)

    return (
        <div className="avatar-edit">
            {
                selectImg 
                ?
                <div className='avatar-edit__box'>
                        <Cropper 
                            image={avatar}
                            crop={crop}
                            zoom={zoom}
                            aspect={1/1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                        <button className="button" onClick={() => generateImg(avatar, cropComplete)}>Save</button>
                    </div>
                :
                    <>
                        <input 
                            ref={inputImg} 
                            type="file" 
                            className='select-img'
                            style={inputStyle} 
                            onChange={e => onChangeFile(e.target.files[0])}
                        />
                        <img src="/img/upload.jpg" alt="" onClick={selectImgFn}/>
                    </>
            }
            <div className="close-box" onClick={avatarEdit.avatarEditFn}>
                <i className="fa-solid fa-x"></i>
            </div>
        </div>
    )
}