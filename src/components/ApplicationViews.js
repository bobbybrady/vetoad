import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Register from "./auth/Register"
import CurrentEventList from "./events/currentEvents/CurrentEventList"
import Welcome from "./Welcome"



class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    render() {
        return (
            <React.Fragment>
                <Route exact path="/welcome" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/" />
                    }
                    return <Welcome {...props} />
                }} />
                <Route exact path="/login" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/" />
                    }
                    return <Login {...props} />
                }} />
                <Route exact path="/register" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/" />
                    }
                    return <Register {...props} />
                }} />
                <Route path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return (
                            <CurrentEventList {...props} />
                        )
                    }
                    return <Redirect to="/welcome" />
                }} />
            </React.Fragment>
        );
    }
}

export default ApplicationViews
