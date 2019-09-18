import React, { Component } from "react"
import { Button, Modal, Icon } from 'semantic-ui-react'

class DeleteEventModal extends Component {
    state={
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        this.close()
    }

    render() {
        return (
            <Modal trigger={<Button><Icon name='trash alternate outline'/></Button>} 
            open={this.state.open}
            onOpen={this.open}
            onClose={this.close}
            closeIcon>
                <Modal.Header>Are you sure you want to delete {this.props.event.name}?</Modal.Header>
                <Modal.Content>
                    <Button onClick={()=>{this.props.deleteEvent(this.props.event.id)}}>Yes</Button>
                    <Button onClick={this.close}>No</Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default DeleteEventModal;

