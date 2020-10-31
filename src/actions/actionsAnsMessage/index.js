import { axiosInstance as axios } from "../../utils/utils";
import { urlApi } from '../../utils/globalConst';
import { GET_MESSAGESNOW, ANSWER_MASSIVE, LENGTH_MASSIVE, GET_ANSWER_TEXT_MESSAGES, ANSWER_MESSAGES } from "./actionsAnsMessage";
export const getMessagesNow = (payload) => ({ type: GET_MESSAGESNOW, payload: payload });
export const getAnswerMassive = (payload) => ({ type: ANSWER_MASSIVE, payload: payload });
export const getlengthMassive = (payload) => ({ type: LENGTH_MASSIVE, payload: payload });

export const getAnsTextMessages = (payload) => ({ type: GET_ANSWER_TEXT_MESSAGES, payload: payload });
export const getAnswerMessages = (payload) => ({ type: ANSWER_MESSAGES, payload: payload });

//Данный thunk - получает данные о статусе корзины
export const getDataNowMessages = () => {
    return dispatch => {
        dispatch(getAnswerMassive(false))
        //dispatch(getAnsTextMessages(""));
        axios
            .get(`${urlApi}/api-v01/messages`, {
                params: {
                    refresh: true
                }
            })
            .then(res => {
                dispatch(getlengthMassive(res.data.messages.length))
                dispatch(getMessagesNow(res.data.messages))
                dispatch(getAnswerMassive(true))
            })
            .catch(err => {
                dispatch(getlengthMassive(0))
                dispatch(getAnswerMassive(true))
            })
    }
}
//Данный thunk - отправляет данные id сообщения и значение кнопки
export const putMessagesID = (Item, Btn) => {
    return dispatch => {
        dispatch(getAnswerMassive(false))
        dispatch(getAnswerMessages(false))
        axios
            .put(`${urlApi}/api-v01/messages/${Item.id}?pushed=${Btn}`, {
            })
            .then(res => {
                dispatch(getAnsTextMessages(`id: ${Item.id} message: ${Item.message} answer: ${res.data}`));
                dispatch(getAnswerMessages(true))
            })
            .catch(err => {
                dispatch(getAnsTextMessages(`id: ${Item.id} message: ${Item.message} error: ${err.message}`));
                dispatch(getAnswerMessages(true))
            })
    }
}
export const clearAnsMessages = () => {
    return dispatch => {
        dispatch(getAnsTextMessages(""));
    }
}
export default {
    getDataNowMessages,
    putMessagesID,

    getMessagesNow,
    getAnswerMassive,

    getAnsTextMessages,
    getAnswerMessages,

    clearAnsMessages
}