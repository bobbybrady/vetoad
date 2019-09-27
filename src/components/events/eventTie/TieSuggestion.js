import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'
import TiePoodleButton from './TiePoodleButton'
import UserEventManager from '../../../modules/UserEventsManager'

class TieSuggestion extends Component {


    updateExistingUserEventPoodle = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.userId === currentUser.id && this.props.suggestion.eventId === userEvent.eventId)
        const editedUserEvent = {
            eventId: vetoadCheck.eventId,
            poodleSuggestionId: vetoadCheck.poodleSuggestionId,
            parrotSuggestionId: vetoadCheck.parrotSuggestionId,
            vetoadSuggestionId: vetoadCheck.vetoadSuggestionId,
            vetoad: vetoadCheck.vetoad,
            canSuggestEvent: vetoadCheck.canSuggestEvent,
            userId: vetoadCheck.userId,
            id: vetoadCheck.id,
            tieId: this.props.suggestion.id
        };
        UserEventManager.update(editedUserEvent).then(this.props.getSuggestions).then(this.props.getUserEvents)
    }




    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents === undefined || this.props.userEvents.length === 0) {
            return <></>
        } else {
            const green = {
                color: "green",
                opacity: '.7'
            }

            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.tieId === this.props.suggestion.id)
            if (this.props.userId === currentUser.id) {
                return (
                    <Card className='suggestionCard'>
                        <Card.Content>
                            <Card.Header>{this.props.suggestion.name}</Card.Header>
                            <div className='tieButtonContainer'>
                                <div>
                                    <TiePoodleButton {...this.props}
                                        updateExistingUserEventPoodle={this.updateExistingUserEventPoodle} />
                                    <Card.Meta style={green}>{filteredPoodles.length}</Card.Meta>
                                </div>
                                <Button icon='trash alternate outline' onClick={() => this.props.deleteSuggestion(this.props.suggestion.id)}></Button>
                            </div>
                        </Card.Content>
                    </Card>
                )
            } else {
                return (
                    <Card className='suggestionCard'>
                        <Card.Content>
                            <Card.Header>{this.props.suggestion.name}</Card.Header>
                            <TiePoodleButton {...this.props}
                                updateExistingUserEventPoodle={this.updateExistingUserEventPoodle} />
                        </Card.Content>
                    </Card>
                )
            }
        }


    }
}


export default TieSuggestion;