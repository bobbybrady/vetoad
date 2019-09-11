import React, { Component } from "react"
import { Button } from "semantic-ui-react"

class AddEventParticipant extends Component {



    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const foundUser = this.props.addParticipant.filter(participant => parseInt(participant.userId) === parseInt(this.props.user.id))
        const fullName= `${this.props.user.firstName} ${this.props.user.lastName}`
        if (parseInt(this.props.user.id) === currentUser.id) {
            return <></>
        } else {
            if (foundUser.length === 0) {
                return (
                    <p>{this.props.user.firstName} {this.props.user.lastName} <Button id={this.props.user.id} value={fullName} onClick={this.props.addUserId}>Add</Button></p>
                )
            } else {
                return (
                    <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                )
            }
        }
    }
}

export default AddEventParticipant;