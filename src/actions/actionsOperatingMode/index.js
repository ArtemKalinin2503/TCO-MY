import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import { GET_OPTMODE_STARTED, GET_OPTMODE_SUCCESS, GET_OPTMODE_FAILURE } from './actionsOperatingMode'

//Описание actions для получения статуса Проверки режима работы
const getOptStarted = () => ({type: GET_OPTMODE_STARTED});
const getOptMode = (payload) => ({type: GET_OPTMODE_SUCCESS, payload: payload});
const getOptFailure = (error) => ({type: GET_OPTMODE_FAILURE, payload: {error}});

//Данный Thunk делает запрос к api для получения проверки режима работы (требование задачи ТСО-605)
export const getOpt = () => {
    return dispatch => {
        dispatch(getOptStarted());
        axios
            .get(`${urlApi}/api-v01/widget/mode`, {
                params: {
                    refresh: true
                }
            })
            .then(res => {
                dispatch(getOptMode(res.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getOptFailure(err.message))
            })
    }
}

export default {
    getOpt
}