import {FIND_CHECK_STARTED, FIND_CHECK_SUCCESS, FIND_CHECK_ERROR, RETURN_ORDER_STARTED, RETURN_ORDER_SUCCESS, RETURN_ORDER_ERROR} from "../actions/actionsReturnCheck/actionsReturnCheck";

const initialState = {
    findCheckStarted: false,
    findCheckData: "",
    findCheckError: "",
    returnOrderStarted: false,
    returnOrderData: "",
    returnOrderError: ""
}

export default function ReturnOrderReducer (state = initialState, action) {
    switch (action.type) {
        case FIND_CHECK_STARTED:
            return {
                ...state,
                findCheckStarted: true
            }
        case FIND_CHECK_SUCCESS:
            return {
                ...state,
                findCheckData: action.payload,
                findCheckStarted: false
            }
        case FIND_CHECK_ERROR:
            return {
                ...state,
                findCheckStarted: false,
                findCheckError: action.payload.error
            }
        case RETURN_ORDER_STARTED:
            return {
                ...state,
                returnOrderStarted: true,
            }
        case RETURN_ORDER_SUCCESS:
            return {
                ...state,
                returnOrderData: action.payload,
                returnOrderStarted: false
            }
        case RETURN_ORDER_ERROR:
            return {
                ...state,
                returnOrderStarted: false,
                returnOrderError: action.payload.error
            }
        default:
            return state
    }
}