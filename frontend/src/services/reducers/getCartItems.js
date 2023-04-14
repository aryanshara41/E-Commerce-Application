import { CART_ITEM_REQUEST, CART_ITEM_SUCCESS, CART_ITEM_FAIL } from '../constant';

export const getCartItems = (state = { orderList: [] }, action) => {
    switch (action.type) {
        case CART_ITEM_REQUEST: return { loading: true, orderList: [] };
        case CART_ITEM_SUCCESS:
            return { loading: false, orderList: action.payload };
        case CART_ITEM_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
}