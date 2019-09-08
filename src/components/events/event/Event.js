import React, { Component } from "react"
import EventManager from '../../../modules/EventsManager'
import { Button } from 'semantic-ui-react'

class PastEventList extends Component {

    state = {
        name: '',
        date: '',
        userId: 0
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
    componentDidMount() {
        this.getEvent()
    }

    render() {
        return (
            <div className="eventContainer">
                <header>
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.date}</h3>
                </header>
            </div>
        )
    }
}

export default PastEventList;