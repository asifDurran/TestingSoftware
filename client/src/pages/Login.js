import {useEffect} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import BgImage from "../components/BgImage"
import useInput from "../hooks/useInput"
import {loginAction} from "../store/actions/authActions"
import { RESET_ERRORS } from "../store/types/authTypes";
const Login = () => {
    const dispatch = useDispatch();
    const { loader, authErrors} = useSelector((state => state.authReducer))
    const [state, handle] = useInput({email: '', password: ''})
    const loginForm =e => {
        e.preventDefault();
        dispatch(loginAction(state))
    }
    useEffect(() => {
        if(authErrors.length !== 0){
            authErrors.map(error => toast.error(error.msg))
            dispatch({type: RESET_ERRORS})
        }
      }, [authErrors])
    return (<div className="row">
    <div className="col-8">
     <BgImage />
     <Toaster
  position="top-left"
  reverseOrder={true}
  
/>
    </div>
    <div className="col-4 flex justify-center align-center">
    <form onSubmit={loginForm}>
        <div className="group">
            <h3>Login</h3>
        </div>
   
    <div className="group">
        <input type="email" name="email" value="" className="group__control" placeholder="Enter Email" onChange={handle} value={state.email} />
    </div>
    <div className="group">
        <input type="password" name="password" value="" className="group__control" placeholder="Enter Password" onChange={handle} value={state.password} />
    </div>
    <div className="group">
        <input type="submit"  className="btn-default indigo-900  bg-indigo-200" value="Login" />
    </div>
    <div className="group">
        <Link to="/">Create new account</Link>
    </div>
</form>
    </div>
</div>);
}
export default Login;
