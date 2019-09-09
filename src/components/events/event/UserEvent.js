import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class UserEvent extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (currentUser.id === this.props.userId) {
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.userEvent.user.firstName} {this.props.userEvent.user.lastName}<Button>Delete</Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        } else {
        return (
            <Card>
                <Card.Content>
                    <li>
                        <Card.Header>{this.props.userEvent.user.firstName} {this.props.userEvent.user.lastName}</Card.Header>
                    </li>
                </Card.Content>
            </Card>
        )
        }
    }
}

export default UserEvent;