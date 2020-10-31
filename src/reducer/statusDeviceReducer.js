import {GET_STATUS_DEVICE_STARTED, GET_STATUS_DEVICE_SUCCESS, GET_STATUS_DEVICE_FAILURE, GET_MESSAGES} from "../actions/actionsStatusDevice/actionsStatusDevice";

const initialState = {
    statusDevice: null,
    loadingStatus: false,
    error: null,
    messages: "",
    enabledGadgetPay: false
}

export default function StatusDeviceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATUS_DEVICE_STARTED:
            return {
                ...state,
                loadingStatus: true
            };
        case GET_STATUS_DEVICE_SUCCESS:
            let statusDevice = action.payload;
            let enabledGadgetPay = false;
            let enabledGadget = {
                cashEnable: false,
                fleetEnable: false,
                bankEnable: false
            }
            //Проверка статуса оборудования для оплаты
            if (statusDevice) {
                for (let i = 0; i < statusDevice.length; i++) {
                    if (statusDevice[i].type === "CASH" && statusDevice[i].isEnable === false) {
                        enabledGadget.cashEnable = false
                    } else if (statusDevice[i].type === "CASH" && statusDevice[i].isEnable === true) {
                        enabledGadget.cashEnable = true
                    }
                    if (statusDevice[i].type === "FLEET" && statusDevice[i].isEnable === false) {
                        enabledGadget.fleetEnable = false
                    } else if (statusDevice[i].type === "FLEET" && statusDevice[i].isEnable === true) {
                        enabledGadget.fleetEnable = true
                    }
                    if (statusDevice[i].type === "BANK" && statusDevice[i].isEnable === false) {
                        enabledGadget.bankEnable = false
                    } else if (statusDevice[i].type === "BANK" && statusDevice[i].isEnable === true) {
                        enabledGadget.bankEnable = true
                    }
                }
            }
            //Если оборудование для оплаты не доступно
            if (!enabledGadget.cashEnable && !enabledGadget.fleetEnable && !enabledGadget.bankEnable) {
                enabledGadgetPay = false
            } else {
                enabledGadgetPay = true
            }

            return {
                ...state,
                statusDevice: action.payload,
                enabledGadgetPay: enabledGadgetPay,
                loadingStatus: false
            };
        case GET_STATUS_DEVICE_FAILURE:
            return {
                ...state,
                loadingStatus: false,
                error: action.payload.error,
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        default:
            return state
    }
}