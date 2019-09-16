import React, { Component } from "react"
import { Card} from 'semantic-ui-react'

class PastUserEvent extends Component {


    render() {
        return (
            <Card>
                <Card.Content>
                    <li>
                        <Card.Header>{this.props.userEvent.user.firstName} {this.props.userEvent.user.lastName}</Card.Header>
                    </li>
                </Card.Content>
            </Card>
        )
    }
}

export default PastUserEvent;