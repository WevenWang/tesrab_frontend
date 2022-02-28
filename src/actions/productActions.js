import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,


    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

} from '../constants/productConstants'
import axios from 'axios'

// this function is in charge of making api calls to the backend
// homescreen will trigger listProducts action
// once we got the data, will then dispatch product reducer to update the states
export const listProducts = () => async (dispatch) => {
    try {
        // dispatch first action, fire off first reducer
        dispatch({type: PRODUCT_LIST_REQUEST})
        // make api call, load data into payload and action type PRODUCT LIST SUCCESS
        const { data } = await axios.get('/api/products/');

        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: data
         })

    } catch (error) {
        dispatch( {
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        // dispatch first action, fire off first reducer
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        // make api call, load data into payload and action type PRODUCT DETAILS SUCCESS
        // `/api/products/${match.id}` fills the ${id} 
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
         })

    } catch (error) {
        dispatch( {
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message,

        })
    }
}

// delete product by id
export const deleteProduct = (productId) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type:PRODUCT_DELETE_REQUEST
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
            `/api/products/delete/${productId}/`,
            config
            )

        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

        

    } catch (error) {
         dispatch( {
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}


export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type:PRODUCT_CREATE_REQUEST
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
        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )

        
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

        

        

    } catch (error) {
         dispatch( {
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type:PRODUCT_UPDATE_REQUEST
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
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        // load details after product update
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}