export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_NEW_USER = 'ADD_NEW_USER';

export function login(payload){
    return{
        type:LOGIN,
        payload
    }
}
export function newUser(payload){
    return{
        type:ADD_NEW_USER,
        payload
    }
}
export function logout(){
    return{
        type:LOGOUT
    }
}

