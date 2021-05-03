import React, { Component } from 'react';
import {Button,Divider,Form,TextArea,Grid,Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/shared'
import {withRouter} from 'react-router-dom'
 class AddPoll extends Component {

    state = {
        optionOne:'',
        optionTwo:''
    }
    handleChange = (e)=>{
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit = ()=>{
        let {optionOne,optionTwo} = this.state;
        let {authedUser ,handleAddQuestion} = this.props;
        handleAddQuestion({author:authedUser.id,optionOneText:optionOne.trim(),optionTwoText:optionTwo.trim()})
        this.props.history.push('/')
        
    }
    render() {
        return (
            <div className="Add-container">
                <h1 align="center">Would You Rather ? </h1>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form>
                                <TextArea placeholder='Doing' value={this.state.optionOne} name="optionOne" onChange={this.handleChange} style={{ minHeight: 200 ,minWidth:500 } } />

                            </Form>
                        </Grid.Column>

                        <Grid.Column >
                                <Form>
                                <TextArea placeholder='Doing' value={this.state.optionTwo}  name="optionTwo" onChange={this.handleChange} style={{ minHeight: 200 ,minWidth:500 } } />
                                </Form>
                            
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
                <Grid textAlign="center">
                    <Grid.Row>
                        <Grid.Column>
                        <Button content="Add Question" onClick={this.handleSubmit}     primary/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                
            </div>
        )
    }
}
const mapStateToProps = ({authedUser})=>({
    authedUser
})
const mapDispathToProps = (dispatch)=>({
    handleAddQuestion: (question)=> dispatch(handleAddQuestion(question)),
})
export default withRouter(connect(mapStateToProps,mapDispathToProps)(AddPoll))