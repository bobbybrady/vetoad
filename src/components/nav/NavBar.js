import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
    Menu, Icon, Button, Sticky
} from 'semantic-ui-react'
import './NavBar.css'



class NavBar extends Component {

    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        return (
            <>
                <Sticky>
                    <Menu className="getRidOfSpace navColor">
                        <Menu.Item as={Link} to='/'
                            className='fontVetoad'
                            header
                            name='vetoad' />
                        <Menu.Item as={Link} to='/profile'
                        className='fontText'
                            name={username.firstName} />
                        <Button icon
                            className="menu smallerButtonNav"
                            onClick={this.props.handleClick}
                            floated='right'>
                            <Icon name={this.props.visible ? "delete" : "bars"} />
                        </Button>
                    </Menu>
                </Sticky>
            </>
        )
    }
}

export default NavBar
