import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

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

// product gonna be an object
export const productDetailsReducer = (state = { product: {reviews:[]} }, action) => {
    switch(action.type){
        // request data from database
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}
        // got the requested data into payload
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload }
        
        default:
            return state
    
    }
}