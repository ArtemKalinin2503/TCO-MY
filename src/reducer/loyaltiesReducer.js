import { GET_LOYALTY_STARTED, GET_LOYALTY_SUCCESS, GET_LOYALTY_ERROR } from "../actions/actionsCardLoyalties/actionsCardLoyalties";

const initialState = {
    cardLoyaltiesData: 0,
    loadingLoyalties: false,
    errorLoyalties: null
}

//Данный reducer для получения данных при работе с картой Лояльности
export default function LoyaltiesCardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOYALTY_STARTED:
            return {
                ...state,
                loadingLoyalties: true
            }
        case GET_LOYALTY_SUCCESS:
            return {
                ...state,
                cardLoyaltiesData: action.payload,
                loadingLoyalties: false
            }
        case GET_LOYALTY_ERROR:
            return {
                ...state,
                loadingLoyalties: false,
                errorLoyalties: action.payload.error
            }
        default:
            return state;
    }
}