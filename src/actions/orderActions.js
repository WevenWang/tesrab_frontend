import { 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
 } from '../constants/orderConstants'

import axios from 'axios'
import { CART_CLEAR_ITEM } from '../constants/cartConstants'

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_CREATE_REQUEST

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
            `/api/orders/add/`,
            order,
            config
            )

        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch(
            {
                type: CART_CLEAR_ITEM,
                payloadP: data
            }
        )

        localStorage.removeItem('cartItems')



    } catch (error) {
         dispatch( {
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}


export const getOrderDetails = (orderId) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_DETAILS_REQUEST
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
            `/api/orders/${orderId}/`,
            config
            )

        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_PAY_REQUEST
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
            `/api/orders/${orderId}/pay/`,
            paymentResult,
            config
            )

        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_DELIVER_REQUEST
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
            `/api/orders/${order._id}/deliver/`,
            {},
            config
            )

        
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}

export const listMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_LIST_MY_REQUEST
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
            `/api/orders/myorders/`,
            config
            )

        
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}


export const listOrders = () => async(dispatch, getState) => {
    try {
        dispatch(
            {
                type: ORDER_LIST_REQUEST
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
            `/api/orders/`,
            config
            )

        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

        

    } catch (error) {
         dispatch( {
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail //detail is the custom error message
            ? error.response.data.detail : error.message,

        })
    }
}