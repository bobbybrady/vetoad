import React, { Component } from "react"
import PastSuggestion from './PastSuggestion'
import PastUserEvent from './PastUserEvent'
import SuggestionsManager from '../../../modules/SuggestionsManager'
class PastEvent extends Component {

    state = {
        winningCount: 0,
        winningSuggestion: '',
        winningId: 0
    }

    findWinner = () => {
        SuggestionsManager.getAll().then(suggestions => {
            const findEvent = this.props.events.find(event => event.id === this.props.eventId)
            const filteredSuggestions = suggestions.filter(suggestion => suggestion.eventId === findEvent.id)
            let winnerCount = 0
            let winnerId = 0
            let winnerName = ''
            if (findEvent.tie === true) {
                filteredSuggestions.forEach(suggestion => {
                    const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === suggestion.id)
                    const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === suggestion.id)
                    const filteredTie = this.props.userEvents.filter(userEvent => userEvent.tieId === suggestion.id)
                    const total = (filteredPoodles.length - filteredParrots.length) + filteredTie.length
                    const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === suggestion.id)
                    if (total > winnerCount && vetoadCheck === undefined) {
                        winnerCount = total
                        winnerId = suggestion.id
                        winnerName = suggestion.name
                    }
                });
            } else {
                filteredSuggestions.forEach(suggestion => {
                    const filteredPoodles = this.props.userEvents.filter(userEvent => userEvent.poodleSuggestionId === suggestion.id)
                    const filteredParrots = this.props.userEvents.filter(userEvent => userEvent.parrotSuggestionId === suggestion.id)
                    const total = (filteredPoodles.length - filteredParrots.length) 
                    const vetoadCheck = this.props.userEvents.find(userEvent => userEvent.vetoadSuggestionId === suggestion.id)
                    if (total > winnerCount && vetoadCheck === undefined) {
                        winnerCount = total
                        winnerId = suggestion.id
                        winnerName = suggestion.name
                    }
                });
            }
            this.setState({
                winningCount: winnerCount,
                winningSuggestion: winnerName,
                winningId: winnerId
            })
        })
    }


    componentDidMount() {
        this.findWinner()
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