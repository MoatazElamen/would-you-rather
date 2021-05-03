import React,{Component} from 'react'
import {List,Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
 class Poll extends Component  {
     handleClick = ()=>{
        this.props.history.push({
            pathname:`questions/${this.props.data.id}`,
            state:{
                data:this.props.data,
                answered:this.props.answered,
                image:this.props.user.avatarURL
            }
        })
    }
    render(){
        const {user,data} = this.props
        return (
            <List.Item >
                <Image avatar src={user.avatarURL} verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a' onClick={this.handleClick}>{user.name}</List.Header>
                    <List.Description>
                        asked if people rather to ' {data.optionOne.text} ' or ' {data.optionTwo.text} '
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}
export default withRouter(Poll)