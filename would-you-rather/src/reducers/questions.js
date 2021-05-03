import{FETCH_QUESTIONS,ADD_ANSWER,ADD_QUESTION} from '../actions/questions';

export default function questions(state={},action){
    switch(action.type){
        case FETCH_QUESTIONS:
            return {
                ...state,
                ...action.payload}
        case ADD_ANSWER:
            const {qid,answer,authedUser} = action.payload
            return {
                ...state,
                [qid]:{
                    ...state[qid],
                    [answer]:{
                        ...state[qid][answer],
                        votes:[...state[qid][answer].votes, authedUser]
                    }
                }
            }
        case ADD_QUESTION:
            const {payload} = action
            return {
                ...state,
                [action.payload.id]:payload
            }
        default:
            return state
    }
}
