import { GET_MESSAGESNOW, ANSWER_MASSIVE, LENGTH_MASSIVE, GET_ANSWER_TEXT_MESSAGES, ANSWER_MESSAGES } from "../actions/actionsAnsMessage/actionsAnsMessage";

const initialState = {
    error: null,
    messages: "",
    answerMassive: false,
    lengthMassive: 0,
    answerTextMessage: "",
    answerMessage: false,
}

export default function TestAnswerMessages(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGESNOW:
            return {
                ...state,
                messages: action.payload
            };
        case ANSWER_MASSIVE:
            return {
                ...state,
                answerMassive: action.payload
            };
        case LENGTH_MASSIVE:
            return {
                ...state,
                lengthMassive: action.payload
            };
        case GET_ANSWER_TEXT_MESSAGES:
            return {
                ...state,
                answerTextMessage: action.payload
            };
        case ANSWER_MESSAGES:
            return {
                ...state,
                answerMessage: action.payload
            };
        default:
            return state
    }
}