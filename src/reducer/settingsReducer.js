import {GET_UI_SETTINGS_STARTED, GET_UI_SETTINGS_SUCCESS, GET_UI_SETTINGS_ERROR} from '../actions/actionsSettings/actionsSettings';

const initialState = {
    theme: 'rosneft'
}

export default function SettingsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UI_SETTINGS_STARTED:
            return {
                ...state
            };
        case GET_UI_SETTINGS_SUCCESS:
            return {
                ...state,
                theme: action.payload.data.values.theme || 'rosneft'
            };
        case GET_UI_SETTINGS_ERROR:
            return {
                ...state,
                error: "Ошибка при получении настроек"
            };
        default:
            return state
    }
}
