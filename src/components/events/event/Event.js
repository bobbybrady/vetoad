import React, { Component } from "react"
import EventManager from '../../../modules/EventsManager'
import SuggestionsManager from '../../../modules/SuggestionsManager'
import UserManager from '../../../modules/UserManager'
import UserEventsManager from '../../../modules/UserEventsManager'
import { Button, Modal, Image, Icon } from 'semantic-ui-react'
import Suggestion from './Suggestion'
import UserEvent from './UserEvent'
import UserListModal from './UserListModal'
import EditEventNameModal from '../../modals/EditEventNameModal'
import EditEventDateModal from '../../modals/EditEventDateModal'
import EditEventCategoryModal from '../../modals/EditEventCategoryModal'
import EventTie from '../eventTie/EventTie'

class Event extends Component {

    state = {
        name: '',
        date: '',
        userId: 0,
        suggestions: [],
        userEvents: [],
        suggestionsNew: [],
        suggestion: '',
        open: false,
        users: [],
        newUser: [],
        search: '',
        totalCount: [],
        isOver: false
    }

    getEvent = () => {
        return EventManager.get(this.props.eventId).then(event => {
            this.setState({
                name: event.name,
                date: event.date,
                userId: event.userId,
                category: event.category,
                tie: event.tie
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
            this.setState({ suggestion: '' })
            this.getEvent()
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
        this.getEvent().then(this.getSuggestions).then(this.getUserEvents).then(this.getAllUsers).then(() => {
            this.state.suggestions.map(suggestion => {
                const filteredPoodles = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.poodleSuggestionId)
                const filteredParrots = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.parrotSuggestionId)
                const filteredVetoads = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.vetoadSuggestionId)
                const totalCount = this.state.totalCount.concat({
                    name: suggestion.name,
                    totalCount: (filteredPoodles.length - filteredParrots.length),
                    vetoad: filteredVetoads.length,
                    id: suggestion.id,
                    eventId: this.props.eventId
                })
                this.setState({ totalCount: totalCount.filter(vetoad => vetoad.vetoad === 0).sort((a, b) => (b.totalCount - a.totalCount)) })
            })
        })
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false,
    newUser:[] })

    addUserId = (event) => {
        const foundUser = this.state.users.find(user => user.id === parseInt(event.target.id))
        const userObject = this.state.newUser.concat({
            userId: parseInt(event.target.id),
            vetoad: false,
            canSuggestEvent: false,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        });
        this.setState({ newUser: userObject })
        
    }

    updateVetoad = (userId) => {
        this.setState({
            newUser: this.state.newUser.map(user => {
                return parseInt(user.userId) === userId
                    ? (user.vetoad = !user.vetoad, user)
                    : user
            })
        })
    }
    updateCanSuggestEvent = (userId) => {
        this.setState({
            newUser: this.state.newUser.map(user => {
                return parseInt(user.userId) === userId
                    ? (user.canSuggestEvent = !user.canSuggestEvent, user)
                    : user
            })
        })
    }

    addParticipantToEvent = () => {
        const participantObject = {
            eventId: this.props.eventId,
            poodleSuggestionId: null,
            parrotSuggestionId: null,
            vetoadSuggestionId: null,
            userId: parseInt(this.state.newUser[0].userId),
            vetoad: this.state.newUser[0].vetoad,
            canSuggestEvent: this.state.newUser[0].canSuggestEvent,
            tieId: null
        }
        UserEventsManager.post(participantObject).then(() => {
            this.getUserEvents()
            this.close()
            this.setState({newUser:[]})
        })
    }

    editEvent = () => {
        const editedObject = {
            name: this.state.name,
            userId: this.state.userId,
            category: this.state.category,
            date: this.state.date,
            isOver: false,
            id: this.props.eventId,
            tie: false
        }
        EventManager.update(editedObject).then(() => {
            this.getEvent().then(this.getSuggestions).then(this.getUserEvents).then(this.getAllUsers).then(() => {
                this.props.getAllEvents()
            })
        })
    }

    deleteParticipant = id => {
        UserEventsManager.delete(id)
            .then(() => {
                this.getUserEvents()
                this.props.getAllUserEvents()
            })
    }

    deleteSuggestion = id => {
        SuggestionsManager.delete(id)
            .then(() => {
                this.getSuggestions()
            })
    }

    endEvent = () => {
        if (this.state.totalCount[0].totalCount === this.state.totalCount[1].totalCount) {
            const finishedEvent = {
                name: this.state.name,
                userId: this.state.userId,
                category: this.state.category,
                date: this.state.date,
                isOver: false,
                id: this.props.eventId,
                tie: true
            }
            EventManager.update(finishedEvent).then(() => {
                this.props.getAllEvents()
                this.getEvent()
            })
        } else {
            const finishedEvent = {
                name: this.state.name,
                userId: this.state.userId,
                category: this.state.category,
                date: this.state.date,
                isOver: true,
                id: this.props.eventId,
                tie: false
            }
            EventManager.update(finishedEvent).then(() => {
                this.getEvent().then(() => {
                    this.props.getAllEvents()
                    this.props.history.push(`/pastevents/${this.props.eventId}`)
                })
            })
        }

    }

