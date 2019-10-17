import React, { Component } from "react"
import './CurrentEvents.css'
import CurrentEventCard from './CurrentEventCard'
import { Button, Icon } from "semantic-ui-react"

class CurrentEventList extends Component {

    addEvent = () => {
        this.props.history.push('/addevent')
    }

    //renders the first page on login, as well as each card applicable to the user
    render() {
        return (
            <>
                <div className='currentEventsListHeader'>
                    <h1 className='fontText'>Current Events</h1>
                    <Button onClick={this.addEvent} className='addButton' icon='add'></Button>
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