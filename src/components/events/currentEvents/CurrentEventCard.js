import React, { Component } from "react"
import { Card, Button, Icon } from 'semantic-ui-react'

class CurrentEventCard extends Component {

    //renders the individual card for each event. Will render a tie card if its a tie, will render a star if the user created it

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents.length === 0) {
            return <></>

        } else if (this.props.event.tie === true && this.props.event.isOver === false) {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.event.id)
            if (this.props.event.userId === currentUser.id) {
                return (
                    <div className="eventCardTie">
                        <Card>
                            <Card.Content>
                                <h2 className='hTieger'>🐅TIE-ger🐅</h2>
                                <Card.Header>{this.props.event.name} <Icon name="star outline"  /></Card.Header>
                                <Card.Meta>{this.props.event.date}</Card.Meta>
                                <Button onClick={() => { this.props.history.push(`/events/${this.props.event.id}`) }}>Details</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )
            } else if (filterUserEvent.length === 1) {
                return (
                    <div className="eventCardTie">
                        <Card>
                            <Card.Content>
                                <h2 className='hTieger'>🐅TIE-ger🐅</h2>
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
        } else if (this.props.event.isOver === false) {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.event.id)
            if (this.props.event.userId === currentUser.id) {
                return (
                    <div className="eventCard">
                        <Card>
                            <Card.Content>
                               
                                <Card.Header>{this.props.event.name} <Icon name="star outline"  /></Card.Header>
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