import React, { Component } from "react"
import { Button, Modal, Icon } from 'semantic-ui-react'

class EditEventCategoryModal extends Component {
    state={
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        this.props.editEvent()
        this.close()
    }

    render() {
        return (
            <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name='edit outline'/></Button>} 
            open={this.state.open}
            onOpen={this.open}
            onClose={this.close}
            closeIcon>
                <Modal.Header className="headerColor">Edit</Modal.Header>
                <Modal.Content>
                    <label>Edit</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.props.handleFieldChange}
                        id="category"
                        value={this.props.category}
                    />
                    <Button className='saveButton' onClick={this.onClick}>Save</Button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditEventCategoryModal;

