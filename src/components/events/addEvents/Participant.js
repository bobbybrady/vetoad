import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class Participant extends Component {

//renders the name of the added user along with the buttons to give vetoad or contribution powers
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
                                <div className='participantButtonContainer'>
                                    <p className='addEventUserName'>{this.props.user.name}</p>
                                    <div className='addEventButtonContainer'>
                                        <Button className='addEventButtons' color='green' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button>
                                        <Button className='addEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button>
                                        <Button className='addEventButtons' icon='trash alternate outline' onClick={() => this.props.removeParticipant(this.props.user.userId)}></Button>
                                    </div>
                                </div>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === false) {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <div className='participantButtonContainer'>
                                    <p className='addEventUserName'>{this.props.user.name}</p>
                                    <div className='addEventButtonContainer'>
                                        <Button className='addEventButtons' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button>
                                        <Button className='addEventButtons' color='green' onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button>
                                        <Button className='addEventButtons' icon='trash alternate outline' onClick={() => this.props.removeParticipant(this.props.user.userId)}></Button>
                                    </div>
                                </div>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === true) {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <div className='participantButtonContainer'>
                                    <p className='addEventUserName'>{this.props.user.name}</p>
                                    <div className='addEventButtonContainer'>
                                        <Button className='addEventButtons' color='green' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button>
                                        <Button className='addEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)} color='green'>Make Contributor</Button>
                                        <Button className='addEventButtons' icon='trash alternate outline' onClick={() => this.props.removeParticipant(this.props.user.userId)}></Button>
                                    </div>
                                </div>
                            </li>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card className='participantCard'>
                        <Card.Content className='participantCard'>
                            <li>
                                <div className='participantButtonContainer'>
                                    <p className='addEventUserName'>{this.props.user.name}</p>
                                    <div className='addEventButtonContainer'>
                                        <Button className='addEventButtons' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button>
                                        <Button className='addEventButtons' onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button>
                                        <Button className='addEventButtons' icon='trash alternate outline' onClick={() => this.props.removeParticipant(this.props.user.userId)}></Button>
                                    </div>
                                </div>
                            </li>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default Participant;