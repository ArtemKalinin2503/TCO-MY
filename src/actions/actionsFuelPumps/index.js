import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import { GET_FUELPUMPS_STARTED, GET_FUELPUMPS_SUCCESS, GET_FUELPUMPS_FAILURE, GET_LOCK, GET_LOCK_ERROR, GET_UNLOCK, GET_UNLOCK_ERROR, GET_NUMBER_GAS } from "./actionsFuelPumps"

const getFuelStarted = () => ({type: GET_FUELPUMPS_STARTED});
const getFuelSuccess = (payload) => ({type: GET_FUELPUMPS_SUCCESS, payload: payload});
const getFuelFailure = (error) => ({type: GET_FUELPUMPS_FAILURE, payload: {error}});
const getLock = (payload) => ({type: GET_LOCK, payload: payload});
const getLockError = (error) => ({type: GET_LOCK_ERROR, payload: {error}});
const getUnLock = (payload) => ({type: GET_UNLOCK, payload: payload});
const getUnlockError = (error) => ({type: GET_UNLOCK_ERROR, payload: {error}});
export const getNumberGas = (payload) => ({type: GET_NUMBER_GAS, payload: payload})

//Данный Thunk - получает данные по доступному топливу на выбранной колонке
export const getFuelPumps = (valRefresh) => {
    let refreshParam = valRefresh;
    return dispatch => {
        dispatch(getFuelStarted());
        axios
            .get(`${urlApi}/api-v01/fuelpumps`, {
                params: {
                    refresh: refreshParam
                }
            })
            .then(res => {
                dispatch(getFuelSuccess(res.data))
            })
            .catch(err => {
                dispatch(getFuelFailure(err.message))
            })
    }
}

//Ланный Thunk - заблакирует ТРК при наливе
export const lockGas = (numberGas) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/fuelpumps/lock/${numberGas}`, {})
            .then(res => {
                dispatch(getLock(res))
            })
            .catch(err => {
                dispatch(getLockError(err.message))
            })
    }
}

//Ланный Thunk - разблакирует ТРК если пользователь решил отказаться от выбранного топлива
export const unlockGas = (numberGas) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/fuelpumps/unlock/${numberGas}`, {})
            .then(res => {
                dispatch(getUnLock(res))
            })
            .catch(err => {
                dispatch(getUnlockError(err.message))
            })
    }
}

export default {
    getFuelStarted,
    getFuelSuccess,
    getFuelFailure,
    getFuelPumps,
    lockGas,
    unlockGas,
    getNumberGas
}