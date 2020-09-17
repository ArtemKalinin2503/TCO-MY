import { GET_OPTMODE_STARTED, GET_OPTMODE_SUCCESS, GET_OPTMODE_FAILURE } from '../actions/actionsOperatingMode/actionsOperatingMode'

const initialState = {
    optMode: "", //state который принимает статус Режима работы
    loadingOpt: false,
    error: null
}

//Данный reducer для получения статуса Проверики режима работы
export default function OptModeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_OPTMODE_STARTED:
            return {
                ...state,
                loadingOpt: true
            }
        case GET_OPTMODE_SUCCESS:
            return {
                ...state,
                optMode: action.payload,
                loadingOpt: false
            }
        case GET_OPTMODE_FAILURE:
            return {
                ...state,
                loadingOpt: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}