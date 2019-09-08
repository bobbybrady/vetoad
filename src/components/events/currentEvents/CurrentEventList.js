import React, { Component } from "react"
import './CurrentEvents.css'
import CurrentEventCard from './CurrentEventCard'

class CurrentEventList extends Component {

    render() {
        return (
            <div className="eventsContainer">
                <h1>Current Events</h1>
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