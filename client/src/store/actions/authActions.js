import axios from "axios"
import {SET_LOADER, CLOSE_LOADER, SET_ERRORS, SET_TOKEN}from "../types/authTypes"
export const registerAction = (userData) => {
    return async (dispatch, getState) => {
        const myState = getState();
        console.log(myState)
        dispatch({type: SET_LOADER})
         try {
             const {data: {token, msg}} = await axios.post('/register', userData);
             dispatch({type: CLOSE_LOADER})
             localStorage.setItem('redux-token', token);
             dispatch({type: SET_TOKEN, payload: token})
         } catch (error) {
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_ERRORS, payload: error.response.data.errors});
             console.log(error.response.data)
         }
    }
}
export const loginAction = (loginData) => {
   return async (dispatch) => {
       dispatch({type: SET_LOADER});
       try {
        const {data: {token, msg}} = await axios.post('/login', loginData);
        dispatch({type: CLOSE_LOADER})
        localStorage.setItem('redux-token', token);
        dispatch({type: SET_TOKEN, payload: token})
       } catch (error) {
        dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_ERRORS, payload: error.response.data.errors});
             console.log(error.response.data)
       }
   }
}