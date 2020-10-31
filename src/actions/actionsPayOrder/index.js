import { axiosInstance as axios } from "../../utils/utils";
import { urlApi } from '../../utils/globalConst';
import {
    START_NEW_TRANSACTION,
    START_NEW_TRANSACTION_ERROR,
    START_PAYMENT,
    START_PAYMENT_ERROR,
    GET_WIDGET_STARTED,
    GET_WIDGET_SUCCESS,
    GET_WIDGET_ERROR,
    GET_PAYMENT,
    CLEAR_PAYMENT_INFO,
    PAYMENT_CHOOSE_PAY,
    PAYMENT_PAY_STARTED,
    PAYMENT_PAY_SUCCESS,
    PAYMENT_PAY_ERROR,
    PAYMENT_PAY_CLEAR,
    PAYMENT_FINISH_STARTED,
    PAYMENT_FINISH_SUCCESS,
    PAYMENT_FINISH_ERROR,
    CLEAR_CART,
    CLEAR_CART_STORE,
    GET_CART,
    GET_CART_ERROR,
    GET_WIDGET_CLEAR,
    GET_EMAIL_CHECK,
    GET_PHONE_CHECK,
    GET_PAYMENT_STATUS,
    GET_PAYMENT_STATUS_ERROR,
    GET_IS_CARD_ENABLED,
} from "./actionsPayOrder";
import { GET_NUMBER_GAS } from "../actionsFuelPumps/actionsFuelPumps";

//Start транзакции
const startNewTransaction = (payload) => ({ type: START_NEW_TRANSACTION, payload: payload });
const errorNewTransaction = (error) => ({ type: START_NEW_TRANSACTION_ERROR, payload: { error } });
//Start оплата
const startPayment = (payload) => ({ type: START_PAYMENT, payload: payload });
const startPaymentError = (error) => ({ type: START_PAYMENT_ERROR, payload: { error } });
//Запрос id для далльнейшей оплаты
const getWidgetStarted = () => ({ type: GET_WIDGET_STARTED });
const getWidgetSuccess = (payload) => ({ type: GET_WIDGET_SUCCESS, payload: payload });
const getWidgetError = (error) => ({ type: GET_WIDGET_ERROR, payload: { error } });
export const getWidgetClear = () => ({ type: GET_WIDGET_CLEAR })
//Старт платежа
const paymentGet = (payload) => ({ type: GET_PAYMENT, payload: payload });
const paymentChoosePay = (payload) => ({ type: PAYMENT_CHOOSE_PAY, payload: payload });
const paymentPayStarted = () => ({ type: PAYMENT_PAY_STARTED });
const paymentPaySuccess = (payload) => ({ type: PAYMENT_PAY_SUCCESS, payload: payload });
const paymentPayError = (error) => ({ type: PAYMENT_PAY_ERROR, payload: { error } });
export const paymentPayClear = () => ({ type: PAYMENT_PAY_CLEAR });
export const clearPaymentInfo = () => ({ type: CLEAR_PAYMENT_INFO });
//Окончание оплаты
const paymentFinishStarted = () => ({ type: PAYMENT_FINISH_STARTED });
const paymentFinishSuccess = (payload) => ({ type: PAYMENT_FINISH_SUCCESS, payload: payload });
const paymentFinishError = (error) => ({ type: PAYMENT_FINISH_ERROR, payload: { error } });
//Очищение корзины корзины
const clearCart = (payload) => ({ type: CLEAR_CART, payload: payload });
export const clearCartStore = () => ({ type: CLEAR_CART_STORE });
//Содержание корзины
const getCart = (payload) => ({ type: GET_CART, payload: payload });
const getCartError = (error) => ({ type: GET_CART_ERROR, payload: { error } });
//Получение данных email и телефон для отправки чека
export const getEmailCheck = (payload) => ({ type: GET_EMAIL_CHECK, payload: payload });
export const getPhoneCheck = (payload) => ({ type: GET_PHONE_CHECK, payload: payload });
//Получения данных с сервера если оплата не прошла
const getPaymentStatus = (payload) => ({ type: GET_PAYMENT_STATUS, payload: payload });
const getPaymentStatusError = (error) => ({ type: GET_PAYMENT_STATUS_ERROR, payload: { error } });

const getNumberGasClear = (payload) => ({ type: GET_NUMBER_GAS, payload: payload });

//Получено ли разрешение на переход с главной страницы по катре
export const getIsCartEnabled = (payload) => ({ type: GET_IS_CARD_ENABLED, payload: payload });


//Thunk - который очищает корзину
export const actionClearCart = () => {
    return dispatch => {
        axios
            .delete(`${urlApi}/api-v01/cart/0/clear`, {})
            .then(res => {
                dispatch(clearCart(res.data))
            })
    }
}

//Thunk - который удаляет сессию оплаты
export const clearPayment = (payload) => {
    return dispatch => {
        axios
            .delete(`${urlApi}/api-v01/payment/${payload}/cancelpayment`)
            .then(res => {
                dispatch(actionClearCart())
            })
    }
}

//Thunk - который получает id для дальнейшей операции оплаты товара (typePage - чтобы проверка работала только с домашней страницы)
export const getWidgetId = (typePage) => {
    return dispatch => {
        dispatch(getWidgetStarted());
        axios
            .get(`${urlApi}/api-v01/widget?refresh=true`, {})
            .then(res => {
                dispatch(getWidgetSuccess(res.data))
                if (typePage === "HomePage") {
                    if (res.data.type === "PAYMENT") {
                        dispatch(clearPayment(res.data.id))
                    }
                }
            })
            .catch(err => {
                dispatch(getWidgetError(err.message))
            })
    }
}


