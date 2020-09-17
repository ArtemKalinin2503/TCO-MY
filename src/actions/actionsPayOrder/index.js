import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import {
    START_NEW_TRANSACTION,
    START_NEW_TRANSACTION_ERROR,
    START_PAYMENT,
    START_PAYMENT_ERROR,
    GET_WIDGET_STARTED,
    GET_WIDGET_SUCCESS,
    GET_WIDGET_ERROR,
    GET_PAYMENT,
    PAYMENT_CHOOSE_PAY,
    PAYMENT_PAY_STARTED,
    PAYMENT_PAY_SUCCESS,
    PAYMENT_PAY_ERROR,
    PAYMENT_FINISH_STARTED,
    PAYMENT_FINISH_SUCCESS,
    PAYMENT_FINISH_ERROR,
    CLEAR_CART,
    GET_CART,
    GET_WIDGET_CLEAR,
    GET_EMAIL_CHECK,
    GET_PHONE_CHECK
} from "./actionsPayOrder";

//Start транзакции
const startNewTransaction = (payload) => ({type: START_NEW_TRANSACTION, payload: payload});
const errorNewTransaction = (error) => ({type: START_NEW_TRANSACTION_ERROR, payload: {error}});
//Start оплата
const startPayment = (payload) => ({type: START_PAYMENT, payload: payload});
const startPaymentError = (error) => ({type: START_PAYMENT_ERROR, payload: {error}});
//Запрос id для далльнейшей оплаты
const getWidgetStarted = () => ({type: GET_WIDGET_STARTED});
const getWidgetSuccess = (payload) => ({type: GET_WIDGET_SUCCESS, payload: payload});
const getWidgetError = (error) => ({type: GET_WIDGET_ERROR, payload: {error}});
export const getWidgetClear = () => ({type: GET_WIDGET_CLEAR})
//Старт платежа
const paymentGet = (payload) => ({type: GET_PAYMENT, payload: payload});
const paymentChoosePay = (payload) => ({type: PAYMENT_CHOOSE_PAY, payload: payload});
const paymentPayStarted = () => ({type: PAYMENT_PAY_STARTED});
const paymentPaySuccess = (payload) => ({type: PAYMENT_PAY_SUCCESS, payload: payload});
const paymentPayError = (error) => ({type: PAYMENT_PAY_ERROR, payload: {error}});
//Окончание оплаты
const paymentFinishStarted = () => ({type: PAYMENT_FINISH_STARTED});
const paymentFinishSuccess = (payload) => ({type: PAYMENT_FINISH_SUCCESS, payload: payload});
const paymentFinishError = (error) => ({type: PAYMENT_FINISH_ERROR, payload: {error}});
//Очищение корзины корзины
const clearCart = (payload) => ({type: CLEAR_CART, payload: payload});
//Содержание корзины
const getCart = (payload) => ({type: GET_CART, payload: payload});
//Получение данных email и телефон для отправки чека
export const getEmailCheck = (payload) => ({type: GET_EMAIL_CHECK, payload: payload});
export const getPhoneCheck = (payload) => ({type: GET_PHONE_CHECK, payload: payload});

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

//Thunk - который получает содержимое корзины
export const getCartFuel = () => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/cart/0`, {
                "refresh": true
            })
            .then(res => {
                dispatch(getCart(res.data))
            })
    }
}

//Thunk - который добавляет топливо в корзину для оплаты
export const actionNewTransaction = (idGas, gradeId, nozzle, amount, InputAmount, volume, inputVolume, idWidget, email, phone) => {

    //Если пользователь ввел сумму (вернем сумму, а если пользователь не вводил сумму вернем 0)
    let getInputAmount;
    getInputAmount = InputAmount;
    if (getInputAmount !== "NaN") {
        console.log(getInputAmount)
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

    //Нужно вызвать два запроса к api друг за другом с помощью async/await
    return async dispatch => {
        try {
            //Старт оплаты
            const responseTransaction = await axios
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
            dispatch(startNewTransaction(responseTransaction))
            //Второй метод для оплаты
            const responseStartPayment = await axios
                .put(`${urlApi}/api-v01/cart/0/startpayment`)
            dispatch(startPayment(responseStartPayment))
            //Отправка Email и Phone для чека
            const sendingEmailPhone = await axios
                .put(`${urlApi}/api-v01/payment/${idWidget}/setattributes/?email=${email}/?phone=${phone}`)
            dispatch(console.log(sendingEmailPhone))
        }
        catch (e) {
            dispatch(errorNewTransaction(e.message))
        }
    }
};

//Thunk - который отправляет данные для получения чека на почту
export const setDataCheck = (idWidget, email, phone) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/payment/${idWidget}/setattributes/?email=${email}/?phone=${phone}`, {})
            .then(r => console.log(r))
    }
}

//Thunk - который получает id для дальнейшей операции оплаты товара
export const getWidgetId = () => {
    return dispatch => {
        dispatch(getWidgetStarted());
        axios
            .get(`${urlApi}/api-v01/widget`,{})
            .then(res => {
                dispatch(getWidgetSuccess(res.data))
            })
            .catch(err => {
                dispatch(getWidgetError(err.message))
            })
    }
}

//Thunk - который удаляет сессию оплаты
export const clearPayment = (payload) => {
    return dispatch => {
        axios
            .delete(`${urlApi}/api-v01/payment/${payload}/cancelpayment`)
            .then(res => {
                console.log(res)
            })
    }
}

//Thunk - который получает информацию по платежу
export const getPaymentInfo = (idWidget) => {
    return dispatch => {
        axios
            .get(`${urlApi}/api-v01/payment/${idWidget}`, {
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
                console.log(res)
                dispatch(paymentPaySuccess(res.status))
            })
            .catch(err => {
                dispatch(paymentPayError(err.message))
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
            })
            .catch(err => {
                dispatch(paymentFinishError(err.message))
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
    paymentFinishStarted,
    paymentFinishSuccess,
    paymentFinishError,
    actionClearCart,
    getCart,
    getCartFuel,
    getWidgetId,
    clearPayment,
    getWidgetClear,
    paymentGet,
    getPaymentChoosePay,
    paymentPay,
    getPaymentInfo,
    paymentFinish,
    setDataCheck,
    getEmailCheck,
    getPhoneCheck
}