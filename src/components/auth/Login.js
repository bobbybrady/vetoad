import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
import { Button } from 'reactstrap';

class Login extends Component {

    // Set initial state
    state = {
        username: "",
        password: "",
        id: 0,
        firstName: "",
        lastName: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }



    handleLogin = (event) => {
        event.preventDefault()
        UserManager.getUsernamePassword(this.state.username, this.state.password).then(user => {
            if (user.length === 0) {
                window.alert("For Fox 🦊sake enter a valid username or password!")
                document.querySelector("#username").value = ""
                document.querySelector("#password").value = ""
            } else if (this.state.username.length === 0 || this.state.password.length === 0) {
                window.alert("Please Bear 🐻with us and fill out all fields!")
            }
             else {
                this.setState({ id: user[0].id, firstName: user[0].firstName, lastName: user[0].lastName })
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
                this.props.history.push("/");
            }
        })
    }

    render() {
        return (
            <div className="login_container">
                <form onSubmit={this.handleLogin}>
                    <h2 className="welcome">Vetoad</h2>
                    <h3>Login</h3>
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
                    </div>
                    <Button outline color="dark" size="sm" type="submit">
                        Submit
            </Button>
                    <Button outline color="dark" size="sm" type="cancel" onClick={() => {this.props.history.push(`/welcome`)}}>
                        Cancel
            </Button>
                </form></div>
        )
    }
}
export default Login