import React, { Component } from "react"
import { Button } from 'semantic-ui-react'

class PoodleButton extends Component {


    render() {
        const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents === undefined || this.props.userEvents.length === 0) {
            return <></>
        } else {
            const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id)
            if (vetoadCheck === undefined) {
                if (filteredPoodles[0].poodleSuggestionId === null) {
                    return (
                        <Button className='emojiButton' onClick={this.props.updateExistingUserEventPoodle}>🐩</Button>
                    )
                } else {
                    if (filteredPoodles[0].poodleSuggestionId === this.props.suggestion.id) {
                        return (
                            <Button className='emojiButton' disabled color='green'>🐩</Button>
                        )
                    } else {
                        return (
                            <Button className='emojiButton' disabled>🐩</Button>
                        )

                    }
                }
            } else {
                if (filteredPoodles[0].poodleSuggestionId === this.props.suggestion.id) {
                    return (
                        <Button className='emojiButton' disabled color='green'>🐩</Button>
                    )
                } else {
                    return (
                        <Button className='emojiButton' disabled>🐩</Button>
                    )

                }
            }
        }
    }
}


export default PoodleButton;