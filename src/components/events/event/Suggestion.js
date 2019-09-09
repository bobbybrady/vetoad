import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class Suggestion extends Component {

    render() {
            return (
                   <Card>
                       <Card.Content>
                           <Card.Header>{this.props.suggestion.name}</Card.Header>
                           <Button>🐩</Button>
                           <Button>🦜</Button>
                       </Card.Content>
                   </Card>
            )
        }
}

export default Suggestion;