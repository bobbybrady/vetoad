import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class PastSuggestion extends Component {
    

    findWinner = () => {
        const findEvent = this.props.events.find(event => event.id === this.props.eventId)
        if (findEvent.tie=== true) {
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === this.props.suggestion.id)
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === this.props.suggestion.id)
            const filteredTie = this.props.userEvents.filter(userEvent => userEvent.tieId === this.props.suggestion.id)
            const total = (filteredPoodles.length - filteredParrots.length) + filteredTie.length
            const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            this.props.winner(total, this.props.suggestion.name, vetoadCheck, this.props.suggestion.id)
        } else {
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === this.props.suggestion.id)
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === this.props.suggestion.id)
            const total = filteredPoodles.length - filteredParrots.length
            const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            this.props.winner(total, this.props.suggestion.name, vetoadCheck, this.props.suggestion.id)
        }
    }
    componentDidMount() {
        this.findWinner()
    }
    render() {
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
            const vetoadColor = {
                backgroundColor: "gray",
                opacity: '.4'
            }
            const winner = {
                backgroundColor: "gold",
                opacity: '.9'
            }
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === this.props.suggestion.id)
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === this.props.suggestion.id)
            const filteredVetoads = this.props.userEvents.filter(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)

            if (vetoadCheck === undefined || vetoadCheck.vetoad === false) {
                if (this.props.suggestion.id === this.props.winningId) {
                    return (
                        <Card style={winner}>
                            <Card.Content>
                                <Card.Header>{this.props.suggestion.name}</Card.Header>
                                <Button disabled color='green'>🐩</Button>
                                <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                                <Button disabled color='red'>🦜</Button>
                                <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                                <Button disabled color='blue'>🐸</Button>
                                <Card.Meta style={blue}>{filteredVetoads.length}</Card.Meta>
                            </Card.Content>
                        </Card>
                    )
                } else {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.suggestion.name}</Card.Header>
                                <Button disabled color='green'>🐩</Button>
                                <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                                <Button disabled color='red'>🦜</Button>
                                <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                                <Button disabled color='blue'>🐸</Button>
                                <Card.Meta style={blue}>{filteredVetoads.length}</Card.Meta>
                            </Card.Content>
                        </Card>
                    )
                }
            } else {
                return (
                    <Card>
                        <Card.Content style={vetoadColor}>
                            <Card.Header><strike>{this.props.suggestion.name}🐸</strike></Card.Header>
                            <Button disabled color='green'>🐩</Button>
                            <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                            <Button disabled color='red'>🦜</Button>
                            <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                            <Button disabled color='blue'>🐸</Button>
                            <Card.Meta style={blue}>{filteredVetoads.length}</Card.Meta>
                        </Card.Content>
                    </Card>
                )

            }
        }
    }
}


export default PastSuggestion;