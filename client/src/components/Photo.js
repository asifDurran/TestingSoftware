import {useState, useEffect} from "react"
import toast, { Toaster } from 'react-hot-toast';
import {useSelector, useDispatch} from "react-redux"
import {updateImage} from "../store/actions/profileActions"
import {REMOVE_MESSAGE} from "../store/types/userTypes"
const Photo = () => {
    const {user, loader, msg} = useSelector(state => state.authReducer);
    console.log(user)
    const [image, setImage] = useState({image: '', preview: ''});
    const dispatch = useDispatch();
    const imageHandle = e => {
        if(e.target.files.length > 0){
            const reader = new FileReader();
     
       reader.onloadend= () => {
           setImage({image: e.target.files[0], 
            preview: reader.result
        })
       }
       reader.readAsDataURL(e.target.files[0])
        }
        
    }
    const saveImage = async () => {
          const form = new FormData();
          form.append('image' ,image.image);
          form.append('id', user._id)
           await dispatch(updateImage(form));
           setImage({image: '', preview: ''})
    }
    useEffect(() => {
     if(msg) {
         toast.success(msg);
        dispatch({type: REMOVE_MESSAGE});
     }
    }, [msg])
    return (
        <>
        <Toaster
  position="top-left"
  reverseOrder={true}
  
/>
        <div className="photo">
           
            
             {image.preview ? <><img src={image.preview} alt=""/><label htmlFor="userImage" className="userLabel bg-indigo-200 indigo-900">choose</label>
             <input type="file" name="image" id="userImage" onChange={imageHandle} className="user-picture" /></>: 'image' in user ? <><img src={`/images/${user.image}`} alt="" /><label htmlFor="userImage" className="userLabel bg-indigo-200 indigo-900">choose</label>
             <input type="file" name="image" id="userImage" onChange={imageHandle} className="user-picture" /></> : <><span>{user.name[0].toUpperCase()}</span>
             <label htmlFor="userImage" className="userLabel bg-indigo-200 indigo-900">choose</label>
             <input type="file" name="image" id="userImage" onChange={imageHandle} className="user-picture" /></>}
             
        </div>
        {!loader ? image.image ? <button className="bg-indigo-200 indigo-900 btn-default " style={{ marginTop: "50px",marginLeft: "30px" }} onClick={saveImage}>Save</button> : '' : 'loading....' }
      
        </>
    )
}

export default Photo
