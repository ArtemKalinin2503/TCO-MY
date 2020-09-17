import {
    MAKE_RETURN_RESET,
    MAKE_RETURN_SUCCESS,
    MAKE_RETURN_FAIL,
    MAKE_RETURN_TIMEOUT
} from "../actions/actionsMakeReturn/actionsMakeReturn";

const initialState = {
    success: false,
    error: false,
    timeout: false
}

export default function MakeReturnReducer (state = initialState, action) {
    switch (action.type) {
        case MAKE_RETURN_RESET:
            console.log('+++> RETURN_RESET', state);
            return initialState
        case MAKE_RETURN_SUCCESS:
            console.log('+++> MAKE_RETURN_SUCCESS', state);
            return {
                ...state,
                success: true
            }
        case MAKE_RETURN_FAIL:
            console.log('+++> MAKE_RETURN_FAIL', state);
            return {
                ...state,
                error: true
            }
        case MAKE_RETURN_TIMEOUT:
            console.log('+++> MAKE_RETURN_TIMEOUT', state);
            return {
                ...state,
                timeout: true
            }
        default:
            return state
    }
}
