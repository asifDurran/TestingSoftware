import {useEffect} from "react"
import toast, { Toaster } from 'react-hot-toast';
import BgImage from "../components/BgImage"
import {Link} from "react-router-dom"
import useInput from "../hooks/useInput"
import {registerAction} from "../store/actions/authActions"
import {useDispatch, useSelector} from "react-redux"
import { RESET_ERRORS } from "../store/types/authTypes";
const Register = () => {
    const dispatch = useDispatch()
    const { loader, authErrors} = useSelector((state => state.authReducer))
    const [state, handle] = useInput({name: '', email: '',password: ''});
    const registerForm = e => {
        e.preventDefault();
       dispatch(registerAction(state))
    }
    useEffect(() => {
      if(authErrors.length !== 0){
          authErrors.map(error => toast.error(error.msg))
          dispatch({type: RESET_ERRORS})
      }
    },[authErrors])
    return(
        <div className="row">
            <div className="col-8">
             <BgImage />
             <Toaster
  position="top-left"
  reverseOrder={true}
  
/>

            </div>
            <div className="col-4 flex justify-center align-center">
            {!loader ? <form onSubmit={registerForm}>
                <div className="group">
                    <h3>Create new account</h3>
                </div>
            <div className="group">
                <input type="text" name="name" value="" className="group__control" placeholder="Enter Name" onChange={handle} value={state.name} />
            </div>
            <div className="group">
                <input type="email" name="email" value="" className="group__control" placeholder="Enter Email" onChange={handle} value={state.email} />
            </div>
            <div className="group">
                <input type="password" name="password" value="" className="group__control" placeholder="Create Password" onChange={handle} value={state.password} />
            </div>
            <div className="group">
                <input type="submit"  className="btn-default  indigo-900  bg-indigo-200" value="Register" />
            </div>
            <div className="group">
                <Link to="/login">Already have an account</Link>
            </div>
        </form> : 'loading.....'}
            </div>
        </div>
       
    )
}
export default Register;