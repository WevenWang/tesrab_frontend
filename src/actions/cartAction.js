import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'
import axios from 'axios'

// pass id of the product and its quantity
// getState pull out the state
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch(
        {
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        }
    )
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(
        {
            type: CART_REMOVE_ITEM,
            payload: id
        }
    )
    // update local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(
        {
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data
        }
    )
    // update local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}