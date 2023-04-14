import { MAKE_USER_ABSENT, MAKE_USER_PRESENT } from '../constant';

export const isUserPresent = () => (dispatch) => {
    if (localStorage.getItem('token')) {
        // means user is present
        dispatch({ type: MAKE_USER_PRESENT });
    }
    else dispatch({ type: MAKE_USER_ABSENT });
}
