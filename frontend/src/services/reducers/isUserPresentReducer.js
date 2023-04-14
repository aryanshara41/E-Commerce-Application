import {MAKE_USER_ABSENT, MAKE_USER_PRESENT } from '../constant';

export const isUserPresentReducer = ( state = { login : true, register: true, logout: false }, action )=>{
    switch( action.type ){
        case MAKE_USER_ABSENT : return { login : true, register: true, logout: false };
        case MAKE_USER_PRESENT: return { login : false, register: false, logout: true };
        default: return state;
    }
}
