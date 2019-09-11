import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class EditEventModal extends Component {

    render() {
        return (
            <Modal trigger={<Button>Edit</Button>} closeIcon>
                <Modal.Header>Edit</Modal.Header>
                <Modal.Content>
                    <label>Edit</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.props.handleFieldChange}
                        id="name"
                        value={this.props.name}
                    />
                    <Button onClick={this.props.editEvent}>Save</Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditEventModal;

