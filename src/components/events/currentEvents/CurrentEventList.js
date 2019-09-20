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
            <>
                <div className='currentEventsListHeader'>
                    <h1>Current Events</h1>
                    <Button onClick={this.addEvent} className='addButton'>Add Event</Button>
                </div>
                <div className="eventsContainer">
                    {this.props.events.map(event =>
                        <CurrentEventCard
                            key={event.id}
                            event={event}
                            {...this.props}
                        />
                    )
                    }
                </div>
            </>
        )
    }
}

export default CurrentEventList;