import React, { Component } from "react"
import EventManager from '../../../modules/EventsManager'
import SuggestionsManager from '../../../modules/SuggestionsManager'
import UserManager from '../../../modules/UserManager'
import UserEventsManager from '../../../modules/UserEventsManager'
import { Button, Modal, Image, Icon } from 'semantic-ui-react'
import Suggestion from './Suggestion'
import UserEvent from './UserEvent'
import AddUserModal from '../../modals/AddUserModal'
import UserListModal from './UserListModal'

class PastEventList extends Component {

    state = {
        name: '',
        date: '',
        userId: 0,
        suggestions: [],
        userEvents: [],
        suggestionsNew: [],
        suggestion: '',
        open: false,
        users: []
    }

    getEvent = () => {
        return EventManager.get(this.props.eventId).then(event => {
            this.setState({
                name: event.name,
                date: event.date,
                userId: event.userId,
                category: event.category
            })
        })
    }

    getAllUsers = () => {
        return UserManager.getAll().then((users) => {
            this.setState({
                users: users
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

    handleSuggestionAdd = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const suggestionNewObject = {
            userId: currentUser.id,
            name: this.state.suggestion,
            eventId: this.props.eventId
        };
        SuggestionsManager.post(suggestionNewObject).then(() => {
            this.getSuggestions()
        })
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
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

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

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

                        <Modal trigger={<Button>How it works</Button>} closeIcon>
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
                            <h2>{this.state.category}</h2>
                            <Button>Edit</Button>
                            <Modal trigger={<Button><Icon name="add" /></Button>} closeIcon>
                                <Modal.Header>Add {this.state.category}</Modal.Header>
                                <Modal.Content>
                                    <label>Add {this.state.category}</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="suggestion"
                                        value={this.state.suggestion}
                                    />
                                    <Button onClick={this.handleSuggestionAdd}>Add</Button>
                                </Modal.Content>
                            </Modal>
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

                            <Modal trigger={<Button><Icon name="add" /></Button>} closeIcon>
                                <Modal.Header>Add Participants</Modal.Header>
                                <Modal.Content >
                                    <div className='overflow'>
                                        <ol>
                                            {this.state.users.map(user =>
                                                <UserListModal />
                                            )}
                                        </ol>
                                    </div>
                                </Modal.Content>
                                <Modal.Actions custom='secondary'>
                                    <AddUserModal
                                        open={this.state.open}
                                        onOpen={this.open}
                                        onClose={this.close} />
                                </Modal.Actions>
                            </Modal>
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
                            <h2>{this.state.category}</h2>
                            <Modal trigger={<Button><Icon name="add" /></Button>} closeIcon>
                                <Modal.Header>Add {this.state.category}</Modal.Header>
                                <Modal.Content>
                                    <label>Add {this.state.category}</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="suggestion"
                                        value={this.state.suggestion}
                                    />
                                    <Button onClick={this.handleSuggestionAdd}>Add</Button>
                                </Modal.Content>
                            </Modal>
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
                            <h2>{this.state.category}</h2>
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