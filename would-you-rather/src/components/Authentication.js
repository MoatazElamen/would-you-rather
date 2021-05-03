import React, { Component } from 'react'
import {Segment,Grid,Button,Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {handleAddUser,handleLogin} from '../actions/shared'
import {withRouter} from 'react-router'
 class Authentication extends Component {
     state = {selectedUser:null}
     handleChange = (e,data)=>{
         this.setState(()=>({
            selectedUser:data.value
         }))
     }
     handleLoginClick = ()=>{
        this.props.handleLogin(this.props.users[this.state.selectedUser])
        this.props.history.push('/')
     }
     componentDidMount(){
        if(this.props.authedUser !== null){
            setTimeout(() => {
                this.props.history.push('/')
            }, 200);
        }
     }

    render() {

        let options = []
        for(const [,value] of Object.entries(this.props.users)){
            options.push({text:value.name,image:{avatar:true,src:value.avatarURL},value:value.id})
        }
        return (
            <div className="auth">
                <Segment placeholder>
                    <Grid columns={1} relaxed='very'>
                        <Grid.Column  verticalAlign='middle'>
                            <Grid.Row>
                                <div className="ui form big">
                                <Dropdown
                                placeholder='Select Name'
                                fluid
                                selection
                                options={options}
                                onChange={this.handleChange}
                                />
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                            <Button  content='Login' disabled={this.state.selectedUser!== null ? false:true} onClick={this.handleLoginClick} primary size='big' />
                            </Grid.Row>
                        </Grid.Column>

                    </Grid>

                </Segment>
            </div>
        )
    }
}
const mapStateToProps = ({users,authedUser})=>({
    users,
    authedUser
})
const mapDispatchToProps = (dispatch)=>({
    handleAddUser:(name)=>dispatch(handleAddUser(name)),
    handleLogin:(id)=> dispatch(handleLogin(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Authentication))