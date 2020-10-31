import { STAGE_ACTIVE } from "./actionsStageProgress"

export const stageActive = (payload) => ({ type: STAGE_ACTIVE, payload: payload });

export default {
    stageActive,
}