import {GET_STATUS_DEVICE_STARTED, GET_STATUS_DEVICE_SUCCESS, GET_STATUS_DEVICE_FAILURE, GET_MESSAGES} from "../actions/actionsStatusDevice/actionsStatusDevice";

const initialState = {
    statusDevice: null,
    loadingStatus: false,
    error: null,
    messages: ""
}

export default function StatusDeviceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATUS_DEVICE_STARTED:
            return {
                ...state,
                loadingStatus: true
            };
        case GET_STATUS_DEVICE_SUCCESS:
            return {
                ...state,
                statusDevice: action.payload,
                loadingStatus: false
            };
        case GET_STATUS_DEVICE_FAILURE:
            return {
                ...state,
                loadingStatus: false,
                error: action.payload.error,
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        default:
            return state
    }
}