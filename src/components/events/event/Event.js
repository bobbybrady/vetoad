import React, { Component } from "react"
import EventManager from '../../../modules/EventsManager'
import SuggestionsManager from '../../../modules/SuggestionsManager'
import UserEventsManager from '../../../modules/UserEventsManager'
import { Button, Modal, Image, Icon } from 'semantic-ui-react'
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
        return EventManager.get(this.props.eventId).then(event => {
            this.setState({
                name: event.name,
                date: event.date,
                userId: event.userId
            })
        })
    }

    getUserEvents = () => {
        return UserEventsManager.getAll().then(userEvents => {
            const filteredUserEvents = userEvents.filter(userEvent => userEvent.eventId === this.props.eventId)
            this.setState({
                userEvents: filteredUserEvents
            })
        })
    }

    getSuggestions = () => {
        return SuggestionsManager.getSuggestionEvent(this.props.eventId).then(suggestions => {
            this.setState({
                suggestions: suggestions
            })
        })
    }
    componentDidMount() {
        this.getEvent().then(this.getSuggestions).then(this.getUserEvents)
    }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.state.userEvents.length === 0) {
            return <></>
        } else {
            const findUserEvent = this.state.userEvents.find(userEvent => userEvent.userId === currentUser.id)
            if (this.state.userId === currentUser.id) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <Button>Edit</Button>
                            <h3>{this.state.date}</h3>
                            <Button>Edit</Button>
                        </header>

                        <Modal trigger={<Button>How it works</Button>}>
                            <Modal.Header>How It Works</Modal.Header>
                            <Modal.Content>
                                <Image src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/198/parrot_1f99c.png' />
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
                            <Button>Edit</Button>
                            <Icon name="add" />
                            {this.state.suggestions.map(suggestion =>
                                <Suggestion
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    userId={this.state.userId}
                                    userEvents={this.state.userEvents}
                                    getSuggestions={this.getSuggestions}
                                    getUserEvents={this.getUserEvents} />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>
                            <Icon name="add" />
                            <ol>
                                {this.state.userEvents.map(userEvent =>
                                    <UserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                        userId={this.state.userId} />
                                )}
                            </ol>
                        </div>
                        <Button>End</Button>
                    </div>
                )
            } else if (findUserEvent.canSuggestEvent === true) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.date}</h3>
                        </header>

                        <Modal trigger={<Button>How it works</Button>}>
                            <Modal.Header>How It Works</Modal.Header>
                            <Modal.Content>
                                <Image src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/198/parrot_1f99c.png' />
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
                            <Icon name="add" />
                            {this.state.suggestions.map(suggestion =>
                                <Suggestion
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    userId={this.state.userId}
                                    userEvents={this.state.userEvents}
                                    getSuggestions={this.getSuggestions}
                                    getUserEvents={this.getUserEvents} />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>
                            <ol>
                                {this.state.userEvents.map(userEvent =>
                                    <UserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                        userId={this.state.userId} />
                                )}
                            </ol>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.date}</h3>
                        </header>

                        <Modal trigger={<Button>How it works</Button>}>
                            <Modal.Header>How It Works</Modal.Header>
                            <Modal.Content>
                                <Image src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/198/parrot_1f99c.png' />
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
                                    suggestion={suggestion}
                                    userId={this.state.userId}
                                    userEvents={this.state.userEvents}
                                    getSuggestions={this.getSuggestions}
                                    getUserEvents={this.getUserEvents} />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>
                            <ol>
                                {this.state.userEvents.map(userEvent =>
                                    <UserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                        userId={this.state.userId} />
                                )}
                            </ol>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default PastEventList;