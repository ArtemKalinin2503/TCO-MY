import {GET_ORDER_FUEL, GET_ORDER_DATA, CLEAR_ORDER_DATA, GET_SELECT_DATA_FUEL} from "../actions/actionsOrderFuel/actionsOrderFuel";

const initialState = {
    //Данные указаные в полях Сумма и Литры
    orderFuel: {
        sum: 0,
        litres: 0,
    },
    //Ответ сервера о стоимости топлива и количестве литров
    responseDataOrder: {
        totalLitres: null,
        totalPrice: null,
        volume: null,
        amount: null,
        price: null
    },
    //Выбранная колонка и топливо
    selectFuel: {
      numberGas: 0,
      nameFuel: ""
    }
}

//Данный reducer - получает данные о введенной Сумме или Литрах, а также обрабатывает ответ от api
export default function OrderFuelReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_FUEL:
            let orderFuel;
            orderFuel = {
                sum: action.valueSum,
                litres: action.valueLitres
            }
            return {
                ...state,
                orderFuel: orderFuel
            };
        case GET_ORDER_DATA:
            let dataOrder = action.payload;
            console.log(dataOrder)
            let volumeLitres = dataOrder.fitBackOrder.volume / 100;
            //let amountPrice = dataOrder.fitBackOrder.amount / 100;
            let amountPrice = dataOrder.fitBackOrder.inputAmount / 100;
            let amountPriceMath = Math.round(amountPrice); //Округляем сумму до целого
            let newDataOrderFuel = {
                totalLitres: volumeLitres,
                totalPrice: amountPriceMath,
                volume: dataOrder.fitBackOrder.volume,
                amount: dataOrder.fitBackOrder.amount,
                price: dataOrder.fitBackOrder.price,
                maxMoney: dataOrder.maxMoney,
                maxVolume: dataOrder.maxVolume
            }
            return {
                ...state,
                responseDataOrder: newDataOrderFuel
            };
        case CLEAR_ORDER_DATA:
            return {
                ...state,
                responseDataOrder: {
                    totalLitres: 0,
                    totalPrice: 0
                }
            };
        case GET_SELECT_DATA_FUEL:
            let changeSelectFuel = {
                numberGas: action.numberGas,
                nameFuel: action.nameFuel
            }
            return {
                ...state,
                selectFuel: changeSelectFuel
            }
        default:
            return state
    }
}

