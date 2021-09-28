import axios from "axios"
import {SET_MESSAGE} from "../types/userTypes"
import {SET_LOADER, CLOSE_LOADER, SET_TOKEN} from "../types/authTypes"
export const updateImage = imageData => {
    return async (dispatch, getState) => {
        const {authReducer: {token}} = getState();
        
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        dispatch({type: SET_LOADER})
        try {
            const {data: {msg, token}} = await axios.post('/update-image', imageData, config)
            dispatch({type: CLOSE_LOADER})
             localStorage.setItem('redux-token', token)
            dispatch({type: SET_TOKEN, payload: token});
            dispatch({type: SET_MESSAGE, payload: msg})
            
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error.response)
        }
    }
}
export const coverImage = imageData => {
    return async (dispatch, getState) => {
        const {authReducer: {token}} = getState();
        
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        dispatch({type: SET_LOADER})
        try {
            const {data: {msg, token}} = await axios.post('/cover-image', imageData, config)
            dispatch({type: CLOSE_LOADER})
             localStorage.setItem('redux-token', token)
            dispatch({type: SET_TOKEN, payload: token});
            dispatch({type: SET_MESSAGE, payload: msg})
            
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error.response)
        }
    }
}