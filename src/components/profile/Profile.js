import React, { Component } from "react"
import UserManager from '../../modules/UserManager'
import EditFirstNameModal from '../modals/EditFirstNameModal'
import EditLastNameModal from '../modals/EditLastNameModal'
import EditPasswordModal from '../modals/EditPasswordModal'
import EditUsernameModal from '../modals/EditUsernameModal'

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
        const hiddenPassword = currentUser.password.replace(/[a-z]|[1-9]|[A-Z]|@|!/g, '*')
            return (
                <div className="eventsContainer">
                   <h1>{currentUser.firstName}'s Profile</h1> 
                   <h2>Username: {currentUser.username}<EditUsernameModal 
                   editUserProfile={this.editUserProfile}
                   username={this.state.username}
                   handleFieldChange={this.handleFieldChange}/></h2>
                   <h2>Password: {hiddenPassword}<EditPasswordModal 
                   editUserProfile={this.editUserProfile}
                   password={this.state.password}
                   handleFieldChange={this.handleFieldChange}/></h2>
                   <h2>First Name: {currentUser.firstName}<EditFirstNameModal 
                   editUserProfile={this.editUserProfile}
                   firstName={this.state.firstName}
                   handleFieldChange={this.handleFieldChange}/></h2>
                   <h2>Last Name: {currentUser.lastName}<EditLastNameModal 
                   editUserProfile={this.editUserProfile}
                   lastName={this.state.lastName}
                   handleFieldChange={this.handleFieldChange}/></h2>
                </div>
            )
        }
}

export default Profile;