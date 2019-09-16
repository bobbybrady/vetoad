import React, { Component } from "react"
import PastSuggestion from './PastSuggestion'
import PastUserEvent from './PastUserEvent'
class PastEvent extends Component {

    state = {
        winningCount: 0,
        winningSuggestion: '',
        winningId: 0
    }

    winner =  (currentCount, suggestion, vetoad, id) => {
        if (currentCount > this.state.winningCount && vetoad === undefined) {
            this.setState((ps, props) => {
                const newState = {
                    winningCount: currentCount,
                    winningSuggestion: suggestion,
                    winningId: id
                }
                return newState
            } )

        }
    }


    render() {

        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.userEvents.length === 0) {
            return <></>
        } else {
            const filterUserEvent = this.props.userEvents.filter(userEvent => userEvent.userId === currentUser.id && userEvent.eventId === this.props.eventId)
            const foundEvent = this.props.events.find(event => event.id === this.props.eventId)
            const filteredSuggestions = this.props.suggestions.filter(suggestion => suggestion.eventId === foundEvent.id)
            const filteredUserEvents = this.props.userEvents.filter(userEvent => userEvent.eventId === foundEvent.id)
            if (filterUserEvent.length === 1) {
                return (
                    <div className="eventsContainer">
                        <header>
                            <h1>{foundEvent.name}</h1>
                            <h3>{foundEvent.date}</h3>
                        </header>
                        <div className='suggestions'>
                            <h2>{foundEvent.category}</h2>
                            {filteredSuggestions.map(suggestion =>
                                <PastSuggestion
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    {...this.props}
                                    winningSuggestion={this.state.winningSuggestion}
                                    winner={this.winner}
                                    winningId={this.state.winningId}
                                />
                            )}
                        </div>
                        <div className='userEvents'>
                            <h2>List of Participants</h2>
                            <ol>
                                {filteredUserEvents.map(userEvent =>
                                    <PastUserEvent
                                        key={userEvent.id}
                                        userEvent={userEvent}
                                        {...this.props}
                                    />
                                )}
                            </ol>
                        </div>
                        <h1>Peng-Winner 🐧 {this.state.winningSuggestion}!</h1>
                    </div>
                )
            } else {
                return <></>
            }
        }
    }
}

export default PastEvent;