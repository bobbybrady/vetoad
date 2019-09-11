import React, { Component } from "react"
import { Button, Modal, Icon } from "semantic-ui-react"

class AddUserModal extends Component {


    render() {
        return (
            <Modal
                open={this.props.open}
                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
                size='small'
                trigger={
                    <Button primary icon>
                        Proceed <Icon name='right chevron' />
                    </Button>
                }
            >
                <Modal.Header>Modal #2</Modal.Header>
                <Modal.Content>
                    <p>That's everything!</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='check' content='All Done' onClick={this.props.onClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddUserModal;

