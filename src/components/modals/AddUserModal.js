import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"
import ParticipantCardModal from "../events/event/ParticipantCardModal"

class AddUserModal extends Component {


    render() {
        if (this.props.newUser[0] === undefined) {
            return (
                <Modal
                    open={this.props.open}
                    onOpen={this.props.onOpen}
                    onClose={this.props.onClose}
                    size='small'
                    trigger={
                        <Button className='smallerDeleteButton' icon='add' floated='right' id={this.props.user.id} onClick={this.props.addUserId}>
                        </Button>
                    }
                    closeIcon></Modal>
            )
        } else {
            return (
                <Modal
                    className='modalAdd'
                    open={this.props.open}
                    onOpen={this.props.onOpen}
                    onClose={this.props.onClose}
                    size='small'
                    trigger={
                        <Button icon="add" id={this.props.user.id} onClick={this.props.addUserId}>
                        </Button>
                    }
                    closeIcon>
                    <Modal.Header className="headerColor">Add {this.props.newUser[0].firstName}</Modal.Header>
                    <Modal.Content>
                        <ParticipantCardModal
                            {...this.props} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button content='Add' onClick={this.props.addParticipantToEvent} />
                    </Modal.Actions>
                </Modal>
            )

        }
    }
}

export default AddUserModal;

