import './App.css';
import React, { Component } from 'react'
import {Home,NotFound,Authentication,AddPoll,Navigation,PollDetail,Leaderboard} from './components'
import {connect} from 'react-redux'
import {handleInitialData,handleLogout} from './actions/shared'
import {Switch,Route,Redirect} from 'react-router-dom'
 class App extends Component {
  componentDidMount(){
      this.props.handleInitialData()
  }
  
  render() {
    const {authedUser} = this.props
    const NavRoute = ({exact, path, component: Component}) => {
      const RestComponents = (...props)=>(
        <div>
          <Navigation logout={this.props.handleLogout} authedUser={this.props.authedUser}/>
          <Component {...props}/>
        </div>
      )
      return(
        <Route exact={exact} path={path} render={(props) => (
          <div>
          { authedUser === null ? (<Redirect to='/auth'/>):(<RestComponents {...props} />) }
          </div>
        )}/>
      )
      }
    return (
      <div >    

      <Switch>
        <Route path='/auth' >
          <Authentication/>
        </Route>
        <NavRoute path='/' exact component={Home} />
        <NavRoute path='/leaderboard' component={Leaderboard}/>
        <NavRoute path='/questions/:id' component={PollDetail}/>
        <NavRoute path='/add' component={AddPoll}/>
        <Route path='/404' component={NotFound}/>
        <Redirect to="/404"/>
      </Switch>
      </div>
    )
  }
}
const mapStateToProps = ({authedUser})=>({
  authedUser
})
const mapDispatchToProps = (dispatch)=>{
  return{
    handleInitialData: ()=> dispatch(handleInitialData()),
    handleLogout:(user)=>dispatch(handleLogout(user)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
/**
 * 1- user can login or register
 * 2- user can see the leaderboard or ranking based on  questions answered and added 
 * 3- user can add new question
 * 4- the question should be filled and user should be able to see the answered and not answered questions 
 * 5- guest is not authorized to see all pages but authentication page
 * 6- user can log out and log in 
 * 7-
 */