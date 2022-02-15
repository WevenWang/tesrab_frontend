import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
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
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,

        })
    }
}