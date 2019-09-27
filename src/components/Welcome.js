import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Image } from 'semantic-ui-react';
import './Vetoad.css'

class Welcome extends Component {
    render() {
        return (
            <div className="welcome_container">
                <Image size='large'  className='logo' centered src={require('./Original.png')} />
                <div className='welcomeContainer'>
                    <Link to="/login"><Button>Login</Button></Link>
                    <Link to="/register"><Button>Sign Up</Button></Link>
                </div>
            </div>
        )
    }
}
export default Welcome