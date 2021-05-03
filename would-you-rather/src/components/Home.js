import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button,Grid,Container,List,Icon} from 'semantic-ui-react'
import Poll from './Poll'
 class Home extends Component {
     state ={
         checked:'UnAnswered'
     }
     handleChoose =(e)=>{
        this.setState(()=>({
            checked:e.target.textContent
        }))
     }

    render() {
        const {authedUser,users,questions} = this.props
        const unanswered = Object.values(questions).filter((question)=>(
            !Object.keys(users[authedUser.id].answers).includes(question.id)
        )).sort((a,b)=>b.timestamp - a.timestamp)
            
        const answered = Object.values(questions).filter((question)=>{
            if(Object.keys(users[authedUser.id].answers).includes(question.id)){
                return question
            }
        
        }).sort((a,b)=>b.timestamp - a.timestamp)
        return (
            <div>
                <div className="home-container">
                    <div className="home-toggler">
                    <Grid columns={2} divided>
                        <Grid.Column>
                            <Button.Group>
                                <Button onClick={this.handleChoose} active={this.state.checked == 'Answered' ? true:false}>Answered</Button>
                                <Button onClick={this.handleChoose}  active={this.state.checked == 'UnAnswered' ? true:false}>UnAnswered</Button>
                                <Button icon as={Link} to='/add'>
                                <Icon name='add' />
                                </Button>

                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                    </div>
                    <div className="home-data">
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <List divided relaxed  >
                                            {
                                            this.state.checked === 'Answered' ? 
                                                answered.map((answer)=>(
                                                     <Poll answered={true} key={answer.id} user={users[questions[answer.id].author]} data={questions[answer.id]}/>
                                                ))
                                            :
                                            unanswered.map((unanswer)=>(
                                                     <Poll answered={false} key={unanswer.id} user={users[questions[unanswer.id].author]} data={questions[unanswer.id]}/>
                                                ))
                                            }
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({questions,authedUser,users}){
    return {
        questions,
        users,
        authedUser,
    }
}
export default connect(mapStateToProps)(Home)