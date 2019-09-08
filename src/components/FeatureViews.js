import { Route } from "react-router-dom";
import React, { Component } from "react";
import CurrentEventList from "./events/currentEvents/CurrentEventList";
import PastEventList from "./events/pastEvents/PastEventList";
import Profile from './profile/Profile'
import Event from './events/event/Event'


export default class FeatureViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <CurrentEventList {...this.props}/>
          }}
        />
        <Route
          exact path="/pastevents" render={props => {
            return <PastEventList {...this.props}/>
          }}
        />
         <Route
          exact path="/profile" render={props => {
            return <Profile {...this.props}/>
          }}
        />
        <Route exact path="/events/:eventId(\d+)" render={(props) => {
          return <Event eventId={parseInt(props.match.params.eventId)} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
