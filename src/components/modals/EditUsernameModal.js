import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class EditUsernameModal extends Component {
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
                <Modal.Header className="headerColor">Edit</Modal.Header>
                <Modal.Content>
                    <label>Username</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.props.handleFieldChange}
                        id="username"
                        value={this.props.username}
                    />
                    <Button onClick={this.onClick}>Save</Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditUsernameModal;

