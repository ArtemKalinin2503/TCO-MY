import {
    FINDCHECK_RESET, FINDCHECK_STARTED, FINDCHECK_STOPPED, FINDCHECK_FAILED,
    FINDCHECK_START_WAIT, FINDCHECK_WAIT_ERROR, FINDCHECK_SCANNED,
    FINDCHECK_START_SEARCH, FINDCHECK_SEARCH_ERROR, FINDCHECK_FOUND
} from "./actionsFindCheck";
import {axiosInstance as axios} from "../../utils/utils";
import {default as UUID} from "uuid";
import {makeUrl} from "../../utils/utils";

const notifyFindCheckReset = () => ({type: FINDCHECK_RESET});
const notifyFindCheckStarted = () => ({type: FINDCHECK_STARTED});
const notifyFindCheckStopped = () => ({type: FINDCHECK_STOPPED});
const notifyFindCheckFailed  = () => ({type: FINDCHECK_FAILED});

const notifyFindCheckStartWait = () => ({type: FINDCHECK_START_WAIT});
const notifyFindCheckWaitError = (error) => ({type: FINDCHECK_WAIT_ERROR, payload: {error}});
const notifyFindCheckScanned   = (id) => ({type: FINDCHECK_SCANNED, payload: {id}});

const notifyFindCheckStartSearch = () => ({type: FINDCHECK_START_SEARCH});
const notifyFindCheckSearchError = (error) => ({type: FINDCHECK_SEARCH_ERROR, payload: {error}});
const notifyFindCheckFound       = (id) => ({type: FINDCHECK_FOUND, payload: {id}});

const reqWaitFindCheckUids = new Set();

//Данный Thunk - reduser reset
export const resetFindCheck = () => {
    return dispatch => {
        dispatch(notifyFindCheckReset());
    }
}

//Данный Thunk - Запускает Поиск чека для возврата (чтение QR-code)
export const startFindCheck = () => {
    return dispatch => {
        dispatch(notifyFindCheckReset());
        axios
            .put(makeUrl('/findcart/startfindcart'), {})
            .then(res => {
                dispatch(notifyFindCheckStarted());
            })
            .catch(err => {
                dispatch(notifyFindCheckFailed());
            });
    }
}

//Данный Thunk - Останавливает Поиск чека для возврата
export const stopFindCheck = () => {
    return dispatch => {
        reqWaitFindCheckUids.clear();
        axios
            .put(makeUrl('/findcart/stopfindcart'), {})
            .then(res => {
                dispatch(notifyFindCheckStopped());
            })
            .catch(err => {
                console.log('stopFindCheck failed: ', err);
            });
    }
}

//Данный Thunk - запрос на ожидание отсканированного чека
export const waitFindCheck = () => {
    return dispatch => {
        console.log('*** waitFindCheck started');
        dispatch(notifyFindCheckStartWait());
        let uuid = UUID.v4();
        reqWaitFindCheckUids.add(uuid);
        axios
            .put(makeUrl('/findcart/filter?refresh=false'), {})
            .then(res => {
                console.log(uuid);
                if (reqWaitFindCheckUids.has(uuid)) {
                    if (res.status === 200) {
                        if (res.data && res.data.lines && res.data.lines.length === 1) {
                            let id = res.data.lines[0].id;
                            dispatch(notifyFindCheckScanned(id));
                            return;
                        }
                    }
                    dispatch(notifyFindCheckSearchError(res.status));
                }
            })
            .catch(err => {
                if (reqWaitFindCheckUids.has(uuid)) {
                    console.log('waitFindCheck catch: ', err);
                    dispatch(notifyFindCheckWaitError(err.response.status));
                }
            })
    }
}

//Данный Thunk - запрос на поиск чека
export const getFindCheck = (fp) => {
    return dispatch => {
        dispatch(notifyFindCheckStartSearch());
        axios
            .put(makeUrl(`/findcart/filter?refresh=true&fd=${fp}`), {})
            .then(res => {
                if (res.status === 200) {
                    if (res.data && res.data.lines && res.data.lines.length === 1) {
                        let id = res.data.lines[0].id;
                        console.log('getFindCheck: ', id);
                        dispatch(notifyFindCheckFound(id));
                        return;
                    }
                }
                else if (res.status === 204) {
                    dispatch(notifyFindCheckFound(""));
                    return;
                }
                console.log('getFindCheck error: ', res);
                dispatch(notifyFindCheckSearchError(res.status));
            })
            .catch(err => {
                console.log('getFindCheck catch: ', err);
                dispatch(notifyFindCheckSearchError(err.response.status));
            })
    }
}

export default {
    resetFindCheck,
    startFindCheck,
    stopFindCheck,
    waitFindCheck,
    getFindCheck
}