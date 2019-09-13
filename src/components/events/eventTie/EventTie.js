import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import UserEvent from '../event/UserEvent'
import TieSuggestion from './TieSuggestion'

class EventTie extends Component {


    render() {
        return (
            <div className="eventsContainer">
                <header>
                    <h1>{this.props.name}</h1>
                    <h2>🐅TIE-ger🐅</h2>
                    <h3>{this.props.date}</h3>
                </header>

                <div className='suggestions'>
                    <h2>{this.props.category}</h2>
                    {this.props.totalCount.map(suggestion =>
                        <TieSuggestion
                            key={suggestion.id}
                            suggestion={suggestion}
                            {...this.props} />
                    )}
                </div>
                <div className='userEvents'>
                    <h2>List of Participants</h2>
                    <ol>
                        {this.props.userEvents.map(userEvent =>
                            <UserEvent
                                key={userEvent.id}
                                userEvent={userEvent}
                                {...this.props}
                                 />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default EventTie;