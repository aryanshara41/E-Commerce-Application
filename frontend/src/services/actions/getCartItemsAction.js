import axios from 'axios';
import { CART_ITEM_REQUEST, CART_ITEM_SUCCESS, CART_ITEM_FAIL } from '../constant';

export const getCartItemsAction = () => async (dispatch) => {
    try {

        dispatch({ type: CART_ITEM_REQUEST});

        const { data } = await axios.get('/api/cart/products', {
            headers: {
                authtoken: `${localStorage.getItem('token')}`
            }
        });
        // const { data } = await axios.get('/api/products');

        console.log(data);

        dispatch({ type: CART_ITEM_SUCCESS, payload: data });

    } catch (error) {
        console.log(error);
        dispatch({
            type: CART_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }
        );
    }
}