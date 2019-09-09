import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'
import PoodleButton from './PoodleButton'
import ParrotButton from './ParrotButton'
import VetoadButton from './VetoadButton'

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
            const vetoadColor = {
                backgroundColor: "gray",
                opacity: '.4'
            }
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === this.props.suggestion.id)
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === this.props.suggestion.id)
            const filteredVetoads = this.props.userEvents.filter(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            // const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.userId === currentUser.id && this.props.suggestion.eventId === userEvent.eventId)
            const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
            if (vetoadCheck === undefined) {
                if (this.props.userId === currentUser.id) {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.suggestion.name}</Card.Header>
                                <PoodleButton {...this.props} />
                                <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                                <ParrotButton {...this.props} />
                                <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                                <VetoadButton {...this.props} />
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
                                    <PoodleButton {...this.props} />
                                    <ParrotButton {...this.props} />
                                    <VetoadButton {...this.props} />
                                </Card.Content>
                            </Card>
                        )
                    } else {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{this.props.suggestion.name}</Card.Header>
                                    <PoodleButton {...this.props} />
                                    <ParrotButton {...this.props} />
                                </Card.Content>
                            </Card>
                        )
                    }
                }
            } else {
                if (this.props.userId === currentUser.id) {
                    return (
                        <Card style={vetoadColor}>
                            <Card.Content>
                                <Card.Header><strike>{this.props.suggestion.name}</strike> 🐸</Card.Header>
                                <PoodleButton {...this.props} />
                                <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                                <ParrotButton {...this.props} />
                                <Card.Meta style={red}>{filteredParrots.length}</Card.Meta>
                                <VetoadButton {...this.props} />
                                <Card.Meta style={blue}>{filteredVetoads.length}</Card.Meta>
                                <Button>Delete</Button>
                            </Card.Content>
                        </Card>
                    )
                } else {
                    const findVetoad = this.props.userEvents.find(userEvent => currentUser.id === userEvent.userId)
                    if (findVetoad.vetoad === true) {
                        return (
                            <Card style={vetoadColor}>
                                <Card.Content>
                                    <Card.Header><strike>{this.props.suggestion.name}</strike> 🐸</Card.Header>
                                    <PoodleButton {...this.props} />
                                    <ParrotButton {...this.props} />
                                    <VetoadButton {...this.props} />
                                </Card.Content>
                            </Card>
                        )
                    } else {
                        return (
                            <Card style={vetoadColor}>
                                <Card.Content>
                                    <Card.Header><strike>{this.props.suggestion.name}</strike> 🐸</Card.Header>
                                    <PoodleButton {...this.props} />
                                    <ParrotButton {...this.props} />
                                </Card.Content>
                            </Card>
                        )
                    }

                }
            }
        }
    }
}


export default Suggestion;