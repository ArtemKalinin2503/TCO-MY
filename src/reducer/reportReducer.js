import {
    GET_REPORT_Z_STARTED,
    GET_REPORT_Z_SUCCESS,
    GET_REPORT_Z_FAILURE,
    GET_REPORT_X_STARTED,
    GET_REPORT_X_SUCCESS,
    GET_REPORT_X_FAILURE,
    GET_REPORT_SMENA_STARTED,
    GET_REPORT_SMENA_SUCCESS,
    GET_REPORT_SMENA_FAILURE,
    GET_NUMBER_SMENA_STARTED,
    GET_NUMBER_SMENA_SUCCESS,
    GET_NUMBER_SMENA_FAILURE,
    OPEN_SMENA_SUCCESS,
    OPEN_SMENA_FAILURE,
    CLOSE_SMENA_SUCCESS,
    CLOSE_SMENA_FAILURE,
    CLEAR_ALL_REPORTS,
    GET_IS_OPEN_SMENA
} from '../actions/actionsReports/actionsReports';

const initialState = {
    //Z-отчет
    zReportLoading: false,
    zReportSuccess: null,
    zReportError: null,
    //X-отчет
    xReportLoading: false,
    xReportSuccess: null,
    xReportError: null,
    //Смена-отчет
    smenaReportLoading: false,
    smenaReportSuccess: null,
    smenaReportError: null,
    //Данные о смене
    dataSmenaLoading: false,
    dataSmenaSuccess: null,
    dataSmenaError: null,
    //Открыть смену
    openSmenaSuccess: null,
    openSmenaError: null,
    //Закрыть смену
    closeSmenaSuccess: null,
    closeSmenaError: null,
    //Состояние смены Открыта/Закрыта
    isOpenSmena: false,
}

export default function ReportReducer(state = initialState, action) {
    switch (action.type) {
        //Z-отчет
        case GET_REPORT_Z_STARTED:
            return {
                ...state,
                zReportLoading: true
            };
        case GET_REPORT_Z_SUCCESS:
            return {
                ...state,
                zReportSuccess: action.payload,
                zReportLoading: false
            };
        case GET_REPORT_Z_FAILURE:
            return {
                ...state,
                zReportError: action.payload,
                zReportLoading: false
            };
        //X-отчет
        case GET_REPORT_X_STARTED:
            return {
                ...state,
                xReportLoading: true
            };
        case GET_REPORT_X_SUCCESS:
            return {
                ...state,
                xReportSuccess: action.payload,
                xReportLoading: false
            };
        case GET_REPORT_X_FAILURE:
            return {
                ...state,
                xReportError: action.payload,
                xReportLoading: false
            };
        //Сменна-отчет
        case GET_REPORT_SMENA_STARTED:
            return {
                ...state,
                smenaReportLoading: true
            };
        case GET_REPORT_SMENA_SUCCESS:
            return {
                ...state,
                smenaReportSuccess: action.payload,
                smenaReportLoading: false
            };
        case GET_REPORT_SMENA_FAILURE:
            return {
                ...state,
                smenaReportError: action.payload,
                smenaReportLoading: false
            };
        //Данные о смене
        case GET_NUMBER_SMENA_STARTED:
            return {
                ...state,
                dataSmennaLoading: true
            };
        case GET_NUMBER_SMENA_SUCCESS:
            return {
                ...state,
                dataSmenaSuccess: action.payload,
                dataSmenaLoading: false
            };
        case GET_NUMBER_SMENA_FAILURE:
            return {
                ...state,
                dataSmenaError: action.payload,
                dataSmenaLoading: false
            };
        //Открыть смену
        case OPEN_SMENA_SUCCESS:
            return {
                ...state,
                openSmenaSuccess: action.payload
            };
        case OPEN_SMENA_FAILURE:
            return {
                ...state,
                openSmenaError: action.payload
            };
        //Закрыть смену
        case CLOSE_SMENA_SUCCESS:
            return {
                ...state,
                closeSmenaSuccess: action.payload
            };
        case CLOSE_SMENA_FAILURE:
            return {
                ...state,
                closeSmenaError: action.payload
            };
        //Отчистка всех отчетов
        case CLEAR_ALL_REPORTS:
            return {
                ...state,
                zReportSuccess: null,
                xReportSuccess: null,
                smenaReportSuccess: null,
                zReportError: null,
                xReportError: null,
                smenaReportError: null
            };
        //Состояние смены Открыта/Закрыта
        case GET_IS_OPEN_SMENA:
            return {
                ...state,
                isOpenSmena: action.payload
            };
        default:
            return state
    }
}