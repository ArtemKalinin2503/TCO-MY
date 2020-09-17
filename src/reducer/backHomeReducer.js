import {BACK_HOME} from "../actions/actionsBackHome/actionsBackHome";

const initialState = {
    backHome: false
}

export default function BackHomeReducer(state = initialState, action) {
    switch (action.type) {
        case BACK_HOME:
            return {
                ...state,
                backHome: action.payload
            };
        default:
            return state;
    }
}