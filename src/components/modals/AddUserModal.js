import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"
import ParticipantCardModal from "../events/event/ParticipantCardModal"

class AddUserModal extends Component {


    render() {
        return (
            <Modal
                open={this.props.open}
                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
                size='small'
                trigger={
                    <Button onClick={this.props.addUserId}>
                       Add
                    </Button>
                }
            closeIcon>
                <Modal.Header>Add {this.props.user.firstName}</Modal.Header>
                <Modal.Content>
                    <ParticipantCardModal 
                    {...this.props}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Add' onClick={this.props.onClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddUserModal;

