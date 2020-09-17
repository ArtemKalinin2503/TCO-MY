import {GET_DATA_SELECT_FUEL, CLEAR_DATA_SELECT_FUEL, GET_PARAMS_GAS_FUEL, GET_TYPE_PAY} from "../actions/actionsSelectFuel/actionsSelectFuel";

const initialState = {
    selectFuel: {
        numberGas: "",
        fuelId: "",
        fuelCode: "",
        fuelName: "",
        fuelLongName: "",
        fuelColor: "",
        isDisabled: false,
        fuelPrice: "",
        gradeId: ""
    },
    paramsGasFuel: {
        numberGasParams: "",
        numberFuelParams: "",
        idGradesFuel: "",
        typePay: ""
    }

}

export default function SelectFuelReducer (state = initialState, action) {
    switch (action.type) {
        //Данный action соберет все данные по выбранной колонке и топливу (такой подход так как в api нет метода)
        case GET_DATA_SELECT_FUEL:
            let numberGas = action.numberGas;
            let fuelId = action.fuelId;
            let grades = action.grades;
            let numberPistol = action.numberPistol;
            let dataFuelSelect;
            for (let key in grades) {
                if (grades[key].id === fuelId) {
                    dataFuelSelect = {
                        numberGas: numberGas,
                        fuelId: fuelId,
                        fuelCode: grades[key].fuelCode,
                        fuelName: grades[key].fuelName,
                        fuelLongName: grades[key].fuelLongName,
                        fuelColor: grades[key].color,
                        isDisabled: grades[key].isDisabled,
                        fuelPrice: grades[key].price,
                        gradeId: fuelId,
                        numberPistol: numberPistol
                    }
                }
            }
            return  {
                ...state,
                selectFuel: dataFuelSelect
            };
        case CLEAR_DATA_SELECT_FUEL:
            let dataSelectFuel = initialState.selectFuel;
            for (let key in dataSelectFuel) {
                dataSelectFuel[key] = ""
            }
            return {
                ...state,
                selectFuel: dataSelectFuel
            };
        //Данный action принимает номер выбранной колонки и номер выбранного топлива
        case GET_PARAMS_GAS_FUEL:
            let newParamsGasFuel = {
                numberGasParams: action.numberGas,
                numberFuelParams: action.numberFuel,
                idGradesFuel: action.idGradesFuel,
                typePay: action.typePay
            }
            return {
                ...state,
                paramsGasFuel: newParamsGasFuel
            };
        //Action который используем для типа оплаты Карты Лояльности (при использование карты лояльности нужно изменить тип оплаты на LOYALTY)
        case GET_TYPE_PAY: {
            let selectTypePay = action.typePay;
            let getParamsGasFuel = {
                numberGasParams: state.paramsGasFuel.numberGas,
                numberFuelParams: state.paramsGasFuel.numberFuel,
                idGradesFuel: state.paramsGasFuel.idGradesFuel,
                typePay: selectTypePay
            }
            return {
                ...state,
                paramsGasFuel: getParamsGasFuel
            }
        }
        default:
            return state;
    }
}