import { USER_TOKEN_REQUEST, USER_TOKEN_SUCCESS, USER_TOKEN_FAIL } from '../constant';

export const getUserTokenReducer = ( state = { token : '' }, action ) => {
    switch( action.type ){
        case USER_TOKEN_REQUEST : return { loading : true };
        case USER_TOKEN_SUCCESS : return { loading : false, token : action.payload };
        case USER_TOKEN_FAIL : return { loading : false, token : action.payload };
        default: return state;
    }
}