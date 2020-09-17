import { LOGIN_AUTH, PASSWORD_AUTH, USER_AUTH_STARTED, USER_AUTH_SUCCESS, USER_AUTH_FAILURE, USER_AUTH_EXIT } from './actionsAuth';
import axios from "axios";
import {urlApi} from '../../utils/globalConst';

export const loginAuth = (payload) => ({type: LOGIN_AUTH, payload: payload});
export const passAuth = (payload) => ({type: PASSWORD_AUTH, payload: payload});
export const userAuthStarted = () => ({type: USER_AUTH_STARTED});
export const userAuthSuccess = (payload) => ({type: USER_AUTH_SUCCESS, payload: payload});
export const userAuthFailure = (error) => ({type: USER_AUTH_FAILURE, payload: {error}});
export const userAuthExit = () => ({type: USER_AUTH_EXIT});

//Данный thunk - получает токен Пользователя
export const addLoginUser = (loginVal, passVal) => {
    let login = loginVal; //Переданный Логин из Авторизации
    let password = passVal; //Переданный Пароль из Авторизации

    return dispatch => {
        dispatch(userAuthStarted());
        axios
            .post(`${urlApi}/api-v01/auth/login`,{
                "login": login,
                "password": password,
                "controllerUniqueId": "string"
            })
            .then(res => {
                dispatch(userAuthSuccess(res.data))
            })
            .catch(err => {
                dispatch(userAuthFailure(err.message))
            });
    }
}

export default {
    loginAuth,
    passAuth,
    userAuthStarted,
    userAuthSuccess,
    userAuthFailure,
    addLoginUser,
    userAuthExit
}