import { GET_FUELPUMPS_STARTED, GET_FUELPUMPS_SUCCESS, GET_FUELPUMPS_FAILURE, GET_LOCK, GET_LOCK_ERROR, GET_UNLOCK, GET_UNLOCK_ERROR, GET_NUMBER_GAS } from '../actions/actionsFuelPumps/actionsFuelPumps'

const initialState = {
    fuelPumps: [],
    filterFuelPumps: [],
    numberGasPistolUp: null,
    loadingFuelPumps: false,
    error: "",
    responseLock: "",
    errorLock: "",
    responseUnLock: "",
    errorUnLock: "",
    numberSelectGas: 0,
}

export default function FuelPumpsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FUELPUMPS_STARTED:
            return {
                ...state,
                loadingFuelPumps: true,
            };
        case GET_FUELPUMPS_SUCCESS:
            //Так как нужно отсортировать топливо по id
            let fuelPumpsData;
            let newFuelPumpsData = action.payload;
            newFuelPumpsData.grades.sort((prev, next) => prev.id - next.id);
            fuelPumpsData = newFuelPumpsData;
            //Дополню ответ от метода информацией о снятом пистолете
            let gas = fuelPumpsData.pumps; //Топливо (пистолеты)
            let gradeIdSelectPistol = "";
            let numberGasPistolUp = null;
            gas.map((itemGas) => {
                return (
                    // eslint-disable-next-line array-callback-return
                    itemGas.nozzles.map((itemPistol) => {
                        if (itemPistol.number === itemGas.nozzleNumber) {
                            gradeIdSelectPistol = itemPistol.gradeId;
                        }
                    })
                )
            })
            //Когда получили gradeId пистолета который подняли, добавим свойство pistolUp
            // eslint-disable-next-line array-callback-return
            fuelPumpsData.grades.map((item) => {
                if (item.id === gradeIdSelectPistol) {
                    item.pistolUp = true
                } else {
                    item.pistolUp = false
                }
            })
            //Добавим номер колонки на которой подняли пистолет
            // eslint-disable-next-line array-callback-return
            gas.map((itemGas) => {
                if (itemGas.nozzleStatus === "Up") {
                    // eslint-disable-next-line array-callback-return
                    fuelPumpsData.grades.map((item) => {
                        item.numberGasPistolUp = itemGas.number;
                        numberGasPistolUp = item.numberGasPistolUp;
                    })
                }
            })
            //Отфильтруем массив с пистолетами и оставим только один пистолет который поднят
            const resultFilterGrades = fuelPumpsData.grades.filter(grades => grades.id === gradeIdSelectPistol);
            let newGradesArr = {
                grades: resultFilterGrades
            }
            return {
                ...state,
                loadingFuelPumps: false,
                fuelPumps: fuelPumpsData,
                filterFuelPumps: newGradesArr,
                numberGasPistolUp: numberGasPistolUp
            };
        case GET_FUELPUMPS_FAILURE:
            let errorMessage = action.payload;
            return {
                ...state,
                loadingFuelPumps: false,
                error: errorMessage.error
            };
        case GET_LOCK:
            return {
                ...state,
                responseLock: action.payload
            }
        case GET_LOCK_ERROR:
            return {
                ...state,
                errorLock: action.payload
            }
        case GET_UNLOCK:
            return {
                ...state,
                responseUnLock: action.payload
            }
        case GET_UNLOCK_ERROR:
            return {
                ...state,
                errorUnLock: action.payload
            }
        case GET_NUMBER_GAS:
            return {
                ...state,
                numberSelectGas: action.payload
            }
        default:
            return state;
    }
}