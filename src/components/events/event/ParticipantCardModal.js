import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class ParticipantCardModal extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (parseInt(this.props.user.id) === currentUser.id) {
            return <></>
        } else {
            if (this.props.newUser[0].vetoad === true && this.props.newUser[0].canSuggestEvent === false) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.newUser[0].firstName} {this.props.newUser[0].lastName}<Button color='green' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.newUser[0].canSuggestEvent === true && this.props.newUser[0].vetoad === false) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.newUser[0].firstName} {this.props.newUser[0].lastName}<Button onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button><Button color='green' onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else if (this.props.newUser[0].canSuggestEvent === true && this.props.newUser[0].vetoad === true) {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.newUser[0].firstName} {this.props.newUser[0].lastName}<Button color='green' onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)} color='green'>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card>
                        <Card.Content>
                                <Card.Header>{this.props.newUser[0].firstName} {this.props.newUser[0].lastName}<Button onClick={() => this.props.updateVetoad(this.props.newUser[0].userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.newUser[0].userId)}>Make Contributor</Button></Card.Header>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
}

export default ParticipantCardModal;