import React, { Component } from "react"
import { Card, Button, Icon } from 'semantic-ui-react'
import DeleteEventModal from '../../modals/DeleteEventModal'
import EventsManager from '../../../modules/EventsManager'

class PastEventCard extends Component {

    deleteEvent = (eventId) => {
        EventsManager.delete(eventId).then(() => {
            this.props.getAllEvents()
        })

    }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents.length === 0) {
            return <></>
        } else if (this.props.event.isOver === false && this.props.event.tie === true) {
            return (
                <></>
            )
        } else if (this.props.event.isOver === true) {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.event.id)
            if (this.props.event.userId === currentUser.id) {
                return (
                    <div className="eventCard fontText">
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.event.name} <Icon name="star outline" /></Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/pastevents/${this.props.event.id}`) }}>Details</Button>
                                <DeleteEventModal {...this.props}
                                    deleteEvent={this.deleteEvent} />
                            </Card.Content>
                        </Card>
                    </div>
                )

            } else if (filterUserEvent.length === 1) {
                return (
                    <div className="eventCard fontText">
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.event.name}</Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/pastevents/${this.props.event.id}`) }}>Details</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )
            } else {
                return <></>
            }
        } else {
            return <></>
        }
    }
}

export default PastEventCard;