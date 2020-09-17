import { GET_DATA_SELECT_FUEL, CLEAR_DATA_SELECT_FUEL, GET_PARAMS_GAS_FUEL, GET_TYPE_PAY } from "./actionsSelectFuel";

export const getDataSelectFuel = (numberGas, fuelId, grades, numberPistol) => ({type: GET_DATA_SELECT_FUEL, numberGas: numberGas, fuelId: fuelId, grades: grades, numberPistol: numberPistol});
export const clearDataSelectFuel = () => ({type: CLEAR_DATA_SELECT_FUEL});
export const getParamsGasFuel = (numberGas, numberFuel, idGradesFuel, typePay) => ({type: GET_PARAMS_GAS_FUEL, numberGas: numberGas, numberFuel: numberFuel, idGradesFuel: idGradesFuel, typePay: typePay});
export const getTypePay = (typePay) => ({type: GET_TYPE_PAY, typePay: typePay});

export default {
    getDataSelectFuel,
    clearDataSelectFuel,
    getParamsGasFuel,
    getTypePay
}