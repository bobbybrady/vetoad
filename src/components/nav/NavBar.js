import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu, Icon, Button } from 'semantic-ui-react'



class NavBar extends Component {
    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        return (
            <Menu >
                <Menu.Item
                    header
                    name='vetoad' />
                <Menu.Item
                    name={username.firstName} />
                <Button icon
                    floated='right'>
                    <Icon name="bars" />
                </Button>
            </Menu>
        )
    }
}

export default NavBar
