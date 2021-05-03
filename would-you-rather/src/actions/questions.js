export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';



const fetchQuestions =(payload)=>{
    return{
        type:FETCH_QUESTIONS,
        payload
    }
}



const addAnswer = (payload)=>{
    return {
        type:ADD_ANSWER,
        payload
    }
}
const addQuestion = (payload)=>{
    return {
        type:ADD_QUESTION,
        payload:payload
    }
}
export {
    fetchQuestions,
    addAnswer,
    addQuestion
}