    endTie = () => {
        const finishedEvent = {
            name: this.state.name,
            userId: this.state.userId,
            category: this.state.category,
            date: this.state.date,
            isOver: true,
            id: this.props.eventId,
            tie: true
        }
        EventManager.update(finishedEvent).then(() => {
            this.getEvent().then(() => {
                this.props.getAllEvents()
                this.props.history.push(`/pastevents/${this.props.eventId}`)
            })
        })
    }

    searchForParticipant = (participant) => {
        const searchedUsers = this.state.users.filter(user => user.firstName.toString().toLowerCase().includes(participant.toString().toLowerCase()) || user.lastName.toString().toLowerCase().includes(participant.toString().toLowerCase()))
        return searchedUsers
    }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.state.userEvents.length === 0) {
            return <></>
        } else if(this.state.totalCount.length < 2 ) {
            const findUserEvent = this.state.userEvents.find(userEvent => userEvent.userId === currentUser.id)
            if (this.state.userId === currentUser.id) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <EditEventNameModal
                                name={this.state.name}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
                            <h3>{this.state.date}</h3>
                            <EditEventDateModal
                                date={this.state.date}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
                        </header>

                        <div className='suggestions'>
                            <h2>{this.state.category}</h2>
                            <EditEventCategoryModal
                                category={this.state.category}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
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
                                    getUserEvents={this.getUserEvents}
                                    deleteSuggestion={this.deleteSuggestion} />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>

                            <Modal trigger={<Button><Icon name="add" /></Button>} closeIcon>
                                <Modal.Header>Add Participants</Modal.Header>
                                <Modal.Content >
                                    <div className='overflow'>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            onKeyUp={this.searchForParticipant}
                                            id="search"
                                        />
                                        <ol>
                                            {  this.searchForParticipant(this.state.search).map(user =>
                                                <UserListModal
                                                    open={this.state.open}
                                                    onOpen={this.open}
                                                    onClose={this.close}
                                                    key={user.id}
                                                    user={user}
                                                    userEvents={this.state.userEvents}
                                                    addUserId={this.addUserId}
                                                    updateCanSuggestEvent={this.updateCanSuggestEvent}
                                                    updateVetoad={this.updateVetoad}
                                                    newUser={this.state.newUser}
                                                    addParticipantToEvent={this.addParticipantToEvent}
                                                    search={this.state.search}
                                                />
                                            )}
                                        </ol>
                                    </div>
                                </Modal.Content>
                            </Modal>
                            <ol>
                                {this.state.userEvents.map(userEvent =>
                                    <UserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                        userId={this.state.userId}
                                        deleteParticipant={this.deleteParticipant}
                                    />
                                )}
                            </ol>
                        </div>
                        <Button onClick={this.endEvent}>End</Button>
                    </div>
                )
            } else if (findUserEvent.canSuggestEvent === true) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.date}</h3>
                        </header>

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
        } else {
            const findUserEvent = this.state.userEvents.find(userEvent => userEvent.userId === currentUser.id)
            if (this.state.totalCount[0].totalCount === this.state.totalCount[1].totalCount && this.state.tie === true) {
                return <EventTie
                    userId={this.state.userId}
                    userEvents={this.state.userEvents}
                    getSuggestions={this.getSuggestions}
                    getUserEvents={this.getUserEvents}
                    totalCount={this.state.totalCount}
                    deleteSuggestion={this.state.deleteSuggestion}
                    deleteParticipant={this.state.deleteParticipant}
                    name={this.state.name}
                    category={this.state.category}
                    date={this.state.date} 
                    endTie={this.endTie}/>
            } else if (this.state.userId === currentUser.id) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <EditEventNameModal
                                name={this.state.name}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
                            <h3>{this.state.date}</h3>
                            <EditEventDateModal
                                date={this.state.date}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
                        </header>

                        <div className='suggestions'>
                            <h2>{this.state.category}</h2>
                            <EditEventCategoryModal
                                category={this.state.category}
                                handleFieldChange={this.handleFieldChange}
                                editEvent={this.editEvent} />
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
                                    getUserEvents={this.getUserEvents}
                                    deleteSuggestion={this.deleteSuggestion} />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>

                            <Modal trigger={<Button><Icon name="add" /></Button>} closeIcon>
                                <Modal.Header>Add Participants</Modal.Header>
                                <Modal.Content >
                                    <div className='overflow'>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            onKeyUp={this.searchForParticipant}
                                            id="search"
                                        />
                                        <ol>
                                            {this.searchForParticipant(this.state.search).map(user =>
                                                <UserListModal
                                                    open={this.state.open}
                                                    onOpen={this.open}
                                                    onClose={this.close}
                                                    key={user.id}
                                                    user={user}
                                                    userEvents={this.state.userEvents}
                                                    addUserId={this.addUserId}
                                                    updateCanSuggestEvent={this.updateCanSuggestEvent}
                                                    updateVetoad={this.updateVetoad}
                                                    newUser={this.state.newUser}
                                                    addParticipantToEvent={this.addParticipantToEvent}
                                                />
                                            )}
                                        </ol>
                                    </div>
                                </Modal.Content>
                            </Modal>
                            <ol>
                                {this.state.userEvents.map(userEvent =>
                                    <UserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                        userId={this.state.userId}
                                        deleteParticipant={this.deleteParticipant}
                                    />
                                )}
                            </ol>
                        </div>
                        <Button onClick={this.endEvent}>End</Button>
                    </div>
                )
            } else if (findUserEvent.canSuggestEvent === true) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.date}</h3>
                        </header>

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


export default Event;