import React, { Component } from "react"
import { Button } from 'semantic-ui-react'

class VetoadButton extends Component {


    render() {
        const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === this.props.suggestion.id)
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents === undefined || this.props.userEvents.length === 0) {
            return <></>
        } else {
            const filteredVetoads = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id)
            if (vetoadCheck === undefined) {
                if (filteredVetoads[0].vetoadSuggestionId === null) {
                    return (
                        <Button>🐸</Button>
                    )
                } else {
                    if (filteredVetoads[0].vetoadSuggestionId === this.props.suggestion.id) {
                        return (
                            <Button disabled color='green'>🐸</Button>
                        )
                    } else {
                        return (
                            <Button disabled>🐸</Button>
                        )

                    }
                }
            } else {
                if (filteredVetoads[0].vetoadSuggestionId === this.props.suggestion.id) {
                    return (
                        <Button disabled color='green'>🐸</Button>
                    )
                } else {
                    return (
                        <Button disabled>🐸</Button>
                    )

                }
            }
        }
    }
}


export default VetoadButton;