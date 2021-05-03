import {fetchQuestions,addQuestion,addAnswer} from './questions';
import {fetchUsers,addUserQuestion} from './users';
import { login,logout } from './authedUser'
import {_saveQuestion,_saveQuestionAnswer} from '../utils/_DATA'
import {getInitialData} from '../utils/helpers'
import {createUser} from '../utils/helpers'
import {addUser,addUserAnswer} from './users'
import { showLoading, hideLoading } from 'react-redux-loading'
export  function handleInitialData(){
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData().then(({users,questions})=>{
            dispatch(hideLoading())
            dispatch(fetchUsers(users))
            dispatch(fetchQuestions(questions))
            console.log(JSON.parse(localStorage.getItem('loggedinuser')))
            if(JSON.parse(localStorage.getItem('loggedinuser')) !== null ){
                dispatch(login(JSON.parse(localStorage.getItem('loggedinuser'))))
            }
        })
    }
}
export const handleLogout = ()=>{
    return(dispatch)=>{
        dispatch(showLoading())
        localStorage.removeItem('loggedinuser')
        dispatch(logout())
        dispatch(hideLoading())

    }
}
export const handleLogin = (user)=>{
    return(dispatch)=>{
        dispatch(showLoading())
        dispatch(login(user))
        const strigified = JSON.stringify(user)
        localStorage.setItem('loggedinuser',strigified)
        dispatch(hideLoading())

    }
}
export const handleAddQuestion = (question)=>{
    return(dispatch)=>{
        dispatch(showLoading())
        _saveQuestion(question).then((data)=>{
            dispatch(addQuestion(data))
            dispatch(addUserQuestion({questionId:data.id,userid:data.author}))
        })
        dispatch(hideLoading())
    }
}
export const handleAddUser = (name)=>{
    return (dispatch)=>{
        dispatch(showLoading())
        const nUser = createUser(name)
        dispatch(addUser(nUser))
        dispatch(hideLoading())

    }
}
export const handleAddAnswer = ({authedUser,qid,answer})=>{
    return (dispatch)=>{
                _saveQuestionAnswer ({ authedUser, qid, answer }).then(()=>{
                    dispatch(addAnswer({authedUser,qid,answer}))
                    dispatch(addUserAnswer({authedUser,qid,answer}))
        })
    }

}