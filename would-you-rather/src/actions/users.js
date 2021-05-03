export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const fetchUsers = (payload)=>({
    type:GET_USERS,
    payload
})

export const addUserQuestion = (payload)=>({
    type:ADD_USER_QUESTION,
    payload
})
export const addUser  = (payload)=>({
    type:ADD_USER,
    payload
})

export const addUserAnswer =(payload)=>({
    type:ADD_USER_ANSWER,
    payload
})