import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import { FIND_CHECK_STARTED, FIND_CHECK_SUCCESS, FIND_CHECK_ERROR, RETURN_ORDER_STARTED, RETURN_ORDER_SUCCESS, RETURN_ORDER_ERROR } from "./actionsReturnCheck";

//Поиск чека для возврата
const startFindCheck = () => ({type: FIND_CHECK_STARTED});
const successFindCheck = (payload) => ({type: FIND_CHECK_SUCCESS, payload: payload});
const errorFindCheck = (error) => ({type: FIND_CHECK_ERROR, payload: {error}});
//Процесс возврата
const startReturnOrder = () => ({type: RETURN_ORDER_STARTED});
const successReturnOrder = (payload) => ({type: RETURN_ORDER_SUCCESS, payload: payload});
const errorReturnOrder = (error) => ({type: RETURN_ORDER_ERROR, payload: {error}});

//Данный Thunk - Начало сканирования чека (чтение QR-code)
export const getStartFindCheck = () => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/findcart/startfindcart`, {})
            .then(r => console.log(r))
    }
}

//Данный Thunk - Запускает Поиск чека для возврата
export const getFindCheck = () => {
    return dispatch => {
        dispatch(startFindCheck())
        axios
            .put(`${urlApi}/api-v01/findcart/filter`, {})
            .then(res => {
                dispatch(successFindCheck(res.data))
            })
            .catch(err => {
                dispatch(errorFindCheck(err.message))
            })
    }
}

//Данный Thunk - Останавливает Поиск чека для возврата
export const getStopFindCheck = () => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/findcart/stopfindcart`, {})
            .then(r => console.log(r))
    }
}

//Данный Thunk - Запускает процесс возврата
export const getReturnOrder = (idWidget, idCheck) => {
    return dispatch => {
        dispatch(startReturnOrder())
        axios
            .put(`${urlApi}/api-v01/cart/${idWidget}/fuelrefundbyreceiptidentifier`, {
                receiptIdentifier: idCheck,
                continue: false,
                number: idWidget
            })
            .then(res => {
                dispatch(successReturnOrder(res.data))
            })
            .catch(err => {
                dispatch(errorReturnOrder(err.message))
            })
    }
}

export default {
    startFindCheck,
    successFindCheck,
    errorFindCheck,
    startReturnOrder,
    successReturnOrder,
    errorReturnOrder,
    getStartFindCheck,
    getFindCheck,
    getStopFindCheck,
    getReturnOrder
}