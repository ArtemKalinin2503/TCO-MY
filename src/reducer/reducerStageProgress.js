import {STAGE_ACTIVE, STAGE_CLEAR} from "../actions/actionsStageProgress/actionsStageProgress"

const initialState = {
    navStageActive: {
        selectGas: false,
        selectFuel: false,
        card: false,
        pay: false,
        check: false
    }
}

export default function ReducerStageProgress(state = initialState, action) {
    switch (action.type) {
        case STAGE_ACTIVE:
            let changeStage = initialState.navStageActive;
            for (let key in changeStage) {
                if (key === action.nameStage) {
                    changeStage[key] = action.payload
                }
            }
            return {
                ...state,
                navStageActive: changeStage
            };
        case STAGE_CLEAR:
            let allStage = initialState.navStageActive;
            for (let key in allStage) {
                allStage[key] = false
            }
            return {
                ...state,
                navStageActive: allStage
            };
        default:
            return state
    }
}
