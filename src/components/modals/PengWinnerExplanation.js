import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class PengWinnerExplanation extends Component {
    state = {
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        console.log(this.state.open)
        if (this.state.open === false) {
            console.log(this.props)
            // this.props.close()
            this.open()
        } else {
            this.close()
        }
    }

    render() {
        return (
            <Modal trigger={<Button>🐧</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header>Peng-WINNER</Modal.Header>
                <Modal.Content>
                    <h1>🐧</h1>
                    This is the eventual winner of the voting!
                </Modal.Content>
            </Modal>
        )
    }
}

export default PengWinnerExplanation;

