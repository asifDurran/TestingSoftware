import {useSelector, useDispatch} from "react-redux"
import {useState} from "react"
import Photo from "./Photo";
import {coverImage} from "../store/actions/profileActions";

const CoverPhoto = () => {
    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const [image, setImage] = useState({image: '', preview: ''})
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
    const saveCover = async () => {
        const form = new FormData();
        form.append('image', image.image);
        form.append('_id', user._id)
        await dispatch(coverImage(form));
        setImage({image:'',preview:''})
    }
    return (
        <div className="cover">
            <img src={'cover' in user ? `/images/${user.cover}` : image.preview ? image.preview : `/images/cover.jpg` } alt=""/>
            <label htmlFor="cover" className="cover__btn">Change cover photo</label>
            <input type="file" name="" style={{ display: 'none' }} onChange={imageHandle} id="cover"/>
            {image.image ?  <button className="coverBtn" onClick={saveCover}>Save Cover Image</button> : ''}
           
            <Photo />
        </div>
    )
}

export default CoverPhoto
