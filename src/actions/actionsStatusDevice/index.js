import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import {GET_STATUS_DEVICE_STARTED, GET_STATUS_DEVICE_SUCCESS, GET_STATUS_DEVICE_FAILURE, GET_MESSAGES} from "./actionsStatusDevice";

export const getStatusDeviceStarted = () => ({type: GET_STATUS_DEVICE_STARTED});
export const getStatusDeviceSuccess = (payload) => ({type: GET_STATUS_DEVICE_SUCCESS, payload: payload});
export const getStatusDeviceFailure= (error) => ({type: GET_STATUS_DEVICE_FAILURE, payload: {error}});
export const getMessages = (payload) => ({type: GET_MESSAGES, payload: payload});

//Данный thunk - получает данные о статусе доступного обарудования
export const getDataDeviceStatus = () => {
    return dispatch => {
        dispatch(getStatusDeviceStarted())
        axios
            .get(`${urlApi}/api-v01/payment/currentlist`, {})
            .then(res => {
                dispatch(getStatusDeviceSuccess(res.data))
            })
            .catch(err => {
                dispatch(getStatusDeviceFailure(err.message))
            })
    }
}

//Данный thunk - получает данные о статусе корзины
export const getDataMessages = () => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/messages`, {
                params: {
                    refresh: false
                }
            })
            .then(res => {
                dispatch(getMessages(res.data))
            })
    }
}

export default {
    getStatusDeviceStarted,
    getStatusDeviceSuccess,
    getStatusDeviceFailure,
    getDataDeviceStatus,
    getMessages,
    getDataMessages
}