import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'

// reducer updates the store
export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type){
        // request data from database
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        // got the requested data into payload
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload }
        
        default:
            return state
    
    }
}