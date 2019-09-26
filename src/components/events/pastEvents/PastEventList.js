import React, { Component } from "react"
import PastEventCard from './PastEventCard'
import '../event/Event.css'

class PastEventList extends Component {

    render() {
        return (
            <>
                <h1 className='hMargin'>Past Events</h1>
                <div className="eventsContainer">
                    {this.props.events.map(event =>
                        <PastEventCard
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

export default PastEventList;