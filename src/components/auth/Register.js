import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Button } from 'reactstrap';

class Register extends Component {

    // Set initial state
    state = {
        username: "",
        password: "",
        id: 0,
        firstName: '',
        lastName: ''
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = (event) => {
        event.preventDefault()
        UserManager.getUsername(this.state.username).then(user => {
            if (user.length !== 0) {
                window.alert("For Fox 🦊sake this account already exists!")
                document.querySelector("#username").value = ""
                document.querySelector("#password").value = ""
                document.querySelector("#firstName").value = ""
                document.querySelector("#lastName").value = ""
            } else if (this.state.username.length === 0 || this.state.password.length === 0) {
                window.alert("Please Bear 🐻with us and fill out all fields!")
            } else {
            UserManager.post(this.state).then((object) => {
                sessionStorage.setItem(
                    "credentials",
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    id: object.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                })
            )
                this.props.history.push("/");
            })
        }
    })
    }

    handleCancel = (event) => {
        event.preventDefault()
        this.props.history.push("/welcome");
    }

    render() {
        return (
            <div className="login_container">
                <form onSubmit={this.handleRegister}>
                <h2 className="welcome">Welcome To</h2>
                    <h3>Register</h3>
                    <div className="formgrid">
                        <label htmlFor="inputUsername">Username</label>
                        <input onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="Enter username"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                            <label htmlFor="inputFirstName">First Name</label>
                            <input onChange={this.handleFieldChange} type="firstName"
                            id="firstName"
                            placeholder="First Name"
                            required="" />
                            <label htmlFor="inputLastName">Last Name</label>
                            <input onChange={this.handleFieldChange} type="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            required="" />
                    </div>
                    <Button outline color="dark" size="sm" type="submit">
                        Submit
            </Button>
            <Button outline color="dark" size="sm" type="cancel" onClick={this.handleCancel}>
                        Cancel
            </Button>
            </form>
            </div>
        )
    }

}

export default Register