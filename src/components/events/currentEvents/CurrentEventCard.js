import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class CurrentEventCard extends Component {

    render() {
        return (
            <div className="eventCard">
                <Card>
                    <Card.Content>
                        <Card.Header>{this.props.event.name}</Card.Header>
                        <Card.Meta>{this.props.event.date}</Card.Meta>
                        <Button onClick={() => {this.props.history.push(`/events/${this.props.event.id}`)}}>Details</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default CurrentEventCard;