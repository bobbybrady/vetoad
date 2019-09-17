import React, { Component } from "react"

class Profile extends Component {

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
            return (
                <div className="eventsContainer">
                   <h1>{currentUser.firstName}'s Profile</h1> 
                   <h2>Username: {currentUser.username}</h2>
                   {/* <h2>Password: {currentUser.password}</h2> */}
                   <h2>First Name: {currentUser.firstName}</h2>
                   <h2>Last Name: {currentUser.lastName}</h2>
                </div>
            )
        }
}

export default Profile;