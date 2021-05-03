import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Segment,Grid,Button,Header,Label, Image} from 'semantic-ui-react'
import {handleAddAnswer} from '../actions/shared'
import {withRouter} from 'react-router-dom'
class PollDetail extends Component {
    state ={
        answer:null,
    }
    handleChoose =(option)=>{
        this.setState(()=>({
            answer:option
        }))
    }
    handleSubmit = ()=>{
        const id = this.props.location.state.data.id;
        const {authedUser} = this.props;
        const userid = authedUser.id;
        if(this.state.answer !== null){
            this.props.handleAddAnswer({qid:id,authedUser:userid,answer:this.state.answer})
            this.props.history.push('/')
        }
    }
    render() {
        const {data,answered,image} = this.props.location.state;
        const {totalUsers,userIds,users} = this.props
        let countVoted = [];
        userIds.map((userid)=>{
            if(users[userid].answers[data.id]){
                countVoted.push({user:userid,answer:users[userid].answers[data.id]})
            }
        })
        const countVotedOptionOne =countVoted.filter(vote=> vote.answer === 'optionOne').length;
        const countVotedOptionTwo = countVoted.filter(vote=> vote.answer === 'optionTwo').length; 
        
        if(answered){
            return (
                <div>
                    <Grid columns={2} relaxed>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment size="massive">

                                    <Header  textAlign="center" color={this.props.authedUser.answers[data.id] ==='optionOne'?'blue':'black'}>
                                        {data.optionOne.text}

                                    </Header>
                                    <div className="question-stats">
                                        <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                            <Button icon>
                                                voted
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                {countVotedOptionOne}
                                            </Label>
                                        </Button>
                                        <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                            <Button icon>
                                                voted
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                %{Math.floor((countVotedOptionOne / totalUsers)*100)}
                                            </Label>
                                        </Button>
                                    </div>
                                   
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment size="massive">
                                <Header  textAlign="center" color={this.props.authedUser.answers[data.id] ==='optionTwo'?'blue':'black'}>
                                    {data.optionTwo.text}
                                </Header>
                                <div className="question-stats">
                                        <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                            <Button icon>
                                                voted
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                {countVotedOptionTwo}
                                            </Label>
                                        </Button>
                                    <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                            <Button icon>
                                                voted
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                %{Math.floor((countVotedOptionTwo/totalUsers)*100)}
                                            </Label>
                                    </Button>

                                </div>
                                
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </div>
            )
        }else{
            return(
                <div>
                    <Segment size="massive">
                        <Header>
                        <Image avatar src={image}/>
                            Would You Rather ?
                        </Header>
                    </Segment>
                    <Grid columns={2} relaxed>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment size="massive" onClick={()=>{
                                    this.handleChoose('optionOne')
                                }}>
                                    <Header textAlign="center" color={this.state.answer === 'optionOne'?'blue':'black'}>
                                    {data.optionOne.text}
                                    </Header>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment size="massive" onClick={()=>{
                                    this.handleChoose('optionTwo')
                                }}>
                                    <Header textAlign="center" color={this.state.answer === 'optionTwo'?'blue':'black'}>
                                    {data.optionTwo.text}
                                    </Header>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button size="massive"  primary onClick={this.handleSubmit}>
                                    Answer
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        }

    }
}
const mapStateToProps =({authedUser,users})=>({
    authedUser,
    totalUsers:Object.keys(users).length,
    userIds:Object.keys(users),
    users

})
const mapDispatchToProps = (dispatch)=>({
    handleAddAnswer:(payload) => dispatch(handleAddAnswer(payload))
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PollDetail));