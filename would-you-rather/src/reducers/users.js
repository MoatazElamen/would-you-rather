import {GET_USERS,ADD_USER,ADD_USER_ANSWER,ADD_USER_QUESTION} from '../actions/users'
export default function users(state={},action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,...action.payload
            }
        case ADD_USER:
            return{
                ...state,[action.payload.id]:action.payload
            }
        case ADD_USER_QUESTION:
            const {questionId,userid} = action.payload
            return{
                ...state,
                [userid]:{
                    ...state[userid],
                    questions:[
                        ...state[userid].questions,
                        questionId
                    ]
                }
            }
        case ADD_USER_ANSWER:
            const {qid,authedUser,answer} = action.payload
            return{
                ...state,
                [authedUser]:{
                    ...state[authedUser],
                    answers:{
                    ...state[authedUser].answers,
                    [qid]:answer
                },
              },
            }
        default:
            return state
    }
}
