import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class EditFirstNameModal extends Component {
    state={
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        this.props.editUserProfile()
        this.close()
    }

    render() {
        return (
            <Modal trigger={<Button icon='edit outline' className='smallerEditButton'></Button>} 
            open={this.state.open}
            onOpen={this.open}
            onClose={this.close}
            closeIcon>
                <Modal.Header>Edit</Modal.Header>
                <Modal.Content>
                    <label>First Name</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.props.handleFieldChange}
                        id="firstName"
                        value={this.props.firstName}
                    />
                    <Button onClick={this.onClick}>Save</Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditFirstNameModal;

