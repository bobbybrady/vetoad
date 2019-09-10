import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class AddSuggestion extends Component {


    render() {
            return (
                <Card>
                    <Card.Content>
                            <Card.Header>{this.props.addSuggestion.name}<Button>Delete</Button></Card.Header>
                    </Card.Content>
                </Card>
            )
    }
}

export default AddSuggestion;