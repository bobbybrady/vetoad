import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
    Menu, Icon, Button
} from 'semantic-ui-react'



class NavBar extends Component {

    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        return (
            <>
                <Menu className="getRidOfSpace">
                    <Menu.Item as={Link} to='/'
                        header
                        name='vetoad' />
                    <Menu.Item as={Link} to='/profile'
                        name={username.firstName} />
                    <Button icon
                        className="menu"
                        onClick={this.props.handleClick}
                        floated='right'>
                        <Icon name={this.props.visible ? "delete" : "bars"} />
                    </Button>
                </Menu>
            </>
        )
    }
}

export default NavBar
