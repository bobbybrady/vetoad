import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class ParrotExplanation extends Component {
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
            <Modal trigger={<Button className='emojiButton buttonPad'>🦜</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header className="headerColor">Parr-OUT 🦜</Modal.Header>
                <Modal.Content>
                    This card shall be used when you vote no for an option. In the cases where there are multiple options, a Parr-OUT option counts as -1. Parr-OUTs should only be used when you don’t want to do something. If you don’t care keep that Parr-OUT in its cage!
                </Modal.Content>
            </Modal>
        )
    }
}

export default ParrotExplanation;

