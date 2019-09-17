import React, { Component } from "react"
import { Button, Modal, } from 'semantic-ui-react'

class ParrotExplanation extends Component {
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
            <Modal trigger={<Button>🦜</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header>Parr-OUT</Modal.Header>
                <Modal.Content>
                    <h1>🦜</h1>
                    This card shall be used when you vote no for an option. In the cases where there are multiple options, a Parr-OUT option counts as -1. Parr-OUTs should only be used when you don’t want to do something. If you don’t care keep that Parr-OUT in its cage!
                </Modal.Content>
            </Modal>
        )
    }
}

export default ParrotExplanation;

