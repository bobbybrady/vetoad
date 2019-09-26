import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class TiegerExplanation extends Component {
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
            <Modal trigger={<Button className='emojiButton buttonPad'>🐅</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header className="headerColor">TIE-ger 🐅</Modal.Header>
                <Modal.Content>
                    This is what happens in the event of a tie. Everyone will get one Poodl-IN vote to find out the winner!
                </Modal.Content>
            </Modal>
        )
    }
}

export default TiegerExplanation;

