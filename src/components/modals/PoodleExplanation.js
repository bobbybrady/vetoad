import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class PoodleExplanation extends Component {
    state={
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
            <Modal trigger={<Button>🐩</Button>} 
            open={this.state.open}
            onOpen={this.open}
            onClose={this.close}
            closeIcon>
                <Modal.Header>Poodl-IN</Modal.Header>
                <Modal.Content>
                <h1>🐩</h1>
                This card shall be used when you vote yes for an option. In the cases where there are multiple options, Poodl-IN gives that option a +1. The option with the highest count at the ends wins. Voting is not necessary but encouraged.
                </Modal.Content>
            </Modal>
        )
    }
}

export default PoodleExplanation;

