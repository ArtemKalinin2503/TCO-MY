import { LOGIN_AUTH, PASSWORD_AUTH, USER_AUTH_STARTED, USER_AUTH_SUCCESS, USER_AUTH_FAILURE, USER_AUTH_EXIT } from '../actions/actionsAuth/actionsAuth'

const initialState = {
    loginAuth: "",
    passAuth: "",
    loadingAuthUser: false,
    tokenAutUser: {},
    isAuthorize: false,
    error: null
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_AUTH:
            return {
                ...state,
                loginAuth: action.payload
            };
        case PASSWORD_AUTH:
            return {
                ...state,
                passAuth: action.payload
            };
        case USER_AUTH_STARTED:
            return {
                ...state,
                loadingAuthUser: true
            };
        case USER_AUTH_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loadingAuthUser: false,
                tokenAutUser: action.payload,
                isAuthorize: true
            };
        case USER_AUTH_EXIT:
            return {
                ...state,
                loginAuth: "",
                passAuth: "",
                tokenAutUser: "",
                error: null
            };
        case USER_AUTH_FAILURE:
            return {
                ...state,
                loadingAuthUser: false,
                // error: errorMessage.error
                error: "Ошибка авторизации Логин или Пароль неверный"
            };
        default:
            return state
    }
}