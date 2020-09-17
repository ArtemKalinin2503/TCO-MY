import {
    FINDCHECK_RESET,
    FINDCHECK_STARTED,
    FINDCHECK_STOPPED,
    FINDCHECK_START_WAIT,
    FINDCHECK_WAIT_ERROR,
    FINDCHECK_SCANNED,
    FINDCHECK_START_SEARCH,
    FINDCHECK_SEARCH_ERROR,
    FINDCHECK_FOUND
} from "../actions/actionsFindCheck/actionsFindCheck";

const initialState = {

    inProgress: false, // true после успешного 'startfindcart'
    error: false,      // true после ошибки 'startfindcart'

    // ожидание чека со сканнера (filter?refresh=false)
    scannedId: null,       // id отсканированного чека
    waitScannedError: null,// статус ответа в случае ошибки, в т.ч. 304

    // поиск по ФП (filter?refresh=true)
    foundId: null,     // id найденного чека
    searchError: null  // статус ответа в случае ошибки
}

export default function FindCheckReducer (state = initialState, action) {
    switch (action.type) {
        case FINDCHECK_RESET:
            console.log('+++> FINDCHECK_STOPPED');
            return initialState
        case FINDCHECK_STOPPED:
            console.log('+++> FINDCHECK_STOPPED');
            return initialState
        case FINDCHECK_STARTED:
            console.log('+++> FINDCHECK_STARTED');
            return {
                ...state,
                inProgress: true
            }
            // рез-ты ожидания сканирования
        case FINDCHECK_START_WAIT:
            console.log('+++> FINDCHECK_START_WAIT');
            return {
                ...state,
                scannedId: null,
                waitScannedError: null
            }
        case FINDCHECK_WAIT_ERROR:
            console.log('+++> FINDCHECK_WAIT_ERROR');
            return {
                ...state,
                waitScannedError: action.payload.error
            }
        case FINDCHECK_SCANNED:
            console.log('+++> FINDCHECK_SCANNED');
            return {
                ...state,
                scannedId: action.payload.id
            }
            // рез-ты поиска
        case FINDCHECK_START_SEARCH:
            console.log('+++> FINDCHECK_START_SEARCH');
            return {
                ...state,
                foundId: null,
                searchError: null
            }
        case FINDCHECK_SEARCH_ERROR:
            console.log('+++> FINDCHECK_SEARCH_ERROR');
            return {
                ...state,
                searchError: action.payload.error
            }
        case FINDCHECK_FOUND:
            console.log('+++> FINDCHECK_FOUND');
            return {
                ...state,
                foundId: action.payload.id
            }
        default:
            return state
    }
}
