import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import {GET_ORDER_FUEL, GET_ORDER_DATA, CLEAR_ORDER_DATA, GET_ERROR_DATA_ORDER, GET_SELECT_DATA_FUEL} from "./actionsOrderFuel";

export const getOrderFuel = (valueSum, valueLitres) => ({type: GET_ORDER_FUEL, valueSum: valueSum, valueLitres: valueLitres});
export const getOrderData = (payload) => ({type: GET_ORDER_DATA, payload: payload});
export const clearOrderData = () => ({type: CLEAR_ORDER_DATA});
export const getErrorDataOrder = (err) => ({type: GET_ERROR_DATA_ORDER, payload: err});
export const getSelectDataFuel = (numberGas, nameFuel) => ({type: GET_SELECT_DATA_FUEL, numberGas: numberGas, nameFuel: nameFuel })

//Данный thunk - получает Цену или Литры за топливо
export const getDataFuelOrder = (valueSum, valueLitres, gradeId, nozzle, price, calculation, valueOrderFuel) => {
    return dispatch => {
        axios
            .post(`${urlApi}/api-v01/fuelpumps/calculate/${valueSum}`,{
                "gradeId": gradeId,
                "nozzle": nozzle,
                "calculation": calculation,
                "order": {
                    "inputAmount": 0,
                    "inputVolume": 0,
                    "volume": valueLitres,
                    "amount": valueOrderFuel,
                    "price": price
                },
                "fitBackOrder": {
                    "inputAmount": 0,
                    "inputVolume": 0,
                    "volume": 0,
                    "amount": 0,
                    "price": 0
                }
            })
            .then(res => {
                dispatch(getOrderData(res.data))
            })
            .catch(err => {
                dispatch(getErrorDataOrder(err.message))
                dispatch(clearOrderData())
            });
    }
}

export default {
    getOrderFuel,
    getOrderData,
    getDataFuelOrder,
    clearOrderData
}