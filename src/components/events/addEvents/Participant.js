import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class Participant extends Component {


    render() {
        if (this.props.user.vetoad === true && this.props.user.canSuggestEvent === false) {
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.user.name}<Button color='green'onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === false){
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.user.name}<Button onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button color='green'onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        } else if (this.props.user.canSuggestEvent === true && this.props.user.vetoad === true) {
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.user.name}<Button color='green' onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)} color='green'>Make Contributor</Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        } else {
            return (
                <Card>
                    <Card.Content>
                        <li>
                            <Card.Header>{this.props.user.name}<Button onClick={() => this.props.updateVetoad(this.props.user.userId)}>Vetoad</Button><Button onClick={() => this.props.updateCanSuggestEvent(this.props.user.userId)}>Make Contributor</Button></Card.Header>
                        </li>
                    </Card.Content>
                </Card>
            )
        }
    }
}

export default Participant;