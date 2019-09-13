import React, { Component } from "react"
import { Card, Button, Icon } from 'semantic-ui-react'

class CurrentEventCard extends Component {

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents.length === 0) {
            return <></>

        } else if (this.props.event.tie === true) {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.event.id)
            if (this.props.event.userId === currentUser.id) {
                return (
                    <div className="eventCard">
                        <Card>
                            <Card.Content>
                                <Icon name="star outline"  />
                                <h2>🐅TIE-ger🐅</h2>
                                <Card.Header>{this.props.event.name}</Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/events/${this.props.event.id}`) }}>Details</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )
            } else if (filterUserEvent.length === 1) {
                return (
                    <div className="eventCard">
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.event.name}</Card.Header>
                                <h2>🐅TIE-ger🐅</h2>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/events/${this.props.event.id}`) }}>Details</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )
            } else {
                return <></>
            }
        } else if (this.props.event.isOver === false) {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.event.id)
            if (this.props.event.userId === currentUser.id) {
                return (
                    <div className="eventCard">
                        <Card>
                            <Card.Content>
                                <Icon name="star outline"  />
                                <Card.Header>{this.props.event.name}</Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/events/${this.props.event.id}`) }}>Details</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )
            } else if (filterUserEvent.length === 1) {
                return (
                    <div className="eventCard">
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.props.event.name}</Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/events/${this.props.event.id}`) }}>Details</Button>
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


export default CurrentEventCard;