import {
    MAKE_RETURN_RESET,
    MAKE_RETURN_SUCCESS,
    MAKE_RETURN_FAIL,
    MAKE_RETURN_TIMEOUT
} from "../actions/actionsMakeReturn/actionsMakeReturn";

const initialState = {
    success: false,
    error: false,
    timeout: false,
    status: null
}

export default function MakeReturnReducer (state = initialState, action) {
    switch (action.type) {
        case MAKE_RETURN_RESET:
            return initialState
        case MAKE_RETURN_SUCCESS:
            return {
                ...state,
                success: true,
                status: action.payload.status
            }
        case MAKE_RETURN_FAIL:
            return {
                ...state,
                error: true
            }
        case MAKE_RETURN_TIMEOUT:
            return {
                ...state,
                timeout: true
            }
        default:
            return state
    }
}
