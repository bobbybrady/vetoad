import React, { Component } from "react"
import { Button, Modal, Card } from 'semantic-ui-react'
import PoodleExplanation from './PoodleExplanation'
import ParrotExplanation from './ParrotExplanation'
import PengWinnerExplanation from './PengWinnerExplanation'
import TiegerExplanation from './TiegerExplanation'
import VetoadExplanation from './VetoadExplanation'

class HIW1 extends Component {
    state = {
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    onClick = () => {
        this.close()
    }

    render() {
        return (
            <Modal trigger={<Button className='buttonDisguise'>How It Works</Button>}
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                closeIcon>
                <Modal.Header>How It Works</Modal.Header>
                <Modal.Content>
                    <div className='howItWorksContainer'>
                        <PoodleExplanation />
                        <ParrotExplanation />
                        <VetoadExplanation />
                        <TiegerExplanation />
                        <PengWinnerExplanation />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}

export default HIW1;

