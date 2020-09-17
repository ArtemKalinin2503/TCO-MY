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
} from "../actions/actionsPayOrder/actionsPayOrder";

const initialState = {
    //Запуск новой транзакции
    responseNewTransaction: null,
    errorNewTransaction: null,
    //Запуск новой оплаты
    responsePayment: null,
    errorPayment: null,
    //id сессии оплаты
    widgetId: 0,
    isLoadedWidget: false,
    errorWidget: null,
    //Запускает этап оплаты
    paymentInfo: [],
    payStatus: false,
    responseChoosePay: null,
    isLoadedPay: false,
    responsePay: "",
    errorPay: null,
    //Успешное завершение печати чека
    isLoadedFinishPay: false,
    responseFinishPay: null,
    errorFinishPay: null,
    //Статус корзины
    statusCart: null,
    //Содержание корзины
    cart: [],
    //Данные для отправки чека
    emailCheck: "",
    phoneCheck: ""
}

export default function PayOrderReducer(state = initialState, action) {
    switch (action.type) {
        case START_NEW_TRANSACTION:
            return {
              ...state,
              responseNewTransaction: action.payload
            };
        case START_NEW_TRANSACTION_ERROR:
            return {
                ...state,
                errorNewTransaction: action.payload.error,
            };
        case START_PAYMENT:
            return {
                ...state,
                responsePayment: action.payload
            };
        case START_PAYMENT_ERROR:
            return {
                ...state,
                errorPayment: action.payload.error,
            };
        case GET_WIDGET_STARTED:
            return {
                ...state,
                isLoadedWidget: true
            };
        case GET_WIDGET_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                widgetId: action.payload,
                isLoadedWidget: false
            }
        case GET_WIDGET_ERROR:
            return {
                ...state,
                isLoadedWidget: false,
                errorWidget: action.payload.error,
            }
        case GET_WIDGET_CLEAR:
            return {
                ...state,
                widgetId: 0
            }
        case GET_PAYMENT:
            let infoPay = action.payload;
            let checkedPay = false;
            if (infoPay.allowClosing) {
                checkedPay = true
            } else {
                checkedPay = false
            }
            return {
                ...state,
                paymentInfo: action.payload,
                payStatus: checkedPay
            }
        case PAYMENT_CHOOSE_PAY:
            return  {
                ...state,
                responseChoosePay: action.payload
            }
        case PAYMENT_PAY_STARTED:
            return {
                ...state,
                isLoadedPay: true
            }
        case PAYMENT_PAY_SUCCESS:
            return {
                ...state,
                responsePay: action.payload,
                isLoadedPay: false
            }
        case PAYMENT_PAY_ERROR:
            return {
                ...state,
                errorPay: action.payload.error,
                isLoadedPay: false
            };
        case PAYMENT_FINISH_STARTED:
            return {
                ...state,
                isLoadedFinishPay: true
            };
        case PAYMENT_FINISH_SUCCESS:
            return {
                ...state,
                responseFinishPay: action.payload,
                isLoadedFinishPay: false
            };
        case PAYMENT_FINISH_ERROR:
            return {
                ...state,
                errorFinishPay: action.payload.error,
                isLoadedFinishPay: false
            };
        case CLEAR_CART:
            return {
                ...state,
                statusCart: action.payload
            };
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            };
        case GET_EMAIL_CHECK:
            return {
                ...state,
                emailCheck: action.payload
            };
        case GET_PHONE_CHECK:
            return {
              ...state,
              phoneCheck: action.payload
            };
        default:
            return state
    }
}