import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class Suggestion extends Component {


    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents === undefined || this.props.userEvents.length === 0) {
            return <></>
        } else {
            const green = {
                color: "green",
                opacity: '.7'
            }
            const red = {
                color: "red",
                opacity: '.7'
            }
            const blue = {
                color: "blue",
                opacity: '.7'
            }
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === this.props.suggestion.id)
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === this.props.suggestion.id)
            const filteredVetoads = this.props.userEvents.filter(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            if (this.props.userId === currentUser.id) {
                return (
                    <Card>
                        <Card.Content>
                            <Card.Header>{this.props.suggestion.name}</Card.Header>
                            <Button>🐩</Button>
                            <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                            <Button>🦜</Button>
                            <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                            <Button>🐸</Button>
                            <Card.Meta style={blue}>{filteredVetoads.length}</Card.Meta>
                            <Button>Delete</Button>
                        </Card.Content>
                    </Card>
                )
            } else {
                const findVetoad = this.props.userEvents.find(userEvent => currentUser.id === userEvent.userId)
                if (findVetoad.vetoad === true) {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.suggestion.name}</Card.Header>
                                <Button>🐩</Button>
                                <Button>🦜</Button>
                                <Button>🐸</Button>
                            </Card.Content>
                        </Card>
                    )
                } else {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.suggestion.name}</Card.Header>
                                <Button>🐩</Button>
                                <Button>🦜</Button>
                            </Card.Content>
                        </Card>
                    )
                }
        }
    }
}
}


export default Suggestion;