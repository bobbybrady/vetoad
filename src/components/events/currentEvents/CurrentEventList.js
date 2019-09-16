import React, { Component } from "react"
import './CurrentEvents.css'
import CurrentEventCard from './CurrentEventCard'
import { Button } from "semantic-ui-react"

class CurrentEventList extends Component {

    addEvent = () => {
        this.props.history.push('/addevent')
    }

    render() {
        return (
            <div className="eventsContainer">
                <h1>Current Events</h1>
                <Button onClick={this.addEvent}>Add Event</Button>
                {this.props.events.map(event => 
                    <CurrentEventCard
                        key={event.id}
                        event={event}
                        {...this.props}
                        />
                )
                }
            </div>
        )
    }
}

export default CurrentEventList;