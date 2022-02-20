import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_REQUEST, 
    USER_LOGOUT 
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        // request data from database
        case USER_LOGIN_REQUEST:
            return { loading: true }
        // got the requested data into payload
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        
        case USER_LOGOUT:
            return {}
        
        default:
            return state
    
    }
}