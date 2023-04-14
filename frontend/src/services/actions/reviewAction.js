import { REVIEW_REQUEST, REVIEW_FAIL, REVIEW_SUCCESS } from '../constant';
import axios from 'axios';

export const getReview = (id) => async (dispatch) => {
    try {

        dispatch({ type: REVIEW_REQUEST });
        const { data } = await axios.get(`/api/review/${id}`);

        console.log(data);

        dispatch({ type: REVIEW_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: REVIEW_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}