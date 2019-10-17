import React, { Component } from "react"
import { Button } from "semantic-ui-react"

class AddEventParticipant extends Component {


//renders the name with the ability to add if they are not added 
    render() {
        const foundUser = this.props.addParticipant.filter(participant => parseInt(participant.userId) === parseInt(this.props.user.id))
        const fullName= `${this.props.user.firstName} ${this.props.user.lastName}`
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (parseInt(this.props.user.id) === currentUser.id) {
            return <></>
        } else {
            if (foundUser.length === 0) {
                return (
                    <p className='hMargin'>{this.props.user.firstName} {this.props.user.lastName} <Button id={this.props.user.id} value={fullName} className='smallerDeleteButton' onClick={this.props.addUserId} icon='add'></Button></p>
                )
            } else {
                return (
                    <p className='hMargin'>{this.props.user.firstName} {this.props.user.lastName}</p>
                )
            }
        }
    }
}

export default AddEventParticipant;