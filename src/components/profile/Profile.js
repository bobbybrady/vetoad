import React, { Component } from "react"
import UserManager from '../../modules/UserManager'
import EditFirstNameModal from '../modals/EditFirstNameModal'

class Profile extends Component {

    state = {
        username: '',
        id: 0,
        password: '',
        firstName: '',
        lastName: ''
    }

    editUserProfile = () => {
        const editedUser = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: this.state.id
        }
        UserManager.update(editedUser).then(() => {
            sessionStorage.setItem(
                "credentials",
            JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
            )
            this.props.getAllUsers()
        })
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        this.setState({
            username: currentUser.username,
            password: currentUser.password,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            id: currentUser.id
        })
    }
    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const hiddenPassword = currentUser.password.replace(/[a-z]/g, '*')
            return (
                <div className="eventsContainer">
                   <h1>{currentUser.firstName}'s Profile</h1> 
                   <h2>Username: {currentUser.username}</h2>
                   <h2>Password: {hiddenPassword}</h2>
                   <h2>First Name: {currentUser.firstName}<EditFirstNameModal 
                   editUserProfile={this.editUserProfile}
                   firstName={this.state.firstName}
                   handleFieldChange={this.handleFieldChange}/></h2>
                   <h2>Last Name: {currentUser.lastName}</h2>
                </div>
            )
        }
}

export default Profile;