import { Route } from "react-router-dom";
import React, { Component } from "react";
import CurrentEventList from "./events/currentEvents/CurrentEventList";
import PastEventList from "./events/pastEvents/PastEventList";
import Profile from './profile/Profile'
import Event from './events/event/Event'
import AddEvent from "./events/addEvents/AddEvent";
import PastEvent from './events/pastEvents/PastEvent'


export default class FeatureViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <CurrentEventList {...this.props} />
          }}
        />
        <Route
          exact path="/pastevents" render={props => {
            return <PastEventList {...this.props} />
          }}
        />
        <Route
          exact path="/profile" render={props => {
            return <Profile {...this.props} />
          }}
        />
        <Route
          exact path="/addevent" render={props => {
            return <AddEvent {...this.props} />
          }}
        />
        <Route exact path="/events/:eventId(\d+)" render={(props) => {
          return <Event eventId={parseInt(props.match.params.eventId)} {...props} {...this.props} />
        }} />

        <Route exact path="/pastevents/:eventId(\d+)" render={(props) => {
          return <PastEvent eventId={parseInt(props.match.params.eventId)} {...props} {...this.props} />
        }} />

      </React.Fragment>
    );
  }
}
