import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESSS } from '../constant';
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESSS } from '../constant';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('/api/products');
        // const { data } = await axios.get('/api/cart/products', {
        //     headers: {
        //         authtoken: `${localStorage.getItem('token')}`
        //     }
        // });

        dispatch({ type: PRODUCT_LIST_SUCCESSS, payload: data });

    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }
        );
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);
        // console.log(data);
        dispatch({ type: PRODUCT_DETAIL_SUCCESSS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}