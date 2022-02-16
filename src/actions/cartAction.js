import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
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