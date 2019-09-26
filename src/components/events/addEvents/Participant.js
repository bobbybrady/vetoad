import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class Participant extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (parseInt(this.props.user.userId) === currentUser.id) {
            return <></>
        } else {
            if (this.props.user.vetoad === true && this.props.user.canSuggestEvent === false) {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <Card.Header className='participantButtonContainer'>{this.props.user.name}<Button color='green' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button><Button onClick={() => this.props.removeParticipant(this.props.user.userId)}>Delete</Button></Card.Header>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === false) {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <Card.Header className='participantButtonContainer'>{this.props.user.name}<Button onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button color='green' onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button><Button onClick={() => this.props.removeParticipant(this.props.user.userId)}>Delete</Button></Card.Header>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === true) {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <Card.Header className='participantButtonContainer'>{this.props.user.name}<Button color='green' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)} color='green'>Make Contributor</Button><Button onClick={() => this.props.removeParticipant(this.props.user.userId)}>Delete</Button></Card.Header>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <Card.Header className='participantButtonContainer'>{this.props.user.name}<Button onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button><Button onClick={() => this.props.removeParticipant(this.props.user.userId)}>Delete</Button></Card.Header>
                            </li>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default Participant;