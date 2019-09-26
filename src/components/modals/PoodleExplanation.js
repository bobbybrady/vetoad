import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class PoodleExplanation extends Component {
    state={
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        if (this.state.open === false) {
            this.open()
        } else {
            this.close()
        }
    }

    render() {
        return (
            <Modal trigger={<Button className='emojiButton buttonPad'>🐩</Button>} 
            open={this.state.open}
            onOpen={this.open}
            onClose={this.close}
            closeIcon>
                <Modal.Header className="headerColor">Poodl-IN 🐩</Modal.Header>
                <Modal.Content>
                
                This card shall be used when you vote yes for an option. In the cases where there are multiple options, Poodl-IN gives that option a +1. The option with the highest count at the ends wins. Voting is not necessary but encouraged.
                </Modal.Content>
            </Modal>
        )
    }
}

export default PoodleExplanation;

