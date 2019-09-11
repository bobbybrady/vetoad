import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class ParticipantCardModal extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (parseInt(this.props.user.id) === currentUser.id) {
            return <></>
        } else {
            if (this.props.user.vetoad === true && this.props.user.canSuggestEvent === false) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.user.firstName} {this.props.user.lastName}<Button color='green' onClick={() => this.props.updateVetoad(this.props.user.id)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.id)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === false) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.user.firstName} {this.props.user.lastName}<Button onClick={() => this.props.updateVetoad(this.props.user.id)}>Vetoad</Button><Button color='green' onClick={() => this.props.updateCanSuggestEvent(this.props.user.id)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === true) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.user.firstName} {this.props.user.lastName}<Button color='green' onClick={() => this.props.updateVetoad(this.props.user.id)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.id)} color='green'>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.user.firstName} {this.props.user.lastName}<Button onClick={() => this.props.updateVetoad(this.props.user.id)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.id)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default ParticipantCardModal;