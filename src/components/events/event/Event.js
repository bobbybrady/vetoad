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
import './Event.css'

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
        isOver: false,
    }
    //gets the specific event
    getEvent = () => {
        return EventManager.get(this.props.eventId).then(event => {
            this.setState({
                name: event.name,
                date: event.date,
                userId: event.userId,
                category: event.category,
                tie: event.tie,
                isOver: event.isOver
            })
        })
    }
    //gets all users stores them in state
    getAllUsers = () => {
        return UserManager.getAll().then((users) => {
            this.setState({
                users: users
            })
        })
    }
    //gets all userEvents stores them in state
    getUserEvents = () => {
        return UserEventsManager.getAll().then(userEvents => {
            const filteredUserEvents = userEvents.filter(userEvent => userEvent.eventId === this.props.eventId)
            this.setState({
                userEvents: filteredUserEvents
            })
        })
    }
    //adds a new suggestion to the database, re-renders the page
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
            this.setTotalCount()
        })
    }
    //updates state based on user input
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    //gets all suggestions
    getSuggestions = () => {
        return SuggestionsManager.getSuggestionEvent(this.props.eventId).then(suggestions => {
            this.setTotalCount()
            this.setState({
                suggestions: suggestions
            })
        })
    }
    //for each suggestion this adds up each vote and stores the votes in state sorted by total count
    setTotalCount = () => {
        const totalCount = this.state.suggestions.map(suggestion => {
            const filteredPoodles = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.poodleSuggestionId)
            const filteredParrots = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.parrotSuggestionId)
            const filteredVetoads = this.state.userEvents.filter(userEvent => suggestion.id === userEvent.vetoadSuggestionId)
            const totalCountObject = {
                name: suggestion.name,
                totalCount: (filteredPoodles.length - filteredParrots.length),
                vetoad: filteredVetoads.length,
                id: suggestion.id,
                eventId: this.props.eventId
            }
            return totalCountObject;
        })
        this.setState({ totalCount: totalCount.filter(vetoad => vetoad.vetoad === 0).sort((a, b) => (b.totalCount - a.totalCount)) })
    }
    componentDidMount() {
        this.getEvent().then(this.getSuggestions).then(this.getUserEvents).then(this.getAllUsers).then(() => {
            this.setTotalCount()
        })
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({
        open: false,
        newUser: []
    })
    //adds a new user to state to open another modal with this users info
    addUserId = (event) => {
        const foundUser = this.state.users.find(user => user.id === parseInt(event.currentTarget.id))
        const userObject = this.state.newUser.concat({
            userId: parseInt(event.currentTarget.id),
            vetoad: false,
            canSuggestEvent: false,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        });
        this.setState({ newUser: userObject })

    }
    //toggles the vetoad in state 
    updateVetoad = (userId) => {
        this.setState({
            newUser: this.state.newUser.map(user => {
                return parseInt(user.userId) === userId
                    ? (user.vetoad = !user.vetoad, user)
                    : user
            })
        })
    }
    //toggles the contribution in state
    updateCanSuggestEvent = (userId) => {
        this.setState({
            newUser: this.state.newUser.map(user => {
                return parseInt(user.userId) === userId
                    ? (user.canSuggestEvent = !user.canSuggestEvent, user)
                    : user
            })
        })
    }
    //adds a participant to the event
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
            this.setState({ newUser: [] })
        })
    }
    //edits the event
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
    //deletes participant
    deleteParticipant = id => {
        UserEventsManager.delete(id)
            .then(() => {
                this.getUserEvents()
                this.props.getAllUserEvents()
            })
    }
    //delete suggestion
    deleteSuggestion = id => {
        SuggestionsManager.delete(id)
            .then(() => {
                this.getSuggestions()
            })
    }
    //end the event and check if it is a tie
    endEvent = () => {
        this.setTotalCount()
        if (this.state.totalCount.length < 2) {
            window.alert('You must have 2 things to vote on!')
        } else if (this.state.totalCount[0].totalCount === this.state.totalCount[1].totalCount) {
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
                this.getEvent().then(() => {
                    this.props.getAllEvents()
                })
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
                this.props.getAllEvents().then(() => {
                    this.props.getAllUserEvents().then(() => {
                        this.props.getAllSuggestions().then(() => {
                            this.props.history.push(`/pastevents/${this.props.eventId}`)
                        })
                    })
                })
            })
        }

    }
    //end the tie
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
            this.props.getAllEvents().then(() => {
                this.props.getAllUserEvents().then(() => {
                    this.props.getAllSuggestions().then(() => {
                        this.props.history.push(`/pastevents/${this.props.eventId}`)
                    })
                })
            })
        })
    }
    //search the state for a user and filter the users based off the input
    searchForParticipant = (participant) => {
        const searchedUsers = this.state.users.filter(user => user.firstName.toString().toLowerCase().includes(participant.toString().toLowerCase()) || user.lastName.toString().toLowerCase().includes(participant.toString().toLowerCase()))
        return searchedUsers
    }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.state.userEvents.length === 0) {
            return <></>
        } else if (this.state.totalCount.length < 2) {
            const findUserEvent = this.state.userEvents.find(userEvent => userEvent.userId === currentUser.id)
            if (this.state.userId === currentUser.id) {
                return (
                    <div className="eventContainer">
                        <header>
                            <div className='flexEditButton'>
                                <h1 className='hMargin'>{this.state.name}</h1>
                                <EditEventNameModal
                                    name={this.state.name}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                            </div>
                            <div className='flexEditButton'>
                                <h3 className='hMargin'>{this.state.date}</h3>
                                <EditEventDateModal
                                    date={this.state.date}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                            </div>
                        </header>

                        <div className='suggestions'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>{this.state.category}</h2>
                                <EditEventCategoryModal
                                    category={this.state.category}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className='headerColor'>Add {this.state.category}</Modal.Header>
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
                                        <Button className='saveButton' onClick={this.handleSuggestionAdd}>Add</Button>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>Participants</h2>
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className="headerColor">Add Participants</Modal.Header>
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
                                                        search={this.state.search}
                                                    />
                                                )}
                                            </ol>
                                        </div>
                                    </Modal.Content>
                                </Modal>
                            </div>
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
                        <Button onClick={this.endEvent} className='end' attached>End</Button>
                    </div>
                )
            } else if (findUserEvent.canSuggestEvent === true) {
                return (
                    <div className="eventContainer">
                        <header>
                            <h1 className='hMargin'>{this.state.name}</h1>
                            <h3 className='hMargin'>{this.state.date}</h3>
                        </header>

                        <div className='suggestions'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>{this.state.category}</h2>
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className="headerColor">Add {this.state.category}</Modal.Header>
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
                                        <Button className='saveButton' onClick={this.handleSuggestionAdd}>Add</Button>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <h2 className='hMargin'>Participants</h2>
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
                    </div >
                )
            } else {
                return (
                    <div className="eventContainer">
                        <header>
                            <h1 className='hMargin'>{this.state.name}</h1>
                            <h3 className='hMargin'>{this.state.date}</h3>
                        </header>

                        <div className='suggestions'>
                            <h2 className='hMargin'>{this.state.category}</h2>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <h2 className='hMargin'>Participants</h2>
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
                    </div >
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
                    endTie={this.endTie} />
            } else if (this.state.userId === currentUser.id) {
                return (
                    <div className="eventContainer">
                        <header>
                            <div className='flexEditButton'>
                                <h1 className='hMargin'>{this.state.name}</h1>
                                <EditEventNameModal
                                    name={this.state.name}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                            </div>
                            <div className='flexEditButton'>
                                <h3 className='hMargin'>{this.state.date}</h3>
                                <EditEventDateModal
                                    date={this.state.date}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                            </div>
                        </header>

                        <div className='suggestions'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>{this.state.category}</h2>
                                <EditEventCategoryModal
                                    category={this.state.category}
                                    handleFieldChange={this.handleFieldChange}
                                    editEvent={this.editEvent} />
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className='headerColor'>Add {this.state.category}</Modal.Header>
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
                                        <Button className='saveButton' onClick={this.handleSuggestionAdd}>Add</Button>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>Participants</h2>
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className="headerColor">Add Participants</Modal.Header>
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
                            </div>
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
                        <Button onClick={this.endEvent} className='end' attached>End</Button>
                    </div >
                )
            } else if (findUserEvent.canSuggestEvent === true) {
                return (
                    <div className="eventContainer">
                        <header>
                            <h1 className='hMargin'>{this.state.name}</h1>
                            <h3 className='hMargin'>{this.state.date}</h3>
                        </header>

                        <div className='suggestions'>
                            <div className='flexEditButton'>
                                <h2 className='hMargin'>{this.state.category}</h2>
                                <Modal className='modalAdd' trigger={<Button className="smallerButton"><Icon name="add" /></Button>} closeIcon>
                                    <Modal.Header className="headerColor">Add {this.state.category}</Modal.Header>
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
                                        <Button className='saveButton' onClick={this.handleSuggestionAdd}>Add</Button>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <h2 className='hMargin'>Participants</h2>
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
                    <div className="eventContainer">
                        <header>
                            <h1 className='hMargin'>{this.state.name}</h1>
                            <h3 className='hMargin'>{this.state.date}</h3>
                        </header>

                        <div className='suggestions'>
                            <h2 className='hMargin'>{this.state.category}</h2>
                            <div className="suggestionContainer">
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
                        </div>
                        <div className='userEvents'>
                            <h2 className='hMargin'>Participants</h2>
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