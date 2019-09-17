import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class TiegerExplanation extends Component {
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
            <Modal trigger={<Button>🐅</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header>TIE-ger</Modal.Header>
                <Modal.Content>
                    <h1>🐅</h1>
                    This is what happens in the event of a tie. Everyone will get one Poodl-IN vote to find out the winner!
                </Modal.Content>
            </Modal>
        )
    }
}

export default TiegerExplanation;
