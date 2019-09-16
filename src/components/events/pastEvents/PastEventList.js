import React, { Component } from "react"
import PastEventCard from './PastEventCard'

class PastEventList extends Component {

    render() {
            return (
                <div className="eventsContainer">
                   <h1>Past Events</h1> 
                   {this.props.events.map(event => 
                    <PastEventCard
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

export default PastEventList;