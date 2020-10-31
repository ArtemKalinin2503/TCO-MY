import {
    GET_REPORT_Z_STARTED,
    GET_REPORT_Z_SUCCESS,
    GET_REPORT_Z_FAILURE,
    GET_REPORT_X_STARTED,
    GET_REPORT_X_SUCCESS,
    GET_REPORT_X_FAILURE,
    GET_REPORT_SMENA_STARTED,
    GET_REPORT_SMENA_SUCCESS,
    GET_REPORT_SMENA_FAILURE,
    GET_NUMBER_SMENA_STARTED,
    GET_NUMBER_SMENA_SUCCESS,
    GET_NUMBER_SMENA_FAILURE,
    OPEN_SMENA_SUCCESS,
    OPEN_SMENA_FAILURE,
    CLOSE_SMENA_SUCCESS,
    CLOSE_SMENA_FAILURE,
    CLEAR_ALL_REPORTS,
    GET_IS_OPEN_SMENA
} from './actionsReports';
import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';

//Z-отчет
export const getReportZStarted = () => ({type: GET_REPORT_Z_STARTED});
export const getReportZSuccess = (payload) => ({type: GET_REPORT_Z_SUCCESS, payload: payload});
export const getReportZFailure = (error) => ({type: GET_REPORT_Z_FAILURE, payload: {error}});
//X-отчет
export const getReportXStarted = () => ({type: GET_REPORT_X_STARTED});
export const getReportXSuccess = (payload) => ({type: GET_REPORT_X_SUCCESS, payload: payload});
export const getReportXFailure = (error) => ({type: GET_REPORT_X_FAILURE, payload: {error}});
//Сменна-отчет
export const getReportSmenaStarted = () => ({type: GET_REPORT_SMENA_STARTED});
export const getReportSmenaSuccess = (payload) => ({type: GET_REPORT_SMENA_SUCCESS, payload: payload});
export const getReportSmenaFailure = (error) => ({type: GET_REPORT_SMENA_FAILURE, payload: {error}});
//Номер смены
export const getNumberSmenaStarted = () => ({type: GET_NUMBER_SMENA_STARTED});
export const getNumberSmenaSuccess = (payload) => ({type: GET_NUMBER_SMENA_SUCCESS, payload: payload});
export const getNumberSmenaFailure = (error) => ({type: GET_NUMBER_SMENA_FAILURE, payload: {error}});
//Открыть смену
export const openSmenaSuccess = (payload) => ({type: OPEN_SMENA_SUCCESS, payload: payload});
export const openSmenaFailure = (error) => ({type: OPEN_SMENA_FAILURE, payload: {error}});
//Закрыть смену
export const closeSmenaSuccess = (payload) => ({type: CLOSE_SMENA_SUCCESS, payload: payload});
export const closeSmenaFailure = (error) => ({type: CLOSE_SMENA_FAILURE, payload: {error}});
//Отчистка всех отчетов
export const clearAllReports = () => ({type: CLEAR_ALL_REPORTS})
//Состояние смены Открыта/Закрыта
export const getIsOpenSmena  = (payload) => ({ type: GET_IS_OPEN_SMENA, payload: payload });

//Данный thunk - запускает Z-отчет
export const getReportZ = () => {
    return dispatch => {
        dispatch(getReportZStarted());
        axios
            .put(`${urlApi}/api-v01/fiscals/printzreport`,{})
            .then(res => {
                dispatch(getReportZSuccess(res))
            })
            .catch(err => {
                dispatch(getReportZFailure(err.message))
            });
    }
}

//Данный thunk - запускает X-отчет
export const getReportX = () => {
    return dispatch => {
        dispatch(getReportXStarted());
        axios
            .put(`${urlApi}/api-v01/fiscals/printxreport`,{})
            .then(res => {
                dispatch(getReportXSuccess(res))
            })
            .catch(err => {
                dispatch(getReportXFailure(err.message))
            });
    }
}

//Данный thunk - запускает Смена-отчет
export const getReportSmena = (id) => {
    return dispatch => {
        dispatch(getReportSmenaStarted());
        axios
            .put(`${urlApi}/api-v01/fiscals/printsessionreport/${id}`,{})
            .then(res => {
                dispatch(getReportSmenaSuccess(res))
            })
            .catch(err => {
                dispatch(getReportSmenaFailure(err.message))
            });
    }
}

//Данный thunk - получает номер Смены
export const getDataSmena = () => {
    return dispatch => {
        dispatch(getNumberSmenaStarted());
        axios
            .get(`${urlApi}/api-v01/auth/getsessionnumber`,{})
            .then(res => {
                dispatch(getNumberSmenaSuccess(res.data))
                dispatch(getIsOpenSmena(!res.data.isClose))
            })
            .catch(err => {
                dispatch(getNumberSmenaFailure(err.message))
            });
    }
}

//Данный thunk - открывает смену
export const setOpenSmena = (numberSmena) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/auth/setsessionnumber?number=${numberSmena}`,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                dispatch(openSmenaSuccess(res))
            })
            .catch(err => {
                dispatch(openSmenaFailure(err.message))
            });
    }
}

//Данный thunk - закрывает смену
export const setCloseSmena = () => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/auth/releasesessionnumber`,{})
            .then(res => {
                dispatch(closeSmenaSuccess(res))
            })
            .catch(err => {
                dispatch(closeSmenaFailure(err.message))
            });
    }
}

export default {
    getReportZ,
    getReportX,
    getReportSmena,
    getDataSmena,
    setOpenSmena,
    setCloseSmena,
    clearAllReports
}