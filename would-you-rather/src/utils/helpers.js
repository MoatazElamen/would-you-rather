import {_getUsers,_getQuestions} from './_DATA'

// fetch all data from the database;
// distribute all data to state 
function idfromName(name){
    const noSpaces = name.trim().match(/\S/g).join('');
    return noSpaces
}
function getRandomAvatar(){
    const random = Math.floor(Math.random() * 1000);
    const result = `https://i.pravatar.cc/${random}`
    return result
}
export  function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
export const createUser = (name)=>({
    name,
    id:idfromName(name),
    avatarURL:getRandomAvatar(),
    answers:{},
    questions:[]
})


