import React, { Component } from "react"
import { Button } from 'semantic-ui-react'

class ParrotButton extends Component {

    //renders the parrot buttons based off if they are clicked or not
    render() {
        const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents === undefined || this.props.userEvents.length === 0) {
            return <></>
        } else {
            const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id)
            if (vetoadCheck === undefined) {
                if (filteredParrots[0].parrotSuggestionId === null) {
                    return (
                        <Button className='emojiButton' onClick={this.props.updateExistingUserEventParrot}>🦜</Button>
                    )
                } else {
                    if (filteredParrots[0].parrotSuggestionId === this.props.suggestion.id) {
                        return (
                            <Button className='emojiButton' disabled color='red'>🦜</Button>
                        )
                    } else {
                        return (
                            <Button className='emojiButton' disabled>🦜</Button>
                        )

                    }
                }
            } else {
                if (filteredParrots[0].parrotSuggestionId === this.props.suggestion.id) {
                    return (
                        <Button className='emojiButton' disabled color='red'>🦜</Button>
                    )
                } else {
                    return (
                        <Button className='emojiButton' disabled>🦜</Button>
                    )

                }
            }
        }
    }
}


export default ParrotButton;