import {useDispatch, useSelector} from "react-redux"
import {LOGOUT} from "../store/types/userTypes"
const Nav = () => {
    const dispatch = useDispatch();
    return (
        <div className="nav bg-indigo-300">
            <div className="nav__left indigo-900">Dashboard</div>
            <div className="nav__right">
               <span className="indigo-900" onClick={() => dispatch({type: LOGOUT})}>Logout</span>
            </div>
        </div>
    )
}

export default Nav
