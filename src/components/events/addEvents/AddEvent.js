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

    addUserId = (e) => {
        const userObject = this.state.users.concat({
            userId: e.currentTarget.id,
            name: e.currentTarget.value,
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
            id: Math.random()
        });
        this.setState({
            suggestions: suggestionObject,
            suggestion: ''
        })
    }

    removeSuggestion = (id) => {
        const deletedArray = this.state.suggestions.filter(suggestion => suggestion.id != id)
        this.setState(() => {
            return { suggestions: deletedArray }
        })
    }

    removeParticipant = (id) => {
        const deletedArray = this.state.users.filter(user => user.userId != id)
        this.setState(() => {
            return { users: deletedArray }
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
                category: this.state.category,
                tie: false
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
                        canSuggestEvent: user.canSuggestEvent,
                        tieId: null
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
            <>
                <h1 className='hMargin'>Add Event</h1>
                <div className="eventContainer">
                    <Form>
                        <Form.Field className='hMargin'>
                            <label>Event Name</label>
                            <input
                                onChange={this.handleFieldChange}
                                id='name'
                                placeholder='Event Name' />
                        </Form.Field>
                        <Form.Field className='hMargin'>
                            <label>Date</label>
                            <input
                                id='date'
                                onChange={this.handleFieldChange}
                                type='date' placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field className='hMargin'>
                            <label>Category</label>
                            <input
                                id='category'
                                onChange={this.handleFieldChange}
                                placeholder='Category' />
                        </Form.Field>
                        <div>
                            <div className='flexEditButton'>
                                <h2>Add {this.state.category}</h2>
                                <Modal className='modalAdd' trigger={<Button className='smallerAddButton'><Icon name='add' /></Button>} closeIcon>
                                    <Modal.Header className="headerColor">Add {this.state.category}</Modal.Header>
                                    <Modal.Content>
                                        <label>Add {this.state.category}:</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            id="suggestion"
                                            value={this.state.suggestion}
                                        />
                                        <Button className='saveButton' onClick={this.handleSuggestionAdd}>Save</Button>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className='minHeight'>
                                {this.state.suggestions.map(addSuggestion =>
                                    <AddSuggestion
                                        addSuggestion={addSuggestion}
                                        key={Math.random()}
                                        removeSuggestion={this.removeSuggestion}
                                    />)}
                            </div>
                        </div>
                        <div>
                            <div className='flexEditButton'>
                                <h2>Participants</h2>
                                <Modal className='modalAdd' trigger={<Button className='smallerAddButton'><Icon name='add' /></Button>} closeIcon>
                                    <Modal.Header className='hMargin headerColor'>Add Participants</Modal.Header>
                                    <Modal.Content>
                                        <label className='hMargin'>Search</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control hMargin"
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
                                                    addParticipant={this.state.users}
                                                />
                                            )
                                            }
                                        </div>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className='minHeight'>
                                <ol className='list'>
                                    {this.state.users.map(user =>
                                        <Participant
                                            user={user}
                                            key={user.userId}
                                            updateVetoad={this.updateVetoad}
                                            updateCanSuggestEvent={this.updateCanSuggestEvent}
                                            removeParticipant={this.removeParticipant} />)}
                                </ol>
                            </div>
                        </div>
                    </Form>
                </div>
                <Button onClick={this.submitForm} type='submit' className='end' attached>Create</Button>
            </>
        )
    }
}

export default AddEvent;