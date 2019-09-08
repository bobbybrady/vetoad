import React, { Component } from "react"
import { Card, Button } from 'semantic-ui-react'

class SuggestionEventList extends Component {

    render() {
        console.log('ksjdf')
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

export default SuggestionEventList;