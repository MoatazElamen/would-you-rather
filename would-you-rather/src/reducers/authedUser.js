 
 import {LOGOUT,LOGIN,ADD_NEW_USER} from '../actions/authedUser'
export default function authedUser(state=null,action){
    
switch(action.type){
    case LOGOUT:
        return null
        
    case LOGIN:
        return action.payload
        
    default:
        return state
}
}