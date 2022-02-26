import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_REQUEST, 
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/userConstants'
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(
            {
                type: USER_LOGIN_REQUEST

            }
        )

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // data is the user token that get back from the post request
        const {data} = await axios.post(
            '/api/users/login/',
            {'username':email, 'password': password },
            config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        // store user info in localstorage so that we know user is loggedin
        // next time we come back, we can access the data and login
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
         dispatch( {
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const logout = (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET})
    dispatch({ type: ORDER_LIST_MY_RESET})
    dispatch({ tyoe: USER_LIST_RESET})
}

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch(
            {
                type: USER_REGISTER_REQUEST

            }
        )

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // data is the user token that get back from the post request
        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email':email, 'password': password },
            config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        // automatic login after register
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        // store user info in localstorage so that we know user is loggedin
        // next time we come back, we can access the data and login
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
         dispatch( {
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: USER_DETAILS_REQUEST

            }
        )

        // get the logged in user
        const { 
            userLogin: { userInfo },
            
        } = getState()

        // pass authorization token into header because getUserProfile needs isAuthenticated permission
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // data is the user token that get back from the post request
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
            )

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
         dispatch( {
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: USER_UPDATE_PROFILE_REQUEST

            }
        )

        // get the logged in user
        const { 
            userLogin: { userInfo },
            
        } = getState()

        // pass authorization token into header because getUserProfile needs isAuthenticated permission
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // data is the user token that get back from the post request
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
            )

        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        // log in the user with the updated profile
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
         dispatch( {
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const listUsers = () => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: USER_LIST_REQUEST

            }
        )

        // get the logged in user
        const { 
            userLogin: { userInfo },
            
        } = getState()

        // pass authorization token into header because getUserProfile needs isAuthenticated permission
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // data is the user token that get back from the post request
        const { data } = await axios.get(
            `/api/users/`,
            config
            )

        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })

    } catch (error) {
         dispatch( {
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}


export const deleteUser = (userId) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: USER_DELETE_REQUEST

            }
        )

        // get the logged in user
        const { 
            userLogin: { userInfo },
            
        } = getState()

        // pass authorization token into header because getUserProfile needs isAuthenticated permission
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // data is the user token that get back from the post request
        const { data } = await axios.delete(
            `/api/users/delete/${userId}`,
            config
            )

        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
         dispatch( {
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const updateUser = (user) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: USER_UPDATE_REQUEST

            }
        )

        // get the logged in user
        const { 
            userLogin: { userInfo },
            
        } = getState()

        // pass authorization token into header because getUserProfile needs isAuthenticated permission
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // data is the user token that get back from the post request
        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
            )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
         dispatch( {
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}