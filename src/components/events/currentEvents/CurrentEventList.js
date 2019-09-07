import React, { Component } from "react"
import { Button } from 'reactstrap';

class CurrentEventList extends Component {

    logout = () => {
        sessionStorage.clear()
        this.props.history.push("/")
    }

    render() {
            return (
                <>
                   <h1>Hello</h1> 
                   <Button outline color="secondary" size="sm" className="sign_out" onClick={this.logout}>Logout</Button>
                </>
            )
        }
}

export default CurrentEventList;