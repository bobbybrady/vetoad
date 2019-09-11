import React, { Component } from "react"
import { Card, Button, Modal } from 'semantic-ui-react'
import AddUserModal from '../../modals/AddUserModal'

class UserListModal extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const foundUser = this.props.userEvents.filter(participant => parseInt(participant.userId) === parseInt(this.props.user.id))
        if (currentUser.id === this.props.user.id || foundUser.length === 1) {
            return (
                <></>
            )
        } else {
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.user.firstName} {this.props.user.lastName}
                                <Modal.Actions>
                                    <AddUserModal
                                       {...this.props}
                                    />
                                </Modal.Actions>
                            </Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        }
    }
}

export default UserListModal;