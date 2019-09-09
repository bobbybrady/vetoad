import React, { Component } from "react"
import EventManager from '../../../modules/EventsManager'
import SuggestionsManager from '../../../modules/SuggestionsManager'
import UserEventsManager from '../../../modules/UserEventsManager'
import { Button, Modal, Image } from 'semantic-ui-react'
import Suggestion from './Suggestion'
import UserEvent from './UserEvent'

class PastEventList extends Component {

    state = {
        name: '',
        date: '',
        userId: 0,
        suggestions: [],
        userEvents: []
    }

    getEvent = () => {
        EventManager.get(this.props.eventId).then(event => {
            this.setState({
                name: event.name,
                date: event.date,
                userId: event.userId
            })
        })
    }

    getUserEvents = () => {
        UserEventsManager.getAll().then(userEvents => {
            const filteredUserEvents = userEvents.filter(userEvent => userEvent.eventId === this.props.eventId)
            this.setState({
                userEvents: filteredUserEvents
            })
        })
    }

    getSuggestions = () => {
        SuggestionsManager.getSuggestionEvent(this.props.eventId).then(suggestions => {
            this.setState({
                suggestions: suggestions
            })
        })
    }
    componentDidMount() {
        this.getEvent()
        this.getSuggestions()
        this.getUserEvents()
    }

    render() {
        return (
            <div className="eventsContainer">
                <header>
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.date}</h3>
                </header>

                <Modal trigger={<Button>How it works</Button>}>
                    <Modal.Header>How It Works</Modal.Header>
                    <Modal.Content>
                        <Image src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/198/parrot_1f99c.png'/>
                        <Modal.Description>
                            <p>
                            Parr-OUT – This card shall be used when you vote no for an option. In the cases where there are multiple options, a Parr-OUT option counts as -1. Parr-OUTs should only be used when you don’t want to do something. If you don’t care keep that Parr-OUT in its cage!
        </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Button>Next</Button>
                </Modal>
                <div className='suggestions'>
                    <h2>Vote Here!</h2>
                    {this.state.suggestions.map(suggestion =>
                        <Suggestion
                            key={suggestion.id}
                            suggestion={suggestion} />
                    )}
                </div>
                <div className='userEvents'>
                    <h2>List of Participants</h2>
                    <ol>
                    {this.state.userEvents.map(userEvent =>
                       <UserEvent
                            key={userEvent.id}
                            userEvent={userEvent}
                            {...this.props} />
                    )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default PastEventList;