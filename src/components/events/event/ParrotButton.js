import React, { Component } from "react"
import { Button } from 'semantic-ui-react'

class ParrotButton extends Component {


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
                        <Button>🦜</Button>
                    )
                } else {
                    if (filteredParrots[0].parrotSuggestionId === this.props.suggestion.id) {
                        return (
                            <Button disabled color='red'>🦜</Button>
                        )
                    } else {
                        return (
                            <Button disabled>🦜</Button>
                        )

                    }
                }
            } else {
                if (filteredParrots[0].parrotSuggestionId === this.props.suggestion.id) {
                    return (
                        <Button disabled color='red'>🦜</Button>
                    )
                } else {
                    return (
                        <Button disabled>🦜</Button>
                    )

                }
            }
        }
    }
}


export default ParrotButton;