import { STAGE_ACTIVE } from "../actions/actionsStageProgress/actionsStageProgress"

const initialState = {
    currentPage: ""
}

export default function ReducerStageProgress(state = initialState, action) {
    switch (action.type) {
        case STAGE_ACTIVE:
            return {
                ...state,
                currentPage: action.payload
            };
        default:
            return state
    }
}
