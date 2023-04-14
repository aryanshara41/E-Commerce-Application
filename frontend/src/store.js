import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { getProductsReducer } from './services/reducers/productReducer';
import { getProductDetails } from './services/reducers/productDetailsReducer';
import { getReview } from './services/reducers/getReviewReducer';
import { getUserTokenReducer } from './services/reducers/getUserTokenReducer';
import { getCartItems } from './services/reducers/getCartItems';
import { isUserPresentReducer } from './services/reducers/isUserPresentReducer';

const mainReducer = combineReducers({
    products: getProductsReducer,
    productDetail: getProductDetails,
    review: getReview,
    userToken: getUserTokenReducer,
    orderList : getCartItems,
    userPresent : isUserPresentReducer
})

const initialState = {
    // userToken : '3'
}

const middleware = [thunk];

const store = createStore(mainReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;