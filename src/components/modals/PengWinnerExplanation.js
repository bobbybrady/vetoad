import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class PengWinnerExplanation extends Component {
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
            <Modal trigger={<Button className='emojiButton buttonPad'>🐧</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header className="headerColor">Peng-WINNER 🐧</Modal.Header>
                <Modal.Content>
                    This is the eventual winner of the voting!
                </Modal.Content>
            </Modal>
        )
    }
}

export default PengWinnerExplanation;

