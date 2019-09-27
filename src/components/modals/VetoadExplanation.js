import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class VetoadExplanation extends Component {
    state = {
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
            <Modal trigger={<Button className='emojiButton buttonPad'>🐸</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header className="headerColor">Vetoad 🐸</Modal.Header>
                <Modal.Content>
                    Vetoad is a special vote, if you have the ability to vote Vetoad you can Vetoad any item from the list. This item will not be able to win, and all previous votes will be void!
                </Modal.Content>
            </Modal>
        )
    }
}

export default VetoadExplanation;

