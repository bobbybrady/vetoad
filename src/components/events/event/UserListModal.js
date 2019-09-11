import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class UserListModal extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (currentUser.id === this.props.userId) {
            return (
                <></>
            )
        } else {
        return (
            <Card>
                <Card.Content>
                    <li>
                        <Card.Header>{this.props.userEvent.user.firstName} {this.props.userEvent.user.lastName}<Button>Delete</Button></Card.Header>
                    </li>
                </Card.Content>
            </Card>
        )
        }
    }
}

export default UserListModal;