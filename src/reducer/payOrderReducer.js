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
    GET_IS_CARD_ENABLED
} from "../actions/actionsPayOrder/actionsPayOrder";

const initialState = {
    //Запуск новой транзакции
    responseNewTransaction: null,
    errorNewTransaction: null,
    //Запуск новой оплаты
    responsePayment: null,
    errorPayment: null,
    //id сессии оплаты
    widgetId: {},
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
    cartError: null,
    //Данные для отправки чека
    emailCheck: "",
    phoneCheck: "",
    //Данные о ошибке если оплата не прошла
    paymentStatus: {},
    paymentStatusError: null,
    //Получено ли разрешение на переход с главной страницы по катре
    IsCartEnabled: false
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
                widgetId: {}
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
        case CLEAR_PAYMENT_INFO:
            return {
                ...state,
                paymentInfo: []
            }
        case PAYMENT_CHOOSE_PAY:
            return {
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
        case PAYMENT_PAY_CLEAR:
            return {
                ...state,
                isLoadedPay: false,
                responsePay: "",
                errorPay: null
            }
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
        case CLEAR_CART_STORE:
            return {
                ...state,
                cart: [],
                cartError: null
            }
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            };
        case GET_CART_ERROR:
            return {
                ...state,
                cartError: action.payload.error
            }
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
        case GET_PAYMENT_STATUS:
            return {
                ...state,
                paymentStatus: action.payload
            }
        case GET_PAYMENT_STATUS_ERROR:
            return {
                ...state,
                paymentStatusError: action.payload.error,
            };
        case GET_IS_CARD_ENABLED:
            return {
                ...state,
                IsCartEnabled: action.payload,
            };
        default:
            return state
    }
}