//Thunk - который получает содержимое корзины (typePage - чтобы проверка работала только с домашней страницы)
export const getCartFuel = (typePage) => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/cart/0`, {
                //timeout: 3000,
                params: {
                    refresh: true
                }
            })
            .then(res => {
                dispatch(getCart(res.data))
                if (typePage === "HomePage") {
                    if (res.data.status === "FILL" && res.data.items.length) {
                        dispatch(actionClearCart())
                    }
                    if (res.data.status === "PAY" || res.data.status === "ERR") {
                        dispatch(getWidgetId("HomePage"))
                    }
                    if (res.data.status === "RET" && res.data.length) {
                        dispatch(getCartError('cart status RET'))
                    }
                    if (res.data.status === "PRN") {
                        dispatch(getWidgetId("HomePage"))
                    }
                    //Про статусы написано в задаче ТСО-719
                    let _IsCartEnabled = res.data.status !== "PRN" && (res.data.status === "NONE" || res.data.status === "VIEW" || res.data.status.length === 0);
                    dispatch(getIsCartEnabled(_IsCartEnabled));
                }
            })
    }
}

//Thunk - который добавляет топливо в корзину для оплаты
export const actionNewTransaction = (idGas, gradeId, nozzle, amount, InputAmount, volume, inputVolume) => {

    //Если пользователь ввел сумму (вернем сумму, а если пользователь не вводил сумму вернем 0)
    let getInputAmount;
    getInputAmount = InputAmount;
    if (getInputAmount !== "NaN") {
        getInputAmount = InputAmount
    } else {
        getInputAmount = 0
    }

    //Если пользователь ввел количетсво литров (вернем количество литров, а если пользователь не вводил литры вернем 0)
    let getInputVolume;
    getInputVolume = inputVolume;
    if (getInputVolume) {
        getInputVolume = inputVolume
    } else {
        getInputVolume = 0
    }

    return dispatch => {
        axios
            .post(`${urlApi}/api-v01/fuelpumps/newtransaction/${idGas}`, {
                "gradeId": gradeId,
                "nozzle": nozzle,
                "order": {
                    "inputAmount": getInputAmount,
                    "InputVolume": getInputVolume.toString(),
                    "volume": volume.toString(),
                    "amount": amount,
                }
            })
            .then(res => {
                dispatch(startNewTransaction(res))
                if (res.status >= 200) {
                    dispatch(getStartPayment())
                }
            })
            .catch(err => {
                dispatch(errorNewTransaction(err.message))
            })
    }
};

//Thunk - который вызывеет метод startpayment
export const getStartPayment = () => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/cart/0/startpayment`)
            .then(res => {
                dispatch(startPayment(res))
            })
    }
}

//Thunk - который отправляет данные для получения чека на почту или телефон
export const setEmailPhoneCheck = (idWidget, email, phone) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/payment/${idWidget}/setattributes/?email=${email}&phone=${phone}`)
            .then(r => console.log(r))
    }
}

//Thunk - который получает информацию по платежу
export const getPaymentInfo = (idWidget) => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/payment/${idWidget}`, {
                timeout: 3000,
                params: {
                    refresh: true
                }
            })
            .then(res => {
                dispatch(paymentGet(res.data))
            })
    }
}

//Thunk - который вызываем перед payment/pay
export const getPaymentChoosePay = (idWidget, type) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/payment/${idWidget}/choosepaymenttype/${type}`, {})
            .then(res => {
                dispatch(paymentChoosePay(res))
            })
    }
}

//Thunk - который начинает оплату (вызываеться после newtransaction, startpayment, widget)
export const paymentPay = (idWidget, type, sum) => {
    return dispatch => {
        dispatch(paymentPayStarted());
        axios
            .post(`${urlApi}/api-v01/payment/${idWidget}/pay/${type}/0?amount=${sum}`, {})
            .then(res => {
                dispatch(paymentPaySuccess(res.status))
            })
            .catch(err => {
                dispatch(paymentPayError(err.message))
                if (err) {
                    dispatch(lastPaymentStatus(idWidget))
                }
            })
    }
}

//Thunk - который заканчивает процесс оплаты
export const paymentFinish = (idWidget) => {
    return dispatch => {
        dispatch(paymentFinishStarted());
        axios
            .put(`${urlApi}/api-v01/payment/${idWidget}/finish`, {})
            .then(res => {
                dispatch(paymentFinishSuccess(res))
                if (res.status >= 200) {
                    dispatch(getNumberGasClear(null))
                }
            })
            .catch(err => {
                dispatch(paymentFinishError(err.message))
            })
    }
}

//Thunk - который получает данные в случае если оплата не прошла
export const lastPaymentStatus = (idWidget) => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/payment/${idWidget}/lastpaymentstatus`, {})
            .then(res => {
                dispatch(getPaymentStatus(res))
            })
            .catch(err => {
                dispatch(getPaymentStatusError(err.message))
            })
    }
}

export default {
    startNewTransaction,
    errorNewTransaction,
    actionNewTransaction,
    startPayment,
    startPaymentError,
    getWidgetStarted,
    getWidgetSuccess,
    getWidgetError,
    paymentChoosePay,
    paymentPayStarted,
    paymentPaySuccess,
    paymentPayError,
    paymentPayClear,
    paymentFinishStarted,
    paymentFinishSuccess,
    paymentFinishError,
    actionClearCart,
    clearCartStore,
    getCart,
    getCartError,
    getCartFuel,
    getWidgetId,
    clearPayment,
    getWidgetClear,
    paymentGet,
    clearPaymentInfo,
    getPaymentChoosePay,
    paymentPay,
    getPaymentInfo,
    paymentFinish,
    getEmailCheck,
    getPhoneCheck,
    setEmailPhoneCheck,
    lastPaymentStatus
}