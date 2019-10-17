import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class ParticipantCardModal extends Component {
 //renders the veotad and contribution buttons based off if they are clicked or not
    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (parseInt(this.props.user.id) === currentUser.id) {
            return <></>
        } else {
            if (this.props.newUser[0].vetoad === true && this.props.newUser[0].canSuggestEvent === false) {
                return (
                    <Card className='invisibleCard'>
                        <Card.Content className='invisibleCard'>
                            <div className='participantModalButtonContainer'>
                                <Button className='addParticipantEventButtons' color='green' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button>
                                <Button className='addParticipantEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.newUser[0].canSuggestEvent === true && this.props.newUser[0].vetoad === false) {
                return (
                    <Card className='invisibleCard'>
                        <Card.Content className='invisibleCard'>
                            <div className='participantModalButtonContainer'>
                                <Button className='addParticipantEventButtons' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button>
                                <Button className='addParticipantEventButtons' color='green' onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.newUser[0].canSuggestEvent === true && this.props.newUser[0].vetoad === true) {
                return (
                    <Card className='invisibleCard'>
                        <Card.Content className='invisibleCard'>
                            <p>{this.props.newUser[0].firstName} {this.props.newUser[0].lastName}
                            <div className='participantModalButtonContainer'>
                            <Button className='addParticipantEventButtons' color='green' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button>
                            <Button className='addParticipantEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)} color='green'>Make Contributor</Button>
                            </div>
                            </p>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card className='invisibleCard'>
                        <Card.Content className='invisibleCard'>
                        <div className='participantModalButtonContainer'>
                            <Button className='addParticipantEventButtons' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button>
                            <Button className='addParticipantEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default ParticipantCardModal;