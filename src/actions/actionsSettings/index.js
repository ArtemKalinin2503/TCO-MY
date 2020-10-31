import {GET_UI_SETTINGS_STARTED, GET_UI_SETTINGS_SUCCESS, GET_UI_SETTINGS_ERROR} from './actionsSettings';

import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';

const getSettingsStarted = () => ({ type: GET_UI_SETTINGS_STARTED });
const getSettingsSuccess = (payload) => ({ type: GET_UI_SETTINGS_SUCCESS, payload: payload });
const getSettingsError = (error) => ({ type: GET_UI_SETTINGS_ERROR, payload: { error } });

export const getUiSettings = () => {
    return dispatch => {
        dispatch(getSettingsStarted());
        axios
            .get(`${urlApi}/api-v01/settings?path=UiSettings`,{})
            .then(res => {
                dispatch(getSettingsSuccess(res))
            })
            .catch(err => {
                dispatch(getSettingsError(err.message))
            });
    }
}