import {REVIEW_REQUEST, REVIEW_FAIL, REVIEW_SUCCESS} from '../constant';


export const getReview = ( state = { review : {} }, action ) =>{
    switch( action.type ){
        case REVIEW_REQUEST : return { loading : true };
        case REVIEW_SUCCESS: return { loading : false, review : action.payload };
        case REVIEW_FAIL : return { loading : false, review : action.payload };
        default: return state;
    }
}