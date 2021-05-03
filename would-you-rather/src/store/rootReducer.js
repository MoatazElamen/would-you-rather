import {authedUser,users,questions} from '../reducers'
import {combineReducers} from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
export const rootReducer = combineReducers({
    authedUser,
    users,
    questions,
    loadingBar:loadingBarReducer})