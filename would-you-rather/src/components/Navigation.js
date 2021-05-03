 import React from 'react'
 import {Menu,Image,Icon} from 'semantic-ui-react'
 import {NavLink} from 'react-router-dom'
 export default function Navigation({authedUser,logout}) {
    const handleSubmit = ()=>{
        logout()
    }
     return (
         <div>
        <Menu pointing>
          <Menu.Item as={NavLink} exact to="/" name='home' />
          <Menu.Item as={NavLink} to='/leaderboard' name='leaderboard'/>
          <Menu.Menu position='right'>
            <Menu.Item>
                <Image src={authedUser.avatarURL} avatar />
                <span>{authedUser.name}</span>
            </Menu.Item>
            <Menu.Item link  onClick={handleSubmit} >
                <Icon name="log out" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
         </div>
     )
 }
 