import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';

class Welcome extends Component {
    render() {
        return (
            <div className="welcome_container">
                    <h3>Vetoad <span role='img'>🐸</span></h3>
                    <Link to="/login"><Button>Login</Button></Link>
                    <Link to="/register"><Button>Sign Up</Button></Link>
            </div>
        )
    }
}
export default Welcome