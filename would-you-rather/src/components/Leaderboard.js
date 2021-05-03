 import React, { Component } from 'react'
 import {connect} from 'react-redux'
 import {Grid,List,Image,Container,Segment, Header,Button,Label, Icon} from 'semantic-ui-react'
 class Leaderboard extends Component {
     render() {
         const {users} = this.props;
         let usersStat = []
         users.forEach(user => {
             usersStat.push(
                 {
                     id:user.id,
                     answers:Object.keys(user.answers).length,
                     questions:user.questions.length,
                     score:Object.keys(user.answers).length + user.questions.length})
         });
         return (
             <div>
                <Container  style={{position:'relative',marginTop:'50px'}}>
                    <Header textAlign="center"> <Icon name="chess king"/></Header>
                    <Header textAlign="center"  > Here Are Our Game Heros </Header>
                    <Segment style={{position:'relative',width:'60%',margin:'0 auto'}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <List divided relaxed  >
                                        {
                                            users.map((user,index)=>(
                                                <List.Item key={user.id} style={{display:'flex',alignItems:'center',padding:'5px' }}>
                                                    <Image avatar src={user.avatarURL} verticalAlign='middle' />
                                                    <List.Content style={{display:'flex' ,width:'100%',position:'relative',alignItems:'center'}}>
                                                        <List.Header as='a'>{user.name}</List.Header>
                                                        <List.Description style={{position:'absolute' ,right:'0px'}}>
                                                        <div className="question-stats">
                                                            <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                                                <Button icon>
                                                                    Questions
                                                                </Button>
                                                                <Label as='a' basic pointing='left'>
                                                                    {usersStat[index].questions}
                                                                </Label>
                                                            </Button>
                                                            <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                                                <Button icon>
                                                                    Answers
                                                                </Button>
                                                                <Label as='a' basic pointing='left'>
                                                                {usersStat[index].answers}

                                                                </Label>
                                                            </Button>
                                                            <Button as='div'  style={{position:'relative',margin:'0 auto'}} labelPosition='right'>
                                                                <Button icon>
                                                                    Total Score
                                                                </Button>
                                                                <Label as='a' basic pointing='left'>
                                                                {usersStat[index].score}

                                                                </Label>
                                                            </Button>
                                                        </div>
                                                        </List.Description>
                                                    </List.Content>
                                                    
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                </Container>
             </div>
         )
     }
 }
 const mapStateToProps=({users})=>({
    users:Object.values(users).sort((a,b)=>(Object.keys(b.answers).length + Object.keys(b.questions).length) - (Object.keys(a.answers).length + Object.keys(a.questions).length)),
 })
 export default connect(mapStateToProps)(Leaderboard)
 