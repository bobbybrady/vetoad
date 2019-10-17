import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class AddSuggestion extends Component {

//renders the suggestion
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.addSuggestion.name}
                        <Button id={this.props.addSuggestion.id}
                        icon='trash alternate outline'
                        floated='right'
                        className='smallerDeleteButton'
                            onClick={() => this.props.removeSuggestion(this.props.addSuggestion.id)}></Button>
                    </Card.Header>
                </Card.Content>
            </Card>
        )
    }
}

export default AddSuggestion;