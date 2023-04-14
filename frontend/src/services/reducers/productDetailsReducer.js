import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESSS } from '../constant';

export const getProductDetails = (state = { productDetail: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true };
        case PRODUCT_DETAIL_SUCCESSS:
            return { loading: false, productDetail: action.payload };
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, productDetail: action.payload };
        default: return state;
    }
}