import React, { Component } from "react"
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import AddEventParticipant from './AddEventParticipant'
import Participant from "./Participant"
import AddSuggestion from "./AddSuggestion"
import EventsManager from '../../../modules/EventsManager'
import UserEventsManager from '../../../modules/UserEventsManager'
import SuggestionsManager from '../../../modules/SuggestionsManager'

class AddEvent extends Component {

    state = {
        name: '',
        date: '',
        category: '',
        users: [],
        search: '',
        suggestion: '',
        suggestions: []
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    updateVetoad = (userId) => {
        this.setState({
            users: this.state.users.map(user => {
                return user.userId === userId
                    ? (user.vetoad = !user.vetoad, user)
                    : user
            })
        })
    }
    updateCanSuggestEvent = (userId) => {
        this.setState({
            users: this.state.users.map(user => {
                return user.userId === userId
                    ? (user.canSuggestEvent = !user.canSuggestEvent, user)
                    : user
            })
        })
    }
    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const wholeName = `${currentUser.firstName} ${currentUser.lastName}`
        const userObject = this.state.users.concat({
            userId: currentUser.id,
            name: wholeName,
            vetoad: true,
            canSuggestEvent: true
        });
        this.setState({ users: userObject })
    }

    addUserId = (event) => {
        const userObject = this.state.users.concat({
            userId: event.target.id,
            name: event.target.value,
            vetoad: false,
            canSuggestEvent: false
        });
        this.setState({ users: userObject })
    }

    handleSuggestionAdd = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const suggestionObject = this.state.suggestions.concat({
            userId: currentUser.id,
            name: this.state.suggestion,
        });
        this.setState({
            suggestions: suggestionObject,
            suggestion: ''
        })
    }

    searchForParticipant = (participant) => {
        const searchedUsers = this.props.allUsers.filter(user => user.firstName.toString().toLowerCase().includes(participant.toString().toLowerCase()) || user.lastName.toString().toLowerCase().includes(participant.toString().toLowerCase()))
        return searchedUsers
    }

    submitForm = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.state.name === '') {
            window.alert('Please Enter an valid event name')
        } else if (this.state.date === '') {
            window.alert('Please Enter a valid date')
        } else if (this.state.category === '') {
            window.alert('Please Enter a valid category')
        } else {
            const eventObject = {
                name: this.state.name,
                date: this.state.date,
                userId: currentUser.id,
                isOver: false,
                category: this.state.category
            }
            EventsManager.post(eventObject).then((returnedEventObject) => {
                this.state.users.map(user => {
                    const userEventObject = {
                        eventId: returnedEventObject.id,
                        poodleSuggestionId: null,
                        parrotSuggestionId: null,
                        vetoadSuggestionId: null,
                        userId: parseInt(user.userId),
                        vetoad: user.vetoad,
                        canSuggestEvent: user.canSuggestEvent
                    }
                    this.props.getAllEvents()
                    UserEventsManager.post(userEventObject).then(() => {
                    })
                })
                this.state.suggestions.map(suggestion => {
                    const suggestionObject = {
                        name: suggestion.name,
                        eventId: returnedEventObject.id
                    }
                    SuggestionsManager.post(suggestionObject).then(() => {
                    })
                })
                this.props.history.push(`/events/${returnedEventObject.id}`)
            })
        }
    }

    render() {
        return (
            <div className="eventsContainer">
                <h1>Add Event</h1>
                <Form>
                    <Form.Field>
                        <label>Event Name</label>
                        <input
                            onChange={this.handleFieldChange}
                            id='name'
                            placeholder='Event Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Date</label>
                        <input
                            id='date'
                            onChange={this.handleFieldChange}
                            type='date' placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <input
                            id='category'
                            onChange={this.handleFieldChange}
                            placeholder='Category' />
                    </Form.Field>
                    <div>
                        <h2>Participants</h2>
                        <Modal trigger={<Button><Icon name='add' /></Button>} closeIcon>
                            <Modal.Header>Add Participants</Modal.Header>
                            <Modal.Content>
                                <label>Search</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    onKeyUp={this.searchForParticipant}
                                    id="search"
                                />
                                <div className="overflow">
                                    {this.searchForParticipant(this.state.search).map(user =>
                                        <AddEventParticipant
                                            key={user.id}
                                            user={user}
                                            addUserId={this.addUserId}
                                            addParticipant={this.state.users} />
                                    )
                                    }
                                </div>
                            </Modal.Content>
                        </Modal>
                        <div>
                            <ol>
                                {this.state.users.map(user =>
                                    <Participant
                                        user={user}
                                        key={user.userId}
                                        updateVetoad={this.updateVetoad}
                                        updateCanSuggestEvent={this.updateCanSuggestEvent} />)}
                            </ol>
                        </div>
                    </div>
                    <div>
                        <h2>Add {this.state.category}</h2>
                        <Modal trigger={<Button><Icon name='add' /></Button>} closeIcon>
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
                        <div>
                            {this.state.suggestions.map(addSuggestion =>
                                <AddSuggestion
                                    addSuggestion={addSuggestion}
                                    key={new Date()} />)}
                        </div>
                    </div>
                    <Button onClick={this.submitForm} type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default AddEvent;