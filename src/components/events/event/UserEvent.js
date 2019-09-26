import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class UserEvent extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (currentUser.id === this.props.userId) {
            return (
                <Card className='invisibleCard'>
                    <Card.Content className='invisibleCard'>
                        <li>
                            <Card.Header>{this.props.userEvent.user.firstName} {this.props.userEvent.user.lastName}<Button icon='trash alternate outline' className="smallerDeleteButton" onClick={() => this.props.deleteParticipant(this.props.userEvent.id)}></Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        } else {
        return (
            <Card className='invisibleCard'>
                <Card.Content className='invisibleCard'>
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