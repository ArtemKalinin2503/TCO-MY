import { STAGE_ACTIVE, STAGE_CLEAR } from "./actionsStageProgress"

export const stageActive = (nameStage, payload) => ({type: STAGE_ACTIVE, nameStage: nameStage, payload: payload});
export const clearStage = () => ({type: STAGE_CLEAR});

export default {
    stageActive,
    clearStage
}