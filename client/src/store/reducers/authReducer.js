import {SET_LOADER, CLOSE_LOADER, SET_ERRORS, RESET_ERRORS, SET_TOKEN} from "../types/authTypes"
import {LOGOUT, SET_MESSAGE, REMOVE_MESSAGE} from "../types/userTypes"
import jwt_decode from "jwt-decode";
const initState = {
    loader: false,
    authErrors: [],
    token: '',
    msg:'',
    user: {}
}

const token = localStorage.getItem('redux-token');

const verifyToken = (token) => {
    const decode = jwt_decode(token);
   const expired = new Date(decode.exp * 1000);
   if(new Date() > expired) {
       localStorage.removeItem('redux-token');
       return null;
   } else {
    return decode;
   }

}
if(token){
    const response =  verifyToken(token);
    if(response){
        initState.user = response.user;
        initState.token = token;
    }
}

const authReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case SET_LOADER: 
        return {...state, loader: true}
        break;
        case CLOSE_LOADER: 
        return {...state, loader: false}
        break;
        case SET_ERRORS: 
        return {...state, authErrors: payload}
        break;
        case RESET_ERRORS: 
        return {...state, authErrors: []}
        break;
        case SET_TOKEN: 
        const response = verifyToken(payload);
        if(response){
            return {...state, token: payload, user: response.user}
        }
       break;
       case LOGOUT: 
       return {
           ...state, token: '', user: {}
       }
       break;
       case SET_MESSAGE:
           return {
               ...state,
               msg: payload
           }
           break;
        case REMOVE_MESSAGE:
            return {
                ...state,
                msg: ''
            }
            break;
        default: 
        return state;
    }
}
export default authReducer;