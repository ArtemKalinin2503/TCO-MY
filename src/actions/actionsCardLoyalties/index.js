import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import { GET_LOYALTY_STARTED, GET_LOYALTY_SUCCESS, GET_LOYALTY_ERROR, CLEAR_LOYALTY } from "./actionsCardLoyalties";

const getLoyaltyStarted = () => ({type: GET_LOYALTY_STARTED});
const getLoyaltySuccess = (payload) => ({type: GET_LOYALTY_SUCCESS, payload: payload});
const getLoyaltyFailure = (error) => ({type: GET_LOYALTY_ERROR, payload: {error}});
export const clearLoyalty = () => ({type: CLEAR_LOYALTY});

//Данный Thunk - добавляет карту лояльности в корзину (пока без номера карты)
export const getLoyaltyCard = (widgetId, numberCard) => {
    return dispatch => {
        dispatch(getLoyaltyStarted())
        axios
            .put(`${urlApi}/api-v01/cart/0/setloyaltycard?pan=${numberCard}`, {})
            .then(res => {
                dispatch(getLoyaltySuccess(res.status))
            })
            .catch(err => {
                dispatch(getLoyaltyFailure(err.message))
            })
    }
}

export default {
    getLoyaltyStarted,
    getLoyaltySuccess,
    getLoyaltyFailure,
    clearLoyalty,
    getLoyaltyCard,
}