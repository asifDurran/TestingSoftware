import {useSelector} from "react-redux"
const Sidebar = () => {
    const {user} = useSelector(state => state.authReducer)
    return (
        <div className="sidebar">
            <li>{user.name}</li>
            
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, architecto.</li>
        </div>
    )
}

export default Sidebar
