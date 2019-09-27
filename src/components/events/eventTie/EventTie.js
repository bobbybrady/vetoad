import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import UserEvent from '../event/UserEvent'
import TieSuggestion from './TieSuggestion'

class EventTie extends Component {

    render() {
        const filterTie = this.props.totalCount.filter(totalCount => this.props.totalCount[0].totalCount === totalCount.totalCount)
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        return (
            <div className="eventContainer">
                <header>
                    <h2 className='hWinner'>🐅TIE-ger🐅</h2>
                    <h1 className='hMargin'>{this.props.name}</h1>
                    <h3 className='hMargin'>{this.props.date}</h3>
                </header>

                <div className='suggestions'>
                    <h2 className='hMargin'>{this.props.category}</h2>
                    {filterTie.map(suggestion =>
                        <TieSuggestion
                            key={suggestion.id}
                            suggestion={suggestion}
                            {...this.props} />
                    )}
                </div>
                <div className='userEvents'>
                    <h2 className='hMargin'>Participants</h2>
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
                {parseInt(currentUser.id) === this.props.userId ? <Button className='end' attached onClick={this.props.endTie}>End</Button> : '' }
            </div>
        )
    }
}

export default EventTie;